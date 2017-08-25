import { NavigationActions } from 'react-navigation';
import update from "react-addons-update";
import Geocoder from 'react-native-geocoding';
import RNGooglePlaces from "react-native-google-places";

import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
Geocoder.setApiKey('AIzaSyCCcOcMglhvXnRsniygV44jmi5QzMdfyVI'); // use a valid API key



import {
   DESTINATION_INPUT,
   SELECT_VEHICLE,
   GET_USER_LOCATION,
   LOGIN_USER_SUCCESS,
   HOVER_ON_DESTINATION,
   PICKUP_INPUT,
   INPUT_DONE,
   UPDATE_REGION,
   GET_SUGGESTIONS,
   GET_SUGGESTIONS_EMPTY,
   SET_SUGGETION_PICKUP,
   SET_SUGGETION_DEST,
   GEOCODE_ADDRESS_PICKUP,
   GEOCODE_ADDRESS_DEST,
   ERROR_GEOCODING,
   FETCHING_PRICES,
   FETCH_PRICE_GOOD,
   FETCH_PRICE_BAD,
   EDIT_NO_INPUT,
   EDITTING_USER,
   EDIT_USER_SUCCESS,
   EDIT_USER_ERROR,
   GETTING_DISTANCE,
   DISTANCE_FETCH_SUCCESS,
   DISTANCE_FETCH_ERROR,
   GETTING_PRICE,
   STORE_PRICE,
   STORE_KM,
   STORE_HR,
   DRAW_ROUTE,
   DRAWING_ROUTE,
   DRAWING_ROUTE_ERROR,
   PICKUP_LONG_LAT_RESET,
   GET_NAME_OF_LOCATION,
   GET_NAME_OF_LOCATION_ERROR,
   SAVE_USER_INFO,
   DROPOFF_LONG_LAT_RESET,
   DISTANCE_FETCH,
   TIME_FETCH,
   SAVE_STATE,
   ORDER_SUBMIT_SUCCESS,
   ERROR_OVERALL,
   RESET,
   CLEAR_MAP_DATA,
   FETCHING_HISTORY,
   FETCH_HISTORY_GOOD,
   FETCH_HISTORY_EMPTY,
   FETCH_HISTORY_BAD,
   LOGOUT_USER,
  } from '../types';



export const destinationChanged = (text) => {
  return {
    type: DESTINATION_INPUT,
    payload: text
  };
};

export const save_summary_state = (data) => {
    if ((data.pick_up_name === '') || (data.pick_up_tel === '') || (data.drop_off_name === '') || (data.drop_off_tel === '') || (data.extra === '')) {
        return (dispatch) => {
        dispatch({ type: EDIT_NO_INPUT, payload: null });
        }
    } else {
        return (dispatch) => {
        dispatch({ type: SAVE_STATE, payload: data });
        dispatch(NavigationActions.navigate({ routeName: 'Summary' }));
        }
    }
}

export const pickupChanged = (text) => {
  return {
    type: PICKUP_INPUT,
    payload: text
  };
};


export const select_vehicle = (type) => {
  return {
    type: SELECT_VEHICLE,
    payload: type
  };
}

export const hoverondesc = () => {
  return {
    type: HOVER_ON_DESTINATION,
    payload: true,
  };
}




export const setUser = (user) => {
  return {
    type: SAVE_USER_INFO,
    payload: user,
  };
}

export const input_everything = () => {
  return {
    type: INPUT_DONE,
    payload: true,
  }
}

export const update_region = (region) => {
  return {
    type: UPDATE_REGION,
    payload: region,
  }
}

export const set_suggestion_dest = (suggestion) => {
  return {
    type: SET_SUGGETION_DEST,
    payload: suggestion,
  }
}
export const set_suggestion_pick = (suggestion) => {
  return {
    type: SET_SUGGETION_PICKUP,
    payload: suggestion,
  }
}

export const clearSomethings = () => {
  return {
    type: CLEAR_MAP_DATA,
    payload: null,
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: null,
  }
}

export const getCurrentLocation = () => {
  return(dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
          //console.log("Current pos is "+position);
          dispatch({
            type: GET_USER_LOCATION,
            payload: position
          })
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: false,
         timeout: 20000,
         maximumAge: 1000
       }
    )
  }
}


export const get_name_of_loc = (lat, long) => {
  //Required parameters
    return(dispatch) => {
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          var a = responseJson.results;
          var address = a[0].formatted_address;

          dispatch({type: GET_NAME_OF_LOCATION, payload: address })
          //this.props.navigation.navigate('Profile', {name: 'Lucy'})
          //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
        } else {
          dispatch({ type: GET_NAME_OF_LOCATION_ERROR, payload: "Error" });
        }

      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_NAME_OF_LOCATION, payload: "Error" })
      })
  }
}



