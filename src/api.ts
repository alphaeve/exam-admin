import axios from 'axios';

const BASE_URL = 'https://exampro-backend.onrender.com/api/questions'; // Update this if backend URL changes

export const fetchQuestions = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addQuestion = async (questionData: any) => {
  const res = await axios.post(BASE_URL, questionData);
  return res.data;
};

export const updateQuestion = async (id: string, updatedData: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return res.data;
};

export const deleteQuestion = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
