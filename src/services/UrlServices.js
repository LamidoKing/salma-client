
const baseURL =
window.location.hostname === "localhost"
  ? "http://localhost:3000/api/v1"
  : "https://fast-ridge-64559.herokuapp.com/api/v1"

  const cableURL =
  window.location.hostname === "localhost"
    ? "ws://localhost:3000/cable"
    : "wss://fast-ridge-64559.herokuapp.com/cable"

export {baseURL,cableURL};