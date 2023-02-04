import { ReactNode, useState } from "react";
import { Collision, Light, Model } from "../../libs/interfaces/worldInterfaces"
import { setLightInfo } from '../../libs/slices/lightEditor';
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';
import { useDispatch } from "react-redux";

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

export const CollisionProps = (Obj: Collision,index:number) => {
  const dispatch = useDispatch()
  const [Collision, setCollision] = useState<Collision>(Obj);
  const [re, reload] = useState<boolean>(false);

  const update = () => {
    // dispatch(setModelInfoByIndex({
    //   obj: Model,
    //   index: index
    // }))
    reload(!re)
  }

  return (
    <div id="collisionDom" className="propsDom">
      <div className="prop">_id: <p>{Obj._id}</p></div>
      <div className="prop">clickable: {Obj.clickable?<input type = "checkbox" checked onChange={()=>{Obj.clickable = false}} />:<input type = "checkbox" onChange={()=>{Obj.clickable = true}} />}</div>
      <div className="ArrayProp">scale: <input type="text" value={Obj.scale[0]} onChange={(e) => { Obj.scale = ([e.target.value, Obj.scale[1], Obj.scale[2]]); update() }} />,<input type="text" value={Obj.scale[1]} onChange={(e) => { Obj.scale = ([Obj.scale[0], e.target.value, Obj.scale[2]]); update() }} />,<input type="text" value={Obj.scale[2]} onChange={(e) => { Obj.scale = ([Obj.scale[0], Obj.scale[1], e.target.value]); update() }} /></div>
      <div className="ArrayProp">position: <input type="text" value={Obj.position[0]} onChange={(e) => { Obj.position = ([e.target.value, Obj.position[1], Obj.position[2]]); update() }} />,<input type="text" value={Obj.position[1]} onChange={(e) => { Obj.position = ([Obj.position[0], e.target.value, Obj.position[2]]); update() }} />,<input type="text" value={Obj.position[2]} onChange={(e) => { Obj.position = ([Obj.position[0], Obj.position[1], e.target.value]); update() }} /></div>
      <div className="ArrayProp">rotation: <input type="text" value={Obj.rotation[0]} onChange={(e) => { Obj.rotation = ([e.target.value, Obj.rotation[1], Obj.rotation[2]]); update() }} />,<input type="text" value={Obj.rotation[1]} onChange={(e) => { Obj.rotation = ([Obj.position[0], e.target.value, Obj.rotation[2]]); update() }} />,<input type="text" value={Obj.rotation[2]} onChange={(e) => { Obj.rotation = ([Obj.rotation[0], Obj.rotation[1], e.target.value]); update() }} /></div>
      <div className="prop">material: <input type="text" value={Obj.material?Obj.material:"transparent"} onChange={(e)=>{ Obj.material = e.target.value }}/></div>
    </div>
  )
}