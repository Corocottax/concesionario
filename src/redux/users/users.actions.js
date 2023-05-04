import { API } from "../../shared/Api";
import store from "../store";

const { dispatch } = store;

const login = async (datos, navigate) => {
  dispatch({ type: "LOADING_LOGIN" });

  API.post("users/login", datos)
    .then((resultado) => {
      dispatch({
        type: "LOGIN",
        contenido: {
          token: resultado.data.token,
          user: resultado.data.userToLog,
        },
      });
      localStorage.setItem("token", resultado.data.token);
      navigate("/");
    })
    .catch((error) => {
      dispatch({ type: "ERROR", contenido: error.response.data });
    });
};

const registerUser = async (datos, navigate) => {
  dispatch({ type: "LOADING_LOGIN" });

  API.post("users/register", datos)
    .then((resultado) => {
      const user = {
        name: datos.name,
        password: datos.password,
      };

      login(user, navigate);
    })
    .catch((error) => {
      console.log(error);
      /* dispatch({ type: "ERROR", contenido: error.response.data }); */
    });
};

const checksession = async () => {
  dispatch({ type: "LOADING_LOGIN" });

  API.get("users/check").then((resultado) => {
    console.log(resultado.data);
    dispatch({
      type: "LOGIN",
      contenido: {
        token: localStorage.getItem("token"),
        user: resultado.data === "No estás autorizado" ? null : resultado.data,
      },
    });
  });
};

const logout = () => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};

export { login, checksession, logout, registerUser };
