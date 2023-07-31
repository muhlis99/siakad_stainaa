import React, { useState, useEffect } from 'react'
import { FaTimes, FaReply, FaArrowRight } from "react-icons/fa"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

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
    const navigate = useNavigate()
    const { idDsn } = useParams()
    const { stat } = useParams()

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

    const simpanDsn = async (e) => {
        e.preventDefault()
        try {
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
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/dosen/form2/${stat}/${idDsn}`, { state: { collaps: 'induk', activ: '/dosen' } })
                });
            })
        } catch (error) {
            if (error.response) {
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
                        console.log(response.data)
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
            <section className="mb-5">
                <h1 className='text-xl font-bold'>Identitas Diri {namanya && <span>Dari <span className='text-red-500'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
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
                                    {stat == "add" ? <button type='button' onClick={() => batal(idDsn)} className='btn btn-sm btn-error'><FaTimes /> <span className="ml-1">Batal</span></button> : <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className='btn btn-sm btn-error'><FaReply /> <span className='ml-1'>Kembali Ke Data Dosen</span></Link>}
                                </div>
                                <div>
                                    <div className='float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-primary w-full'><span className="mr-1">Simpan dan lanjut</span><FaArrowRight /></button>
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