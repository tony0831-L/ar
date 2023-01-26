import { Canvas } from "@react-three/fiber"
import { KeyboardControls, Preload, Stars, } from "@react-three/drei"
import { VRButton } from '@react-three/xr'
import { Physics } from "@react-three/rapier"
import { Ground } from "../libs/ground"
// import { Player } from "../libs/player"
import {ModelsEditor} from '../components/modelsEditor'
import Collisions from "../components/Collisions"
import { Ui } from '../components/UIs'
import { FlyControl } from "../components/FlyControls"
import { LightsEditor } from "../components/lightsEditor"
import { Effects } from '../libs/effect'
import { World } from "../libs/worldInterfaces"
import { asyncGet } from "../libs/utils/fetch"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setLightInfo , clean} from "../libs/slices/lightEditor"

export interface path {
    url: string
}

export default function Editor(path: path) {
    const dispatch = useDispatch()
    const [world, setworld] = useState<World>()

    if (!world) {
        asyncGet(path.url).then(info => {
            const ownWorld: World = new World({
                lights: info[0].light,
                models: info[0].objModel,
                collisions: info[0].collision
            })
            setworld(ownWorld)
            dispatch(setLightInfo(ownWorld.lights))
        })
    }

    setTimeout(()=>{
        dispatch(clean([]))
    },30000)

    return (
        <>
            {world ?
                <Canvas shadows camera={{ fov: 70 }} gl={{ antialias: true }}>
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
                            <ModelsEditor {...{ models:world.models }} />
                            <LightsEditor {...{ lights: world.lights }} />
                            <Ground />
                            <Collisions {...{ collisions: world.collisions }} />
                        </Physics>
                        <Preload all />
                        <FlyControl {...{
                            setting: {
                                speed: 10
                            }
                        }} />
                        <Ui />
                    </KeyboardControls>
                </Canvas>
                : null
            }
            <VRButton />
        </>
    )
}

