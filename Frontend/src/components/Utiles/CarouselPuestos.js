import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { obtenerPuestos } from "services/totonet";
const { Component } = require("react");


class CarouselPuestos extends Component{


    constructor(){
        super();
        this.state = {
            puestos : []
        }
        this.getPuestos()

        this.getPuestos = this.getPuestos.bind(this)
    }


    getPuestos() {
        obtenerPuestos().then(resp => {
            this.setState({puestos: resp.data})
        })
    }

    imprimir(e){
        console.log(e.target.id)
    }



    render() {
        return (
        <div style={{width:'50%'}}>
        <h2 className="font-semibold text-4xl text-blueGray-600">
        Echa un vistazo a nuestros puestos!
        </h2>
        <br></br>
        <Carousel stopOnHover={true} infiniteLoop={true} dynamicHeight={true}showArrows={true} axis = 'horizontal'>
            {
                this.state.puestos.map( puesto => {
                    return (
                        <div onClick={this.imprimir} id={puesto.nombre_puesto}>
                            <p>Salario : {puesto.salario}</p>
                            <p>Departamento : {puesto.nombre_departamento}</p>
                            <p className="">{puesto.nombre_puesto}</p>
                            <img
                                alt="puesto" 
                                style={{maxWidth:'700px', maxHeight:'500px'}} 
                                src={puesto.imagen? puesto.imagen : 'https://i.stack.imgur.com/y9DpT.jpg'} />
                        </div>
                    )
                })
            }
            
        </Carousel>
        </div>
    )
    }
}

export default CarouselPuestos