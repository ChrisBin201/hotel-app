import { Button, Checkbox, Dialog, DialogContent, FormControlLabel } from "@mui/material";
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
    handleSelectRoom(br, isChecked)
    setChecked(isChecked)
    if (!isChecked) {
      let listUS = useServices.map(us => {
        return { ...us, quantity: 0 }
      })
      setUseServices([...listUS])
    }

  }

  useEffect(() =>{
    if(bookedRoom.findIndex(br => br.id ===room.id)===-1)
      setChecked(false)
  },[bookedRoom])

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg flex flex-col gap-2">
      <img class="w-full h-[250px]" src={room.image} alt="Mountain" />
      <div class="px-6 ">
        <div class="font-bold text-xl mb-2">{room.name}</div>
        <p class="text-gray-700 text-base">{room.description}</p>
      </div>
      <div class="px-6">
        <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
          {room.type}
        </span>
      </div>
      <div class=" px-3 pb-3 flex items-center">
        <span class="text-sm font-semibold">Price</span>&nbsp;<span class="font-bold text-xl">{room.price}</span>&nbsp;<span class="text-sm font-semibold">$</span>
      </div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => handleChange(room, e.target.checked)} />}
        className="w-full"
        label="Book"
        value={room.id}

      />
      <Button disabled={!checked} variant="contained" onClick={() => setOpenDialog(true)} >Services</Button>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        {/* <DialogTitle >Optional sizes</DialogTitle> */}
        <DialogContent>
          {useServices &&
            <Services room={room} useServices={useServices} setUseServices={setUseServices} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}