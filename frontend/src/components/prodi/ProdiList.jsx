import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaTrash, FaArrowLeft, FaArrowRight, FaTimes, FaEdit } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const ProdiList = () => {
    const [Prodi, setProdi] = useState([]);
    const [Jenjang, setJenjang] = useState([]);
    const [Fakultas, setFakultas] = useState([]);
    const [page, setPage] = useState(0);
    const [perPage, setperPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [rows, setrows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const [errors, setError] = useState("");
    const [kodeJenj, setKodeJenj] = useState("");
    const [kodeFaks, setKodeFaks] = useState("")
    const [kodeDikti, setKodeDikti] = useState("");
    const [namaProdi, setNamaProdi] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        getProdi()
    }, [page, keyword])

    useEffect(() => {
        getJenjang()
    });

    useEffect(() => {
        getFakultasByJenjang()
    }, [kodeJenj])

    const getProdi = async () => {
        const response = await axios.get(
            `v1/prodi/all?page=${page}&search=${keyword}`
        );
        setProdi(response.data.data)
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

    const getJenjang = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all');
        setJenjang(response.data.data)
    }

    const getFakultasByJenjang = async () => {
        if (kodeJenj != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenj}`);
            setFakultas(response.data.data)
        }
    }

    const simpanProdi = async (e) => {
        e.preventDefault()
        try {
            if (kodeJenj.length == 0 || kodeFaks.length == 0 || kodeDikti.length == 0 || namaProdi.length == 0) {
                setError(true)
            } else {
                document.getElementById('my-modal-add').checked = false;
                await axios.post('v1/prodi/create', {
                    code_jenjang_pendidikan: kodeJenj,
                    code_fakultas: kodeFaks,
                    code_dikti_prodi: kodeDikti,
                    nama_prodi: namaProdi
                }).then(function (response) {
                    Swal.fire({
                        title: "Berhasil",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getProdi()
                        setKodeJenj("")
                        setKodeFaks("")
                        setKodeDikti("")
                        setNamaProdi("")
                    });
                })
            }
        } catch (error) {

        }
    }

    const modalAddClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-add').checked = false;
        setKodeJenj("")
        setKodeFaks("")
        setKodeDikti("")
        setNamaProdi("")
    }

    const modalEditOpen = async (e) => {
        try {
            const response = await axios.get(`v1/prodi/getById/${e}`);
            setKodeJenj(response.data.data.code_jenjang_pendidikan)
            setKodeFaks(response.data.data.code_fakultas)
            setKodeDikti(response.data.data.code_dikti_prodi)
            setNamaProdi(response.data.data.nama_prodi)
            setId(e)
            document.getElementById('my-modal-edit').checked = true;
        } catch (error) {
        }
    }

    const modalEditClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-edit').checked = false;
        setKodeJenj("")
        setKodeFaks("")
        setKodeDikti("")
        setNamaProdi("")
        setError(false)
        setId("")
    }

    const updateProdi = async (e) => {
        e.preventDefault()
        try {
            if (kodeJenj.length == 0 || kodeFaks.length == 0 || kodeDikti.length == 0 || namaProdi.length == 0) {
                setError(true)
            } else {
                document.getElementById('my-modal-edit').checked = false;
                await axios.put(`v1/prodi/update/${id}`, {
                    code_jenjang_pendidikan: kodeJenj,
                    code_fakultas: kodeFaks,
                    code_dikti_prodi: kodeDikti,
                    nama_prodi: namaProdi
                }).then(function (response) {
                    Swal.fire({
                        title: "Berhasil",
                        text: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getProdi()
                        setKodeJenj("")
                        setKodeFaks("")
                        setKodeDikti("")
                        setNamaProdi("")
                        setId("")
                    });
                })
            }
        } catch (error) {

        }
    }

    const nonaktifkan = (prodiId) => {
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
                        `v1/prodi/deleteStatus/${prodiId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getProdi()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='container mt-2'>
            {/* Modal untuk tambah data */}
            <input type="checkbox" id="my-modal-add" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                    <form onSubmit={simpanProdi}>
                        <h3 className="font-bold text-xl">Tambah</h3>
                        <div className="py-4">
                            <div className="form-control w-full mb-1">
                                <label className=' uppercase font-bold'>Jenjang Pendidikan</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={kodeJenj}
                                    onChange={(e) => setKodeJenj(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Jenjang Pendidikan-</option>
                                    {Jenjang.map((jenj) => (
                                        <option key={jenj.code_jenjang_pendidikan} value={jenj.code_jenjang_pendidikan}>{jenj.nama_jenjang_pendidikan}</option>
                                    ))}

                                </select>
                            </div>
                            {errors && kodeJenj.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mb-1">
                                <label className=' uppercase font-bold'>Fakultas</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={kodeFaks}
                                    onChange={(e) => setKodeFaks(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Fakultas-</option>
                                    {Fakultas.map((Faks) => (
                                        <option key={Faks.code_fakultas} value={Faks.code_fakultas}>{Faks.nama_fakultas}</option>
                                    ))}

                                </select>
                            </div>
                            {errors && kodeFaks.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mb-1">
                                <label className=' uppercase font-bold'>Kode Dikti Prodi</label>
                                <input
                                    type="text"
                                    placeholder='Kode Dikti'
                                    value={kodeDikti}
                                    onChange={(e) => setKodeDikti(e.target.value)}
                                    className="input input-sm input-bordered w-full"
                                />
                            </div>
                            {errors && kodeDikti.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full">
                                <label className=' uppercase font-bold'>Prodi</label>
                                <select
                                    className='select select-bordered select-sm'
                                    value={namaProdi}
                                    onChange={(e) => setNamaProdi(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Prodi-</option>
                                    <option>TEKNIK INFORMATIKA</option>
                                    <option>TEKNIK ELECTRO</option>
                                    <option>PERBANKAN SYARI'AH</option>
                                    <option>HUKUM EKONOMI SYARI'AH</option>
                                    <option>PENDIDIKAN AGAMA ISLAM</option>
                                </select>
                            </div>
                            {errors && namaProdi.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-xs btn-success">simpan</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal untuk edit data */}
            <input type="checkbox" id="my-modal-edit" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalEditClose}><FaTimes /></button>
                    <form onSubmit={updateProdi}>
                        <h3 className="font-bold text-xl">Edit</h3>
                        <div className="py-4">
                            <div className="form-control w-full mb-1">
                                <label className=' uppercase font-bold'>Jenjang Pendidikan</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={kodeJenj}
                                    onChange={(e) => setKodeJenj(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Jenjang Pendidikan-</option>
                                    {Jenjang.map((jenj) => (
                                        <option key={jenj.code_jenjang_pendidikan} value={jenj.code_jenjang_pendidikan}>{jenj.nama_jenjang_pendidikan}</option>
                                    ))}

                                </select>
                            </div>
                            {errors && kodeJenj.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mb-1">
                                <label className=' uppercase font-bold'>Fakultas</label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={kodeFaks}
                                    onChange={(e) => setKodeFaks(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Fakultas-</option>
                                    {Fakultas.map((Faks) => (
                                        <option key={Faks.code_fakultas} value={Faks.code_fakultas}>{Faks.nama_fakultas}</option>
                                    ))}

                                </select>
                            </div>
                            {errors && kodeFaks.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full mb-1">
                                <label className=' uppercase font-bold'>Kode Dikti Prodi</label>
                                <input
                                    type="text"
                                    placeholder='Kode Dikti'
                                    value={kodeDikti}
                                    onChange={(e) => setKodeDikti(e.target.value)}
                                    className="input input-sm input-bordered w-full"
                                />
                            </div>
                            {errors && kodeDikti.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                            <div className="form-control w-full">
                                <label className=' uppercase font-bold'>Prodi</label>
                                <select
                                    className='select select-bordered select-sm'
                                    value={namaProdi}
                                    onChange={(e) => setNamaProdi(e.target.value)}
                                >
                                    <option disabled value={""}>-Pilih Prodi-</option>
                                    <option>TEKNIK INFORMATIKA</option>
                                    <option>TEKNIK ELECTRO</option>
                                    <option>PERBANKAN SYARI'AH</option>
                                    <option>HUKUM EKONOMI SYARI'AH</option>
                                    <option>PENDIDIKAN AGAMA ISLAM</option>
                                </select>
                            </div>
                            {errors && namaProdi.length <= 0 ?
                                <span className='mt-2 text-red-700 text-xs'>Tidak Boleh Kosong</span> : ""
                            }
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-xs btn-success">simpan</button>
                        </div>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Prodi</h1>
            </section>
            <section>
                <div className="card card-bordered bg-base-100 shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <label htmlFor="my-modal-add" className="btn btn-success btn-xs"><FaPlus /> tambah data</label>
                            </div>
                            <div>
                                <form onSubmit={cariData} className='mb-1'>
                                    <div className="form-control">
                                        <div className="input-group justify-end">
                                            <input
                                                type="text"
                                                className="input input-xs input-bordered input-success"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder='Cari'
                                            />
                                            <button type='submit' className="btn btn-xs btn-square btn-success">
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
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className="px-6 py-3">Kode Prodi</th>
                                        <th scope="col" className="px-6 py-3">Nama Prodi</th>
                                        <th scope="col" className='px-6 py-3'>Status</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Prodi.map((prod, index) => (
                                        <tr key={prod.id_prodi} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-6 py-2'>{prod.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2'>{prod.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2'>{prod.code_prodi}</td>
                                            <td className='px-6 py-2'>{prod.nama_prodi}</td>
                                            <td className='px-6 py-2'>{prod.status == "aktif" ? <span className="badge btn-success badge-sm">Aktif</span> : <span className="badge badge-error badge-sm">Tidak Aktif</span>}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div>
                                                    <button className="btn btn-xs btn-circle text-white btn-warning mr-1" title='Edit' onClick={() => modalEditOpen(prod.id_prodi)}><FaEdit /></button>
                                                    <button className="btn btn-xs btn-circle text-white btn-error" title='Hapus' onClick={() => nonaktifkan(prod.id_prodi)}><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span className='text-sm'>Total Data : {rows} page: {rows ? page : 0} of {pages}</span>
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
                                previousLinkClassName={"btn btn-xs btn-success-outline btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-xs btn-success-outline btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-xs btn-success-outline btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-xs btn-success btn-circle"}
                                pageLinkClassName={"btn btn-xs btn-success-outline btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-xs btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProdiList