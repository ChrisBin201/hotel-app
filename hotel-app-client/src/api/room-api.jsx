import { useRecoilState } from "recoil"
import { LIST_ROOM } from "../state/room-state"
import fetcher, { typeData } from "../util/fetcher";
import { API_URL } from "../util/url";

export const fetchAllRooms = async () => {

  const data = await fetcher(`${API_URL}/rooms`)
  console.log(data)
  // setTimeout(()=>setRooms(data),2000)
  return data  
}

export const fetchRoomStat = async (listRoom) =>{
  if(!listRoom) 
  return []
  let roomStat = []
  for (let room of listRoom) {
    // console.log(customer)   
    let bookedRoomStat=[]
    let listBooking = await fetcher(`${API_URL}/booking/room/${room.id}`)
    // console.log(listBooking) 
    let total = 0
    listBooking.forEach(br => {
      // if(bk.id > 127)
        
        // total += br.price
        //total service in a booked room
        // total += br.listUsedService.reduce((sum, us) => sum + us.price * us.quantity, 0)
        let totalBr =br.price
        totalBr += br.listUsedService.reduce((sum, us) => sum + us.price * us.quantity, 0)
        total+=totalBr
        bookedRoomStat.push({bookedRoom: br,total: totalBr})
    })
    roomStat.push({room: room,listBooking:bookedRoomStat, total:total})
  }
  // console.log(topCustomers)
  roomStat.sort((r1,r2) => r2.total - r1.total)
  return roomStat
}

export const fetchTypeRooms = async () => {

  const data = await fetcher(`${API_URL}/rooms/types`)
  console.log(data)
  // setTimeout(()=>setRooms(data),2000)
  return data  
}

export const deleteRoom = async (room) => {
  const data = await fetcher(`${API_URL}/rooms/deleteRoom/${room.id}`,'DELETE')
  // setTimeout(()=>setRooms(data),2000)
  return data
}

export const editRoom = async (room, imgFile) => {
  console.log(room)
  const formData = new FormData()
  for(const name in room) {
    formData.append(name, room[name]);
  }
  formData.append("img",imgFile)
  const data = await fetcher(`${API_URL}/rooms/editRoom/${room.id}`,'PUT',formData,typeData.formData)
  console.log(formData.get("img"))
  return data
}

export const addRoom = async (room) => {
  console.log(room)
  const formData = new FormData()
  for(const name in room) {
    formData.append(name, room[name]);
  }
  const data = await fetcher(`${API_URL}/rooms/addRoom`,'POST',formData, typeData.formData)
  console.log(data)
  return data
}