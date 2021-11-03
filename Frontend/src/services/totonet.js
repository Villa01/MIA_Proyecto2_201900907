
const urlApi = 'http://localhost:5000/'

const axios = require('axios')
export async function loginService(usuario, password){
    return fetch(`${urlApi}login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept : 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuario : usuario,
            password : password
        })
    })
}


export async function perfilService(usuario){
    return fetch(`${urlApi}perfil`, {
        method: 'POST',
        headers: {
            Accept : 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usuario : usuario
        })
    })
}

export async function enviarDatos(docs){

    return fetch(`${urlApi}mostarcarga`, {
        method: 'POST',
        body : docs
    })
}

export async function login2(usuario, password){
    return await axios.post(
        'http://localhost:5000/login', 
        {
            usuario: usuario,
            password: password
        }
    )
}

export async function autenticacion(token){
    return await axios.get(
        `${urlApi}pruebaDatos`,
        {
            headers: {
                'authorization': token
            }
        }
    )
}

export async function refrescarToken(token_refresco){
    return await axios.get(
        `${urlApi}refreshtoken`,
        {
            headers: {
                'authorization': token_refresco
            }
        }
    )
}

export async function getUsuarios(orden){
    return await axios.post(`${urlApi}usuarios`, orden)
}

export async function createUser(usuario){
    return await axios.post(`${urlApi}crearusuario`, usuario)
}

export async function eliminarUser(usuario){
    return await axios.post(`${urlApi}eliminarusuario`, usuario)
}

export async function buscarUsuario(usuario){
    return await axios.post(`${urlApi}buscarusuario`, usuario)
}

export async function editarUsuarioReq(usuario){
    return await axios.post(`${urlApi}editarusuario`, usuario)
}

export async function obtenerPuestos(){
    return await axios.get(`${urlApi}puestos`)
}

export async function filtrarPuestos(data){
    return await axios.post(`${urlApi}filtropuestos`, data)
}

export async function calificarPuesto(data){
    return await axios.post(`${urlApi}calificarPuesto`, data)
}

export async function enviarAplicacion(data){
    return await axios.post(`${urlApi}aplicacionpuesto`, data)
}

export async function upload(file){
    return await axios.post(`${urlApi}upload`, file)
}