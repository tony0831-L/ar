import { useGLTF,useTexture, useAnimations, useProgress } from "@react-three/drei"
import { useEffect, useRef } from "react";

interface modelInfo{
    url: string
    scale : number
    position: Array<number>
    rotation: Array<number>
    name: string
    anime?:string
}

const url = 'http://ininder.peiyu.me:3306/model/getModel/?path='

export function GltfModel(info:modelInfo) {
    const objRef = useRef()
    const { nodes, animations , scene} = useGLTF(`${url}${info.url}`)
    const { ref, actions, names } = useAnimations(animations,objRef)
    scene.name = info.name
    useEffect(()=>{
        if (info.anime) {
            actions[info.anime]?.reset().fadeIn(0.5)
        }
    },[])
    scene.traverse(obj=>{
        obj.castShadow = true;obj.receiveShadow = true
    })
      
    return (
        <>
          <primitive object={scene} scale={info.scale} position={info.position} rotation={info.rotation} castShadow receiveShadow />
        </>
    )
}



export function GlbModel(info:modelInfo) {
    const objRef = useRef()
    const { nodes, animations , scene} = useGLTF(`${url}${info.url}`)
    const { ref, actions, names } = useAnimations(animations,objRef)
    scene.name = info.name
    useEffect(()=>{
        if (info.anime) {
            actions[info.anime]?.play()
        }
    },[])
    scene.traverse(obj=>{
        obj.castShadow = true;obj.receiveShadow = true
    })
      
    return (
        <>
          <primitive ref={objRef} object={scene} scale={info.scale} position={info.position} rotation={info.rotation} castShadow receiveShadow />
        </>
    )
}

