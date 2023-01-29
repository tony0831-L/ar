import { useDispatch, useSelector } from 'react-redux'
import { store } from '../libs/store'
import { useEffect, useState } from 'react';
import { World, Light } from '../libs/worldInterfaces';
import { useFrame } from '@react-three/fiber';
import { Lights } from './lights';
import { lightOff ,cleanLight } from '../libs/slices/lightEditor';
import { selectAllLights , selectLightId } from '../libs/slices/lightEditor';

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

export const LightsControl: React.FC<{}> = (info: {}) => {
    const dispatch = useDispatch()
    const clean = () => {
        dispatch(lightOff())
        console.log("click")
    }
    return (
        <div id='lightsControl' onClick={() => {
            console.log("click")
            clean()
        }}>
            cleanLight
        </div>
    )
};
