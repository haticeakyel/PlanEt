import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const addEventApi = async ({ title, description, status, startDate, endDate }) => {
  const formattedStartDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  const formattedEndDate = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  const resp = await axios.post('http://localhost:3001/events', {
    title: title,
    description: description,
    status: status,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });
  
  return resp;
};

export const listEventApi = async () => {

    const resp = await axios.get('http://localhost:3001/events');
    return resp;
};

export const deleteEventApi = async (id) => {
  const resp = await axios.delete(`http://localhost:3001/events/${id}`);
  return resp.status === 204;
};
