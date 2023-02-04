
import { World } from "../libs/interfaces/worldInterfaces"
import { asyncGet } from "../libs/utils/fetch"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLightInfo } from "../libs/slices/lightEditor"
import { setModelinfo } from "../libs/slices/modelEditor"
import { Recorder } from "../libs/utils/recorder"
import { init } from "../libs/slices/RecorderSlice"
import { selectLoadState } from "../libs/slices/loadSlice"
import { Sound } from "../components/objs/sund"
import { ZapparCamera, ImageTracker, ZapparCanvas } from '@zappar/zappar-react-three-fiber';
import { GlbModel } from "../libs/objClass/modelLoader"
import { Vector3, Euler } from "three"
import { Stats , Text } from "@react-three/drei"
const targetFile = new URL('../assets/test2.zpt', import.meta.url).href;

export interface path {
  url: string
}

export default function AR(path: path) {
  const cam = useRef<any>()
  const tra = useRef<any>()
  const qr = useRef<any>()
  const origin = new Vector3(0, 0, 0)
  const dispatch = useDispatch()
  const [world, setworld] = useState<World>()
  const [mic, setMic] = useState<boolean>(true)
  const [buffer, setBuffer] = useState<string>()
  const [distance, setDistance] = useState<number>(0)
  const [lock, setLock] = useState<boolean>(false)
  const [r, setR] = useState<number>(0)
  const [target, setTarget] = useState<Vector3>(new Vector3(0, 0, 0))
  const [anime, setAnime] = useState<string>("Idle")
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

  console.log(lock)
  return (
    <>
      <Recorder {...{ setBuffer: setBuffer }} />
      <Stats />
      {world ?
        <ZapparCanvas>
          <ZapparCamera ref={cam} />
          <ImageTracker ref={tra}
            onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
            onVisible={(anchor) => {
              console.log(tra)
              if (!lock) {
                console.log(lock)
                if ((target.y >= 0 || target.z >= 0) && distance >= 1.00000003) {
                  setLock(true)
                  console.log("locked")
                  return
                }
                setTarget(new Vector3().fromArray(anchor.poseCameraRelative()))
                setR(new Vector3().copy(target).applyAxisAngle(origin, target.angleTo(origin)).y)
                let d = origin.distanceTo(target)
                console.log(d)
                if (d >= 1.00000003) {
                  setDistance(d)
                }
              }
            }}
            targetImage={targetFile}
          >
            {
              !lock ?
                <>
                  <Text fontSize={0.5} >
                    Scanning...
                  </Text>
                </>
                : null
            }
          </ImageTracker>

          <GlbModel type={"GLB"} _id={"63d7ccba125c7e64bcc82ce1"} url={"Chatbot Avatar A/WeiYuan.glb"} scale={lock ? distance * 0.7 : 0} position={[(0 - (target.x / 4)+0.2), (0 +  target.y), -3]} rotation={[0, 0, 0]} name={"wei yuan"} anime={anime} key={"63d8c1a35a1251d714880b85"} onPointerOver={null} onPointerOut={null} onClick={null} />

          <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
          {
            buffer ?
              <Sound raw={buffer} setAnime={ setAnime}/>
              : null
          }
        </ZapparCanvas>
        : null
      }

    </>
  )

}
