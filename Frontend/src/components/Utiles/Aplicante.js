import { obtenerNuevoToken } from "services/totonet";
import { modEstadoAplicante } from "services/totonet";

const { Component } = require("react");



class Aplicante extends Component{


    constructor(props){
        super(props);

        this.aceptar = this.aceptar.bind(this)
        this.rechazar = this.rechazar.bind(this)
    }

    aceptar(){
        let data = {
            cui : this.props.cui,
            estado: 'aceptado'
        }

        modEstadoAplicante(data).then( resp => {
            window.location.reload(false);
        }).catch( err => {
            obtenerNuevoToken();
        })
    }

    rechazar(){
        let data = {
            cui : this.props.cui,
            estado: 'rechazado'
        }

        modEstadoAplicante(data).then( resp => {
            window.location.reload(false);
        }).catch( err => {
            obtenerNuevoToken();
        })

    }


    render(){
        let { nombre, apellido, correo, direccion, fecha_aplicacion, cui, telefono, cv } = this.props
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
            }>
                <h1><b>{nombre} {apellido}</b></h1>
                <div
                style={
                    {
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        textAlign: 'initial'
                    }
                }
                >
                    <p><b>Correo:</b> {correo}</p>
                    <p><b>Direccion:</b> {direccion}</p>
                    <p><b>Fecha de la aplicación:</b> {fecha_aplicacion}</p>
                    <p><b>CUI:</b> {cui}</p>
                    <p><b>Telefono:</b> {telefono}</p>
                    <a 
                        href={cv} 
                        download
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
                    > Visualizar curriculum</a>
                </div>
                <div 
                style={
                    {
                        display: 'flex',
                        justifyContent:'space-evenly',
                        
                    }
                    }>
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
                    onClick = {this.aceptar}
                    >Aceptar</button>
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
                    onClick = {this.rechazar}        
                    >Rechazar</button>
                </div>

            </div>
        )
    }
}


export default Aplicante