import { useState, useEffect } from "react"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import logo from "../assets/images/stainaa.png"
import face from "../assets/images/man2.png"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LogOut, reset } from "../features/authSlice"
import Swal from "sweetalert2"
import axios from "axios"
import { FaTh } from "react-icons/fa"

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [nama, setNama] = useState("")
    const location = useLocation()

    useEffect(() => {
        const getDataSession = async () => {
            try {
                if (user) {
                    if (user.data.role == 'mahasiswa') {
                        const response = await axios.get(`v1/mahasiswa/getByNim/${user.data.username}`)
                        setNama(response.data.data.nama)
                        console.log(response.data.data);
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
                        {/*  */}
                        <div className=" h-11 w-11 my-auto rounded-full shadow-xl"><img src={logo} width={44} /></div>
                        <div className="hidden lg:block">
                            <h3 className="mt-2 font-weight-bold" style={{ color: '#5E7C60' }}>SIAKAD STAINAA</h3>
                        </div>
                    </Link>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <nav className="navbar-nav navbar-nav-right">
                            <NavDropdown className="nav-profile" id="nav-dropdown-dark-example" title={
                                <>
                                    <div className="nav-profile-img">
                                        <img src={face} alt="image" width={1} />
                                    </div>
                                    <div className="nav-profile-text" style={{ color: '#5E7C60' }}>
                                        <p className="font-weight-semibold m-0">{nama} </p>
                                        <span className="font-13 text-capitalize">{user && user.data.role}</span>
                                    </div>
                                </>
                            }>
                                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </nav>
                        <button className="bg-danger navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                            data-toggle="horizontal-menu-toggle">
                            <span><FaTh /></span>
                        </button>
                    </div>
                </Container>
            </Navbar>
            <Navbar className="bottom-navbar p-0 navbar-light shadow" style={{ background: '#5E7C60' }}>
                <Container>
                    <Nav className="me-auto">
                        <Link to="/" className={`nav-link text-light ${location.pathname == '/' ? 'active fw-bold' : ''} `}>Dashboard</Link>
                        <Link to="/profil" className={`nav-link text-light ${location.pathname == '/profil' ? 'active fw-bold' : ''} `}>Profil</Link>
                        <NavDropdown align="end" title={
                            <span className="text-light">Perkuliahan</span>
                        } id="basic-nav-dropdown">
                            {/* <Link to="/pengumuman" className={`dropdown-item ${location.pathname == '/pengumuman' ? 'active' : ''}`}>Pengumuman</Link> */}
                            <div className="dropdown dropend">
                                <button className="w-full text-[16px] dropdown-toggle text-left pl-6 hover:bg-[#D5D6C6] hover:text-white py-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Kartu Rencana Studi
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link to="/karturencanastudi" className={`dropdown-item ${location.pathname == '/karturencanastudi' ? 'active' : ''}`}>Paket</Link></li>
                                    <li><a className="dropdown-item" href="#">Non Paket</a></li>
                                </ul>
                            </div>
                            {/* <Link to="/karturencanastudi" className={`dropdown-item ${location.pathname == '/karturencanastudi' ? 'active' : ''}`}>Kartu Rencana Studi</Link> */}
                            <Link to="/historykrs" className={`dropdown-item ${location.pathname == '/historykrs' ? 'active' : ''}`}>History Kartu Rencana Studi</Link>
                            <Link to="/jadwalkuliah" className={`dropdown-item ${location.pathname == '/jadwalkuliah' ? 'active' : ''}`}>Jadwal Kuliah</Link>
                            <Link to="/kartuhasilstudi" className={`dropdown-item ${location.pathname == '/kartuhasilstudi' ? 'active' : ''}`}>Kartu Hasil Studi</Link>
                            <Link to="/pengajuanstudi" className={`dropdown-item ${location.pathname == '/berhentistudi' ? 'active' : ''}`}>Pengajuan Studi</Link>
                        </NavDropdown>
                        {/* <Link to="/chat" className={`nav-link text-light ${location.pathname == '/chat' ? 'active fw-bold' : ''} `}>Chat</Link> */}
                    </Nav>
                </Container>
            </Navbar>
        </div >
    )
}

export default Navigation