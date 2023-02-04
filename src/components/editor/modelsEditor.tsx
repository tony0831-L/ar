import { GlbModel, GltfModel } from "../../libs/objClass/modelLoader"
import { Suspense, useEffect, useState } from "react";
import { Html, Preload, useGLTF, useProgress } from "@react-three/drei"
import { useDispatch, useSelector } from 'react-redux'
import { Model } from "../../libs/interfaces/worldInterfaces";
import { store } from "../../libs/utils/store";
import { selectAllModels, selectModelId } from "../../libs/slices/modelEditor";
import Models from "../objs/models";


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