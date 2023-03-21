import { objectToQuery, objectToFormData } from '../formatAPIParam';
import apiClient from '../axios/apiClient';

export const apiItem = {
  getAcupuncturePoints: (language: string) => {
    const url = 'acupoint';
    return apiClient.get(url + objectToQuery({
      language: language
    }));
  },

  getMeridians: (language: string) => {
    const url = 'meridian';
    return apiClient.get(url + objectToQuery({
      language: language
    }))
  },

  getAcupuncturePointByCode: (language: string, code: string) => {
    const url = 'acupoint/filter';
    return apiClient.get(url + objectToQuery({
      language: language,
      code: code
    }));
  },

  getMeridianByCode: (language: string, code: string) => {
    const url = 'meridian/filter';
    return apiClient.get(url + objectToQuery({
      language: language,
      code: code
    }));
  },
};
