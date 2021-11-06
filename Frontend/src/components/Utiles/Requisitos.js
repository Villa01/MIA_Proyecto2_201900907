
import { obtenerNuevoToken } from "services/totonet";
import { obtenerRequisitos } from "services/totonet";
import Requisito from "./Requisito";

const { Component } = require("react");



class SubirRequisitos extends Component{

    constructor(props){
        super(props);
        this.state = {
            requisitos : [],
            cui : window.localStorage.getItem('cuiaplicante')
        }
        this.getRequisitos();
    }

    getRequisitos(){
        let data = {
            cui : this.state.cui
        }
        obtenerRequisitos(data).then(resp => {
            let r = resp.data.requisitos ? resp.data.requisitos : []
            this.setState({requisitos : r})
        }).catch( err => {
            obtenerNuevoToken()
        })
    }

    render(){
        return (
            <div>
                <h2 className="font-semibold text-4xl text-blueGray-600">Requisitos</h2>
                { 
                    
                        this.state.requisitos.map( requisito => {
                        return (
                            <div 
                            key = {requisito.nombre_requisito}>
                                <Requisito
                                    formatos = {requisito.formatos}
                                    nombreRequisito = {requisito.nombre_requisito}
                                    cui = {this.state.cui}
                                ></Requisito>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default SubirRequisitos;