import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <Sidebar />
            <section>
                <main>
                    {children}
                </main>
            </section>
        </React.Fragment>
    )
}

export default Layout