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
        <div  style={{width:'50%'}}>
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
                <br></br>
                <br></br>
                <button
                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" style={{backgroundColor:'#262a5b', color:'white'}}
                    type="button"
                    onClick={this.buscarPuestos}
                    >Buscar puesto
                </button>
                <br></br>
            </div>
            <p> Buscar por : </p>
            <div onChange={this.updateCampo} style={{display:'flex', justifyContent:'space-between'}}>
                    <input type="radio" value="puesto.nombre_puesto" name="orden" /> Nombre del Puesto
                    <input type="radio" value="puesto.salario" name="orden" /> Salario 
                    <input type="radio" value="departamento.nombre_departamento" name="orden" /> Departamento
                    <input type="radio" value="categoria.nombre_categoria" name="orden" /> Categoria

            </div>
            
        {
            this.state.mostrar && (
                <table >
                    <thead style={{
                    borderBottom: 'solid 3px blue',
                    background: '#262a5b',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                        <tr style={{padding:'10px'}}>
                            <th style={{padding:'6px'}}>Nombre del Puesto</th>
                            <th style={{padding:'6px'}}>Salario</th>
                            <th style={{padding:'6px'}}>Departamento</th>
                            <th style={{padding:'6px'}}>Categoria</th>
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