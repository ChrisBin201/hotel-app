import { atom, selector } from "recoil";
import fetcher from "../util/fetcher";
import { API_URL } from "../util/url";

export const USER_STATE = atom({
  key: 'userInfo',
  default: undefined,
});

export const LIST_CUSTOMER = atom({
  key: 'listCustomer',
  default: [],
});

export const fetchTopCustomers = async (listCustomer) =>{
  if(!listCustomer) 
  return []
  let topCustomers = []
  for (let customer of listCustomer) {
    // console.log(customer)   
    let listBooking = await fetcher(`${API_URL}/booking/${customer.id}`)
    // console.log(listBooking) 
    let total = 0
    listBooking.forEach(bk => {
      // if(bk.id > 127)
      bk.listBookedRoom.forEach(br => {
        total += br.price
        //total service in a booked room
        total += br.listUsedService.reduce((sum, us) => sum + us.price * us.quantity, 0)
      })
    })
    topCustomers.push({customer: customer, total:total})
  }
  // console.log(topCustomers)
  topCustomers.sort((c1,c2) => c2.total - c1.total)
  return topCustomers
}

export const TOP_CUSTOMERS = atom({
  key: 'topCustomers',
  default: [],
  // get: async ({ get }) => {
  //   const listCustomer = get(LIST_CUSTOMER);
  //   let topCustomers = await listTopCustomers(listCustomer)
  //   topCustomers.sort((c1,c2) => c2.total - c1.total)
  //   // console.log(topCustomers)

  //   return topCustomers.slice(0,5)
  // },
});