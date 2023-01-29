import { modelInfo , lightInfo , collisionInfo } from "./interfaces/worldInfo"

export class Light implements lightInfo{
    _id!: string
    decay!: number
    type!: string
    color!: string
    intensity!: number
    position!: number[]
    Shadow!: boolean
    constructor(info:lightInfo){
        this._id = info._id
        this.decay = info.decay
        this.type = info.type
        this.color = info.color
        this.intensity = info.intensity
        this.position = info.position
        this.Shadow = info.Shadow
    }
    
}

export class Model implements modelInfo{
    _id: string
    type:string
    url!: string
    scale!: number
    position: Array<number>
    rotation!: Array<number>
    name!: string
    anime!: string
    constructor(info:modelInfo){
        this._id = info._id
        this.type = info.type
        this.url = info.url
        this.scale = info.scale
        this.position = info.position
        this.rotation = info.rotation
        this.name = info.name
        this.anime = info.anime
    }
}

export class Collision implements collisionInfo{
    _id: string
    clickable =  false
    scale: number[]
    position: number[]
    rotation: number[]
    onClick = ""
    onPointerOver = ""
    onPointerOut = ""
    constructor(info:collisionInfo){
        this._id = info._id
        this.clickable = info.clickable
        this.scale = info.scale
        this.position = info.position
        this.rotation = info.rotation
        this.onClick = info.onClick
        this.onPointerOver = info.onPointerOver
        this.onPointerOut = info.onPointerOver
    }
}

export interface worldinfo{
    lights:Array<Light>
    models:Array<Model>
    collisions:Array<Collision>
}

export class World implements worldinfo{
    lights: Light[] = []
    models: Model[] = []
    collisions: Collision[] = []
    constructor ( info:worldinfo ){
        this.setLights(info.lights)
        this.setModels(info.models)
        this.setCollisions(info.collisions)
    }
    private setLights(info:Array<lightInfo>){
        info.map(light=>{
            this.lights.push(new Light(
                {
                    _id: light._id,
                    decay: light.decay,
                    type: light.type,
                    color: light.color,
                    intensity: light.intensity,
                    position : light.position,
                    Shadow: light.Shadow,
                }
            ))
        })
    }
    private setModels(info:Array<modelInfo>){
        info.map(model=>{
            this.models.push(new Model(
                {
                    _id: model._id,
                    type:model.type,
                    url: model.url,
                    scale: model.scale,
                    position: model.position,
                    rotation: model.rotation,
                    name: model.name,
                    anime: model.anime
                }
            ))
        })
    }
    private setCollisions(info:Array<collisionInfo>){
        info.map(collision=>{
            this.collisions.push(new Collision(
                {
                    _id: collision._id,
                    clickable :  collision.clickable,
                    scale: collision.scale,
                    position: collision.position,
                    rotation: collision.rotation,
                    onClick : collision.onClick,
                    onPointerOver : collision.onPointerOver,
                    onPointerOut : collision.onPointerOut,
                }
            ))
        })
    }

    public clean():World{
        this.lights = []
        return this
    }
}