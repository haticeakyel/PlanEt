import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const addEventApi = async (userId, data) => {
  const formattedStartDate = dayjs(data.startDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const formattedEndDate = dayjs(data.endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  const resp = await axios.post(`http://localhost:3001/users/${userId}/events`, {
    title: data.title,
    description: data.description,
    status: data.status,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });
  
  return resp;
};

export const listEventApi = async (userId) => {

    const resp = await axios.get(`http://localhost:3001/users/${userId}/events`);
    return resp;
};

export const getEventbyIdApi = async (userId, id) => {

  const resp = await axios.get(`http://localhost:3001/users/${userId}/events/${id}`);
  return resp;
};

export const deleteEventApi = async (userId, id) => {
  const resp = await axios.delete(`http://localhost:3001/users/${userId}/events/${id}`);
  return resp.status === 204;
};

export const updateEvent = async (userId, id, data) => {
  const formattedStartDate = dayjs(data.startDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const formattedEndDate = dayjs(data.endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  const resp = await axios.put(`http://localhost:3001/users/${userId}/events/${id}`, {
    title: data.title,
    description: data.description,
    status: data.status,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  return resp.status === 200 ? resp : false;
};