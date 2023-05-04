import React from "react";
import Car from "../../components/Car/Car";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

const Admin = () => {
  
  const { loading, carsNotApproved } = useSelector((state) => state.cars);

  return (
    <div className="home">
      {loading && <Loading />}
      <div className="cars">
        {carsNotApproved.length > 0 &&
          carsNotApproved.map((car) => {
            return <Car car={car} key={car._id} notApproved/>;
          })}
      </div>
    </div>
  );
};

export default Admin;
