import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { fetchTypeRooms } from "../api/room-api"
import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Services from "../components/Services"
import { TOKEN_STATE } from "../state/token-state"

const types = [
  {
  name:"SINGLE",
  image:"types/single.png"
},
{
  name:"DOUBLE",
  image:"types/double.png"
},
{
  name:"VIP",
  image:"types/vip.png"
},
{
  name:"FAMILY",
  image:"types/family.png"
},
]


export default function Home() {
  const token = useRecoilValue(TOKEN_STATE)
  // const [types, setTypes] = useState()
  // useEffect(() => {
  //   (async function () {
  //     let list = await fetchTypeRooms()
  //     setTypes(list)
  //   })()
  // }, [])
  return (
    <div  >
      <Banner title="Welcome to our hotel" subtitle="The best hotel reservation">
        <Link to="/rooms" className="px-5 py-3 text-white font-semibold bg-[#3F51B4] rounded-md ">
          Our Rooms
        </Link>
      </Banner>
      <Services />
      <div>
        <div className="container-fluid services bg-gray-100 flex flex-col items-center px-5 py-12 gap-8">
          <h3 className='text-5xl font-semibold' >Featured Rooms</h3>
          <div className="flex gap-10">
            {types.map((item, index) => {
              return (
                <div className="flex flex-col gap-3" key={index}>
                      <img className="rounded-lg w-72 h-52" src={item.image} ></img>
                      <h6 className='font-bold text-xl text-amber-700' >{item.name}</h6>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}