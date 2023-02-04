import { Euler } from "three"

export interface lightInfo{
    _id: string
    decay: number|string
    type: string
    color: string
    intensity: number|string
    position : Array<number|string>
    Shadow:boolean
}


export interface modelInfo{
    _id: string
    type:string
    url: string
    scale:number|string
    position: Array<number|string>
    rotation: Array<number|string> 
    name: string
    anime:string | null
    onPointerOver:Function | null
    onPointerOut:Function | null
    onClick:Function | null
}

export interface collisionInfo{
    _id: string
    clickable:boolean,
    scale:Array<number|string>
    position:Array<number|string>
    rotation:Array<number|string>
    onClick:Function | null
    onPointerOver:Function | null
    onPointerOut:Function | null
    material:string | null
}

