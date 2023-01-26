import {PointerLockControls , Html} from "@react-three/drei"
import { type } from "@testing-library/user-event/dist/type"
import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { store , RootState } from "../libs/store"

export default function Pointlock(){
  const overlaydom = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if (overlaydom) {
      overlaydom.current!.style.display= "none"
      overlaydom.current!.style.transform = "translate(-50%,-50%)"
    }
    store.subscribe(test)
  })

  const test = (()=>{
    overlaydom.current!.style.display= "flex"
  })


  const onClick =(event:any)=>{

  }

  const onLock =()=>{
    overlaydom.current!.style.display= "none"
  }

  const onUnlock =()=>{
    overlaydom.current!.style.display= "flex"
  }

  return (
    <PointerLockControls selector=".overlayBtn" onLock={(onLock)} onUnlock={(onUnlock)} >
        <Html className="playOverlay" ref={overlaydom}>
          <p className="overlayBtn">click me to continue play</p>
        </Html>
    </PointerLockControls>
  )
}