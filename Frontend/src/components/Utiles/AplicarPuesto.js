const { Component } = require("react");



class AplicarPuesto extends Component{


    render(){
        return (
            <div style={{width:'50%'}}>
                <h2 className="font-semibold text-4xl text-blueGray-600">
                    Aplicar a un puesto
                </h2>
                <br></br>
                <form>
                    <label className="block text-gray-700 text-sm font-bold mb-2">CUI</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="CUI"
                        ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombres</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Nombres"
                        ></input>

                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Apellidos"
                        ></input>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo electronico</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="email"
                        placeholder="correo@correo.com"
                        ></input>

                    <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Dirección"
                        ></input>

                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="tel"
                        placeholder="Teléfono"
                        ></input>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Currículum vitae</label>
                        <input type="file" name="file"></input>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" style={{backgroundColor:'#262a5b', color:'white', marginTop:'7px'}}>Enviar</button>
                </form>
            </div>
            
        )
    }
}

export default AplicarPuesto