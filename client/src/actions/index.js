import axios from 'axios';
import { FETCH_USER } from './types';


//when we return a function, redux-thunk will automatically call a dispatch
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res?.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe',token);
  dispatch({ type: FETCH_USER, payload: res.data});
}
