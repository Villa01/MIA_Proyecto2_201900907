import { filtrarPuestos } from "services/totonet";

const { Component } = require("react");



class BuscarPuesto extends Component{

    constructor(){
        super();
        this.state = {
            mostrar: false,
            parametro: '',
            puestos: [], 
            campo : ''
        }

        this.updateParametro = this.updateParametro.bind(this)
        this.updateCampo = this.updateCampo.bind(this)
        this.buscarPuestos = this.buscarPuestos.bind(this)
    }

    updateParametro(e){
        this.setState({parametro:e.target.value})
    }

    updateCampo(e){
        this.setState({campo:e.target.value})
    }

    buscarPuestos(){
        let data = {
            parametro: this.state.parametro,
            campo: this.state.campo
        }
        filtrarPuestos(data).then(resp => {
            console.log(resp.data.puestos)
            this.setState({puestos: resp.data.puestos})
            this.setState({mostrar: true})
        })
    }


    render(){
        return (
        <div>
            <div>
                <h2 className="font-semibold text-4xl text-blueGray-600">
                    Buscar un puesto
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
                <button
                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={this.buscarPuestos}
                    >Buscar puesto
                </button>
                <br></br>
            </div>
            <div onChange={this.updateCampo}>
                <p> Ordenar por : </p>
                    <input type="radio" value="puesto.nombre_puesto" name="orden" /> Nombre del Puesto
                    <input type="radio" value="puesto.salario" name="orden" /> Salario 
                    <input type="radio" value="departamento.nombre_departamento" name="orden" /> Departamento
                    <input type="radio" value="categoria.nombre_categoria" name="orden" /> Categoria

            </div>
            
        {
            this.state.mostrar && (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre del Puesto</th>
                            <th>Salario</th>
                            <th>Departamento</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.puestos.map( puesto => {
                                return (
                                    <tr>
                                        <td>{puesto.nombre_puesto}</td>
                                        <td>Q. {puesto.salario}</td>
                                        <td>{puesto.nombre_departamento}</td>
                                        <td>{puesto.nombre_categoria}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }
            
        </div>
        
        
        )
    }
}



export default BuscarPuesto