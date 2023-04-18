export const beautifyDate = (date) => {
  const newDate = new Date(date);
  const fullYear = newDate.getFullYear();
  const month =
    newDate.getMonth() <= 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const day = newDate.getDate();

  console.log("month: ", month);

  //return '2011-09-11';
  return `${fullYear}-${month}-${day}`;
};
