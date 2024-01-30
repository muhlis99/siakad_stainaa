import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { FaEdit, FaSave, FaSearch, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SlOptions } from "react-icons/sl"
import Swal from 'sweetalert2'
import Select from "react-select"
import ReactPaginate from "react-paginate"

const FormRfidDosen = () => {
    const [loading, setLoading] = useState(false)
    const [Dosen, setDosen] = useState([])
    const [autoComplete, setAutoComplete] = useState([])
    const [select2, setSelect2] = useState([])
    const [nipyTerdaftar, setNipyTerdaftar] = useState([])
    const [kodeRfid, setKodeRfid] = useState("")
    const [nipy, setNipy] = useState("")
    const [nama, setNama] = useState("")
    const [formEdit, setFormEdit] = useState(false)
    const [isClearable, setIsClearable] = useState(true)
    const selectInputRef = useRef()
    const [idRfid, setIdRfid] = useState("")
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [msg, setMsg] = useState("")


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
        // if (formEdit == false) {
        //     document.getElementById('rfid').focus()
        // }
    }, [])

    useEffect(() => {
        getRfidAll()
    }, [page, keyword])

    useEffect(() => {
        getAutoCompleteMahasiswa()
    }, [nipyTerdaftar])

    useEffect(() => {
        options()
    }, [autoComplete])

    useEffect(() => {
        dataRfid()
    }, [Dosen])

    const getRfidAll = async () => {
        try {
            const response = await axios.get(`v1/rfidDosen/all?page=${page}&search=${keyword}`)
            setDosen(response.data.data)
            setPage(response.data.current_page)
            setrows(response.data.total_data)
            setPages(response.data.total_page)
            setperPage(response.data.per_page)
        } catch (error) {

        }
    }

    const pageCount = Math.ceil(rows / perPage)

    const changePage = (event) => {
        const newOffset = (event.selected + 1);
        setPage(newOffset);
        if (event.selected === 9) {
            setMsg("Jika tidak menemukan data yang dicari, maka lakukan pencarian data secara spesifik!")
        } else {
            setMsg("")
        }
    }

    const cariData = (e) => {
        e.preventDefault()
        setKeyword(e ? e.target.value : "")
        setPage(0)
    }

    const dataRfid = () => {
        var i = Dosen.map(item => (
            item.nip_ynaa
        ))
        setNipyTerdaftar(i)
    }

    const getAutoCompleteMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/rfidDosen/autocompleteRfid/19911209202189`)
            var b = response.data.data.filter((item) =>
                !nipyTerdaftar.includes(item.nip_ynaa)
            )
            setAutoComplete(b)
        } catch (error) {

        }
    }

    const options = () => {
        var i = autoComplete.map(item => ({
            value: item.nip_ynaa,
            label: item.nama,
        }))
        setSelect2(i)
    }

    const onchange = (e) => {
        setNipy(e ? e.value : "")
    }

    const onClear = () => {
        selectInputRef.current.clearValue();
    }

    const onFocus = () => {
        document.getElementById('rfid').focus()
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
                }).then(() => {
                    onFocus()
                })
            } else if (nipy == '') {
                setLoading(false)
                Swal.fire({
                    title: 'Nama Dosen Kosong',
                    icon: 'error'
                }).then(() => {
                    onFocus()
                })
            } else {
                await axios.post('v1/rfidDosen/create', {
                    code_rfid: kodeRfid,
                    nip_ynaa: nipy,
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getRfidAll()
                        setNipy("")
                        setNama("")
                        setKodeRfid("")
                        setFormEdit(false)
                        onFocus()
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
            const response = await axios.get(`v1/rfidDosen/getById/${e}`)
            setIdRfid(response.data.data.id_rfid)
            setKodeRfid(response.data.data.code_rfid)
            setNipy(response.data.data.nip_ynaa)
            setNama(response.data.data.dosens[0].nama)
            onFocus()
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
            } else if (nipy == '') {
                setLoading(false)
                Swal.fire({
                    title: 'Nama Dosen Kosong',
                    icon: 'error'
                })
            } else {
                await axios.put(`v1/rfidDosen/update/${idRfid}`, {
                    code_rfid: kodeRfid,
                    nip_ynaa: nipy,
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getRfidAll()
                        setIdRfid("")
                        setNipy("")
                        setKodeRfid("")
                        setNama("")
                        setFormEdit(false)
                        onClear()
                        onFocus()
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
                        `v1/rfidDosen/delete/${id}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getRfidAll()
                            document.getElementById('rfid').focus()
                        })
                    })

                } catch (error) {

                }
            }
        })
    }

    const batalEdit = () => {
        setFormEdit(false)
        setKodeRfid("")
        setNipy("")
        setNama("")
        document.getElementById('rfid').focus()
    }

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>RFID Dosen</h1>
            </section>
            <section>
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                            {formEdit ?
                                <div className="card-body p-4 edit">
                                    <div className='grid gap-3'>
                                        <div>
                                            <label className="label">
                                                <span className="text-base label-text">RFID</span>
                                            </label>
                                            <input type="number" id='rfid' placeholder="RFID" autoFocus autoComplete='off' className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                                                <span className="text-base label-text">NIP</span>
                                            </label>
                                            <input type="number" placeholder="NIP" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={nipy} onChange={(e) => setNipy(e.target.value)} disabled
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <form onSubmit={updateRfid}>
                                            <div className='col-span-2 mb-3'>
                                                <hr />
                                            </div>
                                            <div>
                                                <button type='button' className='btn btn-sm btn-error capitalize rounded-md' onClick={batalEdit}><FaTimes /><span className="">batal</span></button>
                                                <div className='float-right'>
                                                    <div className='lg:pl-1'>
                                                        <button className='btn btn-sm btn-warning capitalize rounded-md text-white'><FaEdit /><span className="">edit</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                :
                                <div className="card-body p-4 tambah">
                                    <div className='grid gap-3'>
                                        <div>
                                            <label className="label">
                                                <span className="text-base label-text">RFID</span>
                                            </label>
                                            <input type="number" id='rfid' placeholder="RFID" autoFocus autoComplete='off' className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                                                <span className="text-base label-text">NIP</span>
                                            </label>
                                            <input type="number" placeholder="NIP" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={nipy} onChange={(e) => setNipy(e.target.value)} disabled
                                            />
                                        </div>
                                    </div>
                                    {nipy &&
                                        <div className='mt-5'>
                                            <form onSubmit={simpanRfid}>
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
                                            </form>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                            <div className="card-body p-4">
                                <div>
                                    <div className="form-control">
                                        <div className="input-group justify-end">
                                            <input
                                                type="text"
                                                onChange={cariData}
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
                                                <th scope="col" className="px-2 py-2 text-sm">NIP</th>
                                                <th scope="col" className="px-2 py-2 text-sm">Nama</th>
                                                <th scope="col" className="px-2 py-2 text-sm" align='center'>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Dosen.map((item, index) => (
                                                <tr key={item.id_rfid} className='bg-white border-b text-gray-500 border-x'>
                                                    <td className='px-2 py-2 text-[12px]'>{index + 1}</td>
                                                    <td className='px-2 py-2 text-[12px]'>{item.code_rfid}</td>
                                                    <td className='px-2 py-2 text-[12px]'>{item.nip_ynaa}</td>
                                                    <td className='px-2 py-2 text-[12px]'>{item.dosens[0].nama}</td>
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
                                <div>
                                    <span className='text-sm font-semibold'>Total Data : {rows} page: {page} of {pages}</span>
                                    <p className='text-sm text-red-700'>{msg}</p>
                                </div>
                                <div className="mt-2 justify-center btn-group" key={rows} aria-label='pagination'>
                                    <ReactPaginate
                                        className='justify-center btn-group'
                                        breakLabel={<SlOptions />}
                                        previousLabel={<FaArrowLeft />}
                                        pageCount={Math.min(10, pageCount)}
                                        onPageChange={changePage}
                                        nextLabel={<FaArrowRight />}
                                        previousLinkClassName={"btn btn-xs btn-success btn-circle btn-outline"}
                                        nextLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                        breakLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                        activeLinkClassName={"btn btn-xs btn-success btn-circle"}
                                        pageLinkClassName={"btn btn-xs btn-success btn-circle ml-1"}
                                        disabledLinkClassName={"btn btn-xs btn-circle btn-outline btn-disabled"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormRfidDosen