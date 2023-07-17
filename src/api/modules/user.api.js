import privateClient from "../client/private.client";

const userEndpoints = {
  login: "user/login",
  getInfo: "user/info",
};

const userApi = {
  login: async ({ email, password }) => {
    try {
      const response = await privateClient.post(userEndpoints.login, {
        email,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
