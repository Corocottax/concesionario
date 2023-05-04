import { API, APIIMAGES } from "../../shared/Api.js";
import store from "../store.js";

const { dispatch } = store;

const getAllCars = async () => {
  dispatch({ type: "LOADING" });

  setTimeout(async () => {
    const resultado = await API.get("cars");

    const carsNotApproved = resultado.data.filter((car) => !car.checked);
    const carsApproved = resultado.data.filter((car) => car.checked);

    const marcas = [];

    for (const car of carsApproved) {
      if (!marcas.includes(car.brand)) {
        marcas.push(car.brand);
      }
    }

    dispatch({
      type: "GET_CARS",
      contenido: {
        cars: resultado.data,
        carsApproved: carsApproved,
        carsNotApproved: carsNotApproved,
        marcas: marcas
      },
    });
  }, 4000);
};

const publicarCoche = async (datos, navigate, user) => {
  dispatch({ type: "LOADING" });

  const formdata = new FormData();

  formdata.append("brand", datos.brand);
  formdata.append("model", datos.model);
  formdata.append("image", datos.image[0]);

  APIIMAGES.post("cars/create", formdata)
    .then((resultado) => {
      dispatch({ type: "CAR_POSTED", contenido: resultado.data });
      if (user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: "ERROR_POSTING_CAR",
        contenido: "No has podido publicar el coche",
      });
    });
};

const aprobar = async (car, carsNotApproved, carsApproved, navigate) => {
  const carUpdated = { ...car };
  carUpdated.checked = true;

  API.put(`cars/update/${car._id}`, carUpdated)
    .then((resultado) => {
      const carsNotApprovedUpdated = [...carsNotApproved];
      const carsApprovedUpdated = [...carsApproved, carUpdated];

      carsNotApprovedUpdated.splice(carsNotApproved.indexOf(car), 1);

      dispatch({
        type: "UPDATED_CAR",
        contenido: {
          notApproved: carsNotApprovedUpdated,
          approved: carsApprovedUpdated,
        },
      });

      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

const eliminar = async (car, carsNotApproved, carsApproved) => {
  API.delete(`cars/delete/${car._id}`)
    .then((resultado) => {
      const carsNotApprovedUpdated = [...carsNotApproved];
      const carsApprovedUpdated = [...carsApproved];

      if (car.checked) {
        carsApprovedUpdated.splice(carsApproved.indexOf(car), 1);
      } else {
        carsNotApprovedUpdated.splice(carsNotApproved.indexOf(car), 1);
      }

      dispatch({
        type: "DELETE_CAR",
        contenido: {
          approved: carsApprovedUpdated,
          notApproved: carsNotApprovedUpdated,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getAllCars, publicarCoche, aprobar, eliminar };
