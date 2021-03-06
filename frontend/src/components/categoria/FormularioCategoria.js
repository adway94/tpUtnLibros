import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

export default function FormularioCategoria() {
  let match = useRouteMatch("/categorias/editar/:categoriaId");
  if (match) { CargarCategoria(match.params.categoriaId); }
  
  const [categoria, setCategoria] = useState({id: '', nombre: ''});
  
  function CargarCategoria(categoriaId) {
    useEffect(()=>{
      async function connect() {
        try {
          const response = await axios.get('http://localhost:3001/categoria/' + categoriaId);
          setCategoria(response.data);
        } catch(e) {
          console.log('Error: ', e.response.status);
          setCategoria({id: 'Error', nombre: e.response.status})
        }
      }
      connect();
    },[categoriaId]);
  };

  const handleChange = (event) => {  
    //this.setState({value: event.target.value});
  };
  
  const handleSubmit = (event) => {  
    // async function connect() {
    //   try {
    //     const response = await axios.post('http://localhost:3001/categoria/');
    //     console.log(response);
    //     // TODO: mostrar success!
    //   }
    //   catch(e) {
    //     console.log('Error: ', e.response.status);
    //     // TODO: mostrar mensaje de error
    //   }
    // }
    // connect();
    
    //alert('A name was submitted: ' + event);
    //vent.preventDefault();
  };

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faTags} />
        Categorias
      </h2>
      Formulario Categoria 
      <h3>
        {(categoria.id) ? 'Editar' : 'Agregar'}
      </h3>
      <form onSubmit={handleSubmit()}>
        <input type="hidden" name="id" value={categoria.id} onChange={handleChange()} />
        <label>
          Nombre:
          <input type="text" name="nombre" value={categoria.nombre} onChange={handleChange()} />
        </label>
        <input type="submit" value="Grabar"  onChange={handleChange()} />
      </form>
    </div>
  )
}
