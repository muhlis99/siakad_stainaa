import React, { useState, useEffect } from 'react'
import { FaTrash, FaPlus, FaSearch, FaArrowRight, FaArrowLeft, FaTimes, FaEdit } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

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
        e.preventDefault();
        setPage(0)
        setKeyword(query)
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
            if (kodeJenjang.length == 0 || kodeDikti.length == 0 || namaFak.length == 0) {
                setError(true)
            } else {
                document.getElementById('my-modal-add').checked = false;
                await axios.post('v1/fakultas/create', {
                    code_jenjang_pendidikan: kodeJenjang,
                    code_dikti_fakultas: kodeDikti,
                    nama_fakultas: namaFak
                }).then(function (response) {
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
            if (kodeJenjang.length == 0 || kodeDikti.length == 0 || namaFak.length == 0) {
                setError(true)
            } else {
                document.getElementById('my-modal-edit').checked = false;
                await axios.put(
                    `v1/fakultas/update/${id}`, {
                    code_jenjang_pendidikan: kodeJenjang,
                    code_dikti_fakultas: kodeDikti,
                    nama_fakultas: namaFak
                }).then(function (response) {
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
                        `v1/fakultas/deleteStatus/${jenjangId}`
                    ).then((response) => {
                        console.log(response.data)
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
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle btn-danger absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                    <form onSubmit={simpanFakultas}>
                        <h3 className="font-bold text-xl">Tambah</h3>
                        <div className="py-4">
                            <div className="form-control w-full ">
                                <label className='text-sm uppercase font-bold mb-1'>Nama Jenjang Pendidikan</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={kodeJenjang}
                                    onChange={(e) => setKodeJenjang(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Jenjang Pendidikan-</option>
                                    {Jenjang.map((jenj) => (
                                        <option key={jenj.code_jenjang_pendidikan} value={jenj.code_jenjang_pendidikan}>{jenj.nama_jenjang_pendidikan}</option>
                                    ))}

                                </select>
                            </div>
                            {errors && kodeJenjang.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mt-2">
                                <label className="text-sm uppercase font-bold mb-1">Kode dikti fakultas</label>
                                <input
                                    type="text"
                                    placeholder="Kode Dikti Fakultas"
                                    value={kodeDikti}
                                    onChange={(e) => setKodeDikti(e.target.value)}
                                    className="input input-sm input-bordered w-full"
                                />
                            </div>
                            {errors && kodeDikti.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mt-2">
                                <label className='text-sm uppercase font-bold mb-1'>Nama Fakultas</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={namaFak}
                                    onChange={(e) => setNamaFak(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Fakultas-</option>
                                    <option>AGAMA ISLAM</option>
                                    <option>AKUNTANSI</option>
                                    <option>HUKUM</option>
                                    <option>TEKNOLOGI INFORMASI</option>
                                    <option>KOMUNIKASI</option>
                                    <option>PSIKOLOGI</option>
                                </select>
                            </div>
                            {errors && namaFak.length <= 0 ?
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
                    <form onSubmit={updateFakultas}>
                        <h3 className="font-bold text-xl">Edit</h3>
                        <div className="py-4">
                            <div className="form-control w-full ">
                                <label className='text-sm uppercase font-bold mb-1'>Nama Jenjang Pendidikan</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={kodeJenjang}
                                    onChange={(e) => setKodeJenjang(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Jenjang Pendidikan-</option>
                                    {Jenjang.map((jenj) => (
                                        <option key={jenj.code_jenjang_pendidikan} value={jenj.code_jenjang_pendidikan}>{jenj.nama_jenjang_pendidikan}</option>
                                    ))}

                                </select>
                            </div>
                            {errors && kodeJenjang.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mt-2">
                                <label className="text-sm uppercase font-bold mb-1">Kode dikti fakultas</label>
                                <input
                                    type="text"
                                    placeholder="Kode Dikti Fakultas"
                                    value={kodeDikti}
                                    onChange={(e) => setKodeDikti(e.target.value)}
                                    className="input input-sm input-bordered w-full"
                                />
                            </div>
                            {errors && kodeDikti.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mt-2">
                                <label className='text-sm uppercase font-bold mb-1'>Nama Fakultas</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={namaFak}
                                    onChange={(e) => setNamaFak(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Fakultas-</option>
                                    <option>AGAMA ISLAM</option>
                                    <option>AKUNTANSI</option>
                                    <option>HUKUM</option>
                                    <option>TEKNOLOGI INFORMASI</option>
                                    <option>KOMUNIKASI</option>
                                    <option>PSIKOLOGI</option>
                                </select>
                            </div>
                            {errors && namaFak.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-default">update</button>
                        </div>
                    </form>
                </div>
            </div>

            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Fakultas</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <label htmlFor="my-modal-add" className="btn btn-default btn-xs"><FaPlus /> tambah data</label>
                            </div>
                            <div>
                                <form onSubmit={cariData} className='mb-1'>
                                    <div className="form-control">
                                        <div className="input-group justify-end">
                                            <input
                                                type="text"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                className="input input-xs input-bordered input-success"
                                                placeholder='Cari'
                                            />
                                            <button type='submit' className="btn btn-xs btn-square btn-default">
                                                <FaSearch />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Kode Fakultas</th>
                                        <th scope="col" className="px-6 py-3">Nama Fakultas</th>
                                        <th scope="col" className='px-6 py-3'>Status</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Fakultas.map((faks, index) => (
                                        <tr key={faks.id_fakultas} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-6 py-2'>{faks.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2'>{faks.code_fakultas}</td>
                                            <td className='px-6 py-2'>{faks.nama_fakultas}</td>
                                            <td className='px-6 py-2'>{faks.status == "aktif" ? <span className="badge btn-default badge-sm">Aktif</span> : <span className="badge badge-error badge-sm">Tidak Aktif</span>}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div>
                                                    <button className="btn btn-xs btn-circle text-white btn-warning mr-1" onClick={() => modalEditOpen(faks.id_fakultas)} title='Edit'><FaEdit /></button>
                                                    <button className="btn btn-xs btn-circle text-white btn-danger" onClick={() => nonaktifkan(faks.id_fakultas)} title='Hapus'><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span className='text-sm'>Total Data : {rows} page: {page} of {pages}</span>
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
                                previousLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-default-activ"}
                                pageLinkClassName={"btn btn-xs btn-default-outline btn-outline btn-circle ml-1"}
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