import { rechazarRequisito } from "services/totonet";
import { aceptarRequisito } from "services/totonet";
import { enviarExpedienteService } from "services/totonet";
import { obtenerNuevoToken } from "services/totonet";
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
        this.rechazarDocumento = this.rechazarDocumento.bind(this)
        this.aceptarDocumento = this.aceptarDocumento.bind(this)
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

    aceptarDocumento(codigo_expediente, codigo_requisito){
        let data = {
            codigo_requisito,
            codigo_expediente
        }

        aceptarRequisito(data).then( resp => {
            alert(resp.data.msg)
        }).catch(err => {
            obtenerNuevoToken();
        })

    }

    rechazarDocumento(codigo_expediente, codigo_requisito){
        let detalle = prompt('Ingrese el motivo por el cuál se rechaza el documento')
        let data = {
            detalle, 
            codigo_requisito,
            codigo_expediente
        }

        rechazarRequisito(data).then( () => {
            alert('Documento rechazado')
        }).catch(err => {
            obtenerNuevoToken();
        })
    }

    enviarExpediente(cui) {
        let data = {
            cui
        }

        enviarExpedienteService(data).then(resp => {
            alert(resp.msg)
        }).catch(
            obtenerNuevoToken()
        )
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
                                    <div>
                                    <button 
                                        style={
                                            {
                                                backgroundColor:'#db1313', 
                                                color:'white', 
                                                padding:'8px',
                                                borderRadius:'8px'
                                            }
                                        
                                        }
                                        
                                        onMouseOver = {(e)=> {e.target.style.background='#db1313'}}
                                        onMouseOut = {(e)=> {e.target.style.background='#f12a2a'}}           
                                        onClick = {()=>{this.rechazarDocumento(documento.codigo_expediente, documento.codigo_requisito)}}        
                                    >
                                        Rechazar
                                    </button>
                                    </div>
                                    <button 
                                        style={
                                            {
                                                backgroundColor:'#30b40f', 
                                                color:'white', 
                                                padding:'8px',
                                                borderRadius:'8px'
                                            }
                                        }
                                        onMouseOver = {(e)=> {e.target.style.background='#35c411'}}
                                        onMouseOut = {(e)=> {e.target.style.background='#30b40f'}}
                                        onClick = {()=>{this.aceptarDocumento(documento.codigo_expediente, documento.codigo_requisito)}}
                                    >Aceptar</button>
                                    <hr></hr>
                                    <br></br>
                                </div>
                                )
                            })
                        }
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
                    onClick = {() => { this.enviarExpediente(cui)}}
                > 
                    Enviar Expediente
                </button>
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