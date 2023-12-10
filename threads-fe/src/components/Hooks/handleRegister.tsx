import { useState, ChangeEvent } from "react";
import { API } from "../../libs/api";
import { IUserRegister } from "../../Store/types/user";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState<IUserRegister>({
    full_name: "",
    username: "",
    email: "",
    password: ""
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post('/auth/register', form)
      navigate("/");
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return { form, handleChange, handleRegister,navigate };
}