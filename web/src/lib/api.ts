import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})