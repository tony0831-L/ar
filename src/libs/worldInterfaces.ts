export interface lightInfo{
    decay: number
    type: string
    color: string
    intensity: number
    position : Array<number>
    Shadow:boolean
}

export class Light implements lightInfo{
    decay!: number
    type!: string
    color!: string
    intensity!: number
    position!: number[]
    Shadow!: boolean
    constructor(info:lightInfo){
        this.decay = info.decay
        this.type = info.type
        this.color = info.color
        this.intensity = info.intensity
        this.position = info.position
        this.Shadow = info.Shadow
    }
}

export interface modelInfo{
    type:string
    url: string
    scale:number
    position: Array<number>
    rotation: Array<number>
    name: string
    anime:string
}

export class Model implements modelInfo{
    type:string
    url!: string
    scale!: number
    position: Array<number>
    rotation!: Array<number>
    name!: string
    anime!: string
    constructor(info:modelInfo){
        this.type = info.type
        this.url = info.url
        this.scale = info.scale
        this.position = info.position
        this.rotation = info.rotation
        this.name = info.name
        this.anime = info.anime
    }
}


export interface collisionInfo{
    clickable:boolean,
    scale:Array<number>
    position:Array<number>
    rotation:Array<number>
    onClick:string
    onPointerOver:string
    onPointerOut:string
}

export class Collision implements collisionInfo{
    clickable =  false
    scale: number[]
    position: number[]
    rotation: number[]
    onClick = ""
    onPointerOver = ""
    onPointerOut = ""
    constructor(info:collisionInfo){
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