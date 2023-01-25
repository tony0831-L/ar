import { Collision } from '../libs/collision'
import data from '../dataSet/test.json'
const collisions:Array<collision> = data[0].collisions

interface collision{
    clickable:boolean
    scale:Array<number>
    position:Array<number>
    rotation:Array<number>
}

const onClick = (event: any)=>{
    console.log("onClick")
    console.log(event)
}

const onPointerOver = (event:any)=>{
    console.log("onPointerOver")
    console.log(event)
}

const onPointerOut = (event:any)=>{
    console.log("onPointerOut")
    console.log(event)
}

const wall = collisions.map((wall,index)=>{
    switch (wall.clickable) {
        case true:
            return <Collision position={[wall.position[0],wall.position[1],wall.position[2]]} scale={[wall.scale[0],wall.scale[1],wall.scale[2]]} rotation={[wall.rotation[0],wall.rotation[1],wall.rotation[2]]} onClick={(event: any) => { onClick(event) } } onPointerOver={(event: any) => { onPointerOver(event) } } onPointerOut={(event: any) => { onPointerOut(event) } } key={index} ></Collision>
            break;
        case false:
            return <Collision position={[wall.position[0], wall.position[1], wall.position[2]]} scale={[wall.scale[0], wall.scale[1], wall.scale[2]]} rotation={[wall.rotation[0], wall.rotation[1], wall.rotation[2]]} onClick={()=>{}} onPointerOver={()=>{}} onPointerOut={()=>{}} key={index} ></Collision>
            break;
    }
  })
const Collisions = () => {
  return(
    <>
        {wall}
    </>
  )
};

export default Collisions