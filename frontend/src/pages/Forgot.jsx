import React from 'react'
import stainaa from "../assets/img/stainaa.png";

const Forgot = () => {
    return (
        <div>
            <div className="w-full h-40 bg-[#2D7F5F] rounded-b-3xl pt-5">
                <div className="w-1/3 mx-auto flex gap-4 justify-center">
                    <img src={stainaa} alt="" className='w-24 relative' />
                    <div className="pt-1">
                        <h1 className='text-white text-6xl font-bold tracking-widest'>SIAKAD</h1>
                        <p className="text-sm tracking-wider text-white">STAI NURUL ABROR AL-ROBBANIYIN</p>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 xs:w-1/3 h-56  relative mx-auto">
                <div className="w-full h-60 bg-white shadow-md rounded-3xl absolute -top-7 text-center pt-5">
                    <p className="text-xl tracking-wider">Untuk mengganti password</p>
                    <p className="text-xl mt-4 mb-5 tracking-wider">Silakan masukkan email aktif anda</p>
                    <div className="w-full">
                        <label htmlFor="email" className='text-xl'>Email</label>
                        <input type="email" id='email' className='shadow-md border border-gray-400 w-1/2 h-10 rounded-lg ml-4' />
                    </div>
                    <div className="relative mx-auto w-1/2 mt-5 bg-black">
                        <button className='bg-[#2D7F5F] rounded-md text-white p-1 h-9 w-28 text-lg font-bold absolute left-14 '>Kirim</button>
                        <button className='bg-[#ff0000] rounded-md text-white p-1 h-9 w-28 text-lg font-bold absolute right-0'>Batal</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot