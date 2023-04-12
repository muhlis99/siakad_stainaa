import React, { useState, useEffect } from 'react'
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { FaTimes, FaSearch, FaTrash, FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const ListJenjang = () => {
    const [Jenjang, setJenjang] = useState([]);
    const [page, setPage] = useState(0);
    const [perPage, setperPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [rows, setrows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const [nama, setNama] = useState("");
    const [errors, setError] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        getJenjang()
    }, [page, keyword])

    const getJenjang = async () => {
        const response = await axios.get(
            `v1/jenjangPendidikan/all?page=${page}&search=${keyword}`
        );
        setJenjang(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const pageCount = Math.ceil(rows / perPage);

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
        e.preventDefault();
        setPage(0)
        setKeyword(query)
    }

    const simpanJenjang = async (e) => {
        e.preventDefault()
        try {
            if (nama.length == 0) {
                setError(true)
            } else {
                document.getElementById('my-modal-add').checked = false;
                await axios.post(
                    'v1/jenjangPendidikan/create', {
                    nama_jenjang_pendidikan: nama
                }).then(function (response) {
                    Swal.fire({
                        title: "Berhasil",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJenjang()
                        setNama("")
                    });
                })

            }
        } catch (error) {
            if (error.response) {
                setError(true)
            }
        }
    }

    const modalAddClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-add').checked = false;
        setNama("")
        setError(false)
    }

    const modalEditOpen = async (e) => {
        try {
            const response = await axios.get(`v1/jenjangPendidikan/getById/${e}`);
            setNama(response.data.data.nama_jenjang_pendidikan)
            document.getElementById('my-modal-edit').checked = true;
        } catch (error) {
        }
    }

    const modalEditClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-edit').checked = false;
        setNama("")
        setId("")
        setError(false)
    }

    const updateJenjang = async (e) => {
        e.preventDefault()
        try {
            if (nama.length == 0) {
                setError(true)
            } else {
                document.getElementById('my-modal-edit').checked = false;
                await axios.put(
                    `v1/jenjangPendidikan/update/${id}`, {
                    nama_jenjang_pendidikan: nama
                }).then(function (response) {
                    Swal.fire({
                        title: "Berhasil",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJenjang()
                        setNama("")
                        setId("")
                    });
                })
            }
        } catch (error) {
            if (error.response) {
                setError(true)
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
                    axios.put(
                        `v1/jenjangPendidikan/deleteStatus/${jenjangId}`
                    ).then((response) => {
                        console.log(response.data)
                        // Swal.fire({
                        //     title: "",
                        //     text: "File Anda telah dihapus.",
                        //     icon: "success"
                        // }).then(() => {
                        //     getMasuk()
                        // });
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
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle btn-danger absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                    <form onSubmit={simpanJenjang}>
                        <h3 className="font-bold text-xl">Tambah Jenjang Pendidikan</h3>
                        <div className="py-4">
                            <label className=' uppercase font-bold'>Nama Jenjang Pendidikan</label>
                            <div className="form-control w-full ">
                                <select
                                    className="select select-bordered select-sm"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Jenjang Pendidikan-</option>
                                    <option>DIPLOMA</option>
                                    <option>SARJANA</option>
                                    <option>MAGISTER</option>
                                    <option>DOKTOR</option>
                                </select>
                            </div>
                            {errors && nama.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-default">simpan</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal untuk edit data */}
            <input type="checkbox" id="my-modal-edit" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle btn-danger absolute right-2 top-2" onClick={modalEditClose}><FaTimes /></button>
                    <form onSubmit={updateJenjang}>
                        <h3 className="font-bold text-xl">Edit Jenjang Pendidikan</h3>
                        <div className="py-4">
                            <label className=' uppercase font-bold'>Nama Jenjang Pendidikan</label>
                            <div className="form-control w-full ">
                                <select
                                    className="select select-bordered select-sm"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Jenjang Pendidikan-</option>
                                    <option>DIPLOMA</option>
                                    <option>SARJANA</option>
                                    <option>MAGISTER</option>
                                    <option>DOKTOR</option>
                                </select>
                            </div>
                            {errors && nama.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-default">simpan</button>
                        </div>
                    </form>
                </div>
            </div>

            <section className='mb-7'>
                <h1 className='text-2xl font-bold'>Jenjang Pendidikan</h1>
            </section>
            <section>
                <div className="card card-bordered bg-base-100 shadow-xl mb-36">
                    <div className="card-body">
                        <div className="flex">
                            <div className="flex-1">
                                <label htmlFor="my-modal-add" className="btn btn-default btn-sm"><FaPlus /> tambah data</label>
                            </div>
                        </div>
                        <form onSubmit={cariData} className='mb-1'>
                            <div className="form-control">
                                <div className="input-group justify-end">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="input input-sm input-bordered input-success"
                                        placeholder='Cari'
                                    />
                                    <button type='submit' className="btn btn-sm btn-square btn-default">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Kode Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Nama Jenjang Pendidikan</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Jenjang.map((jenj, index) => (
                                        <tr key={jenj.id_jenjang_pendidikan} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-6 py-4'>{jenj.code_jenjang_pendidikan}</td>
                                            <td className='px-6 py-4'>{jenj.nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-4' align='center'>
                                                <div className="btn-group">
                                                    <button className="btn btn-sm text-white btn-warning" onClick={() => modalEditOpen(jenj.id_jenjang_pendidikan)} title='Edit'><BiEdit /></button>
                                                    <button className="btn btn-sm text-white btn-danger" onClick={() => nonaktifkan(jenj.id_jenjang_pendidikan)} title='Hapus'><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span>Total Data : {rows} page: {rows ? page : 0} of {pages}</span>
                            <span className='text-sm text-red-700'>{msg}</span>
                        </div>
                        <div className="mt-3 justify-center btn-group" key={rows} aria-label='pagination'>
                            <ReactPaginate
                                className='justify-center btn-group'
                                breakLabel={<SlOptions />}
                                previousLabel={<FaArrowLeft />}
                                pageCount={Math.min(10, pageCount)}
                                onPageChange={changePage}
                                nextLabel={<FaArrowRight />}
                                previousLinkClassName={"btn btn-sm btn-primary btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-sm btn-primary btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-sm btn-primary btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-sm btn-primary btn-circle btn-active"}
                                pageLinkClassName={"btn btn-sm btn-primary btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-sm btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default ListJenjang