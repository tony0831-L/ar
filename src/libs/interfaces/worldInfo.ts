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
    scale:number
    position: Array<number>
    rotation: Array<number>
    name: string
    anime:string | null
    onPointerOver:Function | null
    onPointerOut:Function | null
    onClick:Function | null
}

export interface collisionInfo{
    _id: string
    clickable:boolean,
    scale:Array<number>
    position:Array<number>
    rotation:Array<number>
    onClick:Function | null
    onPointerOver:Function | null
    onPointerOut:Function | null
    material:string | null
}

