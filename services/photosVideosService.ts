import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.demo.arin-africa.org';

export const getPhotosVideos = async () => {
  const { data } = await axios.get(`${API_URL}/photos-videos`);
  return data;
};

export const getPhotoVideoById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/photos-videos/${id}`);
  return data;
};
