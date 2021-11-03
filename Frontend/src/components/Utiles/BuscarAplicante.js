import { filtroAplicantes } from "services/totonet";
import Aplicante from "./Aplicante";

const { Component } = require("react");



class BuscarAplicante extends Component{

    constructor(props){
        super(props);
        this.state = {
            mostrar: false,
            parametro: '',
            aplicantes: [], 
            campo : ''
        }
        this.updateParametro = this.updateParametro.bind(this)
        this.updateCampo = this.updateCampo.bind(this)
        this.buscarAplicantes = this.buscarAplicantes.bind(this)
    }

    updateParametro(e){
        this.setState({parametro:e.target.value})
    }

    updateCampo(e){
        this.setState({campo:e.target.value})
    }

    buscarAplicantes(){
        let data = {
            parametro: this.state.parametro,
            campo: this.state.campo,
            usuario: this.props.usuario
        }
        filtroAplicantes(data).then( resp => {
            this.setState({aplicantes:resp.data.aplicantes})
            this.setState({mostrar: true})
        })
    }


    render(){
        return (
        <div  style={{width:'50%'}}>
            <div>
                <h2 className="font-semibold text-4xl text-blueGray-600">
                    Filtrar aplicantes
                </h2>
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
                    onClick={this.buscarAplicantes}
                    >Filtrar
                </button>
                <br></br>
            </div>
            <p> Buscar por : </p>
            <div onChange={this.updateCampo} style={{display:'flex', justifyContent:'space-between'}}>
                    <input type="radio" value="a.nombre" name="orden" /> Nombre del aplicante
                    <input type="radio" value="p.nombre_puesto" name="orden" /> Puesto 
                    <input type="radio" value="a.fecha_aplicacion" name="orden" /> Fecha de postulacion

            </div>
            
        {
            this.state.mostrar && this.state.aplicantes.map( aplicante => {
                return (
                    <Aplicante
                        nombre={aplicante.nombre} 
                        apellido={aplicante.apellido} 
                        correo={aplicante.correo} 
                        direccion={aplicante.direccion} 
                        fecha_aplicacion = {aplicante.fecha_aplicacion} 
                        cui = {aplicante.cui} 
                        telefono = {aplicante.telefono} 
                        cv = {aplicante.cv} 
                    ></Aplicante>
                )
            })
        }
            
        </div>
        
        
        )
    }

}



export default BuscarAplicante;