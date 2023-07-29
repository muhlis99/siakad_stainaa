import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Select from 'react-select'
import axios from 'axios'
import { FaPlus, FaSave } from 'react-icons/fa'

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
    const [select2, setSelect2] = useState("")
    const [isClearable, setIsClearable] = useState(true)
    const [nim, setNim] = useState("")
    const location = useLocation()
    const selectInputRef = useRef()

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
            console.log(response.data.data)
        }
    }


    const getMahasiswa = async () => {
        const response = await axios.get('v1/pembimbingAkademik/autocompleteMahasiswa')
        setMahasiswa(response.data.data)

    }

    const options = () => {
        var i = Mahasiswa.map(item => ({
            value: item.nim,
            label: item.nim + " | " + item.nama,
        }))
        setSelect2(i)
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
            } else {
                await axios.post('v1/pembimbingAkademik/createDetail', {
                    code_pembimbing_akademik: kodeBimbing,
                    nim: nim,
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getMhsPerPembimbing()
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



    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md">
                    <div className="card-body p-4">
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
                        <form onSubmit={simpanMahasiswa}>
                            <div className='mb-2 flex gap-2'>
                                <Select
                                    className="basic-single w-60 rounded-md"
                                    classNamePrefix="select"
                                    ref={selectInputRef}
                                    options={select2}
                                    onChange={onchange}
                                    isClearable={isClearable}
                                    placeholder="Cari Mahasiswa"
                                    noOptionsMessage={() => "Tidak Ada"}
                                />
                                <button className='btn btn-sm btn-primary mt-1'><FaPlus />Tambah</button>
                            </div>
                        </form>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3">#</th>
                                        <th scope="col" className="px-2 py-3">NIPY</th>
                                        <th scope="col" className="px-2 py-3">Nama Dosen</th>
                                        <th scope="col" className="px-2 py-3">Fakultas</th>
                                        <th scope="col" className="px-2 py-3">Prodi</th>
                                        <th scope="col" className="px-2 py-3">Kuota Bimbingan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MhsPembimbing.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap"></th>
                                            <td className='px-2 py-2'></td>
                                            <td className='px-2 py-2'></td>
                                            <td className='px-2 py-2'></td>
                                            <td className='px-2 py-2'></td>
                                            <td className='px-2 py-2'></td>
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