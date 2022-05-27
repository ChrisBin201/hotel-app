import React from 'react'

export default function Banner({ children, title, subtitle }) {
    return (
        // <div className="h-[500px] bg- bg-home">
        //     <h1>{title}</h1>  
        //     <div/>
        //     <p>{subtitle}</p>
        //     {children}
        // </div>
        <div class="w-full h-[600px] bg-cover bg-center bg-home" >
            <div class="flex  items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                <div class=" flex flex-col gap-3 text-white text-2xl font-semibold uppercase md:text-3xl text-center  ">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                    <div className='mt-3' >{children}</div>
                </div>
            </div>
        </div>
    )
}
