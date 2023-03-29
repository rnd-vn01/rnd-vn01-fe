import MockAdapter from 'axios-mock-adapter';
import apiClient from 'src/api/axios/apiClient';

export const mockAuth = () => {
  const mock = new MockAdapter(apiClient as any)
  let pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}users\/findByFirebaseID\/`);

  mock.onGet(pathRegex)
    .reply((config: any) => {
      let getParams = config.url.split("/")
      let firebaseID = getParams[getParams.length - 1]

      if (firebaseID === "INVALID") {
        return ([200, {}]);
      } else {
        return ([200, {
          firebase_id: "VALID",
          email: "test@gmail.com",
          name: "Name",
          image: "imageURL"
        }]);
      }
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}users\/updateProfile`);

  mock.onPut(pathRegex)
    .reply((config: any) => {
      return ([200, true])
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}users`);

  mock.onPost(pathRegex)
    .reply((config: any) => {
      let data = JSON.parse(config.data);

      if (data.firebase_id === "INVALID") {
        return ([500, {}])
      } else {
        return ([200, data])
      }
    })
}
