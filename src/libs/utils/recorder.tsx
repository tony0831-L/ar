import { useEffect, useRef, useState } from 'react';
import { MicFill, SquareFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { start, stop, selectRecorderbuffer, selectRecorder } from '../slices/RecorderSlice';
import { asyncPost } from './fetch';
import { encode } from 'base64-arraybuffer'
import React from 'react';


export const Recorder: React.FC<{ setBuffer: React.Dispatch<React.SetStateAction<string | undefined>> }> = (info: { setBuffer: React.Dispatch<React.SetStateAction<string | undefined>> }) => {

    const ref = useRef<HTMLDivElement>(null)
    const [recording, setRecording] = useState<boolean>(false)
    const [resText, setText] = useState<string>()
    const recorder = useSelector(selectRecorder)
    const buffer = useSelector(selectRecorderbuffer)
    const dispatch = useDispatch()

    const onClick = () => {
        if (recording) {
            dispatch(stop((buffer: ArrayBuffer) => {
                const out = encode(buffer)
                asyncPost('https://dev.ethci.org/dialog/audio', {
                    audio: out,
                    id: "test"
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


    useEffect(() => {
    }, [useSelector(selectRecorderbuffer)])

    return (
        <>
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

