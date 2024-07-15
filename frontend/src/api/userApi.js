import { host, authHost } from "./axiosApi.js";
import { jwtDecode } from "jwt-decode";

export const userLogin = async ({ email, password }) => {
  try {
    const { data } = await host.post("/users/login", { email, password });
    localStorage.setItem("token", data.accessToken);

    let resultData = jwtDecode(data.accessToken);
    resultData.success = true;
    return resultData;
  } catch (error) {
    if (error.response.status === 400) {
      const data = {
        success: false,
        message: "Ошибка авторизации",
      };
      return data;
    } else {
      throw error;
    }
  }
};

export const userRegistration = async ({ email, password, name }) => {
  try {
    const { data } = await host.post("/users/register", {
      email,
      password,
      name,
    });

    localStorage.setItem("token", data.accessToken);
    let resultData = jwtDecode(data.accessToken);
    resultData.success = true;
    return resultData;
  } catch (error) {
    if (error.response.status === 400) {
      const data = {
        success: false,
        message: "Ошибка регистрации",
      };
      return data;
    } else {
      throw error;
    }
  }
};

export const refreshToken = async () => {
  const { data } = await authHost.get("/users/refreshToken");

  localStorage.setItem("token", data.accessToken);
  return jwtDecode(data.accessToken);
};

export const userLogout = async () => {
  await authHost.get("/users/logout");
  localStorage.removeItem("token");
  return;
};

export const getUserData = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      return jwtDecode(token);
    } catch (e) {
      return;
    }
  }
};
