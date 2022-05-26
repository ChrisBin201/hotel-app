import jsCookie from 'js-cookie';

export const typeData ={
    json: 'JSON',
    formData: 'formData'
}
export default async function fetcher(url, method = 'GET', params = {}, bodyType = typeData.json) {
    // try {
        const token = jsCookie.get('token');
        
        var _header = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        var _header2 = new Headers()
        if (token) {
          _header.set("token",`${token}`)
          _header2.set("token",`${token}`)
        }
        else return
        if(method === 'GET') {
            const response = await fetch(url, {
                method: method,
                headers: _header
            })
            const data = await response.json()
            if (response.ok) {
                return data
            }
            // const error = new Error(response.statusText)
            // error['response'] = response
            // error['data'] = data
            // throw error
        }
        else{
            const response = await fetch(url, {
                method: method,
                headers: bodyType===typeData.json? _header : _header2 ,
                body: bodyType===typeData.json? JSON.stringify(params): params
            })
            console.log(response)
            const data = await response.json()
            if (response.ok) {
                return data
            }
        }
             
        return
    // } catch (error) {
    //     if (!error.data) {
    //         error.data = { message: error.message }
    //     }
    //     throw error
    // }
}
