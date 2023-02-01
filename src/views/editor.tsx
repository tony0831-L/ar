import { Canvas } from "@react-three/fiber"
import { KeyboardControls, Preload, Stars, } from "@react-three/drei"
import { VRButton, XR } from '@react-three/xr'
import { Physics } from "@react-three/rapier"
import { Ground } from "../libs/objClass/ground"
// import { Player } from "../libs/player"
import { ModelsEditor } from '../components/editor/modelsEditor'
import Collisions from "../components/objs/Collisions"
import { Ui } from '../components/controls/UIs'
import { FlyControl } from "../components/controls/FlyControls"
import { LightsEditor } from "../components/editor/lightsEditor"
import { Effects } from '../libs/objClass/effect'
import { World } from "../libs/interfaces/worldInterfaces"
import { asyncGet } from "../libs/utils/fetch"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setLightInfo } from "../libs/slices/lightEditor"
import { setModelinfo } from "../libs/slices/modelEditor"

export interface path {
    url: string
}

export default function Editor(path: path) {
    const dispatch = useDispatch()
    const [world, setworld] = useState<World>()
    const [loading, setLoading] = useState<string>("fetching")
    if (!world) {
        asyncGet(path.url).then(info => {
            const ownWorld: World = new World({
                lights: info.light,
                models: info.objModel,
                collisions: info.collision
            })
            setworld(ownWorld)
            dispatch(setLightInfo(ownWorld.lights))
            dispatch(setModelinfo(ownWorld.models))
        })
    }

    return (
        <>
            <Ui {...{ progress: loading }} />
            <VRButton />
            {world ?
                <Canvas shadows camera={{ fov: 70 }} gl={{ antialias: true }}>
                    <XR>
                        <KeyboardControls
                            map={[
                                { name: "forward", keys: ["ArrowUp", "w", "W"] },
                                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                                { name: "left", keys: ["ArrowLeft", "a", "A"] },
                                { name: "right", keys: ["ArrowRight", "d", "D"] },
                                { name: "jump", keys: ["Space"] },
                            ]}>
                            <Stars />
                            <color attach="background" args={["#212124"]} />
                            {/* @ts-ignore */}
                            <Effects />
                            <Physics gravity={[0, 0, 0]}>
                                <ModelsEditor {...{ models: world.models, setLoading: setLoading }} />
                                <LightsEditor {...{}} />
                                <Ground />
                                <Collisions {...{ collisions: world.collisions }} />
                            </Physics>
                            <Preload all />
                            <FlyControl {...{
                                setting: {
                                    speed: 10
                                }
                            }} />
                        </KeyboardControls>
                    </XR>
                </Canvas>
                : null
            }

        </>
    )
}

