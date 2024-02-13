// Convert the number to a formatted string
const addCurrency = num => {
  return `$${num?.toFixed(2)}`;
};

export default addCurrency;
