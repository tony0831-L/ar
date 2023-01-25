import { useSelector } from 'react-redux'
import data from '../dataSet/test.json'
import { store } from '../libs/store'

interface light {
    type: string
    color: string
    intensity: number
    position?: Array<number>
    decay?: number
    Shadow?: boolean
}

export function Lights() {
    let info: Array<light>, light
    const unsubscribe = store.subscribe(() => {
        console.log(store.getState().worldinfo.info.lights)
        light = store.getState().worldinfo.info.lights.map((light, index) => {
            switch (light.type) {
                case "AmbientLight":
                    return <ambientLight intensity={light.intensity} position={light.position ? [light.position[0], light.position[1], light.position[2]] : [0, 0, 0]} color={light.color} key={index} />
                    break;
                case "spotLight":
                    return <spotLight castShadow={light.Shadow} intensity={light.intensity} position={light.position ? [light.position[0], light.position[1], light.position[2]] : [0, 0, 0]} color={light.color}  key={index} />
                    break;
                case "pointLight":
                    return <pointLight castShadow={light.Shadow} intensity={light.intensity} position={light.position ? [light.position[0], light.position[1], light.position[2]] : [0, 0, 0]} color={"#ffffff"}  key={index} />
                    break;
                default:
                    break;
            }
        })
    }
    )
    return (
        <>
            {light}
        </>
    )
};
