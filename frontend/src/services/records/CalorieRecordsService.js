import { postWithToken, getWithToken } from "utils/request/Request";

export async function createRecord(date, items) {
  return postWithToken("/api/records/calorie", {
    date,
    items
  })
  .then(response => response.data);
}

export async function getRecords(start, end) {
  return getWithToken("/api/records/calorie", {
    start,
    end,
  })
  .then(response => response.data);
}