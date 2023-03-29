import axios from 'axios';
import { SERVER_URL } from './config';

// axios.defaults.withCredentials = true;
export const getDataAPI = async (url, token) => {
  console.log(`/${url}`)
    const res = await axios.get(`/${url}`,{
        headers: { Authorization: token}
    });
  console.log(res)
    return res;
}

export const postDataAPI = async (url, post, token) => {
  console.log("post 1", post, token)
  const res = await axios.post(
    `/${url}`,
    post,
    {
      headers: { Authorization: token },
    }
  );
  console.log("post api called" ,res);
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};


export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};