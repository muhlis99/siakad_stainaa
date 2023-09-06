import React from 'react'
import Navigation from '../component/Navigation'
import { Container } from 'react-bootstrap'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <div className="container-scroller">
                <Navigation />
                <div className=" page-body-wrapper">
                    <Container>
                        <div className="main-panel">
                            {children}
                        </div>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout