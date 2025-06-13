/**
 * External Dependencies.
 */
import axios from 'axios';

export async function apiAxios(
  url,
  data = {},
  method = "GET",
  params = {},
  options = {}
) {
  //console.log(idToken);
  const client = axios.create({});
  return client
    .request({
      ...options,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY4MTk3Mzc5OSwiZXhwIjoxODM5NjUzNzk5fQ.g9G4LnNWg7KkSNK7Sx3SI3N8NVqR27MNHVmNTIB4c-Q`,
      },
      url,
      method,
      data,
      params,
    })
    .then((res) => {

      return res;
    }).catch((error) => {
      console.log(error?.response);
    });

}

export async function apiAxiosAll(
  url,
  data = {},
  method = "GET",
  params = {},
  options = {}
) {
  //console.log(idToken);
  const client = axios.create({});
  return client
    .request({
      ...options,
      url,
      method,
      data,
      params,
    })
    .then((res) => {
      return res;
    }).catch((error) => {
      //console.log('er---:',error.code);
    });

}
