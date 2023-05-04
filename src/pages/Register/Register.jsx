import React from 'react'
import { useForm } from 'react-hook-form'
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import "./Register.css"
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/users/users.actions';

const Register = () => {

  const { register, handleSubmit } = useForm();
  const { loading, error } = useSelector(state => state.users);
  const navigate = useNavigate();

  return (
    <div className="register-form">
      <Loading width="20%" />
      <h2>REGISTRATE</h2>
      <form onSubmit={handleSubmit((datos) => registerUser(datos, navigate))}>
        <div>
          <label>userName</label>
          <input {...register("name")} />
        </div>
        <div>
          <label>password</label>
          <input {...register("password")} type="password"/>
        </div>
        <div>
          <label>email</label>
          <input {...register("email")} type="email"/>
        </div>
        <div>
          <label>edad</label>
          <input {...register("edad")} type="number"/>
        </div>
        <p className="error">{ error && error}</p>
        <button>{loading ? <Loading width="50px" tipo="spinner"/> : "REGÍSTRATE"}</button>
      </form>
    </div>
  )
}

export default Register