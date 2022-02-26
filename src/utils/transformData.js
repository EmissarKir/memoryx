export function transormData(data) {
  return data
    ? Object.keys(data).map((key) => ({
        ...data[key],
        _id: key,
      }))
    : [];
}
