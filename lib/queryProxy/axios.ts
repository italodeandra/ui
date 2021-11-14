import Axios from "axios";

const axios = Axios.create();

export default axios;

const CancelToken = Axios.CancelToken;

export { CancelToken };
