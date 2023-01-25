import { GlbModel,GltfModel } from "../libs/modelLoader"
import { Suspense } from "react";
import { Html, Preload, useProgress } from "@react-three/drei"
import data from '../dataSet/test.json'
import { useDispatch } from 'react-redux'
import { changeLoad } from '../libs/slices/loadSlice'
const models:Array<model> = data[0].models

interface model{
  type:string
  url:string
  scale:number
  position:Array<number>
  rotation:Array<number>
  name:string
  anime:string
}


function Loader() {
  const { active, progress, item } = useProgress()
  const dispatch = useDispatch()
  if(!active){
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

const Models = () => {

  const model = models.map((obj,index)=>{
    switch (obj.type) {
        case "GLB":
            return <GlbModel url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name}  anime={obj.anime?obj.anime:undefined} key={index}/>
            break;
        case "GLTF":
            return <GltfModel url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name}  anime={obj.anime?obj.anime:undefined} key={index}/>
            break;
    }
  })

  return(
    <Suspense  fallback={<Loader />}>
      {model}
      <Preload all />
    </Suspense>
  )
};


export default Models