// import axios from "axios"
import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return axios.post("/api/users", { name, job });
};

export { fetchAllUser, postCreateUser };
