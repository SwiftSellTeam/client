import axios from "axios";

class ApiServiceBase {
  protected urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  constructor(urlBase?: string) {
    if (urlBase) {
      this.urlBase = urlBase;
    }
  }

  async get<T>(path: string, queryParams: any = {}): Promise<T> {
    const fullPath = this.urlBase + path;
    const response = await axios.get(fullPath, {
      params: queryParams
    });
    const data: T = response.data;
    return data;
  }

  async post<S, T>(path: string, body: S): Promise<T> {
    const fullPath = this.urlBase + path;
    const response = await axios.post(fullPath, {
      data: body,
    });
    const data: T = response.data;
    return data;
  }
}

export default ApiServiceBase;
