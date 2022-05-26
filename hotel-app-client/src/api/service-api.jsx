import { useRecoilState } from "recoil"
import { LIST_SERVICE } from "../state/service-state";
import { LIST_CUSTOMER } from "../state/user-state"
import fetcher from "../util/fetcher";
import { API_URL } from "../util/url";


export const fetchAllServices = async () => {
  const data = await fetcher(`${API_URL}/service`)
  // setTimeout(()=>setRooms(data),2000)
  return data
}

export const deleteService = async (service) => {
  const data = await fetcher(`${API_URL}/service/deleteService/${service.id}`,'DELETE')
  // setTimeout(()=>setRooms(data),2000)
  return data
}

export const editService = async (service) => {
  console.log(service)
  const data = await fetcher(`${API_URL}/service/editService/${service.id}`,'PUT',service)
  console.log(data)
  return data
}

export const addService = async (service) => {
  console.log(service)
  const data = await fetcher(`${API_URL}/service/addService`,'POST',service)
  console.log(data)
  return data
}