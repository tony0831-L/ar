import { Stats } from "@react-three/drei"
import { LightsControl } from "../editor/lightsEditor"
import { ModelsControl } from "../editor/modelsEditor"

export const Ui: React.FC<{ progress:string }> = (info: { progress:string }) => {
  //todo 寫控制開關
    return (
      <div id="UI">
        <Stats />
        <LightsControl />
          <p>{info.progress}</p>
        <ModelsControl />
        <div id="editorOverlayBtn">
          click to control camera
        </div>
      </div>
    )
}

