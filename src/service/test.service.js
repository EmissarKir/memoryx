import httpService from "./http.service";

const testsEndPoint = `tests/`;

const testService = {
  create: async (content) => {
    const { data } = await httpService.post(testsEndPoint, content);
    return data;
  },
  fetch: async (userId) => {
    const { data } = await httpService.get(testsEndPoint, {
      params: {
        orderBy: '"userId"',
        equalTo: `"${userId}"`,
      },
    });
    return data;
  },
  // fetch: async () => {
  //   const { data } = await httpService.get(testsEndPoint);
  //   return data;
  // },
};
export default testService;
