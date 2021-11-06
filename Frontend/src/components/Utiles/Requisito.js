import { obtenerNuevoToken } from "services/totonet";
import { subirRequisitos } from "services/totonet";
import { upload } from "services/totonet";


const { Component } = require("react");



class Requisito extends Component {


    constructor(props){
        super(props);

        this.state = {
            file : undefined
        }

        this.setFile = this.setFile.bind(this)
        this.enviar = this.enviar.bind(this)
    }

    setFile = async (e) => { 
        this.setState({ "file": e })
        const f = new FormData()
        f.append('file', e)
        
        this.setState({file: f})


    }

    enviar(){
        upload(this.state.file).then( resp => {
            let { path } = resp.data
            let data = {
                nombre_requisito : this.props.nombreRequisito,
                cui : this.props.cui,
                path
            }

            subirRequisitos(data).then( () => {
                alert('Requisitos enviados con éxito.')
            }).catch(err => {
                obtenerNuevoToken();
            })
        }).catch(err => {
            obtenerNuevoToken();
        })
    }

    render(){
        const { nombreRequisito, formatos } = this.props
        return (
            <div>
                <h2>{ nombreRequisito }</h2>
                <input 
                    type="file" 
                    name="file" 
                    accept= {formatos}
                    onChange={(e)=>this.setFile(e.target.files[0])}></input>
                <button 
                    onClick={this.enviar} 
                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" 
                    style={{backgroundColor:'#262a5b', color:'white'}}>Enviar</button>
            </div>
        )
    }
}


export default Requisito