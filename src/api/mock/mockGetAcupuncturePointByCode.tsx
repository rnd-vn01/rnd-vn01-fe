import MockAdapter from 'axios-mock-adapter';
import apiClient from 'src/api/axios/apiClient';
import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';

export const mockGetAcupuncturePointByCode = () => {
  const mock = new MockAdapter(apiClient as any)
  const pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}/acupoint/filter`);

  mock.onGet(pathRegex)
    .reply((config: any) => {
      if (config.params.language === "vi") {
        let returnItem = {}
        DEMO_DATA_VI.forEach((item) => {
          if (item.code === config.params.code) {
            returnItem = item
          }
        })
        return ([200, returnItem]);
      } else {
        let returnItem = {}
        DEMO_DATA_EN.forEach((item) => {
          if (item.code === config.params.code) {
            returnItem = item
          }
        })
        return ([200, returnItem])
      }
    })
}
