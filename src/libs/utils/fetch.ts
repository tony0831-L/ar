
export async function asyncGet(api:string){
    const res:Response = await fetch(api,{
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'content-type': 'application/json'
        },
        mode: 'cors',
    })
    try {
            let data = res.json()
            return data
        } catch (error) {
            return res
    }
}

export async function asyncPost(api:string,body:{}){
    const res:Response = await fetch(api,{
        body:JSON.stringify(body),
        method: 'POST',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'content-type': 'application/json'
        },
        mode: 'cors',
    })
    try {
            let data = res.json()
            return data
        } catch (error) {
            return res
    }
}