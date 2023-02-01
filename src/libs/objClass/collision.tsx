import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { CapsuleCollider, Debug, RigidBody, useRapier } from "@react-three/rapier"
import { collisionInfo } from "../interfaces/worldInfo"

export function Collision(props:collisionInfo) {
    const meshRef:any = useRef()
    const [hovered, hover] = useState(false)

    const onPointerOut = props.onPointerOut==null? ()=>{}:props.onPointerOut
    const onPointerOver = props.onPointerOver==null? ()=>{}:props.onPointerOver

    return (
        <>
            <RigidBody colliders="cuboid" type="fixed">
                <mesh
                    ref={meshRef}
                    scale={[props.scale[0],props.scale[1],props.scale[2]]}
                    position ={[props.position[0],props.position[1],props.position[2]]}
                    rotation = {[props.rotation[0],props.rotation[1],props.rotation[2]]}
                    onClick={(event)=>{}}
                    onPointerOver={(event)=>{
                        onPointerOver(event)
                        hover(true)
                    }}
                    onPointerOut={(event)=>{
                        onPointerOut(event)
                        hover(false)
                    }}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial transparent={props.material?false:true} opacity={0} />
                </mesh>
            </RigidBody>
        </>
    )
}

