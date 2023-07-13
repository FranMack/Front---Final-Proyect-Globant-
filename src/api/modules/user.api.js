import privateClient from "../client/private.client";

const userEndpoints = {
  login: "user/login",
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
};

export default userApi;
