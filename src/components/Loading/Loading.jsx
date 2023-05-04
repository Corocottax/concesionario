import React from "react";
import "./Loading.css";

const Loading = ({ width = "50%", tipo = "coche" }) => {
  return (
    <img
      style={{ width: width }}
      src={
        tipo === "coche"
          ? "https://automarcars.es/wp-content/themes/cardealer/images/preloader_img/loader.gif"
          : "https://darkiemindyou.files.wordpress.com/2015/04/loading6_230x230-cooler.gif"
      }
    />
  );
};

export default Loading;
