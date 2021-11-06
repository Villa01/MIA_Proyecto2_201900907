import React, { Component } from "react";

import { obtenerNuevoToken } from "services/totonet";
import { upload } from "services/totonet";
import { getInfoAplicante } from "services/totonet";
import { updateAplicacion } from "services/totonet";
import SubirRequisitos from "components/Utiles/Requisitos";
import { setExtadoExpediente } from "services/totonet";


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
    this.enviar = this.enviar.bind(this)
    this.getInfo = this.getInfo.bind(this)
    this.enviarExpediente = this.enviarExpediente.bind(this)
    
    this.getInfo()

  }

  enviarExpediente(){
    let data = {
      cui : this.state.cui,
      estado : 'enviado'
    }
    setExtadoExpediente(data).then( () => {
      window.location.replace('/')
      alert('Expediente enviado correctamente')
      
    }).catch( err => {
      
      alert('Hubo un problema al enviar el expediente')
    })
  }
  
  setFile = async (e) => { 
    this.setState({file : e})
    const f = new FormData()
    f.append('file', e)
    this.setState({file: f})
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

    enviar(){
        let { nombre, apellido, correo, direccion, telefono, cui, file } = this.state
  
      if(cui.length < 13 || isNaN(cui)){
            alert('El valor del cui no es valido')
            return 
      }
      if(file) {
        upload(file).then(resp => {
          let { path } = resp.data
          let data = {
              nombre,
              apellido,
              correo,
              direccion, 
              telefono,
              cui, 
              cv : path
          }
          updateAplicacion(data).then(resp => {
              alert('Se actualizaron los datos')
          }).catch(err => {
            obtenerNuevoToken()
          })
        }).catch( err => {
          obtenerNuevoToken()
        })
      } else {
        let data = {
          nombre,
          apellido,
          correo,
          direccion, 
          telefono,
          cui
      }
        updateAplicacion(data).then(resp => {
          alert('Se actualizaron los datos')
        }).catch(err => {
          obtenerNuevoToken()
        })
      }  
  }


  render(){
      return (

          <div>
          <h2 className="font-semibold text-4xl text-blueGray-600">Expediente</h2>
          <h3>Modificar datos: </h3>
          <p>A continuación puede modificar los datos de su aplicación. </p>
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del puesto al que desea aplicar</label>
          <label className="block text-gray-700 text-sm font-bold mb-2">CUI</label>
          <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text"
              placeholder="CUI"
              value={this.state.cui}
              onChange={this.updateCui}
              ></input>
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombres</label>
          <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text"
              placeholder="Nombres"
              value={this.state.nombre}
              onChange={this.updateNombre}
              ></input>

          <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos</label>
          <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text"
              placeholder="Apellidos"
              value = {this.state.apellido}
              onChange = {this.updateApellido}
              ></input>
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo electronico</label>
          <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="email"
              placeholder="correo@correo.com"
              value={this.state.correo}
              onChange={this.updateCorreo}
              ></input>

          <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
          <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text"
              placeholder="Dirección"
              value={this.state.direccion}
              onChange={this.updateDireccion}
              ></input>

          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
          <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="tel"
              placeholder="Teléfono"
              value={this.state.telefono}
              onChange={this.updateTelefono}
              ></input>

          <div>
              <label 
                  className="block text-gray-700 text-sm font-bold mb-2"                        
              >Currículum vitae</label>
              <input type="file" name="file" onChange={(e)=>this.setFile(e.target.files[0])}></input>
          </div>
          <button 
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              style={{backgroundColor:'#262a5b', color:'white', marginTop:'7px'}}
              onClick={this.enviar}
          >Modificar datos</button>

          
          <SubirRequisitos
          cui = {this.state.cui} 
          ></SubirRequisitos>

            <button 
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              style={{backgroundColor:'#262a5b', color:'white', marginTop:'7px'}}
              onClick={this.enviarExpediente}
            >Enviar Expediente</button>
            <br></br><br></br><br></br>
          </div>
      
      )
  }
}


export default RevisionExpediente;