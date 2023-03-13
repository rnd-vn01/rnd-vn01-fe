import MockAdapter from 'axios-mock-adapter';
import apiClientJWT from './apiClientJWT';
import apiClient from './apiClient';

const mock = new MockAdapter(apiClient as any)

mock.onPost(`${process.env.REACT_APP_API_ENDPOINT}users/refresh_token`)
  .reply((config: any) => {
    return ([200, {
      "access": "sampleAccessToken",
    }])
  })

const mock2 = new MockAdapter(apiClientJWT as any)

mock2.onGet(``)
  .reply((config: any) => {
    return ([200, {
      "access": "sampleAccessToken",
    }])
  })

describe('apiClientJWT', () => {
  it("should return data when success", async () => {
    const TEST_PARAM = {
      param: "abcdef"
    }

    expect(apiClientJWT.interceptors.response['handlers'][0].fulfilled(TEST_PARAM)).toBe(TEST_PARAM)
  })

  it("should return error when fail", async () => {
    const TEST_REJECTION = {
      status: 404,
      message: "Invalid email.",
      response: {
        status: 404,
        data: {
          messages: [
            {
              message: "Invalid email."
            }
          ]
        }
      }
    }

    await apiClientJWT.interceptors.response['handlers'][0].rejected(TEST_REJECTION)
      .catch((e: any) => {
        expect(e.response.status).toBe(404);
        expect(e.response.data.messages[0].message).toBe('Invalid email.');
      })
  })

  it("should refresh token when expired", async () => {
    const TEST_REJECTION = {
      status: 401,
      message: "Token is invalid or expired",
      response: {
        status: 401,
        data: {
          messages: [
            {
              message: "Token is invalid or expired"
            }
          ]
        }
      },
      config: {
        headers: {
          Authorization: ""
        },
        baseURL: ""
      }
    }

    await apiClientJWT.interceptors.response['handlers'][0].rejected(TEST_REJECTION)
      .catch((e: any) => {
        expect(e.response.status).toBe(401);
        expect(e.response.data.messages[0].message).toBe('Token is invalid or expired');
      })
  })
})
