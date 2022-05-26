import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import Banner from "../components/Banner"
import Services from "../components/Services"
import { TOKEN_STATE } from "../state/token-state"

export default function Home(){
  const token = useRecoilValue(TOKEN_STATE)
  return(
    <div>
      <Banner title="Luxurious Rooms" subtitle="deluxe rooms starting at 300$">
                <Link to="/rooms" className="px-4 py-2 text-white font-semibold bg-[#3F51B4] rounded-md ">
                      Our Rooms
                </Link>
        </Banner>
      <Services/>
    </div>
  )
}