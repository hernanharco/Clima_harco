import { useState, createContext } from "react";
import axios from "axios";

const ClimaContext = createContext();

const ClimaProvider = ({children}) => {

    // console.log(import.meta.env.VITE_API_KEY);

    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    });

    const [resultado, setResultado] = useState({});
    const [cargando, setcargando] = useState(false);
    const [noResultado, setNoResultado] = useState();

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    //Consultar la Api
    const consultarClima = async datos => {
        // console.log(datos);
        setcargando(true);
        setNoResultado(false);
        try {
            const { ciudad, pais } = datos

            const appId = import.meta.env.VITE_API_KEY
            
            const url=`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`

            // console.log(url);
            const { data } = await axios(url);
            // console.log(data[0]);
            const { lat, lon, state } = data[0];

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
            const {data: dataclima} = await axios(urlClima);
            // console.log(dataclima);
            setResultado(dataclima);            

        } catch (error) {
            setNoResultado('No hay Resultados');
        } finally {
            setcargando(false);
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                resultado,
                cargando,
                noResultado,
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext