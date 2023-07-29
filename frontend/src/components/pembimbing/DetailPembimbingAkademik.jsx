import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Select from 'react-select'
import axios from 'axios'
import { FaCog, FaEdit, FaPlus, FaReply, FaSave, FaTimes, FaTrash } from 'react-icons/fa'
import { Link } from "react-router-dom"

const DetailPembimbingAkademik = () => {
    const [MhsPembimbing, setMhsPembimbing] = useState([])
    const [Pembimbing, setPembimbing] = useState([])
    const [kodeBimbing, setKodeBimbing] = useState("")
    const [nama, setNama] = useState("")
    const [nipy, setNipy] = useState("")
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [prodi, setProdi] = useState("")
    const [kuota, setKuota] = useState("")
    const [jumlah, setJumlah] = useState("")
    const [kodePembimbing, setKodePembimbing] = useState("")
    const [idDetail, setIdDetail] = useState("")
    const location = useLocation()

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
        getPembimbing()
    }, [])

    const getMhsPerPembimbing = async () => {
        if (kodeBimbing != 0) {
            const response = await axios.get(`v1/pembimbingAkademik/getMhsByPembimbingAkademik/${kodeBimbing}`)
            setMhsPembimbing(response.data.data)
            setJumlah(response.data.data.length)
        }
    }

    const getPembimbing = async () => {
        const response = await axios.get(`v1/pembimbingAkademik/all`)
        setPembimbing(response.data.data)
    }

    const modalOpen = (e) => {
        setIdDetail(e)
        document.getElementById('my-modal').checked = true
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        getMhsPerPembimbing()
        setIdDetail("")
        setKodePembimbing("")
    }

    const simpanPembimbing = async (e) => {
        e.preventDefault()
        try {
            if (kodePembimbing == 0) {
                Swal.fire({
                    title: "Dosen Tidak Boleh Kosong",
                    icon: "error"
                })
            } else {
                await axios.put(`v1/pembimbingAkademik/updateDetail/${idDetail}`, {
                    code_pembimbing_akademik: kodePembimbing
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getMhsPerPembimbing()
                        setIdDetail("")
                        setKodePembimbing("")
                        document.getElementById('my-modal').checked = false
                    });
                })
            }
        } catch (error) {
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const nonaktifkan = (MhsId) => {
        Swal.fire({
            title: "Hapus data ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(
                        `v1/pembimbingAkademik/deleteDetail/${MhsId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getMhsPerPembimbing()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative p-0 rounded-md w-72">
                    <button className='btn btn-sm btn-square mb-2 btn-error rounded-none float-right' onClick={modalClose}><FaTimes /></button>
                    <form onSubmit={simpanPembimbing} className='p-2 mt-8'>
                        <select className="select select-sm select-bordered w-full mb-2" value={kodePembimbing} onChange={(e) => setKodePembimbing(e.target.value)}>
                            <option value="">Dosen</option>
                            {Pembimbing.map((item, index) => {
                                return item.code_pembimbing_akademik == kodeBimbing ? (
                                    <option key={index} disabled hidden value={item.code_pembimbing_akademik}>{item.dosens[0].nama}</option>
                                ) : (
                                    <option key={index} value={item.code_pembimbing_akademik}>{item.dosens[0].nama}</option>
                                )
                            })}
                            <option value=""></option>
                        </select>
                        <button className='btn btn-sm btn-primary w-full'><FaSave /><span className="ml-1">simpan</span></button>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md">
                    <div className="card-body p-4">
                        <div className='mb-2'>
                            <Link to='/pembimbingakademik' className='btn btn-sm btn-error'><FaReply />Kembali</Link>
                            {kuota != jumlah ? <Link to='/setpembimbingakademik' state={{ idDsn: location.state.idDsn }} className="btn btn-primary btn-sm float-right"><FaCog />Set Mahasiswa</Link> : ""}
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
                <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md">
                    <div className="card-body p-4">
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3">#</th>
                                        <th scope="col" className="px-2 py-3">NIPY</th>
                                        <th scope="col" className="px-2 py-3">Nama Mahasiswa</th>
                                        <th scope="col" className="px-2 py-3">Jenis Kelamin</th>
                                        <th scope="col" className="px-2 py-3">Tempat Tanggal Lahir</th>
                                        <th scope="col" className="px-2 py-3">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MhsPembimbing.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-2 py-2'>{item.nim}</td>
                                            <td className='px-2 py-2'>{item.mahasiswas[0].nama}</td>
                                            <td className='px-2 py-2'>{item.mahasiswas[0].jenis_kelamin == 'l' ? <span>Laki-Laki</span> : <span>Perempuan</span>}</td>
                                            <td className='px-2 py-2'>{item.mahasiswas[0].tempat_lahir}, {item.mahasiswas[0].tanggal_lahir}</td>
                                            <td className='px-2 py-2'>
                                                <button onClick={() => modalOpen(item.id_detail_pembimbing_akademik)} className="btn btn-xs btn-warning btn-circle mr-2"><FaEdit /></button>
                                                <button onClick={() => nonaktifkan(item.id_detail_pembimbing_akademik)} className="btn btn-xs btn-error btn-circle"><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailPembimbingAkademik