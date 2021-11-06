import { agregarRequisitoExpediente } from "services/totonet";
import { upload } from "services/totonet";
import { enviarAplicacion } from "services/totonet";

const { Component } = require("react");



class AplicarPuesto extends Component{

    constructor(){
        super();

        this.state = {
            puesto: '',
            cui : '',
            nombre: '',
            apellido: '',
            correo : '',
            direccion : '',
            telefono: '',
            file: '',
            mostrarRequisitos : false

        }

        this.updateNombre = this.updateNombre.bind(this)
        this.updateApellido = this.updateApellido.bind(this)
        this.updateCorreo = this.updateCorreo.bind(this)
        this.updateDireccion = this.updateDireccion.bind(this)
        this.updateTelefono = this.updateTelefono.bind(this)
        this.updateCui = this.updateCui.bind(this)
        this.enviar = this.enviar.bind(this)
        this.updatePuesto = this.updatePuesto.bind(this)
    }

    updatePuesto(e){
        this.setState({puesto: e.target.value})
    }

    updateNombre(e){
        this.setState({nombre: e.target.value})
    }

    updateApellido(e){
        this.setState({apellido: e.target.value})
    }

    updateCorreo(e){
        this.setState({correo: e.target.value})
    }

    updateDireccion(e){
        this.setState({direccion: e.target.value})
    }

    updateTelefono(e){
        this.setState({telefono: e.target.value})
    }

    updateCui(e){
        this.setState({cui: e.target.value})
    }

    enviar(){
        let { puesto, nombre, apellido, correo, direccion, telefono, cui, file } = this.state



        if(cui.length < 13 || isNaN(cui)){
             alert('El valor del cui no es valido')
             return 
        }
        upload(file).then(resp => {
            let { path } = resp.data
            let data = {
                puesto, 
                nombre,
                apellido,
                correo,
                direccion, 
                telefono,
                cui, 
                file : path
            }
            enviarAplicacion(data).then(resp => {
                console.log(resp)
                let info = {
                    cui,
                    puesto
                }
                agregarRequisitoExpediente(info).then(() => {
                    alert('Aplicación enviada, nos estaremos comunicando con usted')
                }).catch(err => {
                    alert('No se pudo ingresar su aplicación al puesto')
                })
            }).catch(err => {
                alert('No se pudo ingresar su aplicación al puesto')
            })
        }).catch( err => {
            console.log(err)
        })


    }

    setFile = async (e) => { 
        this.setState({file : e})
        const f = new FormData()
        f.append('file', e)
        this.setState({file: f})
    }


    render(){
        return (
            <div style={{width:'50%'}}>
                <h2 className="font-semibold text-4xl text-blueGray-600">
                    Aplicar a un puesto
                </h2>
                <br></br>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del puesto al que desea aplicar</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Puesto"
                        value={this.state.puesto}
                        onChange={this.updatePuesto}
                        ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">CUI</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="CUI"
                        value={this.state.cui}
                        onChange={this.updateCui}
                        ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombres</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Nombres"
                        value={this.state.nombre}
                        onChange={this.updateNombre}
                        ></input>

                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Apellidos"
                        value = {this.state.apellido}
                        onChange = {this.updateApellido}
                        ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo electronico</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="email"
                        placeholder="correo@correo.com"
                        value={this.state.correo}
                        onChange={this.updateCorreo}
                        ></input>

                    <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Dirección"
                        value={this.state.direccion}
                        onChange={this.updateDireccion}
                        ></input>

                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="tel"
                        placeholder="Teléfono"
                        value={this.state.telefono}
                        onChange={this.updateTelefono}
                        ></input>

                    <div>
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2"                        
                        >Currículum vitae</label>
                        <input type="file" name="file" onChange={(e)=>this.setFile(e.target.files[0])}></input>
                    </div>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                        style={{backgroundColor:'#262a5b', color:'white', marginTop:'7px'}}
                        onClick={this.enviar}
                    >Enviar</button>
            </div>
            
        )
    }
}

export default AplicarPuesto