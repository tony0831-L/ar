import { useGLTF, useTexture, useAnimations, useProgress } from "@react-three/drei"
import { useEffect, useRef } from "react";
import { modelInfo } from "../interfaces/worldInfo";

const url = 'https://dev.ethci.org/model/getModel/?path='

export function GltfModel(info: modelInfo) {
    const objRef = useRef()
    const { nodes, animations, scene } = useGLTF(`${url}${info.url}`)
    const { ref, actions, names } = useAnimations(animations, objRef)
    scene.name = info.name
    useEffect(() => {
        if (info.anime) {
            actions[info.anime]?.reset().fadeIn(0.5)
        }
    }, [])
    scene.traverse(obj => {
        obj.castShadow = true; obj.receiveShadow = true
    })

    return (
        <>
            <primitive object={scene} scale={info.scale} position={info.position} rotation={info.rotation} castShadow receiveShadow />
        </>
    )
}



export function GlbModel(info: modelInfo) {
    const objRef = useRef()
    const { nodes, animations, scene } = useGLTF(`${url}${info.url}`)
    const { ref, actions, names } = useAnimations(animations, objRef)

    const onPointerOut = info.onPointerOut==null? ()=>{}:info.onPointerOut
    const onPointerOver = info.onPointerOver==null? ()=>{}:info.onPointerOver

    scene.name = info.name
    useEffect(() => {
        console.log(actions)
        if (info.anime) {
            actions[info.anime]?.play()
        }
    }, [])

    scene.traverse(obj => {
        obj.castShadow = true; obj.receiveShadow = true
    })
    return (
        <>
            {
                info.onPointerOut != null ?
                    <primitive
                        onPointerOver={(event: any) => {
                            onPointerOut(event)
                        }}
                        onPointerOut={(event: any) => {
                            onPointerOver(event)
                        }}
                        ref={objRef} object={scene} scale={info.scale} position={info.position} rotation={info.rotation} castShadow receiveShadow
                    />
                    : <primitive ref={objRef} object={scene} scale={info.scale} position={info.position} rotation={info.rotation} castShadow receiveShadow />
            }
        </>
    )
}

