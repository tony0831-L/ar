export interface lightInfo{
    _id: string
    decay: number
    type: string
    color: string
    intensity: number
    position : Array<number>
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
    anime:string
}

export interface collisionInfo{
    _id: string
    clickable:boolean,
    scale:Array<number>
    position:Array<number>
    rotation:Array<number>
    onClick:string
    onPointerOver:string
    onPointerOut:string
}

