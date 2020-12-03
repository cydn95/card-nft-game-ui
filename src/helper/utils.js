import { CARD_TYPE } from "./constant";

export const convertFromWei = (val, fixed = 4) =>
  (Number(val) / Math.pow(10, 18)).toFixed(fixed);

export const cardCompare = (a, b) => {
  let aScore = 0;
  let bScore = 0;

  if (CARD_TYPE.HERO.includes(a.series)) aScore += 10000;
  if (CARD_TYPE.HERO.includes(b.series)) bScore += 10000;

  aScore += a.rarity.weight;
  bScore += b.rarity.weight;

  if (aScore > bScore) return -1;
  if (bScore > aScore) return 1;

  return 0;
};
