import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';


export function fetchBreeds() {
  axios.defaults.headers.common["x-api-key"] = "live_qXvuYAutruX8VmUzX9Oae4vNgwuCf2CVuRsYb3cKo4wmgI6q71gBSMrojw8TdoYr";
    return axios.get(BASE_URL)
    .then(response => {
      console.log(response)
    return response;
  });
}
  
  export function fetchCatByBreed(breedId) {
    axios.defaults.headers.common["x-api-key"] = "live_qXvuYAutruX8VmUzX9Oae4vNgwuCf2CVuRsYb3cKo4wmgI6q71gBSMrojw8TdoYr";
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
  }
