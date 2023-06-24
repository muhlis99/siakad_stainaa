import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PropagateLoader from "react-spinners/PropagateLoader"

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            {/* <div className='relative min-h-screen h-full w-full min-w-full flex justify-center'><PropagateLoader color="#36d7b7" className='my-auto' /></div> */}
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