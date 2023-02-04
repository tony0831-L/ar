import { ReactNode, useState } from "react";
import { Light, Model, Collision } from "../../libs/interfaces/worldInterfaces";
import { LightProps } from "./LightEditor";
import { ModelProps } from "./ModelEditor";
import { CollisionProps } from "./CollisionEditor";

export const EditorView: React.FC<{
    Obj: { obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined
}> = (info: {
    Obj: { obj: Light, index: number } | { obj: Model, index: number } | { obj: Collision, index: number } | undefined
}) => {
        const Obj: React.FC<{ Obj: Light | Model | Collision | undefined , index:number }> = (info: { Obj: Light | Model | Collision | undefined , index:number }) => {
            if (info.Obj instanceof Light) {
                return LightProps(info.Obj , info.index)
            }
            if (info.Obj instanceof Model) {
                return ModelProps(info.Obj , info.index)
            }
            if (info.Obj instanceof Collision) {
                return CollisionProps(info.Obj , info.index)
            }
            return (
                <></>
            )
        }

        return (
            <div id="EditorView">
                {
                    info.Obj ?
                        <Obj Obj={info.Obj.obj} index={info.Obj.index} />
                        :
                        <div>
                            Select an object from left Menu to edit its properties.
                        </div>
                }
            </div>
        )
    }