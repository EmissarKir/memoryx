import httpService from "./http.service";

const categoryEndPoint = `categories/`;

const categoryService = {
  fetch: async (testId) => {
    const { data } = await httpService.get(categoryEndPoint, {
      params: {
        orderBy: '"testId"',
        equalTo: `"${testId}"`,
      },
    });
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(categoryEndPoint, content);
    return data;
  },
  // delete: async (id) => {
  //   const { data } = await httpService.delete(tasksEndPoint + id);
  //   return data;
  // },
  // update: async (id, content) => {
  //   const { data } = await httpService.patch(tasksEndPoint + id, content);
  //   return data;
  // },
};
export default categoryService;
