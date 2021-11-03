import { getUsuarios } from "services/totonet";

const { Component } = require("react");


class Usuarios extends Component {

    constructor(){
        super();
        this.state = {
            usuarios: [],
            mostrar : false, 
            order : 'nombre_usuario',
            filtro : undefined
        }
        this.handleClick = this.handleClick.bind(this)
        this.updateOrden = this.updateOrden.bind(this)
        this.updateFiltro = this.updateFiltro.bind(this)
    }

    async handleClick (){
        await getUsuarios({order: this.state.order, filtro: this.state.filtro}).then(resp => {
            this.setState({usuarios: resp.data })
            this.setState({mostrar: true })
        })
        .catch(err => console.log(err))
    }

    updateFiltro(e){
        this.setState({filtro: e.target.value})
    }

    updateOrden(e){
        this.setState({order: e.target.value})
    }
    

    render() {
        return (
            <div>
                <div><p>{this.state.mostrar}</p></div>
                
                <div>
                    <p>Valor para filtrar</p>
                    <input 
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="filtro"
                        value = {this.state.filtro}
                        onChange = {this.updateFiltro}

                    ></input>
                </div>
                <div onChange={this.updateOrden}>
                    <p> Ordenar por : </p>
                        <input type="radio" value="nombre_usuario" name="orden" /> Nombre Usuario
                        <input type="radio" value="cui" name="orden" /> CUI 
                        <input type="radio" value="contrasenia" name="orden" /> Contraseña
                        <input type="radio" value="fecha_inicio" name="orden" /> Fecha Inicio
                        <input type="radio" value="fecha_fin" name="orden" /> Fecha Fin
                        <input type="radio" value="activo" name="orden" /> Activo
                        <input type="radio" value="nombre_rol" name="orden" /> Rol
                        <input type="radio" value="nombre_departamento" name="orden" /> Departamento

                </div>
                <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" style={{backgroundColor:'#262a5b', color:'white', marginTop:'7px'}}
                        onClick={this.handleClick}>Obtener usuarios</button>
                {this.state.mostrar && (<table>
                    <thead>
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>CUI</th>
                            <th>Contraseña</th>
                            <th>fecha inicio</th>
                            <th>fecha fin</th>
                            <th>Activo </th>
                            <th>Rol </th>
                            <th>Departamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.usuarios.map( usuario => {
                                return (
                                    <tr>
                                        <td>{usuario.nombre_usuario}</td>
                                        <td>{usuario.cui}</td>
                                        <td>{usuario.contrasenia}</td>
                                        <td>{usuario.fecha_inicio}</td>
                                        <td>{usuario.fecha_fin}</td>
                                        <td>{usuario.activo}</td>
                                        <td>{usuario.nombre_rol}</td>
                                        <td>{usuario.nombre_departamento}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                )}
            </div>
        )
    }
}


export default Usuarios;