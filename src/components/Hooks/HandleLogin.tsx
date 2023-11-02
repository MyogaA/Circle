import { useState, ChangeEvent } from "react";
import {API}  from "../../libs/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IUserlogin } from "../../types/user";
import { AUTH_CHECK, AUTH_LOGIN } from "../../Store/store";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const [form, setForm] = useState<IUserlogin>({
    id: 0,
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      const response = await API.post('/auth/login', form);
      const data = response.data;
      console.log('data',data);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(AUTH_LOGIN(data));
      dispatch(AUTH_CHECK(data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  

  return {form, handleChange, handleLogin};
}