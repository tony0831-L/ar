import { PointerLockControls, Html, FlyControls } from "@react-three/drei"
import { type } from "@testing-library/user-event/dist/type"
import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { store, RootState } from "../../libs/utils/store"
import { localSet } from "../../libs/interfaces/localSetting"

export const FlyControl: React.FC<{ setting: localSet }> = (info: { setting: localSet }) => {
  //todo: fix drop
  const overlaydom = useRef<any>(null)
  const setting: localSet = info.setting ? info.setting : {
    speed: 10
  }
  const onLock = ()=>{

  }
  const onUnlock = ()=>{
    
  }
  return (
    <>
      <PointerLockControls selector="#editorOverlayBtn" onLock={(onLock)} onUnlock={(onUnlock)} ref={overlaydom} >
      </PointerLockControls>
      <FlyControls movementSpeed={setting.speed} dragToLook />
    </>
  )

}