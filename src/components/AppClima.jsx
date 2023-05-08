
import Formulario from "./Formulario"
import Resultado from "./Resultado"
import useClima from "../hooks/useClima"
import Loading from "./Loading";

function AppClima() {

    const { resultado, cargando, noResultado } = useClima();
    // console.log(resultado.name);


    return (
        <>
            <main className="dos-columnas">
                <Formulario />

                {cargando ? <Loading /> :
                    resultado?.name ? <Resultado /> :
                        noResultado ? <p>{noResultado}</p>
                            : <p>El clima se va a mostrar aquí</p>
                }

            </main>
        </>
    )
}

export default AppClima