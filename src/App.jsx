import React from "react";
import {firebase} from './firebase'

function App() {
  //hooks
  const [nombre,setNombre] = React.useState('')
  const [apellido,setApellido] = React.useState('')
  const [id,setId] = React.useState('')
  const [lista,setLista] = React.useState([])
  const [error,setError] = React.useState('')
  const [modoEdicion,SetModoEdicion] = React.useState(false)
  
  React.useEffect(()=>{
    const obtenerDatos = async()=>{
      try {
        const db= firebase.firestore()
        const data= await db.collection('usuarios').get()
        //console.log(data.docs)
        const arrayData= data.docs.map(doc=>({id:doc.id,...doc.data()}))
        console.log(arrayData);
        setLista(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  },[])

  const guardarDatos = async (e)=>{
    e.preventDefault()
    if (!nombre.trim()) {
      setError('Ingrese el Nombre')
      return
    }
    if (!apellido.trim()) {
      setError('Ingrese el Apellido')
      return
    }

    console.log(nombre+' '+apellido)

    try {
      const db=firebase.firestore()
      const nuevoUsuario= {
        nombre,apellido
      }
      const dato= await db.collection('usuarios').add(nuevoUsuario)

      setLista([
        ...lista,
        {...nuevoUsuario,id:dato.id}
      ])

    } catch (error) {
      console.log(error);
    }

    setNombre('')
    setApellido('')
    setError('')
    
  }

  const eliminarDato=async(id)=>{
    try {
      const db= firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const listaFiltrada = lista.filter((elemento)=>elemento.id!==id)
      setLista(listaFiltrada)
    } catch (error) {
      console.log(error)
    }
  }

  const editarDatos=async(id)=>{
    
  }

  return (
    <div className="container">
      <div className="row">
        <div className="cold-12">
          <h2 className="text-center">{modoEdicion ? 'Edicion de Usuario': 'Registro de Usuarios'}</h2>
          <form onSubmit={modoEdicion ? editarDatos: guardarDatos}>
            {
              error ? (
                <div className="alert alert-danger" role={alert}>
                  {error}
                </div>
              ):
              null
            }
            <input type="text" placeholder="Ingrese el Nombre" className="form-control mb-2" onChange={(e)=>{setNombre(e.target.value)}} value={nombre}/>
            <input type="text" placeholder="Ingrese el Apellido" className="form-control mb-2" onChange={(e)=>{setApellido(e.target.value)}} value={apellido}/>
            <div className="d-grid gap-2">
              {
                modoEdicion ? <button className="btn btn-outline-warning" type="submit">Editar</button>:
                <button className="btn btn-outline-info" type="submit">Agregar</button>
              }
            </div>
          </form>
        </div>  
      </div>
      <hr/>
      <div className="row">
        <div className="cold-12">
          <h2 className="text-center">Lista de Usuarios</h2>
          <ul className="list-group">
            {
              lista.map(
                (elemento)=>(
                  <li className="list-group-item" key={elemento.id}>{elemento.nombre} {elemento.apellido}
                  <button className="btn btn-success float-end mx-2">Editar</button>
                  <button className="btn btn-danger float-end mx-2" onClick={()=>eliminarDato(elemento.id)}>Eliminar</button>
                  </li>
                )
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
