export const convertFromWei = (val,fixed = 4) => (Number(val) / Math.pow(10, 18)).toFixed(fixed);