export const geocodeTheAddress_pickup = (address) => {
  //edRequired parameters
    return(dispatch) => {
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&region=NG&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          //dispatch({ type: GEOCODE_ADDRESS_PICKUP, payload: responseJson.results});
          var a = responseJson.results;
          var long_lat = a[0].geometry.location;
          console.log('NEw - Long - Lat - is -'+ JSON.stringify(long_lat));

          dispatch({type: PICKUP_LONG_LAT_RESET, payload: long_lat });
        } else {
          dispatch({ type: ERROR_GEOCODING, payload: responseJson.status });
        }

      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ERROR_GEOCODING, payload: responseJson.status })
      })
  }
}

export const geocodeTheAddress_dest = (address) => {
  //Required parameters
    return(dispatch) => {
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&region=NG&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          //dispatch({ type: GEOCODE_ADDRESS_PICKUP, payload: responseJson.results});
          var a = responseJson.results;
          var long_lat = a[0].geometry.location;
          dispatch({type: DROPOFF_LONG_LAT_RESET, payload: long_lat })
          //this.props.navigation.navigate('Profile', {name: 'Lucy'})
          //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
        } else {
          dispatch({ type: ERROR_GEOCODING, payload: responseJson.status });
        }

      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ERROR_GEOCODING, payload: responseJson.status })
      })
  }
}



/***** Predictions *****/

export const getAddressPrediction = (input) => {
        return(dispatch) => {
          //Required parameters
          var api_key = "AIzaSyCCcOcMglhvXnRsniygV44jmi5QzMdfyVI";
          fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+input+'&libraries=places&region=NG&language=pt_BR&key='+api_key, {

            method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
            .then((response) => response.json())
            .then((responseJson) => {
              let status = responseJson.status;
              if (status !== 'ZERO_RESULTS') {
                //responseJson.predictions.fi
                dispatch({ type: GET_SUGGESTIONS, payload: responseJson.predictions });
                //this.props.navigation.navigate('Profile', {name: 'Lucy'})
                //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
              } else {
                dispatch({ type: GET_SUGGESTIONS_EMPTY, payload: responseJson.predictions });
              }

            })
            .catch((error) => {
              console.log(error);
              dispatch({ type: GET_SUGGESTIONS_EMPTY, payload: responseJson.predictions })
            })
        }


    }


/***** End ****/







export const loginUser = ({ email, password }) => {
  if (email === '' || password === '') {
      return (dispatch) => {
        dispatch({ type: NO_INPUT, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: LOGIN_USER });
        fetch('https://project.stackonly.com/app/api/user', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            let status = responseJson.status;
            if (status === 'success') {
              dispatch({ type: LOGIN_USER_SUCCESS, payload: responseJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
              dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
              dispatch({ type: LOGIN_USER_ERROR, payload: responseJson })
            }

          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: LOGIN_USER_ERROR, payload: responseJson })
          })


    }

  }

};


export const getHistory = (userid) => {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_HISTORY });
        fetch('https://project.stackonly.com/app/api/history', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: userid,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            let status = responseJson.status;
            //if (status === 'success') {
              dispatch({ type: FETCH_HISTORY_GOOD, payload: responseJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
              //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            /*} else if (status === 'no order') {
              dispatch({ type: FETCH_HISTORY_EMPTY, payload: responseJson });
            } else {
              dispatch({ type: FETCH_HISTORY_BAD, payload: responseJson })
            }*/

          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: FETCH_HISTORY_BAD, payload: responseJson })
          })
      }
  };



export const fetchPrice = (vehicle, emergency) => {
  if (vehicle === '' || emergency === '') {
      //return (dispatch) => {
      //  dispatch({ type: NO_INPUT, payload: null });
      //}

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_PRICES });
        fetch('https://project.stackonly.com/app/api/price', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              vehicle: vehicle,
              emergency: emergency,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            let status = responseJson.status;
            if (status === 'success') {
              dispatch({ type: FETCH_PRICE_GOOD, payload: responseJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
              //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
              dispatch({ type: FETCH_PRICE_BAD, payload: responseJson })
            }

          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: FETCH_PRICE_BAD, payload: responseJson })
          })


    }

  }

};


export const editUser = (fullname, email, tel, password, token, userid) => {
  if ((email === '') || (fullname === '') || (tel === '') || (password === '') || (token === '') || (userid === '')) {
      return (dispatch) => {
        dispatch({ type: EDIT_NO_INPUT, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: EDITTING_USER });
        fetch('https://project.stackonly.com/app/api/edit', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullname: fullname,
              tel: tel,
              email: email,
              password: password,
              token: token,
              userid: userid,
            })
          })
          .then((responsee) => responsee.json())
          .then((responseeJson) => {
            let status = responseeJson.status;
            if (status === 'success') {
              dispatch({ type: EDIT_USER_SUCCESS, payload: responseeJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
            } else {
              dispatch({ type: EDIT_USER_ERROR, payload: responseeJson })
            }

          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: EDIT_USER_ERROR, payload: responseeJson })
          })


    }

  }

};


