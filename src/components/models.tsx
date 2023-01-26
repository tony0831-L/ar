import { GlbModel, GltfModel } from "../libs/modelLoader"
import { Suspense, useState } from "react";
import { Html, Preload, useGLTF, useProgress } from "@react-three/drei"
import data from '../dataSet/test.json'
import { useDispatch, useSelector } from 'react-redux'
import { changeLoad } from '../libs/slices/loadSlice'
import { Model } from "../libs/worldInterfaces";


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


export const Models: React.FC<{models:Model[]}> = (info: {models:Model[]}) => {
  const model = info.models.map((obj:Model,index:number)=>{
    switch (obj.type) {
        case "GLB":
            return <GlbModel url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name}  anime={obj.anime?obj.anime:undefined} key={index}/>
            break;
        case "GLTF":
            return <GltfModel url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name}  anime={obj.anime?obj.anime:undefined} key={index}/>
            break;
    }

  })

  return (
    <Suspense fallback={<Loader />}>
      {model}
      <Preload all />
    </Suspense>
  )
};

export default Models