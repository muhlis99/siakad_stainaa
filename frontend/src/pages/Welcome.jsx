import React from 'react'
import { Link } from 'react-router-dom';
import stainaa from "../assets/img/stainaacover.png";

const Welcome = () => {
  return (
    <>
      <section className='bg-white'>
        <div className="grid max-w-screen-xl px-4 pt-20 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt- overflow-hidden">
          <div className="mr-auto place-self-center lg:col-span-9">
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl '>Selamat Datang Di<br /> SIAKAD</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Sekolah Tinggi Agama Islam Nurul Abror Al-Robbaniyin <br /> Jl. KH. Agus Salim 165 Alasbuluh Wongosrejo Banyuwangi
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Link to="/login" className="items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 rounded-lg sm:w-auto focus:ring-4 border border-[#2D7F5F] hover:bg-[#2D7F5F] hover:text-white">
                Log in
              </Link>
              <Link className="items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 rounded-lg sm:w-auto focus:ring-4 border border-[#2D7F5F] hover:bg-[#2D7F5F] hover:text-white">
                Informasi
              </Link>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-3 lg:flex">
            <img src={stainaa} alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Welcome