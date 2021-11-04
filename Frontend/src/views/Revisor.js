import React, { Component } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { autenticacion } from "services/totonet";
import Aplicante from "components/Utiles/Aplicante";
import { aplicantes } from "services/totonet";
import { obtenerNuevoToken } from "services/totonet";
import BuscarAplicante from "components/Utiles/BuscarAplicante";

class Revisor extends Component {

  constructor(){
    super();

    this.state = {
      mostrar: false,
      nombre : '',
      aplicantes: []
    }

    autenticacion(document.cookie.replace('access_token=', '')).then(res => {
      //alert(`Tokens autenticados para ${res.data.usuario}`)
        this.setState({nombre: res.data.usuario})
        
        aplicantes(this.state.nombre).then(resp => {
          this.setState({aplicantes: resp.data.aplicantes})
          this.setState({mostrar: true})
        }).catch( err => {
          obtenerNuevoToken()
        })
    }).catch( err => {
      obtenerNuevoToken()
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
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                          
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12" 
                  style = {{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'space-evenly'
                  }}
                  >
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
                      
                    >
                      Revisor: {this.state.nombre}
                    </h3>
                    <div  
                        style={
                          {
                            display:'grid',
                            gridGap:'5px',
                            gridTemplateColumns: 'repeat(4,auto)'
                          }
                        }>
                    {
                      this.state.mostrar && this.state.aplicantes.map( aplicante => {
                        return (
                        <Aplicante 
                          nombre={aplicante.nombre} 
                          apellido={aplicante.apellido} 
                          correo={aplicante.correo} 
                          direccion={aplicante.direccion} 
                          fecha_aplicacion = {aplicante.fecha_aplicacion} 
                          cui = {aplicante.cui} 
                          telefono = {aplicante.telefono} 
                          cv = {aplicante.cv}                           
                          usuario = {this.state.nombre}
                        ></Aplicante>
                        )
                      })
                    }
                    
                    </div>
                    <BuscarAplicante
                      usuario = {this.state.nombre}
                    ></BuscarAplicante>
                    <br></br>
                    <br></br>
                    <br></br>
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

export default Revisor;
