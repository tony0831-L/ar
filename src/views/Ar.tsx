import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stats, PositionalAudio } from "@react-three/drei"
import { ARButton, XR } from '@react-three/xr'
import { World } from "../libs/interfaces/worldInterfaces"
import { asyncGet } from "../libs/utils/fetch"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLightInfo } from "../libs/slices/lightEditor"
import { setModelinfo } from "../libs/slices/modelEditor"
import { Lights } from "../components/objs/lights"
import { Recorder } from "../libs/utils/recorder"
import { init } from "../libs/slices/RecorderSlice"
import { selectLoadState } from "../libs/slices/loadSlice"
import { Sound } from "../components/objs/sund"
import { ZapparCamera, ImageTracker, ZapparCanvas } from '@zappar/zappar-react-three-fiber';
import { GlbModel } from "../libs/objClass/modelLoader"
const targetFile = new URL('../assets/test2.zpt', import.meta.url).href;

export interface path {
  url: string
}

export default function AR(path: path) {
  const dispatch = useDispatch()
  const [world, setworld] = useState<World>()
  const [mic, setMic] = useState<boolean>(true)
  const [buffer, setBuffer] = useState<string>()
  const [show, setShow] = useState<boolean>(false)


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
      dispatch(init())
    })
  }

  useEffect(() => {
    setMic(!mic)
  }, [useSelector(selectLoadState)])

  const observer = new MutationObserver(() => {
    if (document.body.children.length > 2) {
      let ad = document.body.children[2]
      if (ad != document.querySelector('.zappar-permission-request')) {
        document.body.removeChild(ad)
        observer.disconnect()
        return
      } {
        return
      }
    }
  })


  observer.observe(document.body, { subtree: false, childList: true });

  return (
    <>
      <Recorder {...{ setBuffer: setBuffer }} />
      {/* <Stats /> */}
      {world ?
        <ZapparCanvas>
          <ZapparCamera />
          <ImageTracker
            onNotVisible={(anchor) => {
              // alert("onNotVisible")
              if (show) {
                setShow(false)
              }
            }}
            onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
            onVisible={(anchor) => {
              // alert("onVisible")
              if (!show) {
                setShow(true)
              }
            }}
            targetImage={targetFile}
          >
            {/* <GlbModel type={"GLB"} _id={"63d7ccba125c7e64bcc82ce1"} url={"Chatbot Avatar A/AvatarA_talking_glb.glb"} scale={1} position={[0, -0.8, -5]} rotation={[0, 0, 0]} name={"wei yuan"} anime={"Armature|mixamo.com|Layer0"} key={"63d8c1a35a1251d714880b85"} onPointerOver={null} onPointerOut={null} onClick={null} /> */}
            <GlbModel type={"GLB"} _id={"63d7ccba125c7e64bcc82ce1"} url={"Chatbot Avatar A/AvatarA_talking_glb.glb"} scale={show?3.5:0} position={[0, -1.5, 0]} rotation={[0, 0, 0]} name={"wei yuan"} anime={"Armature|mixamo.com|Layer0"} key={"63d8c1a35a1251d714880b85"} onPointerOver={null} onPointerOut={null} onClick={null} />
          </ImageTracker>
          <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
          {
            buffer ?
              <Sound raw={buffer} />
              : null
          }
        </ZapparCanvas>
        : null
      }

    </>
  )

}
