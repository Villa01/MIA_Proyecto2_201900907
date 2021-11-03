const { Component } = require("react");



class Aplicante extends Component{


    render(){
        let { nombre, apellido, correo, direccion, fecha_aplicacion, cui, telefono, cv } = this.props
        return (
            <div>
                <h1>{nombre} {apellido}</h1>
                <p>Correo: {correo}</p>
                <p>Direccion: {direccion}</p>
                <p>Fecha de la aplicación: {fecha_aplicacion}</p>
                <p>CUI: {cui}</p>
                <p>Telefono: {telefono}</p>
                <a href={cv} download> Visualizar curriculum</a>
            </div>
        )
    }
}


export default Aplicante