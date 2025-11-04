import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const tutorRegistrationApi = {
  saveAboutStep: async (data: any) => {
    const response = await axios.post(`${API_URL}/api/tutor-registration/about`, data);
    return response.data;
  },

  getDraft: async (email: string) => {
    const response = await axios.get(`${API_URL}/api/tutor-registration/draft/${email}`);
    return response.data;
  }
};