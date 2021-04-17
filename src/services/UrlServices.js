const baseURL =window.location.hostname === "localhost"
  ? "http://localhost:3000/api/v1"
  : "https://sheltered-reaches-03216.herokuapp.com/api/v1"

const cableURL =window.location.hostname === "localhost"
    ? "ws://localhost:3000/cable"
    : "ws://sheltered-reaches-03216.herokuapp.com/cable"


export  default {baseURL,cableURL};