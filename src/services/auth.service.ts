import { authRepository } from "../repositories/auth.repository";
import { authStorage } from "./auth.storage";

class AuthService {
  private readonly url = "http://192.168.15.5:3030/auth";

  public async login(username: string, password: string) {
    const response = await fetch(`${this.url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 201) {
      const data = await response.json();
      await authStorage.setLoggedUser(data);
      return true;
    }
    return false;
  }

  public getLoggedUser() {
    return authRepository.getLogged();
  }
}

export const authService = new AuthService();
