import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div>
                <div className="drawer lg:drawer-open font-sans">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content bg-base-200 flex flex-col scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
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