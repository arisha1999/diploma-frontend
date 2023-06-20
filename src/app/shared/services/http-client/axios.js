import Axios from 'axios';

Axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? process.env.VUE_APP_BASE_URL : `http://192.168.255.201:5000/api`;

const AxiosClient = Axios.create();

export default AxiosClient;
