import { XR, ARButton, Controllers  } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

export default function AR() {
    const [color, updateColor] = useState<string>("blue")
    return (
        <>
          <ARButton />
          <Canvas>
            <XR>
              <Controllers />
              <mesh onClick={()=>{
                updateColor("red")
              }}>
                <boxGeometry />
                <meshBasicMaterial color={color} />
              </mesh>
            </XR>
          </Canvas>
        </>
      )
}