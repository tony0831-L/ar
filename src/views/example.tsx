import { Canvas } from "@react-three/fiber"
import { KeyboardControls, Preload, Stars } from "@react-three/drei"
import { VRButton } from '@react-three/xr'
import { Physics } from "@react-three/rapier"
import { Ground } from "../libs/ground"
import { Player } from "../libs/player"
import Models from '../components/models'
import Collisions from "../components/Collisions"
import { Ui } from '../components/UIs'
import Pointlock from "../components/PointerLockControls"
import { Lights } from "../components/lights"
import { Effects } from '../libs/effect'
import { World,  } from "../libs/worldInterfaces"
import { asyncGet } from "../libs/utils/fetch"
import { useState } from "react"

export interface path {
    url: string
}

export default function Example(path: path) {
    // const dispatch = useDispatch()
    const [world, setworld] = useState<World>();

    if (!world) {
        asyncGet(path.url).then(info => {
            console.log(info[0].light)
            const ownWorld: World = new World({
                lights: info[0].light,
                models: info[0].objModel,
                collisions: info[0].collision
            })
            setworld(ownWorld)
            // dispatch(setWorld(ownWorld))
        })
    }
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
                        <Physics gravity={[0, -30, 0]}>
                            <Models {...{models:world.models}} />
                            <Lights {...{lights:world.lights}} />
                            <Ground />
                            <Collisions {...{collisions:world.collisions}}/>
                            <Player />
                        </Physics>
                        <Preload all />
                        <Pointlock />
                        <Ui />
                    </KeyboardControls>
                </Canvas>
                : null
            }
            <VRButton />
        </>
    )
}

