

export function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return day + '/' + month + '/' + year;
}

export const totalServices = (listUs) =>{
  let total = listUs.reduce((sum,c) => sum + c.price*c.quantity,0)
  return total
}

export const formatListUs = (listUS) =>{
  let list = listUS.map(us => ({ serviceId: us.id, quantity: us.quantity}))
  if(list.every(us => us.quantity===0)) return []
  return list 
}