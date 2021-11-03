import React, { useRef } from "react";
import { login2 } from "../../services/totonet";

export default function Login() {

  const usuarioRef = useRef();
  const passwordRef = useRef();

  async function comprobar(){


      await login2(usuarioRef.current.value, passwordRef.current.value).then( res => {
          const { mensaje, tipo, correcto, cred } = res.data

          // Guardar token de acceso en cookie
          document.cookie = `access_token=${cred.access_token}; max-age=${60*3}; path=/; samesite=strict`
          // Guardar el token de refresco
          window.localStorage.setItem('refresh_token', `refresh_token=${cred.refresh_token}`)
          console.log(document.cookie)
          alert(mensaje)          
          if ( correcto === true ){
            switch(tipo){
              case 1: 
                console.log("Es un admin")
                
                window.location.replace('/profile')
                break;
              case 2:
                console.log("Es un coordinador")
                break;
              case 3:
                console.log("Es un revisor")
                break;
              case 4:
                console.log("Es un aplicante")
                break;
              default:
                console.log("Tipo de usuario no reconocido")
            }
          }
      })

  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h6>Ingresa tus credenciales</h6>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre de usuario"
                      ref = {usuarioRef}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="contraseña"
                      ref = {passwordRef}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick = {comprobar}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
