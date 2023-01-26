import { Light } from '../libs/worldInterfaces';

export const Lights: React.FC<{  lights: Light[] }> = (info: { lights: Light[] }) => {
    //todo 控制props更新
    const Light = info.lights.map((light: Light, index: number) => {
        switch (light.type) {
            case "AmbientLight":
                return <ambientLight intensity={light.intensity} position={light.position ? [light.position[0], light.position[1], light.position[2]] : [0, 0, 0]} color={light.color} key={index} />
                break;
            case "spotLight":
                return <spotLight castShadow={light.Shadow} intensity={light.intensity} position={light.position ? [light.position[0], light.position[1], light.position[2]] : [0, 0, 0]} color={light.color} key={index} />
                break;
            case "pointLight":
                return <pointLight castShadow={light.Shadow} intensity={light.intensity} position={light.position ? [light.position[0], light.position[1], light.position[2]] : [0, 0, 0]} color={"#ffffff"} key={index} />
                break;
            default:
                break;
        }
    })
    
    return (
        <>
            {Light}
        </>
    )
};
