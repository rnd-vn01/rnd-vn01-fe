import { objectToQuery, objectToFormData } from '../../formatAPIParam';
import apiClient from '../../axios/apiClient';

export const apiAuth = {
  createNewAccount: (data: IParamCreateUpdateAccount) => {
    const url = 'users';
    return apiClient.post(url, data);
  },

  getAccountInfo: (firebase_id: string) => {
    const url = `users/findByFirebaseID/${firebase_id}`;
    return apiClient.get(url)
  },

  updateProfile: (data: IParamCreateUpdateAccount) => {
    const url = 'users/updateProfile';
    return apiClient.put(url, data);
  }
};
