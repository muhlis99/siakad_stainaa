import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FaTimes, FaReply, FaArrowRight } from "react-icons/fa"
import axios from 'axios'
import Swal from "sweetalert2"
import Loading from '../Loading'

const FormMhs1 = () => {
    const [Jalur, setJalur] = useState([])
    const [Jenis, setJenis] = useState([])
    const [nik, setNik] = useState("")
    const [namanya, setNamanya] = useState("")
    const [tmp, setTmp] = useState("")
    const [tgl, setTgl] = useState("")
    const [bln, setBln] = useState("")
    const [thn, setThn] = useState("")
    const [kk, setKk] = useState("")
    const [jenkel, setJenkel] = useState("")
    const [email, setEmail] = useState("")
    const [email2, setEmail2] = useState("")
    const [nohp, setNohp] = useState("")
    const [notelp, setNotelp] = useState("")
    const [nisn, setNisn] = useState("")
    const [pkps, setPkps] = useState("")
    const [nokps, setNokps] = useState("")
    const [npwp, setNpwp] = useState("")
    const [jalurp, setJalurp] = useState("")
    const [jenisp, setJenisp] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [kodeThn, setKodeThn] = useState("")
    const [kodeSmt, setKodeSmt] = useState("")
    const [LoginHistory, setLoginHistory] = useState([])
    const [nim, setNim] = useState("")
    const [validEmail, setValidEmail] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        console.log(location.state);
    }, [location])

    useEffect(() => {
        getJalur()
    }, [])

    useEffect(() => {
        getJenis()
    }, [])

    useEffect(() => {
        const getMhsById = async () => {
            try {
                if (location.state.stat === "edit") {
                    const response = await axios.get(`v1/mahasiswa/getById/${location.state.idMhs}`)
                    let tglLahir = response.data.data.tanggal_lahir
                    const tgArray = tglLahir.split("-")
                    setNik(response.data.data.nik)
                    setNim(response.data.data.nim)
                    setJenjangnya(response.data.data.code_jenjang_pendidikan)
                    setFakultasnya(response.data.data.code_fakultas)
                    setProdinya(response.data.data.code_prodi)
                    setKodeThn(response.data.data.code_tahun_ajaran)
                    setKodeSmt(response.data.data.code_semester)
                    setNamanya(response.data.data.nama)
                    setTmp(response.data.data.tempat_lahir)
                    setTgl(tgArray[2])
                    setBln(tgArray[1])
                    setThn(tgArray[0])
                    setKk(response.data.data.no_kk)
                    setJenkel(response.data.data.jenis_kelamin)
                    setEmail(response.data.data.email)
                    setEmail2(response.data.data.email)
                    setNohp(response.data.data.no_hp)
                    setNotelp(response.data.data.no_telepon)
                    setNisn(response.data.data.nisn)
                    setPkps(response.data.data.penerima_kps)
                    setNokps(response.data.data.no_kps)
                    setNpwp(response.data.data.npwp)
                    setJalurp(response.data.data.jalur_pendaftaran)
                    setJenisp(response.data.data.jenis_pendaftaran)
                } else {
                    const response = await axios.get(`v1/mahasiswa/getByCreateFirst/${location.state.idMhs}`)
                    let tglLahir = response.data.data.tanggal_lahir
                    const tgArray = tglLahir.split("-")
                    setNik(response.data.data.nik)
                    setNim(response.data.data.nim)
                    setJenjangnya(response.data.data.code_jenjang_pendidikan)
                    setFakultasnya(response.data.data.code_fakultas)
                    setProdinya(response.data.data.code_prodi)
                    setKodeThn(response.data.data.code_tahun_ajaran)
                    setKodeSmt(response.data.data.code_semester)
                    setNamanya(response.data.data.nama)
                    setTmp(response.data.data.tempat_lahir)
                    setTgl(tgArray[2])
                    setBln(tgArray[1])
                    setThn(tgArray[0])
                    setKk(response.data.data.no_kk)
                    setJenkel(response.data.data.jenis_kelamin)
                    setEmail(response.data.data.email)
                    setEmail2(response.data.data.email)
                    setNohp(response.data.data.no_hp)
                    setNotelp(response.data.data.no_telepon)
                    setNisn(response.data.data.nisn)
                    setPkps(response.data.data.penerima_kps)
                    setNokps(response.data.data.no_kps)
                    setNpwp(response.data.data.npwp)
                    setJalurp(response.data.data.jalur_pendaftaran)
                    setJenisp(response.data.data.jenis_pendaftaran)
                }
            } catch (error) {

            }
        }
        getMhsById()
    }, [location])

    useEffect(() => {
        getDataLoginHistory()
    }, [location, email2, nim, kodeThn, kodeSmt, jenjangnya, fakultasnya, prodinya])

    useEffect(() => {
        getValidEmail()
    }, [email])

    const getDataLoginHistory = async () => {
        try {
            if (location.state.stat == 'edit' && nim) {
                const response = await axios.get(`v1/mahasiswa/getIdLoginAndHistoryMhs/${email2}/${nim}/${kodeThn}/${kodeSmt}/${jenjangnya}/${fakultasnya}/${prodinya}`)
                setLoginHistory(response.data)
                console.log(response.data);
            }
        } catch (error) {

        }

    }

    const getJalur = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/jalurPendaftaran/all')
        setJalur(response.data.data)
    }

    const getJenis = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/jenisPendaftaran/all')
        setJenis(response.data.data)
    }

    const tg = []
    for (let tanggal = 1; tanggal < 32; tanggal++) {
        if (tanggal < 10) {
            tg.push(<option key={tanggal} value={"0" + tanggal}>{"0" + tanggal}</option>)
        } else {
            tg.push(<option key={tanggal} value={tanggal}>{tanggal}</option>)
        }
    }

    const namaBulan = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const bl = []
    for (let bulan = 1; bulan < 13; bulan++) {
        if (bulan < 10) {
            bl.push(<option key={bulan} value={"0" + bulan}>{namaBulan[bulan]}</option>)
        } else {
            bl.push(<option key={bulan} value={bulan}>{namaBulan[bulan]}</option>)
        }
    }

    const d = new Date()
    let year = d.getFullYear()
    const th = []
    for (let tahun = 1900; tahun <= year; tahun++) {
        th.push(<option key={tahun} value={tahun}>{tahun}</option>)
    }

    const getValidEmail = async () => {
        try {
            if (location.state.stat == 'add' & email != 0 & location.state.valid == 'ya') {
                await axios.get(`v1/mahasiswa/validasiEmail/${email}`)
                setValidEmail("")
            }
        } catch (error) {
            if (error.response) {
                setValidEmail(error.response.data.message);
            }
        }
    }

    const simpanMhs = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (validEmail) {
                setLoading(false)
                Swal.fire({
                    title: validEmail,
                    icon: "error"
                })
            } else {
                await axios.put(`v1/mahasiswa/createForm1/${location.state.idMhs}`, {
                    nik: nik,
                    no_kk: kk,
                    nisn: nisn,
                    npwp: npwp,
                    nama: namanya,
                    tahun: thn,
                    bulan: bln,
                    tanggal: tgl,
                    tempat_lahir: tmp,
                    jenis_kelamin: jenkel,
                    jalur_pendaftaran: jalurp,
                    jenis_pendaftaran: jenisp,
                    penerima_kps: pkps,
                    email: email,
                    no_hp: nohp,
                    no_telepon: notelp
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        if (location.state.stat == 'edit') {
                            navigate(`/mahasiswa/form2`, { state: { collaps: 'induk', activ: '/mahasiswa', stat: location.state.stat, idMhs: location.state.idMhs, history: LoginHistory.dataIdHistory, reg: LoginHistory.dataIdlogin } })
                        } else {
                            navigate(`/mahasiswa/form2`, { state: { collaps: 'induk', activ: '/mahasiswa', stat: location.state.stat, idMhs: location.state.idMhs, history: location.state.history, reg: location.state.reg } })
                        }
                    });
                })
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const batal = (mhsId) => {
        Swal.fire({
            title: "Batalkan ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, batalkan!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(
                        `v1/mahasiswa/delete/${mhsId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Dibatalkan",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            navigate("/mahasiswa", { state: { collaps: 'induk', activ: '/mahasiswa' } })
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='container mt-2'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Identitas Diri {namanya && <span>Ananda <span className='capitalize'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanMhs}>
                            <div className='grid lg:grid-cols-4 gap-3'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">NIK</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan NIK" className="input input-sm input-bordered w-full" value={nik} onChange={(e) => setNik(e.target.value)} />
                                </div>
                                <div className=' lg:col-span-3'>
                                    <label className="label">
                                        <span className="text-base label-text">Nama</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Nama" className="input input-sm input-bordered w-full" value={namanya} onChange={(e) => setNamanya(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tempat Lahir</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Tempat Lahir" className="input input-sm input-bordered w-full" value={tmp} onChange={(e) => setTmp(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tanggal Lahir</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={tgl} onChange={(e) => setTgl(e.target.value)}>
                                        <option value="">-Tanggal Lahir-</option>
                                        {tg}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Bulan Lahir</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={bln} onChange={(e) => setBln(e.target.value)}>
                                        <option value="">-Bulan Lahir-</option>
                                        {bl}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tahun Lahir</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={thn} onChange={(e) => setThn(e.target.value)}>
                                        <option value="">-Tahun Lahir-</option>
                                        {th}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">No KK</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan No KK" className="input input-sm input-bordered w-full" value={kk} onChange={(e) => setKk(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Jenis Kelamin</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={jenkel} onChange={(e) => setJenkel(e.target.value)}>
                                        <option value="">-Jenis Kelamin-</option>
                                        <option value="l">Laki-Laki</option>
                                        <option value="p">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="example@gmail.com" className="input input-sm input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">No WhatsApp</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan No Handphone" className="input input-sm input-bordered w-full" value={nohp} onChange={(e) => setNohp(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">No Telepon</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan No Telepon" className="input input-sm input-bordered w-full" value={notelp} onChange={(e) => setNotelp(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">NISN</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan NISN" className="input input-sm input-bordered w-full" value={nisn} onChange={(e) => setNisn(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Penerima KPS</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pkps} onChange={(e) => setPkps(e.target.value)}>
                                        <option value="">-Penerima KPS-</option>
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">No KPS</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan No KPS" className="input input-sm input-bordered w-full" value={nokps} onChange={(e) => setNokps(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">NPWP</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan NPWP" className="input input-sm input-bordered w-full" value={npwp} onChange={(e) => setNpwp(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Jalur Pendaftaran</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={jalurp} onChange={(e) => setJalurp(e.target.value)}>
                                        <option value="">-Jalur Pendaftaran-</option>
                                        {Jalur.map((jlr) => (
                                            <option key={jlr.id_jalur_pendaftaran} value={jlr.code_jalur_pendaftaran}>{jlr.nama_jalur_pendaftaran}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Jenis Pendaftaran</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={jenisp} onChange={(e) => setJenisp(e.target.value)}>
                                        <option value="">-Jenis Pendaftaran-</option>
                                        {Jenis.map((jns) => (
                                            <option key={jns.id_jenis_pendaftaran} value={jns.code_jenis_pendaftaran}>{jns.nama_jenis_pendaftaran}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    {location.state.stat == "add" ? <button type='button' className='btn btn-sm btn-error rounded-md capitalize' onClick={() => batal(location.state.idMhs)}><FaTimes /> <span className="">Batal</span></button> : <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className='btn btn-sm btn-error rounded-md capitalize'><FaReply /> <span className=''>Kembali Ke Data Mahasiswa</span></Link>}
                                </div>
                                <div>
                                    <div className='float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-primary w-full rounded-md capitalize'><span className="">Simpan dan lanjut</span><FaArrowRight /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormMhs1