// Register.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../libs/api";
import { useDispatch } from "react-redux";
import { IUserRegister } from "../../Store/types/user";

export default function Register() {
  const [form, setForm] = useState<IUserRegister>({
    full_name: "",
    username: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event: any) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post("/auth/register", form);
      console.log(response?.data);
      dispatch(response?.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    handleChange, handleRegister,navigate
  };
}
