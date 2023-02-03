import { ReactNode, useState } from "react";
import { Collision, Light, Model } from "../../libs/interfaces/worldInterfaces"
import { setLightInfo } from '../../libs/slices/lightEditor';
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';

export const CollisionsEditor: React.FC<{
  collision: Collision[],
  Selector: React.Dispatch<React.SetStateAction<{ obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined>>
}> = (info: {
  collision: Collision[],
  Selector: React.Dispatch<React.SetStateAction<{ obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined>>
}) => {
    //todo 寫控制開關
    const [show, setShow] = useState<boolean>(false);
    const collisions: ReactNode = info.collision.map((collision, index) => {
      return <div key={collision._id} className="editorDomChild" onClick={() => { info.Selector({ obj: collision, index: index }) }}>{collision._id}</div>
    })
    return (
      <div id="collisionDom" className="editorDomContainer">
        <div onClick={() => { setShow(!show) }} className="editorDom" >{show ? <ChevronDown /> : <ChevronRight />}collisions{show ? null : "(" + info.collision.length + ")"}</div>
        {
          show ?
            collisions
            : null
        }
      </div>
    )
  }

export const CollisionProps = (Obj: Collision) => {
  const [clickable, setClickable] = useState<boolean>(Obj.clickable);
  const [scale, setScale] = useState<number[]>(Obj.scale);
  const [position, setPosition] = useState<number[]>(Obj.position);
  const [rotation, setRotation] = useState<number[]>(Obj.rotation);
  const [material, setMaterial] = useState<string | null>(Obj.material?Obj.material:"transparent");
  return (
    <div id="collisionDom" className="propsDom">
      <div className="prop">_id: <p>{Obj._id}</p></div>
      <div className="prop">clickable: {clickable?<input type = "checkbox" checked onChange={()=>{setClickable(false)}} />:<input type = "checkbox" onChange={()=>{setClickable(true)}} />}</div>
      <div className="ArrayProp">scale: <input type="text" value={scale[0]} onChange={(e)=>{setScale([Number(e.target.value),scale[1],scale[2]])}}/>,<input type="text" value={scale[1]} onChange={(e)=>{setScale([scale[0],Number(e.target.value),scale[2]])}}/>,<input type="text" value={scale[2]} onChange={(e)=>{setScale([scale[0],scale[1],Number(e.target.value)])}}/></div>
      <div className="ArrayProp">position: <input type="text" value={position[0]} onChange={(e)=>{setPosition([Number(e.target.value),position[1],position[2]])}}/>,<input type="text" value={position[1]} onChange={(e)=>{setPosition([position[0],Number(e.target.value),position[2]])}}/>,<input type="text" value={position[2]} onChange={(e)=>{setPosition([position[0],position[1],Number(e.target.value)])}}/></div>
      <div className="ArrayProp">rotation: <input type="text" value={rotation[0]} onChange={(e)=>{setRotation([Number(e.target.value),rotation[1],rotation[2]])}}/>,<input type="text" value={rotation[1]} onChange={(e)=>{setRotation([rotation[0],Number(e.target.value),rotation[2]])}}/>,<input type="text" value={rotation[2]} onChange={(e)=>{setRotation([rotation[0],rotation[1],Number(e.target.value)])}}/></div>
      <div className="prop">material: <input type="text" value={material?material:"transparent"} onChange={(e)=>{setMaterial(e.target.value)}}/></div>
    </div>
  )
}