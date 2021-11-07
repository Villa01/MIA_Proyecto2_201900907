import React, { Component } from "react";

import { getInfoAplicante } from "services/totonet";



class RevisionExpediente extends Component{

    constructor(props){
        super(props);
    
        this.state = {
          cui : window.localStorage.getItem('cuiaplicante'),
          nombre: '',
          apellido: '',
          correo : '',
          direccion : '',
          telefono: '',
          file: ''
        }
        this.updateNombre = this.updateNombre.bind(this)
        this.updateApellido = this.updateApellido.bind(this)
        this.updateCorreo = this.updateCorreo.bind(this)
        this.updateDireccion = this.updateDireccion.bind(this)
        this.updateTelefono = this.updateTelefono.bind(this)
        this.updateCui = this.updateCui.bind(this)
        this.getInfo = this.getInfo.bind(this)
        
        this.getInfo()
    
      }

    updateNombre(e){
        this.setState({nombre: e.target.value})
    }
  
    updateApellido(e){
        this.setState({apellido: e.target.value})
    }
  
    updateCorreo(e){
        this.setState({correo: e.target.value})
    }
  
    updateDireccion(e){
        this.setState({direccion: e.target.value})
    }
  
    updateTelefono(e){
        this.setState({telefono: e.target.value})
    }
  
    updateCui(e){
        this.setState({cui: e.target.value})
    }
  
    getInfo(){
      let info = {
        cui : this.state.cui
      }
  
      getInfoAplicante(info).then(resp => {
        let {  cui, nombre, apellido, correo, direccion, telefono } = resp.data.data
  
        this.setState({cui: cui})
        this.setState({nombre:nombre})
        this.setState({apellido: apellido})
        this.setState({correo: correo})
        this.setState({direccion: direccion})
        this.setState({telefono: telefono})
      }).catch( err => {
        console.log(err)
      })
    }

    
    render(){
        return(
            <div>
                <h2 className="font-semibold text-4xl text-blueGray-600">Revision del Expediente</h2>
                <h3>Sus datos: </h3>
                <p>A continuación puede modificar los datos de su aplicación. </p>
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del puesto al que desea aplicar</label>
                <label className="block text-gray-700 text-sm font-bold mb-2">CUI</label>
                <input 
                    readonly="readonly"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text"
                    placeholder="CUI"
                    value={this.state.cui}
                    onChange={this.updateCui}
                    ></input>
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombres</label>
                <input 
                    readonly="readonly"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text"
                    placeholder="Nombres"
                    value={this.state.nombre}
                    onChange={this.updateNombre}
                    ></input>

                <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos</label>
                <input 
                    readonly="readonly"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text"
                    placeholder="Apellidos"
                    value = {this.state.apellido}
                    onChange = {this.updateApellido}
                    ></input>
                <label className="block text-gray-700 text-sm font-bold mb-2">Correo electronico</label>
                <input 
                    readonly="readonly"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="email"
                    placeholder="correo@correo.com"
                    value={this.state.correo}
                    onChange={this.updateCorreo}
                    ></input>

                <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                <input 
                    readonly="readonly"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text"
                    placeholder="Dirección"
                    value={this.state.direccion}
                    onChange={this.updateDireccion}
                    ></input>

                <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                <input 
                    readonly="readonly"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="tel"
                    placeholder="Teléfono"
                    value={this.state.telefono}
                    onChange={this.updateTelefono}
                    ></input>

                <embed 
                    src={`http://localhost:5000/Files/4okoib0c540cb75550adf33f281f29132dddd14fded85bfc.pdf` }
                    width="100%" 
                    height="800px"
                />

            </div>
        )
    }
}




export default RevisionExpediente