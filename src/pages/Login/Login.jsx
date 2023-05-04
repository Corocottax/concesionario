import React from "react";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading/Loading";
import { login } from "../../redux/users/users.actions";
import "./Login.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {register, handleSubmit} = useForm();

  const { error, loading } = useSelector(state => state.users);

  const navigate = useNavigate();

  return (
    <div className="login-form">
      <Loading width="20%" />
      <h2>ENTRA EN NUESTRA PÁGINA</h2>
      <form onSubmit={handleSubmit((datos) => login(datos, navigate))}>
        <div>
          <label>userName</label>
          <input {...register("name")} />
        </div>
        <div>
          <label>password</label>
          <input {...register("password")} type="password"/>
        </div>
        <p className="error">{ error && error}</p>
        <button>{loading ? <Loading width="50px" tipo="spinner"/> : "LOGIN"}</button>
      </form>
    </div>
  );
};

export default Login;
