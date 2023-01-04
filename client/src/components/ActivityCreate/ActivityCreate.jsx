import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivities, getActivities } from "../../actions";
import { INVIERNO, VERANO, OTOÑO, PRIMAVERA } from "../../const/Const";
import NavBar from "../NavBar/NavBar";
import "./ActivityCreate.css";

function validate(input) {
  let errors = {};
  if (
    !/^[a-zA-Z\s]*$/.test(input.name) ||
    !input.name ||
    input.name.length < 3
  ) {
    errors.name = "Debe completar este campo";
  } else if (!input.duration) {
    errors.duration = "Debe completar este campo";
  } else if (!input.dificulty) {
    errors.dificulty = "Debe seleccionar la complejidad";
  } else if (!input.season) {
    errors.season = "Debe seleccionar una estacion";
  } else if (input.countries === []) {
    errors.countries = "Debe seleccionar un pais";
  }
  return errors;
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countriesAll = useSelector((state) => state.allCountries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    duration: "",
    dificulty: "",
    season: "",
    countries: [],
  });
  console.log(input);
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(i) {
    setInput({
      ...input,
      countries: input.countries.filter((el) => el !== i),
    });
  }

  function handleSelect(e) {
    setInput({
            ...input,
            countries: [...new Set([...input.countries, e.target.value])]
        });
    }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name === "" ||
      input.duration === "" ||
      input.dificulty === "" ||
      input.season === "" ||
      input.countries.length === 0
    )
      return alert("Debe llenar los campos");
    dispatch(postActivities(input));
    alert("Activity created");
    setInput({
      name: "",
      duration: "",
      dificulty: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  }

  return (
    <div className="">
      <div>
        <NavBar />
      </div>

      <div className="activityCardContainer">
        <div className="activityCard">
          <div className="activityTitle"></div>

          <form className="formActivity" onSubmit={handleSubmit}>
            <span className="titleCreateActivity"> Crea una Actividad </span>
            <div className="inputActivities">
              <label className="labelActivity"></label>
              <input
                className="i"
                type="text"
                placeholder="Indicate the activity..."
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p className="e">{errors.name}</p>}
            </div>
            <div className="inputActivities">
              <label></label>
              <input
                className="i"
                type="text"
                value={input.duration}
                name="duration"
                placeholder="Indicate the duration..."
                onChange={handleChange}
              />
              {errors.duration && <p className="e">{errors.duration}</p>}
            </div>
            <div className="inputActivities">
              <label> Dificultad </label>
              <input
                className="i"
                type="range"
                name="dificulty"
                min="1"
                max="5"
                value={input.dificulty}
                onChange={(e) => handleChange(e)}
              />
              {errors.dificulty && <p className="e"> {errors.dificulty}</p>}
            </div>
            <div className="seasonInput">
              <select
                className="i"
                name="season"
                value={input.season}
                onChange={(e) => handleChange(e)}>
                <option className="op"> Temporada </option>
                <option className="op" value={INVIERNO}>
                  Invierno
                </option>
                <option className="op" value={VERANO}>
                  Verano
                </option>
                <option className="op" value={OTOÑO}>
                  Otoño
                </option>
                <option className="op" value={PRIMAVERA}>
                  Primavera
                </option>
              </select>
              {errors.season && <p className="e">{errors.season}</p>}
            </div>
            {errors.countries && <p className="e">{errors.countries}</p>}

            <div>
              <select className="i" onChange={(e) => handleSelect(e)}>
                <option className="op"> Paises </option>
                {countriesAll.map((v) => (
                  <option className="op" value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="textArea">
              {input.countries.map((country) => (
                <div className="countrieAndButton">
                  <input
                    className="btnDelete"
                    type="button"
                    value="X"
                    onClick={() => handleDelete(country)}
                  />
                  <p className="pOfCountry">{country}</p>
                </div>
              ))}
            </div>
            <div>
              <button className="btnActivity" type="submit">
                Crear Actividad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
