export default (value: number) => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");