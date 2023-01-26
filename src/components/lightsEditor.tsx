import { useDispatch, useSelector } from 'react-redux'
import { store } from '../libs/store'
import { useEffect, useState } from 'react';
import { World, Light } from '../libs/worldInterfaces';
import { useFrame } from '@react-three/fiber';
import { Lights } from './lights';

export const LightsEditor: React.FC<{  lights: Light[] }> = (info: { lights: Light[] }) => {
    const [Light, setLight] = useState<Light[]>([])
    useEffect(()=>{
        setLight(store.getState().lightEditor.info)
        store.subscribe(()=>{
            let ans = false
            const temp = store.getState().lightEditor.info
            if (temp.length != Light.length) {
                setLight(temp)
                return
            }
            Light.map((light,index)=>{
                if(light._id != Light[index]._id){
                    ans = true
                }
            })
            if (ans){
                setLight(temp)
            }
        }) 
    })
    return (
        <>
            {
                Light.length>0?
                <Lights {...{ mode: "example", lights: Light }} />
                :null
            }
        </>
    )
};

