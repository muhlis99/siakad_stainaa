// import { Container } from "react-bootstrap"
const Footer = () => {
    return (
        <footer className="footer " style={{ background: '#D5D6C6', height: '50px' }}>
            <div className="container mt-2">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-xs d-block d-sm-inline-block mt-2">Copyright &copy; 2023 <a
                        href="https://www.stainaa.ac.id" className="text-decoration-none" target="_blank">STAINAA</a>. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer