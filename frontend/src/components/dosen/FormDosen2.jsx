import React, { useState, useEffect } from 'react'
import { FaTimes, FaReply, FaArrowLeft, FaCheck } from "react-icons/fa"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const FormDosen2 = () => {
    const [Negara, setNegara] = useState([])
    const [Provinsi, setProvinsi] = useState([])
    const [Kabupaten, setKabupaten] = useState([])
    const [Kecamatan, setKecamatan] = useState([])
    const [Desa, setDesa] = useState([])
    const [AlatTrans, setAlatTrans] = useState([])
    const [Pendidikan, setPendidikan] = useState([])
    const [namanya, setNamanya] = useState("")
    const [negaranya, setNegaranya] = useState("")
    const [provinsinya, setProvinsinya] = useState("")
    const [kabupatennya, setKabupatennya] = useState("")
    const [kecamatannya, setKecamatannya] = useState("")
    const [desanya, setDesanya] = useState("")
    const [kodepos, setKodePos] = useState("")
    const [alamat, setAlamat] = useState("")
    const [alat, setAlat] = useState("")
    const [pndkn, setPndkn] = useState("")
    const [statusPg, setStatusPg] = useState("")
    const navigate = useNavigate()
    const { idDsn } = useParams()
    const { stat } = useParams()

    useEffect(() => {
        const getDosenById = async () => {
            try {
                if (stat == "edit") {
                    const response = await axios.get(`v1/dosen/getById/${idDsn}`)
                    setNamanya(response.data.data.nama)
                    setNegaranya(response.data.data.negara)
                    setProvinsinya(response.data.data.provinsi)
                    setKabupatennya(response.data.data.kabupaten)
                    setKecamatannya(response.data.data.kecamatan)
                    setDesanya(response.data.data.desa)
                    setKodePos(response.data.data.kode_pos)
                    setAlamat(response.data.data.alamat_lengkap)
                    setAlat(response.data.data.alat_transportasi)
                    setPndkn(response.data.data.pendidikan_terakhir)
                    setStatusPg(response.data.data.status_kepegawaian)
                } else {
                    const response = await axios.get(`v1/dosen/getByCreateFirst/${idDsn}`)
                    setNamanya(response.data.data.nama)
                    setNegaranya(response.data.data.negara)
                    setProvinsinya(response.data.data.provinsi)
                    setKabupatennya(response.data.data.kabupaten)
                    setKecamatannya(response.data.data.kecamatan)
                    setDesanya(response.data.data.desa)
                    setKodePos(response.data.data.kode_pos)
                    setAlamat(response.data.data.alamat_lengkap)
                    setAlat(response.data.data.alat_transportasi)
                    setPndkn(response.data.data.pendidikan_terakhir)
                    setStatusPg(response.data.data.status_kepegawaian)
                }
            } catch (error) {

            }

        }
        getDosenById()
    }, [idDsn])

    useEffect(() => {
        getNegara()
        getAlatTrans()
        getPendidikan()
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

    const getAlatTrans = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/alatTransportasi/all')
        setAlatTrans(response.data.data)
    }

    const getPendidikan = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/pendidikan/all')
        setPendidikan(response.data.data)
    }

    const simpanDsn = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/dosen/createForm2/${idDsn}`, {
                alamat_lengkap: alamat,
                desa: desanya,
                kecamatan: kecamatannya,
                kabupaten: kabupatennya,
                provinsi: provinsinya,
                negara: negaranya,
                kode_pos: kodepos,
                alat_transportasi: alat,
                pendidikan_terakhir: pndkn,
                status_kepegawaian: statusPg
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate('/dosen', { state: { collaps: 'induk', activ: '/dosen' } })
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
                <h1 className='text-xl font-bold'>Detail Alamat {namanya && <span>Dari <span className='text-red-500'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <form onSubmit={simpanDsn}>
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
                                    <input type="number" placeholder="Masukkan Kode Pos" className="input input-sm input-bordered w-full" value={kodepos} onChange={(e) => setKodePos(e.target.value)} />
                                </div>
                                <div className='lg:col-span-2'>
                                    <label className="label">
                                        <span className="text-base label-text">Alamat Lengkap</span>
                                    </label>
                                    <textarea
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Masukkan Alamat Lengkap"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Alat Transportasi</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={alat} onChange={(e) => setAlat(e.target.value)}>
                                        <option value="">Alat Transportasi</option>
                                        {AlatTrans.map((item) => (
                                            <option key={item.id_alat_transportasi} value={item.code_alat_transportasi}>{item.nama_alat_transportasi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Pendidikan Terakhir</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={pndkn} onChange={(e) => setPndkn(e.target.value)}>
                                        <option value="">Pendidikan</option>
                                        {Pendidikan.map((item) => (
                                            <option key={item.id_pendidikan} value={item.code_pendidikan}>{item.nama_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Status Kepegawaian</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={statusPg} onChange={(e) => setStatusPg(e.target.value)}>
                                        <option value="">Status Kepegawaian</option>
                                        <option value="pns">Pegawai Negeri Sipil (PNS)</option>
                                        <option value="non_pns">Non PNS</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    {stat == "add" ? <button type="button" onClick={() => batal(idDsn)} className='btn btn-sm btn-error'><FaTimes /> <span className="ml-1">Batal</span></button> : <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className='btn btn-sm btn-error'><FaReply /> <span className='ml-1'>Kembali Ke Data Dosen</span></Link>}
                                </div>
                                <div>
                                    <div className='grid lg:grid-flow-col gap-1 float-right'>
                                        <div>
                                            <Link to={`/dosen/form1/${stat}/${idDsn}`} state={{ collaps: 'induk', activ: '/dosen' }} className='btn btn-sm btn-primary w-full'><FaArrowLeft /><span className="ml-1">Kembali</span></Link>
                                        </div>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-success w-full'><FaCheck /><span className="ml-1">Selesai</span></button>
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

export default FormDosen2