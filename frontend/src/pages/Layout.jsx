import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
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