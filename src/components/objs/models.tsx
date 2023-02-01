import { GlbModel, GltfModel } from "../../libs/objClass/modelLoader"
import { ReactNode, Suspense, useState } from "react";
import { Html, Preload, useGLTF, useProgress } from "@react-three/drei"
import { useDispatch, useSelector } from 'react-redux'
import { changeLoad } from '../../libs/slices/loadSlice'
import { Model } from "../../libs/interfaces/worldInterfaces";

function Loader() {
  const { active, progress, item } = useProgress()
  const dispatch = useDispatch()
  if (!active) {
    dispatch(changeLoad(true))
  }
  return (
    <Html>
      <div id="container">
        <p>Loading items</p>
        <progress id="progress" max="100" value={progress}></progress>
        <label id="label" htmlFor="progress">Loading:{item}</label>
      </div>
    </Html>
  )
}

export const Models: React.FC<{ models:Model[] , loader?:ReactNode }> = (info: { models:Model[] , loader?:ReactNode }) => {
  const model = info.models.map((obj:Model,index:number)=>{
    switch (obj.type) {
        case "GLB":
            return <GlbModel type={obj.type} _id={obj._id} url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name} anime={obj.anime ? obj.anime : null} key={index} onPointerOver={obj.onPointerOver?obj.onPointerOver:null} onPointerOut={obj.onPointerOut?obj.onPointerOut:null} onClick={obj.onClick?obj.onClick:null}/>
            break;
        case "GLTF":
            return <GltfModel type={obj.type} _id={obj._id} url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name} anime={obj.anime ? obj.anime : null} key={index} onPointerOver={obj.onPointerOver?obj.onPointerOver:null} onPointerOut={obj.onPointerOut?obj.onPointerOut:null} onClick={obj.onClick?obj.onClick:null}/>
            break;
    }

  })

  return (
    <Suspense fallback={info.loader?info.loader:<Loader/>}>
      {model}
      <Preload all />
    </Suspense>
  )
};

export default Models