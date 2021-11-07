import { getDocumentosExpediente } from "services/totonet";
import MostrarDocumento from "./MostrarDocumento";

const { Component } = require("react");



class ExpedienteAplicante extends Component{


    constructor(){
        super();
        this.state = {
            mostrarCompleto : false,
            documentos : []
        }

        this.mostrarCompleto = this.mostrarCompleto.bind(this)
    }

    mostrarCompleto(){
        let data = {
            cui : this.props.cui
        }
        getDocumentosExpediente(data).then(resp => {
            this.setState({documentos : resp.data.documentos})
        }).catch(err => {
            console.log(err)
        })


        this.setState({mostrarCompleto : !this.state.mostrarCompleto})
    }

    render(){
        let { nombre, apellido, correo, direccion, fecha_aplicacion, cui, telefono, estado, puesto } = this.props
        return (
            <div
                style={
                    {
                        height: '100%',
                        backgroundColor:'#f9f9fc',
                        borderRadius:'5px',
                        boxShadow:'1.5px -1.5px #e4e4e4',
                        padding:'10px',
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent:'space-evenly',
                    }
                }
            >   
                <h4
                    style = {{
                        fontSize: "2em"
                    }}
                >{nombre} {apellido}</h4>
                <p><b>Correo:</b> {correo}</p>
                <p><b>Direccion:</b> {direccion}</p>
                <p><b>Fecha de la aplicación:</b> {fecha_aplicacion}</p>
                <p><b>CUI:</b> {cui}</p>
                <p><b>Telefono:</b> {telefono}</p>
                <p><b>Estado : </b> {estado}</p>
                <p><b>Puesto : </b> {puesto}</p>
                

                { this.state.mostrarCompleto && (

                    <div>
                        <h2>Requisitos</h2>
                        {
                            this.state.documentos.map( documento => {
                                return (
                                <div>
                                <p>{documento.nombre_requisito}</p>
                                <MostrarDocumento
                                    src = {documento.documento}
                                    ></MostrarDocumento>
                                </div>
                                )
                            })
                        }
                    </div>
                )}

                <button 
                    style={
                        {
                            backgroundColor:'#1864ca', 
                            color:'white', 
                            padding:'7px',
                            marginTop:'2px',
                            marginBottom: '6px',
                            borderRadius:'8px'
                        }
                    }
                    onMouseOver = {(e)=> {e.target.style.background='#2c7be6'}}
                    onMouseOut = {(e)=> {e.target.style.background='#1864ca'}}
                    onClick = {this.mostrarCompleto}
                > 
                    Mostrar Expediente Completo
                </button>
            </div>
        )
    }
}


export default ExpedienteAplicante