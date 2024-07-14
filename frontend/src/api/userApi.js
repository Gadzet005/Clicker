import { host, authHost } from "./axiosApi.js";
import { jwtDecode } from "jwt-decode";

export const userLogin = async ({ email, password }) => {
  const { data } = await host.post(
    "/users/login",
    { email, password },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  localStorage.setItem("token", data.accessToken);
  return jwtDecode(data.accessToken);
};

export const userRegistration = async ({ email, password, name, surname }) => {
  const { data } = await host.post(
    "/users/register",
    { email, password, name },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  localStorage.setItem("token", data.accessToken);
  return jwtDecode(data.accessToken);
};

export const refreshToken = async () => {
  const { data } = await authHost.get("/users/refreshToken");

  localStorage.setItem("token", data.accessToken);
  return jwtDecode(data.accessToken);
};

export const userLogout = async () => {
  const { data } = await authHost.get("/users/logout");
  localStorage.removeItem("token");
  return;
};
