import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import logo from "../assets/images/stainaa.png"
import face from "../assets/images/faces/face1.jpg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LogOut, reset } from "../features/authSlice"
import Swal from "sweetalert2"

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const logOut = () => {
        Swal.fire({
            title: "Anda Yakin Untuk Keluar?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(LogOut())
                dispatch(reset())
                navigate("/login")
            }
        })
    }

    return (
        <div className="horizontal-menu">
            <Navbar className="top-navbar p-0">
                <Container>
                    <Link to="/" className="navbar-brand d-flex gap-2">
                        <div className="shadow rounded-circle">
                            <img
                                alt=""
                                src={logo}
                                width="45"
                                height="45"
                                className="rounded-circle"
                            />
                        </div>
                        <h3 className="mt-2 font-weight-bold">SIAKAD STAINAA</h3>
                    </Link>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <nav className="navbar-nav navbar-nav-right">
                            <NavDropdown className="nav-profile" id="nav-dropdown-dark-example" title={
                                <>
                                    <div className="nav-profile-img">
                                        <img src={face} alt="image" />
                                    </div>
                                    <div className="nav-profile-text">
                                        <p className="text-black font-weight-semibold m-0">{user && user.data.username} </p>
                                        <span className="font-13 online-color">{user && user.data.role}</span>
                                    </div>
                                </>
                            }>
                                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </nav>
                    </div>
                </Container>
            </Navbar>
            <Navbar bg="primary" className="bottom-navbar p-0">
                <Container>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link text-light">Dashboard</Link>
                        <NavDropdown title={
                            <span className="text-light">Dropdown</span>
                        } id="basic-nav-dropdown">
                            <Link to="/table" className="dropdown-item">KHS</Link>
                            <Link to="/input" className="dropdown-item">cek</Link>
                        </NavDropdown>
                        <Link to="/chat" className="nav-link text-light">Chat</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation