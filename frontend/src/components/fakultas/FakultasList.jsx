import React, { useState, useEffect } from 'react'
import { FaTrash, FaPlus, FaSearch, FaArrowRight, FaArrowLeft, FaTimes, FaEdit, FaSave } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import Loading from '../Loading';

const FakultasList = () => {
    const [Fakultas, setFakultas] = useState([]);
    const [Jenjang, setJenjang] = useState([]);
    const [rows, setrows] = useState(0);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [perPage, setperPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const [kodeJenjang, setKodeJenjang] = useState("");
    const [kodeDikti, setKodeDikti] = useState("");
    const [namaFak, setNamaFak] = useState("");
    const [errors, setError] = useState("");
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    useEffect(() => {
        getFakultas()
    }, [page, keyword])

    useEffect(() => {
        getJenjang()
    }, [])

    const getFakultas = async () => {
        const response = await axios.get(
            `v1/fakultas/all?page=${page}&search=${keyword}`
        );
        setFakultas(response.data.data)
        setrows(response.data.total_data)
        setPage(response.data.current_page)
        setPages(response.data.totalPage)
        setperPage(response.data.per_page)
    }

    const getJenjang = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all');
        setJenjang(response.data.data)
    }

    const pageCount = Math.ceil(rows / perPage);

    const changePage = (event) => {
        const newOffset = (event.selected + 1);
        console.log(event.selected, newOffset)
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

    const modalAddClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-add').checked = false;
        setNamaFak("")
        setKodeDikti("")
        setKodeJenjang("")
        setError(false)
    }

    const simpanFakultas = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            document.getElementById('my-modal-add').checked = false;
            await axios.post('v1/fakultas/create', {
                code_jenjang_pendidikan: kodeJenjang,
                nama_fakultas: namaFak
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    getFakultas()
                    setNamaFak("")
                    setKodeDikti("")
                    setKodeJenjang("")
                });
            })
        } catch (error) {
            if (error.response.data.message) {
                setLoading(false)
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                }).then(() => {
                    getFakultas()
                    setNamaFak("")
                    setKodeDikti("")
                    setKodeJenjang("")
                })
            } else {
                setLoading(false)
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const modalEditOpen = async (e) => {
        try {
            const response = await axios.get(`v1/fakultas/getById/${e}`);
            setNamaFak(response.data.data.nama_fakultas)
            setKodeJenjang(response.data.data.code_jenjang_pendidikan)
            setKodeDikti(response.data.data.code_dikti_fakultas)
            setId(e)
            document.getElementById('my-modal-edit').checked = true;
        } catch (error) {
        }
    }

    const modalEditClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-edit').checked = false;
        setNamaFak("")
        setId("")
        setKodeDikti("")
        setKodeJenjang("")
        setError(false)
    }

    const updateFakultas = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            document.getElementById('my-modal-edit').checked = false;
            await axios.put(
                `v1/fakultas/update/${id}`, {
                code_jenjang_pendidikan: kodeJenjang,
                nama_fakultas: namaFak
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    getFakultas()
                    setNamaFak("")
                    setKodeDikti("")
                    setKodeJenjang("")
                    setId("")
                });
            })
        } catch (error) {
            if (error.response.data.message) {
                setLoading(false)
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                }).then(() => {
                    getFakultas()
                    setNamaFak("")
                    setKodeDikti("")
                    setKodeJenjang("")
                    setId("")
                })
            } else {
                setLoading(false)
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }

    }

    const nonaktifkan = (jenjangId) => {
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
                    setLoading(true)
                    axios.put(
                        `v1/fakultas/deleteStatus/${jenjangId}`
                    ).then((response) => {
                        setLoading(false)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getFakultas()
                        });
                    })
                } catch (error) {

                }
            }
        })
    }

    return (
        <div className="container mt-2">
            {/* Modal untuk tambah data */}
            <input type="checkbox" id="my-modal-add" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={simpanFakultas}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">Tambah</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div className="grid gap-3">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                        </label>
                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={kodeJenjang}
                                            onChange={(e) => setKodeJenjang(e.target.value)}
                                        >
                                            <option disabled value={""}>-Jenjang Pendidikan-</option>
                                            {Jenjang.map((jenj) => (
                                                <option key={jenj.code_jenjang_pendidikan} value={jenj.code_jenjang_pendidikan}>{jenj.nama_jenjang_pendidikan}</option>
                                            ))}

                                        </select>
                                        {errors && kodeJenjang.length <= 0 ?
                                            <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                                        }
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Fakultas</span>
                                        </label>
                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={namaFak}
                                            onChange={(e) => setNamaFak(e.target.value)}
                                        >
                                            <option disabled value={""}>-Pilih Fakultas-</option>
                                            <option>AGAMA ISLAM</option>
                                            <option>MUAMALAH</option>
                                            <option>AKUNTANSI</option>
                                            <option>HUKUM</option>
                                            <option>TEKNOLOGI INFORMASI</option>
                                            <option>KOMUNIKASI</option>
                                            <option>PSIKOLOGI</option>
                                        </select>
                                        {errors && namaFak.length <= 0 ?
                                            <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 border-t-2 text-center'>
                            <button type='submit' className="btn btn-sm btn-primary capitalize"><FaSave />simpan</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal untuk edit data */}
            <input type="checkbox" id="my-modal-edit" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={updateFakultas}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">Edit</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalEditClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div className="grid gap-3">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                        </label>
                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={kodeJenjang}
                                            onChange={(e) => setKodeJenjang(e.target.value)}
                                        >
                                            <option disabled value={""}>-Jenjang Pendidikan-</option>
                                            {Jenjang.map((jenj) => (
                                                <option key={jenj.code_jenjang_pendidikan} value={jenj.code_jenjang_pendidikan}>{jenj.nama_jenjang_pendidikan}</option>
                                            ))}

                                        </select>
                                        {errors && kodeJenjang.length <= 0 ?
                                            <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                                        }
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Fakultas</span>
                                        </label>
                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={namaFak}
                                            onChange={(e) => setNamaFak(e.target.value)}
                                        >
                                            <option disabled value={""}>-Pilih Fakultas-</option>
                                            <option>AGAMA ISLAM</option>
                                            <option>MUAMALAH</option>
                                            <option>AKUNTANSI</option>
                                            <option>HUKUM</option>
                                            <option>TEKNOLOGI INFORMASI</option>
                                            <option>KOMUNIKASI</option>
                                            <option>PSIKOLOGI</option>
                                        </select>
                                        {errors && namaFak.length <= 0 ?
                                            <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 border-t-2 text-center'>
                            <button type='submit' className="btn btn-sm btn-primary capitalize"><FaEdit />Edit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>

            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Fakultas</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <label htmlFor="my-modal-add" className="btn btn-success btn-sm capitalize rounded-md"><FaPlus /> tambah data</label>
                            </div>
                            <div>
                                <div className="form-control">
                                    <div className="input-group justify-end">
                                        <input
                                            type="text"
                                            onChange={cariData}
                                            className="input input-sm input-bordered input-success"
                                            placeholder='Cari'
                                        />
                                        <button type='submit' className="btn btn-sm btn-square btn-success">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-sm">#</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Jenjang</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Kode Fakultas</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Nama Fakultas</th>
                                        <th scope="col" className='px-6 py-2 text-sm'>Status</th>
                                        <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Fakultas.length == 0 ?
                                        <tr className='bg-white border-b border-x text-gray-500'>
                                            <td className='px-6 py-2 font-semibold' align='center' colSpan='6'>Data Fakultas Kosong</td>
                                        </tr>
                                        :
                                        Fakultas.map((faks, index) => (
                                            <tr key={faks.id_fakultas} className='bg-white border-b text-gray-500 border-x'>
                                                <th scope="row" className="px-6 py-2 whitespace-nowrap font-semibold">
                                                    {(page - 1) * 10 + index + 1}
                                                </th>
                                                <td className='px-6 py-2 font-semibold'>{faks.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                                <td className='px-6 py-2 font-semibold'>{faks.code_fakultas}</td>
                                                <td className='px-6 py-2 font-semibold'>{faks.nama_fakultas}</td>
                                                <td className='px-6 py-2 font-semibold'><span className="badge badge-success badge-sm font-semibold capitalize">{faks.status}</span></td>
                                                <td className='px-6 py-2' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning mr-1" onClick={() => modalEditOpen(faks.id_fakultas)} title='Edit'><FaEdit /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-error" onClick={() => nonaktifkan(faks.id_fakultas)} title='Hapus'><FaTrash /></button>
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
            </section>
        </div>
    )
}

export default FakultasList