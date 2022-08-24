import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '28726852-6b30a90b988376f127c6dadc1',
    per_page: 12,
  },
});

export const searchPhotos = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      page,
      q,
    },
  });
  return data;
};
