import { GlbModel, GltfModel } from "../libs/modelLoader"
import { Suspense, useEffect, useState } from "react";
import { Html, Preload, useGLTF, useProgress } from "@react-three/drei"
import { useDispatch, useSelector } from 'react-redux'
import { Model } from "../libs/worldInterfaces";
import { store } from "../libs/store";
import { pushModel } from "../libs/slices/modelEditor";
import { selectAllModels, selectModelId } from "../libs/slices/modelEditor";
import Models from "./models";


// export const ModelsEditor: React.FC<{ models:Model[] , setLoading:React.Dispatch<React.SetStateAction<string>> }> = (info: { models:Model[] , setLoading:React.Dispatch<React.SetStateAction<string>> }) => {
//   function Loader() {
//     const { active, progress, item } = useProgress()
//     info.setLoading(`${progress}% loading: ${item}`)
//     return (
//       <></>
//     )
//   }

//   const model = info.models.map((obj:Model,index:number)=>{
//     switch (obj.type) {
//         case "GLB":
//             return <GlbModel url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name}  anime={obj.anime?obj.anime:undefined} key={index}/>
//             break;
//         case "GLTF":
//             return <GltfModel url={obj.url} scale={obj.scale} position={obj.position} rotation={obj.rotation} name={obj.name}  anime={obj.anime?obj.anime:undefined} key={index}/>
//             break;
//     }

//   })

//   return (
//     <Suspense fallback={<Loader />}>
//       {model}
//       <Preload all />
//     </Suspense>
//   )
// };


export const ModelsEditor: React.FC<{ setLoading: React.Dispatch<React.SetStateAction<string>> }> = (info: { setLoading: React.Dispatch<React.SetStateAction<string>> }) => {
  const Model = useSelector(selectAllModels)
  const [id, updateId] = useState<string>()
  useEffect(() => {
    console.log("model")
    updateId(id)
  }, [useSelector(selectModelId)])
  function Loader() {
    const { active, progress, item } = useProgress()
    info.setLoading(`${progress}% loading: ${item}`)
    return (
      <></>
    )
  }
  return (
    <>
      {
        Model.length > 0 ?
          <Models {...{ models: Model, loader: <Loader /> }} />
          : null
      }
    </>
  )
};


export const ModelsControl: React.FC<{}> = (info: {}) => {
  const dispatch = useDispatch()
  const push = () => {
    dispatch(pushModel())
    console.log("push")
  }
  return (
    <div id='lightsControl' onClick={() => {
      console.log("push")
      push()
    }}>
      push
    </div>
  )
};