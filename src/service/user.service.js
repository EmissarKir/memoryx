import httpService from "./http.service";
import { getUserId } from "./localStorage.service";

const usersEndPoint = `users/`;

const usersService = {
  fetch: async () => {
    const { data } = await httpService.get(usersEndPoint);
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.put(
      usersEndPoint + content.userId,
      content
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(usersEndPoint + getUserId());
    return data;
  },
};
export default usersService;
