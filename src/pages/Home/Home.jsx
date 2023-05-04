import { useSelector } from "react-redux";
import "./Home.css";
import Car from "../../components/Car/Car";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import {
  Bounce,
  Fade,
  Flip,
  Hinge,
  JackInTheBox,
  Roll,
  Rotate,
  Slide,
  Zoom,
} from "react-awesome-reveal";

const Home = () => {
  const { loading, carsApproved, marcas } = useSelector((state) => state.cars);

  const [marca, setMarca] = useState("Todos");

  return (
    <div className="home">
      {loading && <Loading />}
      {carsApproved.length > 0 && (
        <h1>
          <Fade cascade duration={200}>
            CONCESIONARIO EDU
          </Fade>
        </h1>
      )}
      <div className="marcas">
        {carsApproved.length > 0 && (
          <select onChange={(e) => setMarca(e.target.value)}>
            <option>Todos</option>
            {marcas.map((marca) => {
              return (
                <option value={marca} key={marca}>
                  {marca}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div className="cars">
        <Fade cascade>
          <p></p>
          {!loading &&
            carsApproved.map((car) => {
              return (
                <div key={car._id}>
                  {marca === "Todos" && (
                    <Fade>
                      <Car car={car} />
                    </Fade>
                  )}
                  {marca && car.brand === marca && (
                    <Zoom>
                      <Car car={car} />
                    </Zoom>
                  )}
                </div>
              );
            })}
        </Fade>
      </div>
    </div>
  );
};

export default Home;
