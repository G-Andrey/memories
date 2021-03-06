import { AUTH } from '../constants/actionTypes.js';
import * as api from '../api';

export const signin = (formData, history, updateUser) => async(dispatch) => {
  try{
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data});

    history.push('/')
    updateUser()
  } catch (error) {
    console.log(error)
  }
};

export const signup = (formData, history) => async(dispatch) => {
  try{
    const { data } = await api.signUP(formData);

    dispatch({ type: AUTH, data});

    history.push('/')
  } catch (error) {
    console.log(error)
  }
};