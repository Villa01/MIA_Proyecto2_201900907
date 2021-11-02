//import { enviarDatos } from "services/totonet";

const axios = require('axios')
const { Component } = require("react");


class UploadComponent extends Component {

    info = ""
    constructor(){
        super();
        this.state = {}
    }

    setFile = async (e) => { 
        this.setState({ "file": e })
        const f = new FormData()
        f.append('file', e)
        
        this.setState({file: f})

        await axios.post('http://localhost:5000/mostarcarga', f).then( res => {
            console.log(res.data)
            this.setState({info:JSON.stringify(res.data, undefined, 2)})
        })
    }

    limpiar = () => {
        this.setState({info: ""})
    }

    enviar = async () => {
        console.log(this.state.file)
        await axios.post('http://localhost:5000/subirxml', this.state.file).then( res => {
            this.setState({info:JSON.stringify(res.data, undefined, 2)})
        })
    }

    render() {
        return (
            <div>
                <input type="file" name="file" onChange={(e)=>this.setFile(e.target.files[0])}></input>
                <button onClick={this.enviar}>Enviar</button>
                <div></div>
                <button onClick={this.limpiar}>Limpiar</button>
                <pre id ="json">
                    {this.state.info}
                </pre>
            </div>
        )
    }
}


export default UploadComponent;