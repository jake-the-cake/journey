import axios from 'axios'

class ApiClient {

	baseURL: string
	axiosInstance: any

  constructor(baseURL: string) {
    this.baseURL = baseURL

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setInterceptors()
  }

  /**
   * Sets up request/response interceptors to handle authentication tokens and errors.
   */
  setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: any) => Promise.reject(error)
    )

    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        if (error.response && error.response.status === 401) {
          console.warn('Unauthorized! Redirecting or refreshing token...')
          // Handle token refresh logic here if applicable
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * Generalized request method
   * @param {string} method - HTTP method (GET, POST, etc.)
   * @param {string} url - Endpoint URL
   * @param {object} [data={}] - Request payload (for POST, PUT, PATCH)
   * @param {object} [headers={}] - Custom headers if needed
   * @returns {Promise} Axios response
   */
  async request(method: string, url: string, data = {}, headers = {}) {
    try {
      const response = await this.axiosInstance({
        method,
        url,
        data,
        headers
      })
      return response.data
    } catch (error) {
      console.error(`API Request Error: ${error}`);
      throw error
    }
  }

  // ====== Public Requests (No Auth) ======
  async getPublicData(endpoint: string) {
    return this.request('GET', endpoint)
  }

  // ====== User Authenticated Requests ======
  async getUserData(endpoint: string) {
    return this.request('GET', endpoint)
  }

  async postUserData(endpoint: string, payload: any) {
    return this.request('POST', endpoint, payload)
  }

  // ====== Admin-Level Requests ======
  async getAdminData(endpoint: string) {
    return this.request('GET', endpoint, {}, { 'X-Admin-Auth': 'true' })
  }

  async postAdminData(endpoint: string, payload: any) {
    return this.request('POST', endpoint, payload, { 'X-Admin-Auth': 'true' })
  }
}

export default new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')