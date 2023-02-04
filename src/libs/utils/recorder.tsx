import { useEffect, useRef, useState } from 'react';
import { MicFill, SquareFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { start, stop, selectRecorderbuffer, selectRecorder } from '../slices/RecorderSlice';
import { asyncPost } from './fetch';
import { encode } from 'base64-arraybuffer'
import React from 'react';


export const Recorder: React.FC<{ setBuffer: React.Dispatch<React.SetStateAction<string | undefined>>}> = (info: {setBuffer: React.Dispatch<React.SetStateAction<string | undefined>>}) => {

    const ref = useRef<HTMLDivElement>(null)
    const [recording, setRecording] = useState<boolean>(false)
    const [resText, setText] = useState<string>()
    const recorder = useSelector(selectRecorder)
    const buffer = useSelector(selectRecorderbuffer)
    const dispatch = useDispatch()
    const [id, setId] = useState<string>("id-")
    const [idDone, setIdDone] = useState<boolean>(false)

    const onClick = () => {
        if (recording) {
            dispatch(stop((buffer: ArrayBuffer) => {
                const out = encode(buffer)
                asyncPost('https://dev.ethci.org/dialog/audio', {
                    audio: out,
                    id: id
                }).then(res => {
                    if (res.audio.data.length == 0) {
                        return
                    }
                    let buffer = "data:audio/WAV;base64," + encode(res.audio.data)
                    setText(res.text)
                    console.log(res)
                    info.setBuffer(buffer)
                })
            }))
            console.log("stop")
        } else {
            dispatch(start())
            console.log("start")
        }
        setRecording(!recording)
        if (ref.current) {
            ref.current.style.backgroundColor = recording ? 'rgba(59,59,61,0.7)' : 'rgba(242,77,69,0.7)rgba(59,59,61,0.7)'
        }
    }

    const submit = () => {
        let User = (id.substring(3))
        if (User.length>0 && User.length<4) {
            setId(User)
            setIdDone(true)
        }else{
            alert("id cannot be empty")
        }
    }

    useEffect(() => {
    }, [useSelector(selectRecorderbuffer)])

    return (
        <>
            {
                !idDone ?
                    <div id="id">
                        <div id='id_input'>
                            <p>login</p>
                            <input type="text" value={id} onChange={(e) => {
                                if (e.target.value.startsWith('id-')) {
                                    let userID = e.target.value.substring(3)
                                    if (userID == "") {
                                        setId(e.target.value)
                                    }else if(!isNaN(parseFloat(userID)) && isFinite(Number(userID)) && userID.length<4){
                                        setId(e.target.value)
                                    }
                                }
                            }} />
                            <div id='submit' onClick={() => { submit() }}>
                                submit
                            </div>
                        </div>
                    </div>
                    : null
            }
            <div id="ARContainer">
                <div id="mic" ref={ref} onClick={() => { onClick() }} >
                    {
                        recording ?
                            <div id='recording'>
                                <SquareFill />
                            </div>
                            :
                            <div id='notRecording'>
                                <MicFill />
                            </div>
                    }
                </div>
                {
                    resText ?
                        <div id='resText'>{resText}</div>
                        :
                        null
                }
            </div>
        </>
    )
}

