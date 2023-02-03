import { PointerLockControls, Html, FlyControls } from "@react-three/drei"
import { type } from "@testing-library/user-event/dist/type"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { store, RootState } from "../../libs/utils/store"
import { localSet } from "../../libs/interfaces/localSetting"

export const FlyControl: React.FC<{ setting: localSet }> = (info: { setting: localSet }) => {
  const overlaydom = useRef<any>(null)
  const flyRef = useRef<any>(null)
  const [lock,setLock] = useState<boolean>(false);
  const setting: localSet = info.setting ? info.setting : {
    speed: 10
  }
  const onLock = ()=>{
    setLock(true)
  }
  const onUnlock = ()=>{
    setLock(false)
  }
  return (
    <>
      <PointerLockControls selector="#editorOverlayBtn" onLock={(onLock)} onUnlock={(onUnlock)} ref={overlaydom} >
      </PointerLockControls>
      {
        lock?
        <FlyControls movementSpeed={setting.speed} dragToLook ref={flyRef} />
        :null
      }
    </>
  )

}