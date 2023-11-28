import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Select from 'react-select'
import axios from 'axios'
import { FaPlus, FaReply, FaSave, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom"
import Loading from '../Loading'

const SetMhsPerpembimbing = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [MhsPembimbing, setMhsPembimbing] = useState([])
    const [kodeBimbing, setKodeBimbing] = useState("")
    const [nama, setNama] = useState("")
    const [nipy, setNipy] = useState("")
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [prodi, setProdi] = useState("")
    const [kuota, setKuota] = useState("")
    const [jumlah, setJumlah] = useState("")
    const [select2, setSelect2] = useState("")
    const [isClearable, setIsClearable] = useState(true)
    const [nim, setNim] = useState("")
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const getDataDsn = async () => {
            try {
                const response = await axios.get(`v1/pembimbingAkademik/getById/${location.state.idDsn}`)
                setKodeBimbing(response.data.data.code_pembimbing_akademik)
                setNama(response.data.data.dosens[0].nama)
                setNipy(response.data.data.dosens[0].nip_ynaa)
                setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                setFakultas(response.data.data.fakultas[0].nama_fakultas)
                setProdi(response.data.data.prodis[0].nama_prodi)
                setKuota(response.data.data.kouta_bimbingan)
            } catch (error) {

            }
        }
        getDataDsn()
    }, [location.state])

    useEffect(() => {
        getMhsPerPembimbing()
    }, [kodeBimbing])

    useEffect(() => {
        getMahasiswa()
    }, [])

    useEffect(() => {
        options()
    }, [Mahasiswa])

    const getMhsPerPembimbing = async () => {
        if (kodeBimbing != 0) {
            const response = await axios.get(`v1/pembimbingAkademik/getMhsByPembimbingAkademik/${kodeBimbing}`)
            setMhsPembimbing(response.data.data)
            setJumlah(response.data.data.length)
        }
    }

    const getMahasiswa = async () => {
        const response = await axios.get(`v1/pembimbingAkademik/autocompleteMahasiswa/${location.state.jen}/${location.state.fak}/${location.state.pro}`)
        setMahasiswa(response.data.data)
    }

    const options = () => {
        var i = Mahasiswa.map(item => ({
            value: item.nim,
            label: item.nim + " | " + item.nama,
        }))
        setSelect2(i)
    }

    const modalOpen = () => {
        document.getElementById('my-modal').checked = true
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setNim("")
    }

    const onchange = (e) => {
        setNim(e ? e.value : "")
    }

    const simpanMahasiswa = async (e) => {
        e.preventDefault()
        try {
            if (nim == 0) {
                Swal.fire({
                    title: "Mahasiswa Tidak Boleh Kosong",
                    icon: "error"
                })
            } else if (kuota == jumlah) {
                Swal.fire({
                    title: "Jumlah Mahasiswa telah melebihi kapasitas bimbingan",
                    icon: "error"
                })
            } else {
                setLoading(true)
                await axios.post('v1/pembimbingAkademik/createDetail', {
                    code_pembimbing_akademik: kodeBimbing,
                    nim: nim,
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getMhsPerPembimbing()
                        getMahasiswa()
                        setNim("")
                        setShow(false)
                    });
                })
            }
        } catch (error) {

        }
    }



    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className='mb-2'>
                            <Link to='/detailpembimbingakademik' state={{ idDsn: location.state.idDsn, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, collaps: 'kuliah', activ: '/pembimbingakademik' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply />Kembali</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className='flex gap-2'>
                                <div className='flex-initial w-60'>
                                    <label>
                                        <span className="">NIPY</span>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <a>: {nipy}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-60'>
                                    <label>
                                        <span className="">JENJANG PENDIDIKAN</span>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <a>: {jenjang}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-60'>
                                    <label>
                                        <span className="">NAMA</span>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <a>: {nama}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-60'>
                                    <label>
                                        <span className="">FAKULTAS</span>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <a>: {fakultas}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-60'>
                                    <label>
                                        <span className="">KUOTA BIMBINGAN</span>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <a>: {kuota} MAHASISWA</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-60'>
                                    <label>
                                        <span className="">PRODI</span>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <a>: {prodi}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        {show ?
                            <form onSubmit={simpanMahasiswa}>
                                <div className='flex gap-2 w-1/2 bg-white'>
                                    <Select
                                        className="basic-single rounded-md w-full"
                                        classNamePrefix="select"
                                        options={select2}
                                        onChange={onchange}
                                        isClearable={isClearable}
                                        placeholder="Cari Mahasiswa"
                                        noOptionsMessage={() => "Tidak Ada"}
                                    />
                                    <button type='submit' className="btn btn-sm btn-primary capitalize"><FaSave />simpan</button>
                                </div>
                            </form>
                            :
                            <div>
                                <button className='btn btn-sm btn-primary capitalize rounded-md' onClick={() => setShow(true)}><FaPlus />Tambah Data</button>
                            </div>
                        }

                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-2 text-sm">#</th>
                                        <th scope="col" className="px-2 py-2 text-sm">NIPY</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Nama Mahasiswa</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Jenis Kelamin</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Jenjang Pendidikan</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Fakultas</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Prodi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MhsPembimbing.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                            <th scope="row" className="px-2 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                            <td className='px-2 py-2 font-semibold'>{item.nim}</td>
                                            <td className='px-2 py-2 font-semibold'>{item.mahasiswas[0].nama}</td>
                                            <td className='px-2 py-2 font-semibold'>{item.mahasiswas[0].jenis_kelamin == 'l' ? <span>Laki-Laki</span> : <span>Perempuan</span>}</td>
                                            <td className='px-2 py-2 font-semibold'>{jenjang}</td>
                                            <td className='px-2 py-2 font-semibold'>{fakultas}</td>
                                            <td className='px-2 py-2 font-semibold'>{prodi}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default SetMhsPerpembimbing