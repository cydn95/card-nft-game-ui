import { getClient } from "./apiConfig";

const getCardsAPI = () => getClient(false).get("/v1/cards");

export {
  getCardsAPI
}
