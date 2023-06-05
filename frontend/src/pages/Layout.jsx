import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            {/* <div id="loading" className='bg-black opacity-25 w-full h-full fixed text-center items-center justify-center left-0 top-0 min-h-full z-[99999] hidden'>
                <img src={loading} alt="" className='h-52 w-52 my-1 mx-auto mt-[200px]' />
            </div> */}
            <div className="drawer drawer-mobile">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
                    <Navbar />
                    {children}
                    <Footer />
                </div>
                <Sidebar />
            </div>
        </React.Fragment>
    )
}

export default Layout