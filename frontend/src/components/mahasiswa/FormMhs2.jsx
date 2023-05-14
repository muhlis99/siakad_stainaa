import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { FaTimes, FaReply, FaArrowRight, FaArrowLeft } from "react-icons/fa"
import axios from 'axios'
import Select from "react-select"

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
    const [dusun, setDusun] = useState("")
    const [rt, setRt] = useState("")
    const [rw, setRw] = useState("")
    const [jalan, setJalan] = useState("")
    const [jenting, setJenting] = useState("")
    const [alat, setAlat] = useState("")
    const { idMhs } = useParams()
    const { stat } = useParams()

    useEffect(() => {
        const getMhsById = async () => {
            try {
                const response = await axios.get(`v1/mahasiswa/getById/${idMhs}`)
                setNamanya(response.data.data.nama)
                setNegaranya(response.data.data.negaras[0].code_negara)
                setProvinsinya(response.data.data.provinsis[0].code_provinsi)
                setKabupatennya(response.data.data.kabupatens[0].code_kabupaten)
                setKecamatannya(response.data.data.kecamatans[0].code_kecamatan)
                setDesanya(response.data.data.desas[0].code_desa)
                setKodePos(response.data.data.kode_pos)
                setDusun(response.data.data.dusun)
                setRt(response.data.data.rt)
                setRw(response.data.data.rw)
                setJalan(response.data.data.jalan)
                setJenting(response.data.data.jenis_tinggal)
                setAlat(response.data.data.alat_transportasi)
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

    const country = Negara.map((item) => {
        return {
            value: item.code_negara,
            label: item.nama_negara
        }
    })

    const handleNegara = e => {
        setNegaranya(e.target.value)
    }

    const getProvinsiByNegara = async () => {
        const response = await axios.get(`v1/equipmentDsnMhs/provinsi/getByCodeNegara/${negaranya}`)
        setProvinsi(response.data.data)
    }

    const province = Provinsi.map((item) => {
        return {
            value: item.code_provinsi,
            label: item.nama_provinsi
        }
    })

    const handleProvinsi = e => {
        setProvinsinya(e.target.value)
    }

    const getKabupatenByProvinsi = async () => {
        const response = await axios.get(`v1/equipmentDsnMhs/kabupaten/getByCodeProvinsi/${provinsinya}`)
        setKabupaten(response.data.data)
    }

    const regency = Kabupaten.map((item) => {
        return {
            value: item.code_kabupaten,
            label: item.nama_kabupaten
        }
    })

    const handleKabupaten = e => {
        setKabupatennya(e.target.value)
    }

    const getKecamatanByKabupaten = async () => {
        const response = await axios.get(`v1/equipmentDsnMhs/kecamatan/getByCodeKabupaten/${kabupatennya}`)
        setKecamatan(response.data.data)
    }

    const district = Kecamatan.map((item) => {
        return {
            value: item.code_kecamatan,
            label: item.nama_kecamatan
        }
    })

    const handleKecamatan = e => {
        setKecamatannya(e.target.value)
    }

    const getDesaByKecamatan = async () => {
        const response = await axios.get(`v1/equipmentDsnMhs/desa/getByCodeKecamatan/${kecamatannya}`)
        setDesa(response.data.data)
    }

    const village = Desa.map((item) => {
        return {
            value: item.code_desa,
            label: item.nama_desa
        }
    })

    const handleDesa = e => {
        setDesanya(e.target.value)
    }

    const getJenisTinggal = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/jenisTinggal/all')
        setJenis(response.data.data)
    }

    const getAlatTrans = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/alatTransportasi/all')
        setAlatTrans(response.data.data)
    }

    return (
        <div className='container mt-2'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Detail Alamat {namanya && <span>Ananda <span className='text-red-500'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className='grid lg:grid-cols-4 gap-4'>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Negara</span>
                                </label>
                                <Select
                                    options={country}
                                    onChange={handleNegara}
                                    value={country.filter(function (option) {
                                        return option.value === negaranya
                                    })}
                                    className='w-full'
                                    placeholder="Pilih Negara"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Provinsi</span>
                                </label>
                                <Select
                                    options={province}
                                    onChange={handleProvinsi}
                                    value={province.filter(function (option) {
                                        return option.value === provinsinya
                                    })}
                                    placeholder="Pilih Provinsi"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Kabupaten</span>
                                </label>
                                <Select
                                    options={regency}
                                    onChange={handleKabupaten}
                                    value={regency.filter(function (option) {
                                        return option.value === kabupatennya
                                    })}
                                    placeholder="Pilih Kabupaten"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Kecamatan</span>
                                </label>
                                <Select
                                    options={district}
                                    onChange={handleKecamatan}
                                    value={district.filter(function (option) {
                                        return option.value === kecamatannya
                                    })}
                                    placeholder="Pilih Kecamatan"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Desa</span>
                                </label>
                                <Select
                                    options={village}
                                    onChange={handleDesa}
                                    value={village.filter(function (option) {
                                        return option.value === desanya
                                    })}
                                    placeholder="Pilih Desa"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Kode Pos</span>
                                </label>
                                <input
                                    type="text"
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
                                    value={dusun}
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
                                            value={rt}
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
                                            value={rw}
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
                                    value={jalan}
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
                                {stat == "add" ? <button className='btn btn-sm btn-danger'><FaTimes /> <span className="ml-1">Batal</span></button> : <button className='btn btn-sm btn-danger'><FaReply /> <span className='ml-1'>Kembali Ke Data Mahasiswa</span></button>}
                            </div>
                            <div>
                                <div className='grid lg:grid-flow-col gap-1 float-right'>
                                    <div>
                                        <Link to={`/mahasiswa/form1/${stat}/${idMhs}`} className='btn btn-sm btn-blue w-full'><FaArrowLeft /><span className="ml-1">Kembali</span></Link>
                                    </div>
                                    <div className='lg:pl-1'>
                                        <button className='btn btn-sm btn-blue w-full'><span className="mr-1">Simpan dan lanjut</span><FaArrowRight /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormMhs2