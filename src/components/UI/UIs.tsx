import { Stats } from "@react-three/drei"
import { Collision, Light, Model, World } from "../../libs/interfaces/worldInterfaces"
import { LightsEditor } from "./LightEditor"
import { ModelsEditor } from "./ModelEditor"
import { CollisionsEditor } from "./CollisionEditor"
import { EditorView } from "./EditorView"
import { useState } from "react"

export const Ui: React.FC<{ progress: string, world: World | undefined }> = (info: { progress: string, world: World | undefined }) => {
  const [select, Selector] = useState< {obj:Light , index:number} | {obj:Model , index:number} | {obj:Collision , index:number} >();
  return (
    <div id="EditorContainer">
      <div id="UI">
        <Stats />
        <p>{info.progress}</p>
        <LightsEditor light={info.world ? info.world.lights : []} Selector={Selector} />
        <ModelsEditor model={info.world ? info.world.models : []} Selector={Selector}/>
        <CollisionsEditor collision={info.world ? info.world.collisions : []} Selector={Selector}/>
        <div id="editorOverlayBtn" className="editorDom">
          click to control camera
        </div>
      </div>
      <EditorView Obj={select}/>
    </div>
  )
}

