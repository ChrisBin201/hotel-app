import { useRecoilState } from "recoil"
import { LIST_CUSTOMER } from "../state/user-state"
import fetcher from "../util/fetcher";
import { API_URL } from "../util/url";


export const fetchAllCustomers = async () => {
  const data = await fetcher(`${API_URL}/users/customers`)
  // console.log(data)
  // setTimeout(()=>setRooms(data),2000)
  return data
}

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