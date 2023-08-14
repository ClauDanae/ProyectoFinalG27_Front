import { useState, useContext } from "react";
import Context from "../MyContext"
import axios from "axios";

export default function Publicar() {
  const { urlServer, getDataMovies } = useContext(Context)
  const [publicacion, setPublicacion] = useState({});

  const handleSetPublicacion = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setPublicacion({ ...publicacion, ...field });
  };

  const publicarPelicula = async () => {
    const endpoint = "/publicar";
    if(publicacion.name && publicacion.price && publicacion.genre && publicacion.director && publicacion.agno && publicacion.sinopsis && publicacion.img) {
      try {
        await axios.post(urlServer + endpoint, publicacion);
        alert("Publicación ingresada con éxito");
        setPublicacion({});
        getDataMovies()
      } catch (error) {
        alert(error);
      }
    }else{
      alert("Debes llenar todos los campos")
    }
  };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Ingresar película</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Película</label>
        <input
          value={publicacion.name}
          onChange={handleSetPublicacion}
          type="text"
          name="name"
          className="form-control"
          placeholder="Nombre de la película"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Precio</label>
        <input
          value={publicacion.price}
          onChange={handleSetPublicacion}
          type="number"
          name="price"
          className="form-control"
          placeholder="Ejemplo: 10000"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Género</label>
        <input
          value={publicacion.genre}
          onChange={handleSetPublicacion}
          type="text"
          name="genre"
          className="form-control"
          placeholder="Horror, comedia, fantasía, etc..."
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Director</label>
        <input
          value={publicacion.director}
          onChange={handleSetPublicacion}
          type="text"
          name="director"
          className="form-control"
          placeholder="Nombre del director de la película"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Año de publicación</label>
        <input
          value={publicacion.agno}
          onChange={handleSetPublicacion}
          type="number"
          name="agno"
          className="form-control"
          placeholder="1990"
        />
      </div>      
      <div className="form-group mt-1 ">
        <label>Sinopsis</label>
        <input
          value={publicacion.sinopsis}
          onChange={handleSetPublicacion}
          type="text"
          name="sinopsis"
          className="form-control"
          placeholder="Breve descripcion de la película"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Poster</label>
        <input
          value={publicacion.img}
          onChange={handleSetPublicacion}
          type="text"
          name="img"
          className="form-control"
          placeholder="Url de la imagen del poster"
        />
      </div>      
      <button onClick={publicarPelicula} className="btn btn-success mt-3">
        Publicar
      </button>
    </div>
  );
}
