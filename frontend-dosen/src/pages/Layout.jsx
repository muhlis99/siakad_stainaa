import React from 'react'
import Navigation from '../component/Navigation'
import { Container } from 'react-bootstrap'
import Footer from '../component/Footer'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className="container-scroller">
                <Navigation />
                <div className=" page-body-wrapper">
                    <Container>
                        <div className="main-panel" style={{ color: '#5E7C60' }}>
                            {children}
                        </div>
                    </Container>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Layout