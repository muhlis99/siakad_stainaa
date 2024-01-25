import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { FaEdit, FaSave, FaSearch, FaTimes } from 'react-icons/fa'
import Swal from 'sweetalert2'
import Select from "react-select"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const FormSettingRfid = () => {
    const [loading, setLoading] = useState(false)
    const [Mahasiswa, setMahasiswa] = useState([])
    const [autoComplete, setAutoComplete] = useState([])
    const [select2, setSelect2] = useState([])
    const [nimTerdaftar, setNimTerdaftar] = useState([])
    const [kodeRfid, setKodeRfid] = useState("")
    const [nim, setNim] = useState("")
    const [nama, setNama] = useState("")
    const [formEdit, setFormEdit] = useState(false)
    const [isClearable, setIsClearable] = useState(true)
    const selectInputRef = useRef()
    const [idRfid, setIdRfid] = useState("")

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
        if (formEdit == false) {
            document.getElementById('rfid').focus()
        }
    }, [])

    useEffect(() => {
        getRfidAll()
    }, [])

    useEffect(() => {
        getAutoCompleteMahasiswa()
    }, [nimTerdaftar])

    useEffect(() => {
        options()
    }, [autoComplete])

    useEffect(() => {
        dataRfid()
    }, [Mahasiswa])

    const getRfidAll = async () => {
        try {
            const response = await axios.get(`v1/rfid/all`)
            setMahasiswa(response.data.data)
        } catch (error) {

        }
    }

    const dataRfid = () => {
        var i = Mahasiswa.map(item => (
            item.nim
        ))
        setNimTerdaftar(i)
    }

    const getAutoCompleteMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/rfid/autocompleteRfid/2109010003`)
            var b = response.data.data.filter((item) =>
                !nimTerdaftar.includes(item.nim)
            )
            setAutoComplete(b)
        } catch (error) {

        }
    }

    const options = () => {
        var i = autoComplete.map(item => ({
            value: item.nim,
            label: item.nama,
        }))
        setSelect2(i)
    }

    const onchange = (e) => {
        setNim(e ? e.value : "")
    }

    const onClear = () => {
        selectInputRef.current.clearValue();
    }

    const simpanRfid = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (kodeRfid == '') {
                setLoading(false)
                Swal.fire({
                    title: 'RFID Kosong',
                    icon: 'error'
                })
            } else if (nim == '') {
                setLoading(false)
                Swal.fire({
                    title: 'Nama Mahasiswa Kosong',
                    icon: 'error'
                })
            } else {
                await axios.post('v1/rfid/create', {
                    code_rfid: kodeRfid,
                    nim: nim,
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getRfidAll()
                        setNim("")
                        setNama("")
                        setKodeRfid("")
                        setFormEdit(false)
                        onClear()
                    })
                })
            }
        } catch (error) {

        }
    }

    const getDataById = async (e) => {
        setFormEdit(true)
        try {
            const response = await axios.get(`v1/rfid/getById/${e}`)
            setIdRfid(response.data.data.id_rfid)
            setKodeRfid(response.data.data.code_rfid)
            setNim(response.data.data.nim)
            setNama(response.data.data.mahasiswas[0].nama)
        } catch (error) {

        }
    }

    const updateRfid = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (kodeRfid == '') {
                setLoading(false)
                Swal.fire({
                    title: 'RFID Kosong',
                    icon: 'error'
                })
            } else if (nim == '') {
                setLoading(false)
                Swal.fire({
                    title: 'Nama Mahasiswa Kosong',
                    icon: 'error'
                })
            } else {
                await axios.put(`v1/rfid/update/${idRfid}`, {
                    code_rfid: kodeRfid,
                    nim: nim,
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getRfidAll()
                        setIdRfid("")
                        setNim("")
                        setKodeRfid("")
                        setNama("")
                        setFormEdit(false)
                        onClear()
                    })
                })
            }
        } catch (error) {

        }
    }

    const hapusRfid = (id) => {
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
                        `v1/rfid/delete/${id}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getRfidAll()
                        })
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
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Setting RFID</h1>
            </section>
            <section>
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                            {formEdit ?
                                <div className="card-body p-4 edit">
                                    <form onSubmit={updateRfid}>
                                        <div className='grid gap-3'>
                                            <div>
                                                <label className="label">
                                                    <span className="text-base label-text">RFID</span>
                                                </label>
                                                <input type="number" id='rfid' placeholder="RFID" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    value={kodeRfid} onChange={(e) => setKodeRfid(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="label">
                                                    <span className="text-base label-text">Nama</span>
                                                </label>
                                                <Select
                                                    className="basic-single"
                                                    ref={selectInputRef}
                                                    classNamePrefix="select"
                                                    options={select2}
                                                    onChange={onchange}
                                                    isClearable={isClearable}
                                                    id='input-select'
                                                    placeholder={nama}
                                                />
                                            </div>
                                            <div>
                                                <label className="label">
                                                    <span className="text-base label-text">NIM</span>
                                                </label>
                                                <input type="number" placeholder="NIM" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    value={nim} onChange={(e) => setNim(e.target.value)} disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-5'>
                                            <div className='col-span-2 mb-3'>
                                                <hr />
                                            </div>
                                            <div>
                                                <div className='float-right'>
                                                    <div className='lg:pl-1'>
                                                        <button className='btn btn-sm btn-warning capitalize rounded-md text-white'><FaEdit /><span className="">edit</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="card-body p-4 tambah">
                                    <form onSubmit={simpanRfid}>
                                        <div className='grid gap-3'>
                                            <div>
                                                <label className="label">
                                                    <span className="text-base label-text">RFID</span>
                                                </label>
                                                <input type="number" id='rfid' placeholder="RFID" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    value={kodeRfid} onChange={(e) => setKodeRfid(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="label">
                                                    <span className="text-base label-text">Nama</span>
                                                </label>
                                                <Select
                                                    className="basic-single"
                                                    ref={selectInputRef}
                                                    classNamePrefix="select"
                                                    options={select2}
                                                    onChange={onchange}
                                                    isClearable={isClearable}
                                                    id='input-select'
                                                    placeholder={nama}
                                                />
                                            </div>
                                            <div>
                                                <label className="label">
                                                    <span className="text-base label-text">NIM</span>
                                                </label>
                                                <input type="number" placeholder="NIM" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    value={nim} onChange={(e) => setNim(e.target.value)} disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-5'>
                                            <div className='col-span-2 mb-3'>
                                                <hr />
                                            </div>
                                            <div>
                                                <div className='float-right'>
                                                    <div className='lg:pl-1'>
                                                        <button className='btn btn-sm btn-primary capitalize rounded-md'><FaSave /><span className="">Simpan</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='col-span-2 card bg-base-100 card-bordered shadow-md mb-2'>
                        <div className="card-body p-4">
                            <div>
                                <div className="form-control">
                                    <div className="input-group justify-end">
                                        <input
                                            type="text"
                                            // onChange={cariData}
                                            className="input input-sm input-bordered input-success"
                                            placeholder='Cari'
                                        />
                                        <button className="btn btn-sm btn-square btn-success">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto mb-2">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className='text-gray-700 bg-[#d4cece]'>
                                        <tr>
                                            <th scope="col" className="px-2 py-2 text-sm">NO</th>
                                            <th scope="col" className="px-2 py-2 text-sm">RFID</th>
                                            <th scope="col" className="px-2 py-2 text-sm">NIM</th>
                                            <th scope="col" className="px-2 py-2 text-sm">Nama</th>
                                            <th scope="col" className='px-2 py-2 text-sm'>Prodi</th>
                                            <th scope="col" className="px-2 py-2 text-sm" align='center'>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Mahasiswa.map((item, index) => (
                                            <tr key={item.id_rfid} className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-2 py-2 text-[12px]'>{index + 1}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.code_rfid}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.nim}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.mahasiswas[0].nama}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.mahasiswas[0].prodis[0].nama_prodi}</td>
                                                <td className='px-2 py-2 text-[12px]'>
                                                    <div className='flex gap-1'>
                                                        <button onClick={() => getDataById(item.id_rfid)} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></button>
                                                        <button onClick={() => hapusRfid(item.id_rfid)} className="btn btn-xs btn-circle text-white btn-error" title='Hapus'><FaTimes /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormSettingRfid