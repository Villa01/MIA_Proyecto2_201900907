const { Component } = require("react");


class MostrarDocumento extends Component{

    render(){
        let { src, width, height } = this.props
        return (
            <div>
                <embed 
                    src={`http://localhost:5000/Files/${src}` }
                    width={width? width : '100%'} 
                    height={height? height : '600px'} 
                />
            </div>
        )
    }
}



export default MostrarDocumento