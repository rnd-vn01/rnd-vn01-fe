import MockAdapter from 'axios-mock-adapter';
import apiClient from 'src/api/axios/apiClient';

export const mockUpdateItems = () => {
  const mock = new MockAdapter(apiClient as any)
  let pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}acupoint`);

  mock.onPut(pathRegex)
    .reply((config: any) => {
      return ([200, true])
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}meridian`);

  mock.onPut(pathRegex)
    .reply((config: any) => {
      return ([200, true])
    })
}
