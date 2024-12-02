/**
 * External Dependencies.
 */
import axios from 'axios';

export async function apiExternal(
  url,
  data = {},
  method = "GET",
  params = {},
  options = {}
) {
  const client = axios.create({});
  return client
    .request({
      ...options,
      headers: {
        //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTY4MTk3Mzc5OSwiZXhwIjoxODM5NjUzNzk5fQ.g9G4LnNWg7KkSNK7Sx3SI3N8NVqR27MNHVmNTIB4c-Q`,
      },
      url,
      method,
      data,
      params,
    })
    .then((res) => {
      //console.log('res --:',res);
      return res;
    }).catch((error) => {
      console.log(error?.response);
      /*return dataEmpty;*/
    });

}