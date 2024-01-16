import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8085/",
  baseURL: 'http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/',
  headers: {
    "Content-type": "application/json"
  }
});