import React, { Component } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { autenticacion } from "services/totonet";
import { obtenerNuevoToken } from "services/totonet";
import { upload } from "services/totonet";
import { getInfoAplicante } from "services/totonet";
import { updateAplicacion } from "services/totonet";

class AplicantePage extends Component {

  constructor(){
    super();

    this.state = {
      cui : '',
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

    autenticacion(document.cookie.replace('access_token=', '')).then(res => {
        this.setState({cui: res.data.usuario})
        this.getInfo();
    }).catch( err => {
      obtenerNuevoToken()
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


    console.log(cui)
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
  
  // Obtener los datos
  render(){
    return (  
      <div>
        <Navbar transparent />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://www.creativefabrica.com/wp-content/uploads/2020/02/04/Purple-Abstract-Webpage-Background-Graphics-1.jpg')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={require("assets/img/perfil.webp").default}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                          
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      </div>
                    </div>
                  </div>

                <div>
                  <h2 className="font-semibold text-4xl text-blueGray-600">Expendiente</h2>
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
                </div>
                  

                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
  );
  }
}

export default AplicantePage;
