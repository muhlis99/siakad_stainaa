import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Select from 'react-select'
import axios from 'axios'
import { FaCog, FaEdit, FaPlus, FaReply, FaSearch, FaSave, FaTimes, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SlOptions } from "react-icons/sl"
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate'

const DetailPembimbingAkademik = () => {
    const [MhsPembimbing, setMhsPembimbing] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
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
    const [checked, setChecked] = useState([])
    const [select2, setSelect2] = useState([])
    const [isClearable, setIsClearable] = useState(true)
    const location = useLocation()

    useEffect(() => {
        getMhsPerPembimbing()
    }, [location, page, keyword])

    useEffect(() => {
        getPembimbing()
    }, [nipy, location])

    useEffect(() => {
        const getDataDsn = async () => {
            try {
                const response = await axios.get(`v1/pembimbingAkademik/getById/${location.state.idDsn}`)
                setNama(response.data.data.dosens[0].nama)
            } catch (error) {

            }
        }
        getDataDsn()
    }, [location])

    const getMhsPerPembimbing = async () => {
        try {
            if (location.state.kodePembimbing != 0) {
                const response = await axios.get(`v1/pembimbingAkademik/getMhsByPembimbingAkademik/${location.state.kodePembimbing}?page=${page}&search=${keyword}`)
                setMhsPembimbing(response.data.data)
                setPage(response.data.current_page)
                setrows(response.data.total_data)
                setPages(response.data.total_page)
                setperPage(response.data.per_page)
                setJumlah(response.data.data.length)
                setNipy(response.data.data[0].pembimbingAkademiks[0].dosen)
            }
        } catch (error) {

        }
    }

    const handleCheck = (e, item) => {
        if (e.target.checked) {
            setChecked([...checked, item.id_detail_pembimbing_akademik])
        } else {
            setChecked(checked.filter((o) => o !== item.id_detail_pembimbing_akademik))
        }
    }

    const pageCount = Math.ceil(rows / perPage)

    const changePage = (event) => {
        const newOffset = (event.selected + 1);
        setPage(newOffset);
    }

    const getPembimbing = async () => {
        try {
            if (nipy != 0) {
                const response = await axios.get(`v1/pembimbingAkademik/getForPindahPemdik/${nipy}/${location.state.jen}/${location.state.fak}/${location.state.pro}`)
                setPembimbing(response.data.data)
            }
        } catch (error) {

        }
    }

    const modalOpen = () => {
        if (checked.length == 0) {
            Swal.fire({
                title: 'Tidak ada data yang dipilih',
                icon: 'error'
            })
        } else {
            document.getElementById('my-modal').checked = true
        }
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

    const updateDetail = async (e) => {
        e.preventDefault()
        // setLoading(true)
        try {
            await axios.put(`v1/pembimbingAkademik/updateDetail`, {
                id: checked,
                code_pembimbing_akademik: kodePembimbing
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    modalClose()
                    getMhsPerPembimbing()
                });
            })
        } catch (error) {

        }
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-1/3 max-w-2xl relative">
                    <button className='btn btn-xs btn-circle btn-error absolute right-2 top-2' onClick={modalClose}><FaTimes /></button>
                    <div className='py-4'>
                        <form onSubmit={updateDetail}>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-semibold">Dosen Pembimbing</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={kodePembimbing} onChange={(e) => setKodePembimbing(e.target.value)}>
                                    <option value="">Dosen Pembimbing</option>
                                    {Pembimbing.map((item, index) => (
                                        <option key={index} value={item.code_pembimbing_akademik}>{item.dosens[0].nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mt-5 flex justify-center'>
                                <button className='btn btn-sm btn-primary'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pembimbing Akademik <span className='text-red-600'>{nama}</span></h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Link to='/pembimbingakademik' state={{ collaps: 'kuliah', activ: '/pembimbingakademik' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply />Kembali</Link>
                                <Link to='/setpembimbingakademik' state={{ kodePembimbing: location.state.kodePembimbing, kuota: location.state.kuota, idDsn: location.state.idDsn, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, collaps: 'kuliah', activ: '/pembimbingakademik' }} className="btn btn-primary btn-sm capitalize rounded-md"><FaCog />Set Mahasiswa</Link>
                                <button onClick={modalOpen} className='btn btn-info btn-sm capitalize rounded-md'><FaEdit />Edit Mahasiswa</button>
                            </div>
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
                                        <th scope="col" className="px-2 py-2 text-sm">#</th>
                                        <th scope="col" className="px-2 py-2 text-sm">NO</th>
                                        <th scope="col" className="px-2 py-2 text-sm">NIM</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Nama Mahasiswa</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Jenjang Pendidikan</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Fakultas</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Prodi</th>
                                        <th scope="col" className="px-2 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        MhsPembimbing.length == 0 ?
                                            <tr className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-2 py-2 font-semibold text-[12px]' colSpan={7} align='center'>Data Mahasiswa Asuh Kosong</td>
                                            </tr>
                                            :
                                            MhsPembimbing.map((item, index) => (
                                                <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                                    <th scope="row" className="px-2 py-2 font-semibold whitespace-nowrap">
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checked.includes(item.id_detail_pembimbing_akademik)}
                                                                    onChange={(e) => handleCheck(e, item)}
                                                                    className="checkbox checkbox-success checkbox-sm"
                                                                />
                                                            </label>
                                                        </div>
                                                    </th>
                                                    <th scope="row" className="px-2 py-2 font-semibold whitespace-nowrap">{(page - 1) * 10 + index + 1}</th>
                                                    <td className='px-2 py-2 font-semibold'>{item.nim}</td>
                                                    <td className='px-2 py-2 font-semibold'>{item.mahasiswas[0].nama}</td>
                                                    <td className='px-2 py-2 font-semibold'>{item.mahasiswas[0].code_jenjang_pendidikan}</td>
                                                    <td className='px-2 py-2 font-semibold'>{item.mahasiswas[0].code_fakultas}</td>
                                                    <td className='px-2 py-2 font-semibold'>{item.mahasiswas[0].code_prodi}</td>
                                                    <td className='px-2 py-2' align='center'>
                                                        {/* <button onClick={() => modalOpen(item.id_detail_pembimbing_akademik)} className="btn btn-xs btn-warning btn-circle mr-2"><FaEdit /></button> */}
                                                        <button onClick={() => nonaktifkan(item.id_detail_pembimbing_akademik)} className="btn btn-xs btn-error btn-circle"><FaTrash /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-2 justify-center btn-group" key={rows} aria-label='pagination'>
                            <ReactPaginate
                                className='justify-center btn-group'
                                breakLabel={<SlOptions />}
                                previousLabel={<FaArrowLeft />}
                                pageCount={pageCount}
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
            </section>
        </div>
    )
}

export default DetailPembimbingAkademik