import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { FaTimes, FaReply, FaArrowRight, FaArrowLeft } from "react-icons/fa"
import axios from "axios"
import Swal from "sweetalert2"

const FormMhs3 = () => {
    const [Pekerjaan, setPekerjaan] = useState([])
    const [Penghasilan, setPenghasilan] = useState([])
    const [Pendidikan, setPendidikan] = useState([])
    const [namanya, setNamanya] = useState("")
    const [nikAyah, setNikAyah] = useState("")
    const [namaAyah, setNamaAyah] = useState("")
    const [tgAyah, setTgAyah] = useState("")
    const [blAyah, setBlAyah] = useState("")
    const [thAyah, setThAyah] = useState("")
    const [pkrjnAyah, setPkrjnAyah] = useState("")
    const [pndptAyah, setPndptAyah] = useState("")
    const [pndknAyah, setPndknAyah] = useState("")
    const [nikIbu, setNikIbu] = useState("")
    const [namaIbu, setNamaIbu] = useState("")
    const [tgIbu, setTgIbu] = useState("")
    const [blIbu, setBlIbu] = useState("")
    const [thIbu, setThIbu] = useState("")
    const [pkrjnIbu, setPkrjnIbu] = useState("")
    const [pndptIbu, setPndptIbu] = useState("")
    const [pndknIbu, setPndknIbu] = useState("")
    const navigate = useNavigate()
    const { idMhs } = useParams()
    const { stat } = useParams()

    useEffect(() => {
        const getMhsById = async () => {
            try {
                if (stat === "edit") {
                    const response = await axios.get(`v1/mahasiswa/getById/${idMhs}`)
                    let tglLahirAyah = response.data.data.tanggal_lahir_ayah
                    const tglAyah = tglLahirAyah.split("-")
                    let tglLahirIbu = response.data.data.tanggal_lahir_ibu
                    const tglIbu = tglLahirIbu.split("-")
                    setNamanya(response.data.data.nama)
                    setNikAyah(response.data.data.nik_ayah)
                    setNamaAyah(response.data.data.nama_ayah)
                    setTgAyah(tglAyah[2])
                    setBlAyah(tglAyah[1])
                    setThAyah(tglAyah[0])
                    setPkrjnAyah(response.data.data.pekerjaan_ayah)
                    setPndptAyah(response.data.data.penghasilan_ayah)
                    setPndknAyah(response.data.data.pendidikan_ayah)
                    setNikIbu(response.data.data.nik_ibu)
                    setNamaIbu(response.data.data.nama_ibu)
                    setTgIbu(tglIbu[2])
                    setBlIbu(tglIbu[1])
                    setThIbu(tglIbu[0])
                    setPkrjnIbu(response.data.data.pekerjaan_ibu)
                    setPndptIbu(response.data.data.penghasilan_ibu)
                    setPndknIbu(response.data.data.pendidikan_ibu)
                } else {
                    const response = await axios.get(`v1/mahasiswa/getByCreateFirst/${idMhs}`)
                    let tglLahirAyah = response.data.data.tanggal_lahir_ayah
                    const tglAyah = tglLahirAyah.split("-")
                    let tglLahirIbu = response.data.data.tanggal_lahir_ibu
                    const tglIbu = tglLahirIbu.split("-")
                    setNamanya(response.data.data.nama)
                    setNikAyah(response.data.data.nik_ayah)
                    setNamaAyah(response.data.data.nama_ayah)
                    setTgAyah(tglAyah[2])
                    setBlAyah(tglAyah[1])
                    setThAyah(tglAyah[0])
                    setPkrjnAyah(response.data.data.pekerjaan_ayah)
                    setPndptAyah(response.data.data.penghasilan_ayah)
                    setPndknAyah(response.data.data.pendidikan_ayah)
                    setNikIbu(response.data.data.nik_ibu)
                    setNamaIbu(response.data.data.nama_ibu)
                    setTgIbu(tglIbu[2])
                    setBlIbu(tglIbu[1])
                    setThIbu(tglIbu[0])
                    setPkrjnIbu(response.data.data.pekerjaan_ibu)
                    setPndptIbu(response.data.data.penghasilan_ibu)
                    setPndknIbu(response.data.data.pendidikan_ibu)
                }
            } catch (error) {

            }
        }
        getMhsById()
    }, [idMhs])

    useEffect(() => {
        getPekerjaan()
        getPenghasilan()
        getPendidikan()
    }, [])

    const getPekerjaan = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/pekerjaan/all')
        setPekerjaan(response.data.data)
    }

    const getPenghasilan = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/penghasilan/all')
        setPenghasilan(response.data.data)
    }

    const getPendidikan = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/pendidikan/all')
        setPendidikan(response.data.data)
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

    const simpanMhs = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/mahasiswa/createForm3/${idMhs}`, {
                nik_ayah: nikAyah,
                nama_ayah: namaAyah,
                tahun_a: thAyah,
                bulan_a: blAyah,
                tanggal_a: tgAyah,
                pekerjaan_ayah: pkrjnAyah,
                penghasilan_ayah: pndptAyah,
                pendidikan_ayah: pndknAyah,
                nik_ibu: nikIbu,
                nama_ibu: namaIbu,
                tahun_b: thIbu,
                bulan_b: blIbu,
                tanggal_b: tgIbu,
                pekerjaan_ibu: pkrjnIbu,
                penghasilan_ibu: pndptIbu,
                pendidikan_ibu: pndknIbu
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/mahasiswa/form4/${stat}/${idMhs}`, { state: { collaps: 'induk', activ: '/mahasiswa' } })
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
                        console.log(response.data)
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
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Detail Orang Tua {namanya && <span>Ananda <span className='text-red-500'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanMhs}>
                            <div className='grid lg:grid-cols-3 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">NIK Ayah</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan NIK Ayah" value={nikAyah} onChange={(e) => setNikAyah(e.target.value)} className="input input-sm input-bordered w-full" />
                                </div>
                                <div className='lg:col-span-2'>
                                    <label className="label">
                                        <span className="text-base label-text">Nama Ayah</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Nama Ayah" value={namaAyah} onChange={(e) => setNamaAyah(e.target.value)} className="input input-sm input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tanggal Lahir Ayah</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={tgAyah} onChange={(e) => setTgAyah(e.target.value)}>
                                        <option value="">Tanggal Lahir Ayah</option>
                                        {tg}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Bulan Lahir Ayah</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={blAyah} onChange={(e) => setBlAyah(e.target.value)}>
                                        <option value="">Bulan Lahir Ayah</option>
                                        {bl}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tahun Lahir Ayah</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={thAyah} onChange={(e) => setThAyah(e.target.value)}>
                                        <option value="">Tahun Lahir Ayah</option>
                                        {th}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Pekerjaan Ayah</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pkrjnAyah} onChange={(e) => setPkrjnAyah(e.target.value)}>
                                        <option value="">Pekerjaan Ayah</option>
                                        {Pekerjaan.map((item) => (
                                            <option key={item.id_pekerjaan} value={item.code_pekerjaan}>{item.nama_pekerjaan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Penghasilan Ayah</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pndptAyah} onChange={(e) => setPndptAyah(e.target.value)}>
                                        <option value="">Penghasilan Ayah</option>
                                        {Penghasilan.map((item) => (
                                            <option key={item.id_penghasilan} value={item.code_penghasilan}>{item.nama_penghasilan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Pendidikan Ayah</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pndknAyah} onChange={(e) => setPndknAyah(e.target.value)}>
                                        <option value="">Pendidikan Ayah</option>
                                        {Pendidikan.map((item) => (
                                            <option key={item.id_pendidikan} value={item.code_pendidikan}>{item.nama_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='lg:col-span-3'>
                                    <hr />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">NIK Ibu</span>
                                    </label>
                                    <input type="number" value={nikIbu} onChange={(e) => setNikIbu(e.target.value)} placeholder="Masukkan NIK Ibu" className="input input-sm input-bordered w-full" />
                                </div>
                                <div className='lg:col-span-2'>
                                    <label className="label">
                                        <span className="text-base label-text">Nama Ibu</span>
                                    </label>
                                    <input type="text" value={namaIbu} onChange={(e) => setNamaIbu(e.target.value)} placeholder="Masukkan Nama Ibu" className="input input-sm input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tanggal Lahir Ibu</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={tgIbu} onChange={(e) => setTgIbu(e.target.value)}>
                                        <option value="">Tanggal Lahir Ibu</option>
                                        {tg}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Bulan Lahir Ibu</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={blIbu} onChange={(e) => setBlIbu(e.target.value)}>
                                        <option value="">Bulan Lahir Ibu</option>
                                        {bl}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tahun Lahir Ibu</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={thIbu} onChange={(e) => setThIbu(e.target.value)}>
                                        <option value="">Tahun Lahir Ibu</option>
                                        {th}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Pekerjaan Ibu</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pkrjnIbu} onChange={(e) => setPkrjnIbu(e.target.value)}>
                                        <option value="">Pekerjaan Ibu</option>
                                        {Pekerjaan.map((item) => (
                                            <option key={item.id_pekerjaan} value={item.code_pekerjaan}>{item.nama_pekerjaan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Penghasilan Ibu</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pndptIbu} onChange={(e) => setPndptIbu(e.target.value)}>
                                        <option value="">Penghasilan Ibu</option>
                                        {Penghasilan.map((item) => (
                                            <option key={item.id_penghasilan} value={item.code_penghasilan}>{item.nama_penghasilan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Pendidikan Ibu</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pndknIbu} onChange={(e) => setPndknIbu(e.target.value)}>
                                        <option value="">Pendidikan Ibu</option>
                                        {Pendidikan.map((item) => (
                                            <option key={item.id_pendidikan} value={item.code_pendidikan}>{item.nama_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    {stat == "add" ? <button type='button' className='btn btn-sm btn-error' onClick={() => batal(idMhs)}><FaTimes /> <span className="ml-1">Batal</span></button> : <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className='btn btn-sm btn-error'><FaReply /> <span className='ml-1'>Kembali Ke Data Mahasiswa</span></Link>}
                                </div>
                                <div>
                                    <div className='grid lg:grid-flow-col gap-1 float-right'>
                                        <div>
                                            <Link to={`/mahasiswa/form2/${stat}/${idMhs}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} className='btn btn-sm btn-primary w-full'><FaArrowLeft /><span className="ml-1">Kembali</span></Link>
                                        </div>
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

export default FormMhs3