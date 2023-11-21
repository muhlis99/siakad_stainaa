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
    const [level, setLevel] = useState("")
    const [dosen, setDosen] = useState([])
    const location = useLocation()

    useEffect(() => {
        const getDataSession = async () => {
            try {
                if (user) {
                    if (user.data.role == 'mahasiswa') {
                        const response = await axios.get(`v1/mahasiswa/getByNim/${user.data.username}`)
                        setNama(response.data.data.nama)
                        setLevel(user.data.role)
                    } else if (user.data.role == 'dosen') {
                        const response = await axios.get(`v1/dosen/getByNipy/${user.data.username}`)
                        setNama(response.data.data.nama)
                        setLevel(user.data.role)
                    }
                }
            } catch (error) {

            }
        }
        getDataSession()
    }, [user])

    useEffect(() => {
        const getVerifikasiDosen = async () => {
            try {
                if (user) {
                    if (user.data.role == 'dosen') {
                        const response = await axios.get(`v1/pembimbingAkademik/verifikasiDosenPembimbing/${user.data.username}`)
                        setDosen(response.data.data)
                    }
                }
            } catch (error) {

            }
        }
        getVerifikasiDosen()
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
                    <Link to="/dashboard" className="navbar-brand d-flex gap-2">
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
                                        <span className="font-13 text-capitalize">{level}</span>
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
                    {level == 'mahasiswa' ?
                        <Nav className="me-auto">
                            <Link to="/dashboard" className={`nav-link text-light ${location.pathname == '/dashboard' ? 'active fw-bold' : ''} `}>Dashboard</Link>
                            <Link to="/profil" className={`nav-link text-light ${location.pathname == '/profil' ? 'active fw-bold' : ''} `}>Profil</Link>
                            <NavDropdown align="end" title={
                                <span className="text-light">Perkuliahan</span>
                            } id="basic-nav-dropdown">
                                <Link to="/pengumuman" className={`dropdown-item ${location.pathname == '/pengumuman' ? 'active' : ''}`}>Pengumuman</Link>
                                <div className="dropdown dropend">
                                    <button className="w-full text-[16px] dropdown-toggle text-left px-6 hover:bg-[#D5D6C6] hover:text-white py-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Kartu Rencana Studi
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link to="/karturencanastudi" className={`dropdown-item ${location.pathname == '/karturencanastudi' ? 'active' : ''}`}>Paket</Link></li>
                                        <li><Link to="/nonpaket" className={`dropdown-item ${location.pathname == '/nonpaket' ? 'active' : ''}`} >Non Paket</Link></li>
                                        <li><Link to="/historykrs" className={`dropdown-item ${location.pathname == '/historykrs' ? 'active' : ''}`}>History</Link></li>
                                    </ul>
                                </div>
                                <Link to="/jadwalkuliah" className={`dropdown-item ${location.pathname == '/jadwalkuliah' ? 'active' : ''}`}>Jadwal Kuliah</Link>
                                <Link to="/kartuhasilstudi" className={`dropdown-item ${location.pathname == '/kartuhasilstudi' ? 'active' : ''}`}>Kartu Hasil Studi</Link>
                                <Link to="/pengajuanstudi" className={`dropdown-item ${location.pathname == '/berhentistudi' ? 'active' : ''}`}>Pengajuan Studi</Link>
                            </NavDropdown>
                            <Link to="/chat" className={`nav-link text-light ${location.pathname == '/chat' ? 'active fw-bold' : ''} `}>Konsultasi</Link>
                        </Nav>
                        :
                        <Nav className="me-auto">
                            <Link to="/dashboard" className={`nav-link text-light ${location.pathname == '/dashboard' ? 'active fw-bold' : ''} `}>Dashboard</Link>
                            <Link to="/profile" className={`nav-link text-light ${location.pathname == '/profile' ? 'active fw-bold' : ''} `}>Profil</Link>
                            <NavDropdown align="end" title={
                                <span className="text-light">Perkuliahan</span>
                            } id="basic-nav-dropdown">
                                <Link to="/pengumuman" className={`dropdown-item ${location.pathname == '/pengumuman' ? 'active' : ''}`}>Pengumuman</Link>
                                {dosen &&
                                    <>
                                        <Link to="/mhsasuh" className={`dropdown-item ${location.pathname == '/mhsasuh' ? 'active' : ''}`}>Mahasiswa Asuh</Link>
                                        <Link to="/krsmhs" className={`dropdown-item ${location.pathname == '/krsmhs' || location.pathname == '/viewkrs' ? 'active' : ''}`}>Kartu Rencana Studi</Link>
                                    </>
                                }
                                <Link to="/jadwal" className={`dropdown-item ${location.pathname == '/jadwal' ? 'active' : ''}`}>Jadwal Kuliah</Link>
                                <Link to="/penilaian" className={`dropdown-item ${location.pathname == '/penilaian' ? 'active' : ''}`}>Penilaian</Link>
                                {dosen &&
                                    <Link to="/studimhs" className={`dropdown-item ${location.pathname == '/studimhs' ? 'active' : ''}`}>Studi Mahasiswa</Link>
                                }
                            </NavDropdown>
                            <Link to="/chat" className={`nav-link text-light ${location.pathname == '/chat' ? 'active fw-bold' : ''} `}>Konsultasi</Link>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </div >
    )
}

export default Navigation