import axios from "axios";
import apiClient from './apiClient';

describe('apiClient', () => {
  it("should return data when success", async () => {
    const TEST_PARAM = {
      param: "abcdef"
    }

    expect(apiClient.interceptors.response['handlers'][0].fulfilled(TEST_PARAM)).toBe(TEST_PARAM)
  })

  it("should return error when fail", async () => {
    const TEST_REJECTION = {
      status: 404,
      message: "Invalid email."
    }

    await apiClient.interceptors.response['handlers'][0].rejected(TEST_REJECTION)
      .catch((e: any) => {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Invalid email.');
      })
  })
})
