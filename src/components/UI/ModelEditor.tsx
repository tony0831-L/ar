import { ReactNode, useState } from "react";
import { Collision, Light, Model } from "../../libs/interfaces/worldInterfaces"
import { setLightInfo } from '../../libs/slices/lightEditor';
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';

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

export const ModelProps = (Obj: Model) => {
  const [name, setName] = useState<string>(Obj.name);
  const [type, setType] = useState<string>(Obj.type);
  const [url, setUrl] = useState<string>(Obj.url);
  const [anime, setAnime] = useState<string | null>(Obj.anime ? Obj.anime : "no anime");
  const [scale, setScale] = useState<number>(Obj.scale);
  const [position, setPosition] = useState<number[]>(Obj.position);
  const [rotation, setRotation] = useState<number[]>(Obj.rotation);
  
  return (
    <div id="modelDom" className="propsDom">
      <div className="prop">_id: <p>{Obj._id}</p></div>
      <div className="prop">name: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /></div>
      <div className="prop">type: <input type="text" value={type} onChange={(e) => { setType(e.target.value) }} /></div>
      <div className="prop">url: <input type="text" value={url} onChange={(e) => { setUrl(e.target.value) }} /></div>
      <div className="prop">anime: <input type="text" value={anime ? anime : "no Anime"} onChange={(e) => { setAnime(e.target.value) }} /></div>
      <div className="prop">scale: <input type="text" value={scale} onChange={(e) => { setScale(Number(e.target.value)) }} /></div>
      <div className="ArrayProp">position: <input type="text" value={position[0]} onChange={(e) => { setPosition([Number(e.target.value), position[1], position[2]]) }} />,<input type="text" value={position[1]} onChange={(e) => { setPosition([position[0], Number(e.target.value), position[2]]) }} />,<input type="text" value={position[2]} onChange={(e) => { setPosition([position[0], position[1], Number(e.target.value)]) }} /></div>
      <div className="ArrayProp">rotation: <input type="text" value={rotation[0]} onChange={(e) => { setRotation([Number(e.target.value), rotation[1], rotation[2]]) }} />,<input type="text" value={rotation[1]} onChange={(e) => { setRotation([rotation[0], Number(e.target.value), rotation[2]]) }} />,<input type="text" value={rotation[2]} onChange={(e) => { setRotation([rotation[0], rotation[1], Number(e.target.value)]) }} /></div>
    </div>
  )
}