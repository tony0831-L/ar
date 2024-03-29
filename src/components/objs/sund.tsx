import { useThree, useLoader } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import * as THREE from 'three'


export const Sound: React.FC<{ raw:string , setAnime: React.Dispatch<React.SetStateAction<string>>}> = (info: { raw:string, setAnime: React.Dispatch<React.SetStateAction<string>> }) => {
    console.log(info.raw)
    const sound = useRef<THREE.PositionalAudio>(null)
    const { camera } = useThree()
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader,info.raw)
    //@ts-ignore
    useEffect(() => {
        if(sound.current){
            sound.current.setBuffer(buffer)
            sound.current.setRefDistance(1)
            sound.current.play()
            camera.add(listener)
            info.setAnime("Talking")
        }
    }, [info.raw])
    return <positionalAudio ref={sound} args={[listener]} onEnded={()=>{info.setAnime("Idle");sound.current?.stop()}} loop={false}/>
    // return null
  }