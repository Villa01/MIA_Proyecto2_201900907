import React, { Component } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import EnvioExpediente from "components/Utiles/EnvioExpediente";
import { autenticacion } from "services/totonet";
import { obtenerNuevoToken } from "services/totonet";
import { getEstadoExpediente } from "services/totonet";
import RevisionExpediente from "components/Utiles/RevisionExpediente";

class AplicantePage extends Component {

  constructor(){
    super();
   
    this.state = {
      mostrarEnviarExpediente : false
    }

    
    autenticacion(document.cookie.replace('access_token=', '')).then(res => {
        this.setState({cui: res.data.usuario})
        window.localStorage.setItem('cuiaplicante', res.data.usuario)
        this.EstadoExpediente();
    }).catch( err => {
      obtenerNuevoToken()
    })
  }


  EstadoExpediente(){
    let data = {
      cui : this.state.cui
    }
    getEstadoExpediente(data).then( resp => {
      
      let { estado } = resp.data.data

      console.log( resp)
      this.setState({mostrarEnviarExpediente : estado === 'pendiente'? true : false})
      console.log(this.state.mostrarEnviarExpediente)
    }).catch( err => {
      console.log(err)
    })
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
                  </div>
                  <div >
                    <div>
                      {
                        this.state.mostrarEnviarExpediente && (
                          <EnvioExpediente
                            cui = {this.state.cui}
                          ></EnvioExpediente>
                        )
                      }
                    </div>

                    <div 
                    style = {{
                      minHeight:"1000px"
                    }}
                    >
                      {
                        !this.state.mostrarEnviarExpediente && (
                          <RevisionExpediente
                            cui = {this.state.cui}
                          ></RevisionExpediente>
                        )
                      }
                    </div>
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
