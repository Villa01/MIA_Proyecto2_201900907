import { eliminarUser } from "services/totonet";

const { Component } = require("react");


class EliminarUsuario extends Component {

    constructor(){
        super();
        this.state = {
            nombre_usuario: ''
        }
        this.eliminarUsuario = this.eliminarUsuario.bind(this)
        this.updateNombre = this.updateNombre.bind(this)
    }

    updateNombre(e){
        this.setState({nombre_usuario: e.target.value});
    }

    eliminarUsuario(){
        let usuario = {
            nombre_usuario : this.state.nombre_usuario
        }
        eliminarUser(usuario).then( resp => {
            alert("Usuario creado correctamente")
        }).catch( err => {
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <br></br>
                <h2>Eliminar usuario</h2>
                <p>Inserte el nombre del usuario que desea eliminar.</p>
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del usuario</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Nombre de usuario"
                        value = {this.state.nombre_usuario}
                        onChange = {this.updateNombre}
                    ></input>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={this.eliminarUsuario}
                    >
                            Eliminar usuario
                    </button>
            </div>
        )
    }
}


export default EliminarUsuario;