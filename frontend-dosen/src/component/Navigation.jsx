import { useState, useEffect } from "react"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import logo from "../assets/images/stainaa.png"
import face from "../assets/images/faces/face1.jpg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LogOut, reset } from "../features/authSlice"
import Swal from "sweetalert2"
import axios from "axios"

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [nama, setNama] = useState("")
    // const []

    useEffect(() => {
        const getDataSession = async () => {
            try {
                if (user) {
                    if (user.data.role == 'mahasiswa') {
                        const response = await axios.get(`v1/mahasiswa/getByNim/${user.data.username}`)
                        setNama(response.data.data.nama)
                    } else {
                        setNama(user.data.username)
                    }
                }
            } catch (error) {

            }
        }
        getDataSession()
    }, [user])

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
                        <div className="d-xs-none">
                            <h3 className="mt-2 font-weight-bold">SIAKAD STAINAA</h3>
                        </div>
                    </Link>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <nav className="navbar-nav navbar-nav-right">
                            <NavDropdown className="nav-profile" id="nav-dropdown-dark-example" title={
                                <>
                                    <div className="nav-profile-img">
                                        <img src={face} alt="image" />
                                    </div>
                                    <div className="nav-profile-text">
                                        <p className="text-black font-weight-semibold m-0">{nama} </p>
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
                        <Link to="/profil" className="nav-link text-light">Profil</Link>
                        <NavDropdown title={
                            <span className="text-light">Perkuliahan</span>
                        } id="basic-nav-dropdown">
                            <Link to="/pengumuman" className="dropdown-item">Pengumuman</Link>
                            <Link to="/karturencanastudi" className="dropdown-item">Kartu Rencana Studi</Link>
                            <Link to="/jadwalkuliah" className="dropdown-item">Jadwal Kuliah</Link>
                            <Link to="/kartuhasilstudi" className="dropdown-item">Kartu Hasil Studi</Link>
                            <Link to="/berhentistudi" className="dropdown-item">Berhenti Studi</Link>
                        </NavDropdown>
                        <Link to="/chat" className="nav-link text-light">Chat</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation