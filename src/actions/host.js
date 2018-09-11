import * as request from 'superagent'

export const GET_HOST_DATA_SUCCESS = 'GET_HOST_DATA_SUCCESS'

const getHostDataSuccess = data => ({
  type: GET_HOST_DATA_SUCCESS,
  payload: data
})

export const getHostData = (location) => (dispatch) => {  
  let hotelCode
  if (location === 'amsterdam') hotelCode = 'AMS'
  if (location === 'rotterdam') hotelCode = 'RTM'
  request
    .get(`https://mobile-api.cityhub.com/api/v1/host/current?HotelCode=${hotelCode}`)
    .then(result => dispatch(getHostDataSuccess(result.body)))  
    .catch(err => console.error(err))
}