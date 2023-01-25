export interface light{
    type: string
    color: string
    intensity: number
    position : Array<number>
    Shadow:boolean
}

export interface model{
    type:string
    url: string
    scale:number
    position: Array<number>
    rotation: Array<number>
    name: string
    anime:string
}

export interface collision{
    clickable:boolean,
    scale:Array<number>
    position:Array<number>
    rotation:Array<number>
    onClick?:string
    onPointerOver?:string
    onPointerOut?:string
}

export interface worldinfo{
    lights:Array<light>
    models:Array<model>
    collisions:Array<collision>
}

export class world implements worldinfo{
    lights: light[] = []
    models: model[] = []
    collisions: collision[] = []
    constructor ( lights: light[] , models: model[] , collisions: collision[] ){
        this.lights = lights
        this.models = models
        this.collisions = collisions
    }
}