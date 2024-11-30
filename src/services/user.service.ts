import { User } from "../model/user";
import { authStorage } from "./auth.storage";

class UserService {
  private readonly url = "http://192.168.15.5:3030/users";

  private async getHeaders() {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is null");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  public async list() {
    const response = await fetch(this.url, {
      method: "GET",
      headers: await this.getHeaders(),
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }

  public async create(user: User) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: await this.getHeaders(),
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.status === 201) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }

  public async update(id: number, user: User) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: await this.getHeaders(),
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }

  public async delete(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: await this.getHeaders(),
    });

    const data = await response.json();

    if (response.status === 200) {
      return data;
    } else if (response.status === 401) {
      throw new Error(data.message);
    }
  }
}

export const userService = new UserService();
