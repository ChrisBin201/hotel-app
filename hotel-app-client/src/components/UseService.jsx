import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useRecoilState } from "recoil";
import { LIST_BOOKEDROOM } from "../state/booking-state";
import { FormGroup } from "@mui/material";
export default function UseService({ room, useServices, setUseServices }) {

  const [bookedRoom, setBookedRoom] = useRecoilState(LIST_BOOKEDROOM)

  const handleIncrease = (us) => {
    let listUS = [...useServices]
    // console.log(us)
    listUS = listUS.map(u => {
      if (u.id === us.id) {
        console.log(us)
        return { ...u, quantity: u.quantity + 1 }
      }
      return u
    })
    setUseServices([...listUS])
    console.log(listUS)
  }

  const handleDecrease = (us) => {
    let listUS = [...useServices]
    listUS = listUS.map(u => {
      if (u.id === us.id) {
        if (u.quantity > 0)
          return { ...u, quantity: u.quantity - 1 }
      }
      return u
    })
    setUseServices(listUS)
  }

  useEffect(() => {
    let listBr = [...bookedRoom]
    listBr = listBr.map(br => {
      if (br.id === room.id) {
        return { ...br, listUsedService: useServices }
      }
      return br
    })
    setBookedRoom([...listBr])
    console.log(listBr)
  }, [useServices])
  console.log(bookedRoom)
  console.log(useServices)
  return (
    <div className="flex justify-between items-center gap-12 px-10 pt-5" >
      <div class="rounded overflow-hidden  flex  gap-2">
        <img class="w-48" src={room.image} alt="Mountain" />
        <div className="flex flex-col gap-2" >
          <div class="px-6">
            <div class="font-bold text-xl mb-2">{room.name}</div>
            <p class="text-gray-700 text-base">{room.description}</p>
          </div>
          <div class="px-6">
            <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              {room.type}
            </span>
          </div>
          <div class=" px-6 pb-3 flex items-center">
            <span class="text-sm font-semibold">Price</span>&nbsp;<span class="font-bold text-xl">{room.price}</span>&nbsp;<span class="text-sm font-semibold">$</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 p-3" >
        <div className="font-bold text-2xl" >Services</div>
        <div className="flex flex-col gap-3 px-3 h-[100px] overflow-auto " >
          {useServices.map((us, i) =>
            <div key={us.id} className="flex gap-4 sm:gap-7" >
              <div className="w-full flex gap-1" >
                <div className=" capitalize font-semibold" >{us.name}</div>
                <span>{`(${us.price}$)`}</span>
              </div>
              <div className="flex gap-5 ">
                <button disabled={us.quantity < 1} onClick={() => handleDecrease(us)} className="w-6 h-6 border border-[#DCDFE6] rounded" >-</button>
                <span>{us.quantity}</span>
                <button onClick={() => handleIncrease(us)} className="w-6 h-6 border border-[#DCDFE6] rounded" >+</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}