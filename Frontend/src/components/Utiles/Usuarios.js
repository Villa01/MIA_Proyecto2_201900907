import { getUsuarios } from "services/totonet";

const { Component } = require("react");


class Usuarios extends Component {

    constructor(){
        super();
        this.state = {
            usuarios: [],
            mostrar : false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    async handleClick (){
        console.log("entre")
        await getUsuarios().then(resp => {
            console.log(resp.data)
            this.setState({usuarios: resp.data })
            this.setState({mostrar: true })
        })
        .catch(err => console.log(err))
    }

    

    render() {
        return (
            <div>
                <div><p>{this.state.mostrar}</p></div>
                <button className="btn btn-blue" onClick={this.handleClick}>Obtener usuarios</button>
                {this.state.mostrar && (<table>
                    <thead>
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>CUI</th>
                            <th>contrasenia</th>
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