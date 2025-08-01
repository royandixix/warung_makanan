export const numberWithCommas = (x) => {
    if (x === null || x === undefined || isNaN(Number(x))) return "0";
    return Number(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  