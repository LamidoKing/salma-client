const baseURL = window.location.hostname === "localhost"
  ? "http://localhost:3000/api/v1"
  : process.env.REACT_APP_API_URL

const cableURL = window.location.hostname === "localhost"
    ? "ws://localhost:3000/cable"
    : process.env.REACT_APP_SOCKET_URL


export default { baseURL, cableURL};