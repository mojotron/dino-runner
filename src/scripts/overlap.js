export default (a, b) => {
  if (
    a.top - 10 > b.bottom ||
    a.right - 10 < b.left ||
    a.bottom - 10 < b.top ||
    a.left - 10 > b.right
  ) {
    return false;
  }
  return true;
};
