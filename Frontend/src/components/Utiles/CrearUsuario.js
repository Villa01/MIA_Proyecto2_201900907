import { createUser } from "services/totonet";

const { Component } = require("react");



class CrearUsuario extends Component { 


    constructor(){
        super();

        this.state = {
            nombre_usuario : '',
            CUI : '',
            contrasenia : '',
            fecha_inicio : '',
            fecha_fin : '',
            departamento: '',
            rol : ''
        }
        
        this.crearUsuario = this.crearUsuario.bind(this)
        this.updateNombre = this.updateNombre.bind(this)
        this.updateCUI = this.updateCUI.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.updateFechaInicio = this.updateFechaInicio.bind(this)
        this.updateDepartamento = this.updateDepartamento.bind(this)
        this.updateRol = this.updateRol.bind(this)
    }

    crearUsuario() {
        let usuario = {
            nombre_usuario : this.state.nombre_usuario,
            CUI : this.state.CUI,
            contrasenia : this.state.contrasenia,
            fecha_inicio : this.state.fecha_inicio,
            departamento: this.state.departamento,
            rol : this.state.rol
        }
        createUser(usuario).then( resp => {
            alert("Usuario creado correctamente")
        }).catch( err => {
            console.log(err)
        })

    }

    updateNombre(e){
        this.setState({nombre_usuario: e.target.value});
    }

    updateCUI(e){
        this.setState({CUI: e.target.value})
    }

    updatePassword(e){
        this.setState({contrasenia: e.target.value})
    }

    updateFechaInicio(e){
        this.setState({fecha_inicio: e.target.value})
    }

    updateDepartamento(e){
        this.setState({departamento: e.target.value})
    }
    updateRol(e){
        this.setState({rol: e.target.value})
    }

    render(){
        return (
            <div className = "divide-x">
                <hr></hr>
                <br></br>
                <h2> Crear usuarios</h2>
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
                        value = {this.state.CUI}
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">Departamento</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Departamento"
                        value = {this.state.departamento}
                        onChange = {this.updateDepartamento}
                    ></input>
                    
                    <div onChange={this.updateRol}>
                        <input type="radio" value="Administrador" name="rol" /> Administrador
                        <input type="radio" value="Coordinador" name="rol" /> Coordinador
                        <input type="radio" value="Revisor" name="rol" /> Revisor
                        <input type="radio" value="Aplicante" name="rol" /> Aplicante
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" style={{backgroundColor:'#262a5b', color:'white', marginTop:'7px'}}
                        type="button"
                        onClick={this.crearUsuario}
                    >
                            Crear Usuario
                    </button>

                </div>
                
                <hr></hr>
                <br></br>
            </div>
        )
    }
}

export default CrearUsuario;