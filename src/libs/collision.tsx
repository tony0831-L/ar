import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { CapsuleCollider, Debug, RigidBody, useRapier } from "@react-three/rapier"


interface colliderInfo{
    scale:[x:number,y:number,z:number]
    position:[x:number,y:number,z:number]
    onClick:Function
    onPointerOver:Function
    onPointerOut:Function
    rotation?: [x:number,y:number,z:number]
    material?:boolean 
}

export function Collision(props:colliderInfo) {
    const meshRef:any = useRef()
    const [hovered, hover] = useState(false)
    return (
        <>
            <RigidBody colliders="cuboid" type="fixed">
                <mesh
                    ref={meshRef}
                    scale={props.scale}
                    position ={props.position}
                    rotation = {props.rotation?props.rotation:[0,0,0]}
                    onClick={(event)=>{props.onClick(event)}}
                    onPointerOver={(event)=>{
                        props.onPointerOver(event)
                        hover(true)
                    }}
                    onPointerOut={(event)=>{
                        props.onPointerOut(event)
                        hover(false)
                    }}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial transparent={props.material?false:true} opacity={0} />
                </mesh>
            </RigidBody>
        </>
    )
}

