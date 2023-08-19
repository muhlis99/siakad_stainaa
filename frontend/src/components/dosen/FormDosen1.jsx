import React, { useState, useEffect } from 'react'
import { FaTimes, FaReply, FaArrowRight } from "react-icons/fa"
import { useParams, Link, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"
import Loading from '../Loading'

const FormDosen1 = () => {
    const [nidn, setNidn] = useState("")
    const [namanya, setNamanya] = useState("")
    const [nipy, setNipy] = useState("")
    const [tmp, setTmp] = useState("")
    const [tgl, setTgl] = useState("")
    const [bln, setBln] = useState("")
    const [thn, setThn] = useState("")
    const [jenkel, setJenkel] = useState("")
    const [email, setEmail] = useState("")
    const [nohp, setNohp] = useState("")
    const [notelp, setNotelp] = useState("")
    // const [contoh, setContoh] = useState("19992606202190")
    const [validEmail, setValidEmail] = useState("")
    const navigate = useNavigate()
    const { idDsn } = useParams()
    const { stat } = useParams()
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const getDosenById = async () => {
            try {
                if (stat == "edit") {
                    const response = await axios.get(`v1/dosen/getById/${idDsn}`)
                    setNidn(response.data.data.nidn)
                    setNipy(response.data.data.nip_ynaa)
                    setNamanya(response.data.data.nama)
                    setTmp(response.data.data.tempat_lahir)
                    let tglLahir = response.data.data.tanggal_lahir
                    const tgArray = tglLahir.split("-")
                    setTgl(tgArray[2])
                    setBln(tgArray[1])
                    setThn(tgArray[0])
                    setJenkel(response.data.data.jenis_kelamin)
                    setEmail(response.data.data.email)
                    setNohp(response.data.data.no_hp)
                    setNotelp(response.data.data.no_telepon)
                } else {
                    const response = await axios.get(`v1/dosen/getByCreateFirst/${idDsn}`)
                    setNidn(response.data.data.nidn)
                    setNipy(response.data.data.nip_ynaa)
                    setNamanya(response.data.data.nama)
                    setTmp(response.data.data.tempat_lahir)
                    let tglLahir = response.data.data.tanggal_lahir
                    const tgArray = tglLahir.split("-")
                    setTgl(tgArray[2])
                    setBln(tgArray[1])
                    setThn(tgArray[0])
                    setJenkel(response.data.data.jenis_kelamin)
                    setEmail(response.data.data.email)
                    setNohp(response.data.data.no_hp)
                    setNotelp(response.data.data.no_telepon)
                }
            } catch (error) {

            }

        }
        getDosenById()
    }, [idDsn])

    useEffect(() => {
        getValidEmail()
    }, [email])

    // useEffect(() => {
    //     console.log(contoh.substr(0, 4), '.', contoh.substr(4, 2), '.', contoh.substr(6, 2), '.', contoh.substr(8, 4), '.', contoh.substr(12, 2));
    // }, [])

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
            if (stat == 'add' & email != 0 & location.state.valid == 'ya') {
                await axios.get(`v1/dosen/validasiEmail/${email}`)
                setValidEmail("")
            }
        } catch (error) {
            if (error.response) {
                setValidEmail(error.response.data.message);
            }
        }
    }

    const simpanDsn = async (e) => {
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
                await axios.put(`v1/dosen/createForm1/${idDsn}`, {
                    nama: namanya,
                    nidn: nidn,
                    nip_ynaa: nipy,
                    tempat_lahir: tmp,
                    tahun: thn,
                    bulan: bln,
                    tanggal: tgl,
                    jenis_kelamin: jenkel,
                    email: email,
                    no_hp: nohp,
                    no_telepon: notelp
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate(`/dosen/form2/${stat}/${idDsn}`, { state: { collaps: 'induk', activ: '/dosen' } })
                    });
                })
            }
        } catch (error) {
            if (error.response) {
                setLoading(false)
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const batal = (dsnId) => {
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
                        `v1/dosen/delete/${dsnId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Dibatalkan",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            navigate("/dosen", { state: { collaps: 'induk', activ: '/dosen' } })
                        });
                    })
                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className="mb-5">
                <h1 className='text-2xl font-bold'>Identitas Diri {namanya && <span>Dari <span className='capitalize'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanDsn}>
                            <div className='grid lg:grid-cols-4 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">NIDN</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan NIDN" className="input input-sm input-bordered w-full" value={nidn} onChange={(e) => setNidn(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">NIPY</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan NIPY" className="input input-sm input-bordered w-full" value={nipy} onChange={(e) => setNipy(e.target.value)} />
                                </div>
                                <div className='lg:col-span-2'>
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
                                    <select className='select select-bordered select-sm w-full' value={tgl} onChange={(e) => setTgl(e.target.value)}>
                                        <option value="">-Tanggal Lahir-</option>
                                        {tg}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Bulan Lahir</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={bln} onChange={(e) => setBln(e.target.value)}>
                                        <option value="">-Bulan Lahir-</option>
                                        {bl}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tahun Lahir</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={thn} onChange={(e) => setThn(e.target.value)}>
                                        <option value="">-Tahun Lahir-</option>
                                        {th}
                                    </select>
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
                                        <span className="text-base label-text">Nomor Handphone</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan Nomor Handphone" className="input input-sm input-bordered w-full" value={nohp} onChange={(e) => setNohp(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nomor Telepon</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan Nomor Telepon" className="input input-sm input-bordered w-full" value={notelp} onChange={(e) => setNotelp(e.target.value)} />
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    {stat == "add" ? <button type='button' onClick={() => batal(idDsn)} className='btn btn-sm rounded-md btn-error capitalize'><FaTimes /> <span className="">Batal</span></button> : <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className='btn btn-sm rounded-md btn-error capitalize'><FaReply /> <span className='ml-1'>Kembali Ke Data Dosen</span></Link>}
                                </div>
                                <div>
                                    <div className='float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm rounded-md btn-primary w-full capitalize'><span className="">Simpan dan lanjut</span><FaArrowRight /></button>
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

export default FormDosen1