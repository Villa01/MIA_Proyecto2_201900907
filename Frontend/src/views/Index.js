/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import CarouselPuestos from "components/Utiles/CarouselPuestos";
import BuscarPuesto from "components/Utiles/BuscarPuesto";
import CalificarPuesto from "components/Utiles/CalificarPuesto";
import AplicarPuesto from "components/Utiles/AplicarPuesto";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Bienvenido a Totonet
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                En esta plataforma tu podrás aplicar a nuestras vacantes y tener un seguimiento de tu proceso de reclutación.
              </p>
              <div className="mt-12">                
                <Link to="/auth/login"
                      className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Login
                </Link>
                
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
        />
      </section>
      <section 
        style={{display:'flex', justifyContent:'space-evenly'}}
      >
        
        <CarouselPuestos></CarouselPuestos>
      </section>
      <section 
        style={{display:'flex', justifyContent:'space-evenly'}}
      >
        <BuscarPuesto></BuscarPuesto>
      </section>
      <br></br>
      <section 
        style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}
      >
        <CalificarPuesto></CalificarPuesto>
      </section>
      <br></br>
      <section 
        style={{display:'flex', justifyContent:'space-evenly'}}
      >
        <AplicarPuesto></AplicarPuesto>
      </section>
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      

      

      <Footer />
    </>
  );
}
