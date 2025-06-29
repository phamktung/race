export const currentDate = () => {
  let date = new Date()
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return dd +
      "/" + mm +
      "/" + yyyy;
}

export function convertDateString(text) {
  /*yyyy-mm-dd hh:ss -> dd/mm/yyyy*/
  let dn = text;
  const dateArray = text?.split(" ");
  if(dateArray?.length > 0){
    const d = dateArray[0]?.split("-");
    dn = d[2] + "/" + d[1] + "/" + d[0];
  }
  return dn;
}