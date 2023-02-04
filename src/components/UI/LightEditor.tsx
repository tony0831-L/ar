import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Collision, Light, Model } from "../../libs/interfaces/worldInterfaces"
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';
import { setLightInfoByIndex } from "../../libs/slices/lightEditor";

export const LightsEditor: React.FC<{
  light: Light[],
  Selector: React.Dispatch<React.SetStateAction<{ obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined>>
}
> = (info: {
  light: Light[],
  Selector: React.Dispatch<React.SetStateAction<{ obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined>>
}) => {
    //todo 寫控制開關
    const [show, setShow] = useState<boolean>(false);
    const lights: ReactNode = info.light.map((light, index) => {
      return <div key={light._id} className="editorDomChild" onClick={() => { info.Selector({ obj: light, index: index }) }} >{light.type}</div>
    })
    return (
      <div className="editorDomContainer">
        <div onClick={() => { setShow(!show) }} className="editorDom" >{show ? <ChevronDown /> : <ChevronRight />}lights{show ? null : "(" + info.light.length + ")"}</div>
        {
          show ?
            lights
            : null
        }
      </div>
    )
  }

export const LightProps = (Obj: Light,index:number) => {
  const dispatch = useDispatch()
  const [Light, setLight] = useState<Light>(Obj);
  const [re,reload] = useState<boolean>(false);
 
  const update =()=>{
    dispatch(setLightInfoByIndex({
      obj:Light,
      index:index
    }))
    reload(!re)
  }

  return (
    <div id="lightDom" className="propsDom">
      <div className="prop">_id: <p>{Obj._id}</p></div>
      <div className="prop">decay: <input type="text" value={Obj.decay} onChange={(e) => { Obj.decay = e.target.value }} onBlur={()=>{update()}}/></div>
      <div className="prop">type: <input type="text" value={Obj.type} onChange={(e) => { Obj.type = e.target.value }} onBlur={()=>{update()}} /></div>
      <div className="prop"><div className="colorBlock" style={{ backgroundColor: Obj.color }} />: <input type="text" value={Obj.color} onChange={(e) => { Obj.color = e.target.value ; update() }} onBlur={()=>{update()}} /></div>
      <div className="prop">intensity: <input type="text" value={Obj.intensity} onChange={(e) => { Obj.intensity = e.target.value ; update() }} onBlur={()=>{update()}}/></div>
      {
        Obj.type == "AmbientLight" ?
          null
          : <div className="ArrayProp">position: <input type="text" value={Obj.position[0]} onChange={(e) => { Obj.position = ([e.target.value, Obj.position[1], Obj.position[2]]) ; update() }} />,<input type="text" value={Obj.position[1]} onChange={(e) => { Obj.position =([Obj.position[0], e.target.value , Obj.position[2]]) ; update() }} />,<input type="text" value={Obj.position[2]} onChange={(e) => { Obj.position =([Obj.position[0], Obj.position[1], e.target.value]) ; update() }} /></div>
      }
      <div className="prop" onClick={() => { Obj.Shadow = !Obj.Shadow }}>Shadow: {Obj.Shadow ? "Shadow" : "no Shadow"}</div>
    </div>
  )
}