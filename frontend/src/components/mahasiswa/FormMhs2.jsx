import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { FaTimes, FaReply, FaArrowRight, FaArrowLeft } from "react-icons/fa"
import axios from 'axios'
import Swal from "sweetalert2";
import Loading from '../Loading';

const FormMhs2 = () => {
    const [Negara, setNegara] = useState([])
    const [Provinsi, setProvinsi] = useState([])
    const [Kabupaten, setKabupaten] = useState([])
    const [Kecamatan, setKecamatan] = useState([])
    const [Desa, setDesa] = useState([])
    const [Jenis, setJenis] = useState([])
    const [AlatTrans, setAlatTrans] = useState([])
    const [namanya, setNamanya] = useState("")
    const [negaranya, setNegaranya] = useState("")
    const [provinsinya, setProvinsinya] = useState("")
    const [kabupatennya, setKabupatennya] = useState("")
    const [kecamatannya, setKecamatannya] = useState("")
    const [desanya, setDesanya] = useState("")
    const [kodepos, setKodePos] = useState("")
    const [dusunnya, setDusun] = useState("")
    const [rtnya, setRt] = useState("")
    const [rwnya, setRw] = useState("")
    const [jalannya, setJalan] = useState("")
    const [jenting, setJenting] = useState("")
    const [alat, setAlat] = useState("")
    const navigate = useNavigate()
    const { idMhs } = useParams()
    const { stat } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMhsById = async () => {
            try {
                if (stat === "edit") {
                    const response = await axios.get(`v1/mahasiswa/getById/${idMhs}`)
                    setNamanya(response.data.data.nama)
                    setNegaranya(response.data.data.negara)
                    setProvinsinya(response.data.data.provinsis[0].code_provinsi)
                    setKabupatennya(response.data.data.kabupatens[0].code_kabupaten)
                    setKecamatannya(response.data.data.kecamatans[0].code_kecamatan)
                    setDesanya(response.data.data.desa)
                    setKodePos(response.data.data.kode_pos)
                    setDusun(response.data.data.dusun)
                    setRt(response.data.data.rt)
                    setRw(response.data.data.rw)
                    setJalan(response.data.data.jalan)
                    setJenting(response.data.data.jenis_tinggal)
                    setAlat(response.data.data.alat_transportasi)
                } else {
                    const response = await axios.get(`v1/mahasiswa/getByCreateFirst/${idMhs}`)
                    setNamanya(response.data.data.nama)
                    setNegaranya(response.data.data.negaras[0].code_negara)
                    setProvinsinya(response.data.data.provinsis[0].code_provinsi)
                    setKabupatennya(response.data.data.kabupatens[0].code_kabupaten)
                    setKecamatannya(response.data.data.kecamatans[0].code_kecamatan)
                    setDesanya(response.data.data.desa)
                    setKodePos(response.data.data.kode_pos)
                    setDusun(response.data.data.dusun)
                    setRt(response.data.data.rt)
                    setRw(response.data.data.rw)
                    setJalan(response.data.data.jalan)
                    setJenting(response.data.data.jenis_tinggal)
                    setAlat(response.data.data.alat_transportasi)
                }
            } catch (error) {

            }
        }
        getMhsById()
    }, [idMhs])

    useEffect(() => {
        getNegara()
    }, [])

    useEffect(() => {
        getProvinsiByNegara()
    }, [negaranya])

    useEffect(() => {
        getKabupatenByProvinsi()
    }, [provinsinya])

    useEffect(() => {
        getKecamatanByKabupaten()
    }, [kabupatennya])

    useEffect(() => {
        getDesaByKecamatan()
    }, [kecamatannya])

    useEffect(() => {
        getJenisTinggal()
        getAlatTrans()
    }, [])

    const getNegara = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/negara/all')
        setNegara(response.data.data)
    }

    const getProvinsiByNegara = async () => {
        if (negaranya != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/provinsi/getByCodeNegara/${negaranya}`)
            setProvinsi(response.data.data)
        }
    }

    const getKabupatenByProvinsi = async () => {
        if (provinsinya != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/kabupaten/getByCodeProvinsi/${provinsinya}`)
            setKabupaten(response.data.data)
        }
    }

    const getKecamatanByKabupaten = async () => {
        if (kabupatennya != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/kecamatan/getByCodeKabupaten/${kabupatennya}`)
            setKecamatan(response.data.data)
        }
    }

    const getDesaByKecamatan = async () => {
        if (kecamatannya != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/desa/getByCodeKecamatan/${kecamatannya}`)
            setDesa(response.data.data)
        }
    }

    const getJenisTinggal = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/jenisTinggal/all')
        setJenis(response.data.data)
    }

    const getAlatTrans = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/alatTransportasi/all')
        setAlatTrans(response.data.data)
    }

    const simpanMhs = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.put(`v1/mahasiswa/createForm2/${idMhs}`, {
                jalan: jalannya,
                dusun: dusunnya,
                rt: rtnya,
                rw: rwnya,
                kode_pos: kodepos,
                negara: negaranya,
                provinsi: provinsinya,
                kabupaten: kabupatennya,
                kecamatan: kecamatannya,
                desa: desanya,
                jenis_tinggal: jenting,
                alat_transportasi: alat
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/mahasiswa/form3/${stat}/${idMhs}`, { state: { collaps: 'induk', activ: '/mahasiswa' } })
                });
            })
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
                <h1 className='text-2xl font-bold'>Detail Alamat {namanya && <span>Ananda <span className='capitalize'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanMhs}>
                            <div className='grid lg:grid-cols-4 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Negara</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={negaranya} onChange={(e) => setNegaranya(e.target.value)}>
                                        <option value="">Negara</option>
                                        {Negara.map((item) => (
                                            <option key={item.id_negara} value={item.code_negara}>{item.nama_negara}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Provinsi</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={provinsinya} onChange={(e) => setProvinsinya(e.target.value)}>
                                        <option value="">Provinsi</option>
                                        {Provinsi.map((item) => (
                                            <option key={item.id_provinsi} value={item.code_provinsi}>{item.nama_provinsi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Kabupaten</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={kabupatennya} onChange={(e) => setKabupatennya(e.target.value)}>
                                        <option value="">Kabupaten</option>
                                        {Kabupaten.map((item) => (
                                            <option key={item.id_kabupaten} value={item.code_kabupaten}>{item.nama_kabupaten}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Kecamatan</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={kecamatannya} onChange={(e) => setKecamatannya(e.target.value)}>
                                        <option value="">Kecamatan</option>
                                        {Kecamatan.map((item) => (
                                            <option key={item.id_kecamatan} value={item.code_kecamatan}>{item.nama_kecamatan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Desa</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={desanya} onChange={(e) => setDesanya(e.target.value)}>
                                        <option value="">Desa</option>
                                        {Desa.map((item) => (
                                            <option key={item.id_desa} value={item.code_desa}>{item.nama_desa}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Kode Pos</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={kodepos}
                                        onChange={(e) => setKodePos(e.target.value)}
                                        placeholder="Masukkan Kode Pos"
                                        className="input input-sm input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Dusun</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan Dusun"
                                        value={dusunnya}
                                        onChange={(e) => setDusun(e.target.value)}
                                        className="input input-sm input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <div className="grid lg:grid-cols-2 gap-2">
                                        <div>
                                            <label className="label">
                                                <span className="text-base label-text">RT</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Masukkan RT"
                                                value={rtnya}
                                                onChange={(e) => setRt(e.target.value)}
                                                className="input input-sm input-bordered w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="text-base label-text">RW</span>
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Masukkan RW"
                                                value={rwnya}
                                                onChange={(e) => setRw(e.target.value)}
                                                className="input input-sm input-bordered w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='lg:col-span-2'>
                                    <label className="label">
                                        <span className="text-base label-text">Jalan</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Masukkan Jalan"
                                        value={jalannya}
                                        onChange={(e) => setJalan(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Jenis Tinggal</span>
                                    </label>
                                    <select
                                        className='select select-bordered select-sm w-full'
                                        value={jenting}
                                        onChange={(e) => setJenting(e.target.value)}
                                    >
                                        <option value="">Pilih Jenis Tinggal</option>
                                        {Jenis.map((item) => (
                                            <option key={item.id_jenis_tinggal} value={item.code_jenis_tinggal}>{item.nama_jenis_tinggal}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Alat Transportasi</span>
                                    </label>
                                    <select
                                        className='select select-bordered select-sm w-full'
                                        value={alat}
                                        onChange={(e) => setAlat(e.target.value)}
                                    >
                                        <option value="">Pilih Alat Tranportasi</option>
                                        {AlatTrans.map((item) => (
                                            <option key={item.id_alat_transportasi} value={item.code_alat_transportasi}>{item.nama_alat_transportasi}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    {stat == "add" ? <button type="button" className='btn btn-sm btn-error capitalize rounded-md' onClick={() => batal(idMhs)}><FaTimes /> <span className="">Batal</span></button> : <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply /> <span className=''>Kembali Ke Data Mahasiswa</span></Link>}
                                </div>
                                <div>
                                    <div className='grid lg:grid-flow-col gap-1 float-right'>
                                        <div>
                                            <Link to={`/mahasiswa/form1/${stat}/${idMhs}`} state={{ collaps: 'induk', activ: '/mahasiswa', valid: 'no' }} className='btn btn-sm btn-primary w-full capitalize rounded-md'><FaArrowLeft /><span className="">Kembali</span></Link>
                                        </div>
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

export default FormMhs2