import axios from "axios";
import { SERVER_URL } from "../types";

const signIn = async (email: string, password: string) => {
  const response = await axios.post(`${SERVER_URL}/signin`, {
    email,
    password,
  });
  return response.data;
};

const signUp = async (email: string, password: string, name: string) => {
  const response = await axios.post(`${SERVER_URL}/register`, {
    email,
    name,
    password,
  });
  return response.data;
};

const auth = { signIn, signUp };
export default auth;
