import axios from "axios";
import {
  ORDER_BY_POPULATION,
  FILTER_BY_ACTIVITIES,
  // FILTER_BY_COUNTRIES,
  FILTER_BY_CONTINENT,
  GET_COUNTRIES,
  ORDER_BY_NAME,
  SEARCH_COUNTRIES,
  GET_ACTIVITIES,
  POST_ACTIVITIES,
  DETAIL,
} from "../const/Const";

export const getCountries = () => {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/countries");
      return dispatch({
        type: GET_COUNTRIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchCountries = (search) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/countries?name=" + search
      );
      return dispatch({
        type: SEARCH_COUNTRIES,
        payload: json.data,
      });
    } catch (error) {
      alert("El pais no fue encontrado");
      console.log(error);
    }
  };
};

export const filterCountriesByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
};

export const filterCountriesByActivity = (payload) => {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload,
  };
};

// export const filterCountriesByContries = (payload) => {
//   return {
//     type: FILTER_BY_COUNTRIES,
//     payload,
//   };
// };

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByPopulation = (payload) => {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: GET_ACTIVITIES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

 export const postActivities = (payload) => {
  return async  (dispatch) => {
    try {
      await axios.post("http://localhost:3001/activities", payload);
      return dispatch({
        type: POST_ACTIVITIES,
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
}; 
// export function postActivities(payload) {
//   return async function (dispatch) {
//     const activity = axios.post("http://localhost:3001/activities", payload);
//     return dispatch({
//       type: POST_ACTIVITIES,
//       payload: activity,
//     });
//   };
// }

// export const getDetail = (id) => {
//   return async (dispatch) => {
//     try {
//       var json = await axios.get(`http://localhost:3001/countries/${id}`);
//       return dispatch({
//         type: DETAIL,
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getDetail = (id) =>{
    return async function(dispatch){
        const countryDetail = await axios.get(`http://localhost:3001/countries/${id}`)
    
                return dispatch({type:DETAIL, payload: countryDetail.data});
    };
};
