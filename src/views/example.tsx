import { Canvas, Props } from "@react-three/fiber"
import { KeyboardControls, Preload ,Stars } from "@react-three/drei"
import { VRButton } from '@react-three/xr'
import { Debug, Physics } from "@react-three/rapier"
import { Ground } from "../libs/ground"
import { Player } from "../libs/player"
import Models from '../components/models'
import Collisions from "../components/Collisions"
import {Ui} from '../components/UIs'
import Pointlock from "../components/PointerLockControls"
import {Lights} from "../components/lights"
import { Effects } from '../libs/effect'
import { useDispatch } from 'react-redux'
import { setWorld } from "../libs/slices/worldinfo"
import { world } from "../libs/worldInterfaces"
import { asyncGet } from "../libs/utils/fetch"

export interface path{
    url:string
}

export default function Example(path:path) {
    const dispatch = useDispatch()
    let ownWorld 
    asyncGet(path.url).then(info=>{
        ownWorld = new world(
            info[0].light,
            info[0].objModel,
            info[0].collision
        )
        dispatch(setWorld(ownWorld))
    })
    
    return (
        <>
            <Canvas shadows camera={{ fov: 70 }} gl={{ antialias: true}}>
            <KeyboardControls 
                map={[
                { name: "forward", keys: ["ArrowUp", "w", "W"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left", keys: ["ArrowLeft", "a", "A"] },
                { name: "right", keys: ["ArrowRight", "d", "D"] },
                { name: "jump", keys: ["Space"] },
                ]}>
                <Stars/>
                <color attach="background" args={["#212124"]} />
                {/* @ts-ignore */}
                <Effects />
                <Physics gravity={[0, -30, 0]}>
                <Lights />
                <Ground />
                <Collisions />
                <Models />
                <Player />
                </Physics>
                <Preload all />
                <Pointlock />
                <Ui />
            </KeyboardControls>
            </Canvas>
            <VRButton />
        </>
    )
}

