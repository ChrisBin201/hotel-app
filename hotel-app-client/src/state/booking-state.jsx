import { atom, selector } from "recoil";

export const BOOKING_STATE = atom({
  key: 'booking',
  default: {},
});

export const LIST_BOOKEDROOM = atom({
  key:"listBookedRoom",
  default: []
})

export const LIST_BOOKING = atom({
  key: 'listBooking',
  default: [],
});

export const REVENUE_BOOKINGS = selector({
  key: 'revenueBookings',
  get: ({get}) => {
    const listBooking = get(LIST_BOOKING);
    let total =0
    listBooking.forEach(bk =>{
      // if(bk.id > 127)
      bk.listBookedRoom.forEach( br =>{
        total+=br.price
        //total service in a booked room
        total+=br.listUsedService.reduce((sum, us) => sum + us.price*us.quantity,0)
      } )
    })
    
    return total
  },
});