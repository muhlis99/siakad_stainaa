import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ClockLoader from "react-spinners/ClockLoader"

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [color, setColor] = useState("#000000")

    return (
        <React.Fragment>
            <div className='relative'>
                <div className='absolute z-50 w-full min-h-screen bg-white hidden'>
                    <ClockLoader
                        color={color}
                        loading={loading}
                        className='mx-auto mt-60'
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                <div className="drawer lg:drawer-open absolute">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
                        <Navbar />
                        {children}
                        <Footer />
                    </div>
                    <Sidebar />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout