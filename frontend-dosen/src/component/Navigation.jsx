import { useState, useEffect } from "react"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import logo from "../assets/images/stainaa.png"
import face from "../assets/images/man2.png"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SiFoursquarecityguide } from "react-icons/si"
import { LogOut, reset } from "../features/authSlice"
import Swal from "sweetalert2"
import axios from "axios"
import { FaBullhorn, FaClock, FaFilePdf, FaListUl, FaTh, FaArchive, FaGraduationCap, FaTasks, FaRegAddressBook } from "react-icons/fa"
import { FaRegBookmark, FaChalkboardUser } from "react-icons/fa6"
import "../assets/css/navigasi.css"

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

        <div className="horizontal-menu z-10 w-full">
            <Navbar className="top-navbar p-0">
                <Container className=" py-0">
                    <Link to="/dashboard" className="navbar-brand d-flex gap-2">
                        <div className=" h-11 w-11 my-auto rounded-full shadow-xl"><img src={logo} width={44} /></div>
                    </Link>
                    {level == 'mahasiswa' ?
                        <Nav className="me-auto relative" style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                            <Link to="/dashboard" className={`text-light nav-link my-3 ${location.pathname == '/dashboard' ? 'active fw-bold' : 'font-semibold'} `}>Dashboard</Link>
                            <li className="nav-item dropdown drop1  absolute">
                                <a className="nav-link dropdown-toggle text-light my-3" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Perkuliahan</a>
                                <ul className="dropdown-menu top-14" id="drop-item-1">
                                    <li>
                                        <Link to="/pengumuman" className={`dropdown-item ${location.pathname == '/pengumuman' ? 'active' : ''}`}><div className="inline-flex gap-2"><FaBullhorn className="mt-1 text-[14px]" />  Pengumuman</div></Link>

                                    </li>
                                    <li>
                                        <div className="dropdown drop2 dropend position-relative">
                                            <button className="w-full text-[16px] dropdown-toggle text-left px-6 hover:bg-[#D5D6C6] hover:text-white py-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <div className="inline-flex gap-2"><FaListUl className="mt-1 text-[14px]" />  Kartu Rencana Studi</div>
                                            </button>
                                            <ul className="dropdown-menu position-absolute" aria-labelledby="dropdownMenuButton1" id="drop-item-2">
                                                <li><Link to="/karturencanastudi" className={`dropdown-item ${location.pathname == '/karturencanastudi' ? 'active' : ''}`}>Paket</Link></li>
                                                <li><Link to="/nonpaket" className={`dropdown-item ${location.pathname == '/nonpaket' ? 'active' : ''}`} >Non Paket</Link></li>
                                                <li><Link to="/historykrs" className={`dropdown-item ${location.pathname == '/historykrs' ? 'active' : ''}`}>History</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/jadwalkuliah" className={`dropdown-item ${location.pathname == '/jadwalkuliah' ? 'active' : ''}`}>
                                            <div className="inline-flex gap-2"><FaClock className="mt-1 text-[14px]" />  Jadwal Kuliah</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/listtugas" className={`dropdown-item ${location.pathname == '/listtugas' ? 'active' : ''}`}>
                                            <div className="inline-flex gap-2"><FaTasks className="mt-1 text-[14px]" />  Tugas Kuliah</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/kartuhasilstudi" className={`dropdown-item ${location.pathname == '/kartuhasilstudi' ? 'active' : ''}`}>
                                            <div className="inline-flex gap-2"><FaFilePdf className="mt-1 text-[14px]" />  Kartu Hasil Studi</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/pengajuanstudi" className={`dropdown-item ${location.pathname == '/pengajuanstudi' || location.pathname == '/tambahpengajuan' || location.pathname == '/updatepengajuan' ? 'active' : ''}`}>
                                            <div className="inline-flex gap-2"><FaArchive className="mt-1 text-[14px]" />  Pengajuan Studi</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/listPedoman" className={`dropdown-item ${location.pathname == '/listPedoman' || location.pathname == '/listPedoman' ? 'active' : ''}`}>
                                            <div className="inline-flex gap-2"><SiFoursquarecityguide className="mt-1 text-[14px]" />  Pedoman</div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <Link to="/chat" className={`text-light nav-link my-3 ${location.pathname == '/chat' ? 'active fw-bold' : ''} `}>Konsultasi</Link>
                        </Nav>
                        : level == 'dosen' ?
                            <Nav className="me-auto">
                                <Link to="/dashboard" className={`text-light nav-link my-3 ${location.pathname == '/dashboard' ? 'active fw-bold' : ''} `}>Dashboard</Link>
                                <li className="nav-item dropdown drop1  absolute">
                                    <a className="nav-link dropdown-toggle text-light my-3" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Perkuliahan</a>
                                    <ul className="dropdown-menu top-14" id="drop-item-1">
                                        <li>
                                            <Link to="/pengumuman" className={`dropdown-item ${location.pathname == '/pengumuman' ? 'active' : ''}`}><div className="inline-flex gap-2"><FaBullhorn className="mt-1 text-[14px]" />  Pengumuman</div></Link>
                                        </li>
                                        {dosen &&
                                            <>
                                                <li>
                                                    <Link to="/mhsasuh" className={`dropdown-item ${location.pathname == '/mhsasuh' ? 'active' : ''}`}>
                                                        <div className="inline-flex gap-2"><FaGraduationCap className="mt-1 text-[14px]" /> Mahasiswa Asuh</div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/krsmhs" className={`dropdown-item ${location.pathname == '/krsmhs' || location.pathname == '/viewkrs' ? 'active' : ''}`}>
                                                        <div className="inline-flex gap-2"><FaListUl className="mt-1 text-[14px]" /> Kartu Rencana Studi</div>
                                                    </Link>
                                                </li>
                                            </>
                                        }
                                        <li>
                                            <Link to="/jadwal" className={`dropdown-item ${location.pathname == '/jadwal' ? 'active' : ''}`}>
                                                <div className="inline-flex gap-2"><FaClock className="mt-1 text-[14px]" />  Jadwal Kuliah</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/tugas" className={`dropdown-item ${location.pathname == '/tugas' ? 'active' : ''}`}>
                                                <div className="inline-flex gap-2"><FaTasks className="mt-1 text-[14px]" />  Tugas Kuliah</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/jurnal" className={`dropdown-item ${location.pathname == '/jurnal' ? 'active' : ''}`}>
                                                <div className="inline-flex gap-2"><FaRegAddressBook className="mt-1 text-[14px]" />  Jurnal</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/presensi" className={`dropdown-item ${location.pathname == '/presensi' ? 'active' : ''}`}>
                                                <div className="inline-flex gap-2"><FaChalkboardUser className="mt-1 text-[14px]" />  Presensi</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/penilaian" className={`dropdown-item ${location.pathname == '/penilaian' || location.pathname == '/detailnilai' ? 'active' : ''}`}>
                                                <div className="inline-flex gap-2"><FaRegBookmark className="mt-1 text-[14px]" /> Penilaian</div>
                                            </Link>
                                        </li>
                                        {dosen &&
                                            <li>
                                                <Link to="/studimhs" className={`dropdown-item ${location.pathname == '/studimhs' ? 'active' : ''}`}>
                                                    <div className="inline-flex gap-2"><FaArchive className="mt-1 text-[14px]" />  Studi Mahasiswa</div>
                                                </Link>
                                            </li>
                                        }
                                        <li>
                                            <Link to="/listPedoman" className={`dropdown-item ${location.pathname == '/listPedoman' || location.pathname == '/listPedoman' ? 'active' : ''}`}>
                                                <div className="inline-flex gap-2"><SiFoursquarecityguide className="mt-1 text-[14px]" />  Pedoman</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <Link to="/chat" className={`nav-link my-3 text-light ${location.pathname == '/chat' ? 'active fw-bold' : ''} `}>Konsultasi</Link>
                            </Nav>
                            : <Nav className="me-auto h-8">

                            </Nav>
                    }
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <nav className="navbar-nav navbar-nav-right">
                            <NavDropdown className="nav-profile" id="nav-dropdown-dark-example" title={
                                <>
                                    <div className="nav-profile-img">
                                        <img src={face} alt="image" width={1} />
                                    </div>
                                    <div className="nav-profile-text" style={{ color: '#5E7C60' }}>
                                        <p className="font-weight-semibold m-0 text-light">{nama} </p>
                                        <span className="font-13 text-capitalize text-light">{level}</span>
                                    </div>
                                </>
                            }>
                                <li>
                                    {level == 'mahasiswa' ?
                                        <Link to="/profil" className={`dropdown-item`}>Profil</Link>
                                        :
                                        <Link to="/profile" className={`dropdown-item`}>Profil</Link>
                                    }
                                </li>
                                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </nav>
                        <button className="bg-danger navbar-toggler navbar-toggler-right align-self-center" type="button"
                            data-toggle="horizontal-menu-toggle">
                            <span><FaTh /></span>
                        </button>
                    </div>
                </Container>
            </Navbar>

        </div >
    )
}

export default Navigation