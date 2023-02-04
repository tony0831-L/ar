import { ReactNode, useState } from "react";
import { Collision, Light, Model } from "../../libs/interfaces/worldInterfaces"
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';
import { useDispatch } from "react-redux";
import { setModelInfoByIndex } from "../../libs/slices/modelEditor";

export const ModelsEditor: React.FC<{
  model: Model[], Selector: React.Dispatch<React.SetStateAction<{ obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined>>
}> = (info: {
  model: Model[], Selector: React.Dispatch<React.SetStateAction<{ obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined>>
}) => {
    //todo 寫控制開關
    const [show, setShow] = useState<boolean>(false);
    const models: ReactNode = info.model.map((model, index) => {
      return <div key={model._id} className="editorDomChild" onClick={() => { info.Selector({ obj: model, index: index }) }} >{model.name}</div>
    })
    return (
      <div className="editorDomContainer" >
        <div onClick={() => { setShow(!show) }} className="editorDom">{show ? <ChevronDown /> : <ChevronRight />}models{show ? null : "(" + info.model.length + ")"}</div>
        {
          show ?
            models
            : null
        }
      </div>
    )
  }

export const ModelProps = (Obj: Model, index: number) => {

  const dispatch = useDispatch()
  const [Model, setModel] = useState<Model>(Obj);
  const [re, reload] = useState<boolean>(false);

  const update = () => {
    dispatch(setModelInfoByIndex({
      obj: Model,
      index: index
    }))
    reload(!re)
  }

  return (
    <div id="modelDom" className="propsDom">
      <div className="prop">_id: <p>{Obj._id}</p></div>
      <div className="prop">name: <input type="text" value={Obj.name} onChange={(e) => { Obj.name = e.target.value }} onBlur={()=>{update()}} /></div>
      <div className="prop">type: <input type="text" value={Obj.type} onChange={(e) => { Obj.type = e.target.value }} onBlur={()=>{update()}} /></div>
      <div className="prop">url: <input type="text" value={Obj.url} onChange={(e) => { Obj.url = e.target.value }} onBlur={()=>{update()}} /></div>
      <div className="prop">anime: <input type="text" value={Obj.anime ? Obj.anime : ""} onChange={(e) => { Obj.anime = e.target.value;update() }} onBlur={()=>{update()}} /></div>
      <div className="prop">scale: <input type="text" value={Obj.scale} onChange={(e) => { Obj.scale = e.target.value ;update()}} onBlur={()=>{update()}}/></div>
      <div className="ArrayProp">position: <input type="text" value={Obj.position[0]} onChange={(e) => { Obj.position = ([e.target.value, Obj.position[1], Obj.position[2]]); update() }} />,<input type="text" value={Obj.position[1]} onChange={(e) => { Obj.position = ([Obj.position[0], e.target.value, Obj.position[2]]); update() }} />,<input type="text" value={Obj.position[2]} onChange={(e) => { Obj.position = ([Obj.position[0], Obj.position[1], e.target.value]); update() }} /></div>
      <div className="ArrayProp">rotation: <input type="text" value={Obj.rotation[0]} onChange={(e) => { Obj.rotation = ([e.target.value, Obj.rotation[1], Obj.rotation[2]]); update() }} />,<input type="text" value={Obj.rotation[1]} onChange={(e) => { Obj.rotation = ([Obj.position[0], e.target.value, Obj.rotation[2]]); update() }} />,<input type="text" value={Obj.rotation[2]} onChange={(e) => { Obj.rotation = ([Obj.rotation[0], Obj.rotation[1], e.target.value]); update() }} /></div>
    </div>
  )
}