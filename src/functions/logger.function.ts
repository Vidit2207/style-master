export const logger = (
  value: object | string | number,
  debug: boolean = false
) => {
  if (debug) {
    console.log(value);
  }
};
