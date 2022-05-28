import { Button, Checkbox, Dialog, div, DialogContent, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LIST_BOOKEDROOM } from "../state/booking-state";
import fetcher from "../util/fetcher";
import { API_URL } from "../util/url";
import Services from "./UseService"
export default function CardRoom({ room, handleSelectRoom }) {

  const [useServices, setUseServices] = useState([])
  const [bookedRoom, setBookedRoom] = useRecoilState(LIST_BOOKEDROOM)
  const [openDialog, setOpenDialog] = useState(false)
  const [checked, setChecked] = useState(false)
  async function fetchServices() {

    const data = await fetcher(`${API_URL}/service`)
    let listUS = data.map(us => {
      return { ...us, quantity: 0 }
    })
    setUseServices(listUS)
  }

  const handleChange = (r, isChecked) => {
    let br = {
      ...r,
      listUsedService: []
    }
    console.log(r)
    console.log(isChecked)
    handleSelectRoom(br, isChecked)
    setChecked(isChecked)
    if (!isChecked) {
      let listUS = useServices.map(us => {
        return { ...us, quantity: 0 }
      })
      setUseServices([...listUS])
    }

  }

  useEffect(() => {
    if (bookedRoom.findIndex(br => br.id === room.id) === -1)
      setChecked(false)
    else if (bookedRoom.findIndex(br => br.id === room.id) !== -1)
      setChecked(true)
  }, [bookedRoom])

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg flex flex-col">
      <img class="w-full h-[250px]" src={room.image} alt="Mountain" />
      <div class="px-6 pt-3">
        <div className="flex gap-4 items-center" >
          <div class="font-bold text-xl mb-2">{room.name}</div>
          <span class="inline-block px-4 py-2 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
            {room.type}
          </span>
        </div>
        <p class="text-gray-700 text-base text-ellipsis overflow-hidden h-[72px]">{room.description}</p>
      </div>
      <div class=" px-3 py-3 flex items-center justify-between">
        <div className="flex items-center" >
          <span class="font-semibold mr-2">Price</span>&nbsp;
          <span class="font-bold text-xl">{room.price}</span>&nbsp;
          <span class="text-sm font-semibold">$</span>
          <span class="text-sm font-semibold">/day</span>
          </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => handleChange(room, e.target.checked)} />}
          className=""
          label="Book"
          value={room.id}

        />
      </div>
      <Button disabled={!checked} variant="contained" onClick={() => setOpenDialog(true)} >Services</Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={openDialog}
      // onClose={() => setOpenDialog(false)}
      >
        {/* <DialogTitle >Optional sizes</DialogTitle> */}
        <DialogContent>
          {useServices &&
            <Services room={room} useServices={useServices} setUseServices={setUseServices} />}
        </DialogContent>
        <div className="flex justify-center pb-5" >
          <Button variant="contained" onClick={() => setOpenDialog(false)} >OK</Button>
        </div>
      </Dialog>
    </div>
  )
}