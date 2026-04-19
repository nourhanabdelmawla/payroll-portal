
exports.getCurrentMonthFolder = () => {
  const d = new Date();
  return `${d.toLocaleString('en', { month: 'long' })}-${d.getFullYear()}`;
};