export const getDistance = (pickup, destination) => {

    return (dispatch) => {
        //login user
        dispatch({ type: GETTING_DISTANCE });
        var api_keey = "AIzaSyAOV8tYnxNbd37Ds9NmwF6mSjpy78kFdkg";

        fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+pickup+'&destinations='+destination+'&mode=driving&region=NG&fare=NGN&language=en-EN&key='+api_keey, {
          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },

          })
          .then((response) => response.json())
          .then((responseJson) => {
            let status = responseJson.status;
            if (status === 'OK') {
              dispatch({ type: DISTANCE_FETCH_SUCCESS, payload: responseJson.rows });
              var a = responseJson.rows;
              var distance = a[0].elements[0].distance.value;
              var time = a[0].elements[0].duration.value;
              dispatch({ type: DISTANCE_FETCH, payload: Math.ceil(Number(distance/1000)) });
              dispatch({ type: TIME_FETCH, payload: Math.ceil(Number(time/60)) });

            } else {
              dispatch({ type: DISTANCE_FETCH_ERROR, payload: responseJson })
            }

          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: DISTANCE_FETCH_ERROR, payload: responseJson })
          })


    }
};


export const calculatePrice = (km, hr, price_per_km, price_per_hr, emergency) => {
  return (dispatch) => {


    var km_num = Number(km);
    var hr_num = Number(hr);
    var num_price_per_km = Number(price_per_km);
    var num_price_per_hr = Number(price_per_hr);
    var num_emergency = Number(emergency);

    var price = (km_num * num_price_per_km) + (hr_num + num_price_per_hr) + num_emergency;
    dispatch({ type: GETTING_PRICE });
  }
}

export const StorePrice = (price) => {
  return {
    type: STORE_PRICE,
    payload: price,
  }
}

export const StoreKm = (km) => {
  return {
    type: STORE_KM,
    payload: km,
  }
}
export const StoreHr = (hr) => {
  return {
    type: STORE_HR,
    payload: hr,
  }
}

export const reset = () => {
  return {
    type: RESET,
    payload: null,
  }
}




//get ROutes


function decode (t,e) {
  for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;
    while(a>=32);
    n=1&i?~(i>>1):i>>1,h=i=0;
    do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
}



export const getRoute = (pickup, destination) => {
  return (dispatch) => {
  dispatch({ type: DRAWING_ROUTE });
  const mode = 'driving'; // 'walking';
  //const origin = pickup;
  //const destination = destination;
  const APIKEY = 'AIzaSyAOV8tYnxNbd37Ds9NmwF6mSjpy78kFdkg';
  const url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+pickup+'&destination='+destination+'&region=NG&key='+APIKEY+'&mode='+mode;
  //const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

  fetch(url)
      .then(response => response.json())
      .then(responseJson => {
          if (responseJson.routes.length) {
              dispatch({ type: DRAW_ROUTE, payload: decode(responseJson.routes[0].overview_polyline.points) }); // definition below

          }
      }).catch(e => {
        //console.warn(e);
        dispatch({ type: DRAWING_ROUTE_ERROR });

      }
    );
  }
}




export const submitOrder = (user, pickup, destination, emergency, order_info, pickup_coords, dropoff_coords, type, scheduled, amount, km, min) => {
  if ((pickup === '') || (destination === '') || (pickup_coords === '') || (dropoff_coords === '') || (amount === 0) || (order_info === '')) {
      return (dispatch) => {
        dispatch({ type: ERROR_OVERALL, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: EDITTING_USER });
        fetch('https://project.stackonly.com/app/api/submit-orders', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
              pickup: pickup,
              destination: destination,
              emergency: emergency,
              pickup_coords_lat: pickup_coords.lat,
              dropoff_coords_lat: dropoff_coords.lat,
              pickup_coords_lng: pickup_coords.lng,
              dropoff_coords_lng: dropoff_coords.lng,
              type: type,
              scheduled: scheduled,
              amount: amount,
              pickup_tel: order_info.pick_up_tel,
              dropoff_tel: order_info.drop_off_tel,
              pickup_name: order_info.pick_up_name,
              dropoff_name: order_info.drop_off_name,
              extra: order_info.extra,
              km: km,
              min: min,

            })
          })
          .then((responsee) => responsee.json())
          .then((responseeJson) => {
            let status = responseeJson.status;
            if (status === 'success') {
              dispatch({ type: ORDER_SUBMIT_SUCCESS, payload: responseeJson });
              console.log(JSON.stringify(responseeJson));
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
            } else {
              dispatch({ type: ERROR_OVERALL, payload: responseeJson });
              console.log(JSON.stringify(responseeJson));
            }

          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: ERROR_OVERALL, payload: responseeJson })
          })
        }

  }

};
