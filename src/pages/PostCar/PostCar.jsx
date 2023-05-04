import React, { useState } from "react";
import "./PostCar.css";
import Loading from "../../components/Loading/Loading";
import { useForm } from "react-hook-form";
import { publicarCoche } from "../../redux/cars/cars.actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UploadFile from "../../components/UploadFile/UploadFile";

const PostCar = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.cars);

  const [image, setImage] = useState();

  return (
    <div className="post-car">
      <Loading width="20%" />
      <h2>PUBLICAR UN NUEVO COCHE</h2>
      <form
        onSubmit={handleSubmit((datos) => publicarCoche(datos, navigate, user))}
      >
        <div>
          <label>Marca</label>
          <input {...register("brand")} />
        </div>
        <div>
          <label>Modelo</label>
          <input {...register("model")} />
        </div>
        <div>
          <label>Imagen</label>
          <div className="upload">
            <UploadFile
              register={register}
              funcion={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            />
            {image && <img className="imagen" src={image} />}
          </div>
        </div>
        <button>
          {loading ? <Loading width="30px" tipo="spinner" /> : "PUBLICAR"}
        </button>
      </form>
    </div>
  );
};

export default PostCar;
