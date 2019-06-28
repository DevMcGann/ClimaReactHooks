import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'

function App() {
  //state principal
  const [ciudad, guardarCiudad] = useState();
  const [pais, guardarPais] = useState();
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  ///////////////////////////////UseEffect//////////////////////
  useEffect(() => {
    //prevenir ejecucion primera vez
    if (ciudad === '') return;

    const consultarAPI = async () => {
      const appId = '8e725aff42ac4f6e22938254d425ef4c';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

      //consultar url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);

    }

    consultarAPI();
  }, [ciudad, pais]);
  //////////////////////////////////////////////////////////////////////

  const datosConsulta = datos => {
    //validar campos llenos
    if (datos.ciudad === '' || datos.pais === '') {
      //error
      guardarError(true);
      return;
    }

    //si los campos son validos, se agregan al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }


  //cargar componente condicionalmente
  let componente;
  if (error) {
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="La ciudad no existe en nuestro registro" />
  } else {
    // Mostrar el Clima
    componente = <Clima
      resultado={resultado}
    />;
  }

  return (
    <div className="App">
      <Header
        titulo='Clima React-hooks'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
