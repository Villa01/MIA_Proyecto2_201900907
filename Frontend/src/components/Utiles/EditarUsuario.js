import { editarUsuarioReq } from "services/totonet";
import { buscarUsuario } from "services/totonet";

const { Component } = require("react");



class EditarUsuario extends Component { 


    constructor(){
        super();

        this.state = {
            nombre_usuario_buscar: '',
            nombre_usuario : '',
            cui : '',
            contrasenia : '',
            fecha_inicio : '',
            fecha_fin : '',
            nombre_departamento: '',
            nombre_rol : '',
            activo : 1,
            mostrar : false
        }

        this.editarUsuario = this.editarUsuario.bind(this)
        this.updateNombreUsuarioBuscar = this.updateNombreUsuarioBuscar.bind(this)
        this.buscarUsuario2 = this.buscarUsuario2.bind(this)
        this.updateNombre = this.updateNombre.bind(this)
        this.updateCUI = this.updateCUI.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.updateFechaInicio = this.updateFechaInicio.bind(this)
        this.updateDepartamento = this.updateDepartamento.bind(this)
        this.updateRol = this.updateRol.bind(this)
        this.updateFechaFin = this.updateFechaFin.bind(this)
        this.updateActivo = this.updateActivo.bind(this)
    }   

    editarUsuario() {
        let {nombre_usuario, cui, contrasenia, fecha_inicio, fecha_fin, nombre_departamento, nombre_rol, activo} = this.state
        let usuaro = {
            nombre_usuario,
            cui,
            contrasenia,
            fecha_inicio,
            fecha_fin,
            nombre_departamento,
            nombre_rol,
            activo
        }
        console.log(nombre_usuario)
        editarUsuarioReq(usuaro).then( resp => {
            alert("Usuario actualizado")
        }).catch( err => {
            alert("Hubo un problema, no se pudo actualizar")
        })
    }

    buscarUsuario2() {
        let usuario = {
            nombre_usuario: this.state.nombre_usuario_buscar
        }
        buscarUsuario(usuario).then( resp => {
            this.setState(resp.data)
            this.setState({mostrar:true})

            document.rolesForm.rol.value = resp.data.nombre_rol
            console.log(this.state)
        }).catch( err => {
            alert("No se pudo encontrar el usuario")
        })
    }

    updateActivo(e){
        this.setState({activo: e.target.value})
    }

    updateNombreUsuarioBuscar(e){
        this.setState({nombre_usuario_buscar: e.target.value})
    }

    updateNombre(e){
        this.setState({nombre_usuario: e.target.value});
    }

    updateCUI(e){
        this.setState({cui: e.target.value})
    }

    updatePassword(e){
        this.setState({contrasenia: e.target.value})
    }

    updateFechaInicio(e){
        this.setState({fecha_inicio: e.target.value})
    }

    updateFechaFin(e){
        this.setState({fecha_fin: e.target.value})
    }

    updateDepartamento(e){
        this.setState({nombre_departamento: e.target.value})
    }
    updateRol(e){
        this.setState({nombre_rol: e.target.value})
    }

    render(){
        return (

            <div className = "divide-x">
                <br></br>
                <div>
                    <h2>Editar usuario</h2>
                    <p>Inserte el nombre del usuario que desea editar.</p>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del usuario</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Nombre de usuario"
                        value = {this.state.nombre_usuario_buscar}
                        onChange = {this.updateNombreUsuarioBuscar}
                        ></input>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={this.buscarUsuario2}
                        >
                            Buscar usuario
                    </button>
                </div>
                {this.state.mostrar && (
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del usuario</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Nombre del usuario"
                        value = {this.state.nombre_usuario}
                        onChange = {this.updateNombre}
                    ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">CUI</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="CUI"
                        value = {this.state.cui}
                        onChange = {this.updateCUI}
                    ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Contraseña"
                        value = {this.state.contrasenia}
                        onChange = {this.updatePassword}
                    ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de inicio</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Fecha de inicio"
                        value = {this.state.fecha_inicio}
                        onChange = {this.updateFechaInicio}
                    ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de fin</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Fecha de fin"
                        value = {this.state.fecha_fin}
                        onChange = {this.updateFechaFin}
                    ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Departamento</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Departamento"
                        value = {this.state.nombre_departamento}
                        onChange = {this.updateDepartamento}
                    ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Activo</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Departamento"
                        value = {this.state.activo}
                        onChange = {this.updateActivo}
                    ></input>
                    
                    <form name="rolesForm" onChange={this.updateRol}>
                        <input type="radio" value="Administrador" name="rol" /> Administrador
                        <input type="radio" value="Coordinador" name="rol" /> Coordinador
                        <input type="radio" value="Revisor" name="rol" /> Revisor
                        <input type="radio" value="Aplicante" name="rol" /> Aplicante
                    </form>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={this.editarUsuario}
                    >
                            Editar Usuario
                    </button>

                </div>)
                }
                
            </div>

        )
    }
}

export default EditarUsuario;