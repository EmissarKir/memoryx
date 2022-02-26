import httpService from "./http.service";

const tasksEndPoint = `tasks/`;

const taskService = {
  fetch: async (testId) => {
    const { data } = await httpService.get(tasksEndPoint, {
      params: {
        orderBy: '"testId"',
        equalTo: `"${testId}"`,
      },
    });
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(tasksEndPoint, content);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(tasksEndPoint + id);
    return data;
  },
  updateCount: async (id, content) => {
    const { data } = await httpService.patch(tasksEndPoint + id, content);
    return data;
  },
  update: async (id, content) => {
    const { data } = await httpService.put(tasksEndPoint + id, content);
    return data;
  },
};
export default taskService;
