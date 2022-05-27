import React, { Component } from 'react'
// import Title from './Title'
// import {FaCocktail, FaHiking , FaShuttleVan,FaBeer} from 'react-icons/fa'
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HikingIcon from '@mui/icons-material/Hiking';
import SportsBarIcon from '@mui/icons-material/SportsBar';
export default class Services extends Component {
    state={
        services:[
            {
                icon:<LocalBarIcon color='info' fontSize='large' />,
                title: "Free CockTail",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },
            {
                icon:<HikingIcon color='info' fontSize='large' />,
                title: "Endless Hiking",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },
            {
                icon:<AirportShuttleIcon color='info' fontSize='large' />,
                title: "Free Shuttle",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },
            {
                icon:<SportsBarIcon color='info' fontSize='large'  />,
                title: "Unlimited Beer",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },

        ]
    }
    render() {
        return (
            <div className="container-fluid services bg-gray-100 flex flex-col items-center px-5 py-12 gap-5">
             {/* <Title title="Services" /> */}
                <h3 className='text-5xl font-semibold' >Free Services</h3>
                <div className="flex gap-5">
                   {this.state.services.map((item, index) => {
                      return(
                        <div className="py-3 mx-auto my-3 bg-white" key={index}>
                            <div className=" border-0 p-4">
                                <article className="flex flex-col gap-3 items-center">
                                <span >{item.icon}</span>
                                <h6 className='font-bold text-xl' >{item.title}</h6>
                                <p>{item.info}</p>
                                </article>              
                           </div>
                        </div>
                      )
                   })}
                </div>
            </div>
        )
    }
}