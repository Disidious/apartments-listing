type Response = {
  json: any;
  error?: any;
  status: "success" | "failed"
}
  
export class ApiHandler {
  static url = ""
  
  static async get(path: string, headers: any = undefined): Promise<Response> {
    try {
      const response = await fetch(ApiHandler.url + path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers
        }
      })

      
      if(!response.ok) {
        return {
          json: undefined,
          error: response.body,
          status: "failed"
        }
      }
      
      const json = await response.json()
      return {
        json,
        status: "success"
      }
    } catch (error) {
        return {
          json: undefined,
          error: error,
          status: "failed"
        }
    }
  }

  static async post(path: string, payload: any = undefined, headers: any = undefined): Promise<Response> {
    try {
      const response = await fetch(ApiHandler.url + path, {
        method: "POST",
        body: payload,
        headers: {
          ...headers
        },
      })

      const json = await response.json()

      if(!response.ok) {
        return {
          json: undefined,
          error: json.message,
          status: "failed"
        }
      }
      
      return {
        json,
        status: "success"
      }
    } catch (error) {
        return {
          json: undefined,
          error: error,
          status: "failed"
        }
    }
  }

  static async createApartment(apartment: FormData) {
    return await this.post("/apartments", apartment)
  }

  static async getApartmentsList() {
    return await this.get("/apartments")
  }

  static async getApartmentDetails(id: string | number) {
    return await this.get(`/apartments/${id}`)
  }
}