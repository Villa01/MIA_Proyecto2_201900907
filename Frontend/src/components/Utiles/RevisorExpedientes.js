import { obtenerNuevoToken } from "services/totonet";
import { getExpedientesRevisor } from "services/totonet";
import ExpedienteAplicante from "./ExpedienteAplicante";

const { Component } = require("react");




class RevisorExpediente extends Component{


    constructor(props){
        super(props);

        this.state = {
            expedientes : [],
            usuario : window.localStorage.getItem('usuarioRevisor'),
            parametro : undefined,
            campo : undefined
        }

        this.getExpedientes = this.getExpedientes.bind(this)
        this.updateParametro = this.updateParametro.bind(this)
        this.updateCampo = this.updateCampo.bind(this)
        this.getExpedientes();
    }


    
    updateParametro(e){
        this.setState({parametro:e.target.value})
    }

    updateCampo(e){
        this.setState({campo:e.target.value})
    }

    getExpedientes(){
        let data = {
            usuario : this.state.usuario,
            parametro : this.state.parametro,
            campo : this.state.campo
        }

        getExpedientesRevisor(data).then( resp => {
            let { expedientes } = resp.data


            this.setState({expedientes: expedientes})
        }).catch( err => {
            obtenerNuevoToken();
        })
    }



    render(){
        
        return (
            <div>
                <h2 className="font-semibold text-4xl text-blueGray-600">Expedientes</h2>
                <div>
                    <br></br>
                    <div>
                        <h3 className="font-normal text-4xl text-blueGray-600">
                            Filtrar Expedientes
                        </h3>
                        <p>Inserte el parametro que desea usar para la busqueda</p>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Parametro</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="text"
                            placeholder="Parametro"
                            value = {this.state.parametro}
                            onChange= {this.updateParametro}
                            ></input>
                        <br></br>
                        <br></br>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" style={{backgroundColor:'#262a5b', color:'white'}}
                            type="button"
                            onClick={this.getExpedientes}
                            >Filtrar
                        </button>
                        <br></br>
                    </div>
                    <p> Buscar por : </p>
                    <div onChange={this.updateCampo} style={{display:'flex', justifyContent:'space-between'}}>
                        <input type="radio" value="a.nombre" name="orden" /> Nombre
                        <input type="radio" value="p.nombre_puesto" name="orden" /> Puesto 
                        <input type="radio" value="e.estado" name="orden" /> Estado
                    </div>
                </div>
                <br></br>
                <div
                >
                    {
                        this.state.expedientes.map( expediente => {
                            return (
                                <div>
                                    <ExpedienteAplicante
                                        key = {expediente.cui}
                                        apellido = {expediente.apellido}
                                        correo = {expediente.correo}
                                        cui = {expediente.cui}
                                        cv = {expediente.cv}
                                        direccion = {expediente.direccion}
                                        estado = {expediente.estado}
                                        fecha_aplicacion = {expediente.fecha_aplicacion}
                                        nombre = {expediente.nombre}
                                        telefono = {expediente.telefono}
                                        puesto = {expediente.nombre_puesto}
                                    ></ExpedienteAplicante>
                                </div>
                                
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}


export default RevisorExpediente;