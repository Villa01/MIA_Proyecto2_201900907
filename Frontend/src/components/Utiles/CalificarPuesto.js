import { calificarPuesto } from "services/totonet";

const { Component } = require("react");




class CalificarPuesto extends Component {

    constructor(){  
        super();
        this.state = {
            calificacion : -1,
            nombre_puesto: ''
        }

        this.calificar = this.calificar.bind(this)
        this.updateCalificacion = this.updateCalificacion.bind(this)
        this.updateNombre = this.updateNombre.bind(this)
    }

    calificar(){
        let data = {
            calificacion : this.state.calificacion,
            nombre_puesto: this.state.nombre_puesto
        }
        calificarPuesto(data).then( resp => {
            alert('Calificaicon enviada')
        }).catch( err => {
            alert('Error al enviar la calificacion')
        })
    }

    updateNombre(e){
        this.setState({nombre_puesto : e.target.value})
    }

    updateCalificacion(e){
        this.setState({calificacion: e.target.value})
    }


    render(){
        return (
            <div style={{width:'50%'}}>
                <h2 className="font-semibold text-4xl text-blueGray-600">
                    Calificar un puesto
                </h2>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del puesto</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        placeholder="Nombre del puesto"
                        value = {this.state.nombre_puesto}
                        onChange = {this.updateNombre}
                        ></input>
                    <br></br>
                </div>
                <p> Buscar por : </p>
                <div onChange={this.updateCalificacion} style={{display:'flex', justifyContent:'space-evenly'}}>
                        <input type="radio" value="0" name="cal" /> 0 
                        <input type="radio" value="1" name="cal" /> 1 
                        <input type="radio" value="2" name="cal" /> 2 
                        <input type="radio" value="3" name="cal" /> 3 
                        <input type="radio" value="4" name="cal" /> 4 
                        <input type="radio" value="5" name="cal" checked/> 5 
                </div>
                
                <button
                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" style={{backgroundColor:'#262a5b', color:'white'}}
                    type="button"
                    onClick= {this.calificar}
                    >Calificar
                </button>
            </div>

            
        )
    }
}


export default CalificarPuesto;