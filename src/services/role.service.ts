import { Role } from "../model/role";
import { authStorage } from "./auth.storage";
class RoleService {
  private readonly url = "http://192.168.15.5:3030/roles";

  private async getHeaders() {
    const logged = await authStorage.getLoggedUser();
    const token = logged && logged.token ? logged.token : null;

    if (!token) throw new Error("Token is null");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  private async validate(response: Response) {
    const data = await response.json();

    if (response.status === 401) {
      throw new Error(response.statusText);
    } else if (response.status > 299) {
      throw new Error(data.message);
    }
    return data;
  }

  public async create(user: Role) {
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

  public async getList() {
    const response = await fetch(this.url, {
      method: "GET",
      headers: await this.getHeaders(),
    });

    const data = await this.validate(response);
    return data as Role[];
  }

  public async get(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "GET",
      headers: await this.getHeaders(),
    });

    const data = await this.validate(response);
    return data as Role;
  }

  public async update(id: number, user: Role) {
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

  public async remove(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: await this.getHeaders(),
    });

    const data = await this.validate(response);
    return data as boolean;
  }
}

export const roleService = new RoleService();
