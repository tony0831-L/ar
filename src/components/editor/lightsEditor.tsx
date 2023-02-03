import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../libs/utils/store'
import { useEffect, useState } from 'react';
import { World, Light } from '../../libs/interfaces/worldInterfaces';
import { useFrame } from '@react-three/fiber';
import { Lights } from '../objs/lights';
import { selectAllLights , selectLightId } from '../../libs/slices/lightEditor';

export const LightsEditor: React.FC<{}> = () => {
    const Light = useSelector(selectAllLights)
    const [id, updateId] = useState<string>()
    useEffect(()=>{
        updateId(id)
    },[useSelector(selectLightId)])
    return (
        <>
            {
                Light.length > 0 ?
                    <Lights {...{lights: Light }} />
                    : null
            }
        </>
    )
};
