import React from "react";
import "./Car.css";
import { aprobar, eliminar } from "../../redux/cars/cars.actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Car = ({ car, notApproved }) => {
  const { carsNotApproved, carsApproved } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  return (
    <div className="car-container">
      <div className="car">
        {user && user.rol === "admin" && (
          <img
            className="eliminar"
            src="/assets/papelera.png"
            onClick={() =>
              eliminar(car, carsNotApproved, carsApproved)
            }
          />
        )}
        {notApproved && (
          <img
            src="/assets/si.png"
            onClick={() =>
              aprobar(car, carsNotApproved, carsApproved, navigate)
            }
          />
        )}
        <div>
          <img src={car.image} alt={car.model} />
        </div>
        <h3>
          {car.brand} {car.model}
        </h3>
      </div>
    </div>
  );
};

export default Car;
