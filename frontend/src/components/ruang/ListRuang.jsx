import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import Swal from "sweetalert2"
import ReactPaginate from "react-paginate"

const ListRuang = () => {
    const [RuangList, setListRuang] = useState([])
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [namaRuang, setNamaRuang] = useState("")
    const [ruang, setRuang] = useState("")
    const [identitas, setIdentitas] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        getDataRuang()
    }, [page, keyword])

    useEffect(() => {
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultasByJenjang()
    }, [jenjangnya])

    useEffect(() => {
        getProdiByFakultas()
    }, [fakultasnya])


    const getDataRuang = async () => {
        const response = await axios.get(`v1/ruang/all?page=${page}&search=${keyword}`)
        setListRuang(response.data.data)
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

    const getJenjangPendidikan = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultasByJenjang = async () => {
        if (jenjangnya != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${jenjangnya}`)
            setFakultas(response.data.data)
        }
    }

    const getProdiByFakultas = async () => {
        if (fakultasnya != 0) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${fakultasnya}`)
            setProdi(response.data.data)
        }
    }

    const modalAddClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-add').checked = false
        setRuang("")
        setIdentitas("")
        setJenjangnya("")
        setFakultasnya("")
        setProdinya("")
    }

    const modalAddOpen = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-add').checked = true
        setRuang("Ruang ")
        document.getElementById("namanya").defaultValue = "Ruang "
    }

    const simpanDataRuang = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/ruang/create', {
                nama_ruang: ruang,
                identy_ruang: identitas,
                code_jenjang_pendidikan: jenjangnya,
                code_fakultas: fakultasnya,
                code_prodi: prodinya
            }).then(function (response) {
                document.getElementById('my-modal-add').checked = false
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getDataRuang()
                    setRuang("")
                    setIdentitas("")
                    setJenjangnya("")
                    setFakultasnya("")
                    setProdinya("")
                })
            })
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const modalEditOpen = async (e) => {
        try {
            const response = await axios.get(`v1/ruang/getById/${e}`)
            setId(response.data.data.id_ruang)
            setRuang(response.data.data.nama_ruang)
            setIdentitas('')
            setJenjangnya(response.data.data.code_jenjang_pendidikan)
            setFakultasnya(response.data.data.code_fakultas)
            setProdinya(response.data.data.code_prodi)
            document.getElementById('my-modal-edit').checked = true
        } catch (error) {

        }
    }

    const modalEditClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-edit').checked = false
        setRuang("")
        setIdentitas("")
        setJenjangnya("")
        setFakultasnya("")
        setProdinya("")
    }

    const updateDataRuang = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/ruang/update/${id}`, {
                nama_ruang: ruang,
                identy_ruang: identitas,
                code_jenjang_pendidikan: jenjangnya,
                code_fakultas: fakultasnya,
                code_prodi: prodinya
            }).then(function (response) {
                document.getElementById('my-modal-edit').checked = false
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    getDataRuang()
                    setRuang("")
                    setIdentitas("")
                    setJenjangnya("")
                    setFakultasnya("")
                    setProdinya("")
                })
            })
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const nonaktifkan = (ruangId) => {
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
                        `v1/ruang/delete/${ruangId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getDataRuang()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            {/* Modal untuk tambah data */}
            <input type="checkbox" id="my-modal-add" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle btn-danger absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                    <form onSubmit={simpanDataRuang}>
                        <h3 className="font-bold text-xl">Tambah</h3>
                        <div className="grid">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Nama Ruang</span>
                                </label>
                                <input
                                    type="text"
                                    id='namanya'
                                    // value={namaRuang}
                                    // onChange={
                                    //     function (e) {
                                    //         const i = e.target.value
                                    //         const y = i.substring(0, ruang.length)
                                    //         if (y != ruang) {
                                    //             setNamaRuang(e.target.value)
                                    //         }
                                    //     }

                                    // }
                                    placeholder="Nama Ruang"
                                    className="input input-sm input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Identitas Ruang</span>
                                </label>
                                <input type="text" value={identitas} onChange={(e) => setIdentitas(e.target.value)} placeholder="Identitas Ruang" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Jenjang Pendidikan</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={jenjangnya} onChange={(e) => setJenjangnya(e.target.value)}>
                                    <option value="">Jenjang Pendidikan</option>
                                    {Jenjang.map((item) => (
                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Fakultas Yang akan ditempuh</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={fakultasnya} onChange={(e) => setFakultasnya(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Prodi Yang akan ditempuh</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={prodinya} onChange={(e) => setProdinya(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-default">simpan</button>
                        </div>
                    </form>
                </div>
            </div>

            <input type="checkbox" id="my-modal-edit" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle btn-danger absolute right-2 top-2" onClick={modalEditClose}><FaTimes /></button>
                    <form onSubmit={updateDataRuang}>
                        <h3 className="font-bold text-xl">Edit</h3>
                        <div className="grid">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Nama Ruang</span>
                                </label>
                                <input type="text" value={ruang} onChange={(e) => setRuang(e.target.value)} placeholder="Nama Ruang" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Identitas Ruang</span>
                                </label>
                                <input type="text" value={identitas} onChange={(e) => setIdentitas(e.target.value)} placeholder="Identitas Ruang" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Jenjang Pendidikan</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={jenjangnya} onChange={(e) => setJenjangnya(e.target.value)}>
                                    <option value="">Jenjang Pendidikan</option>
                                    {Jenjang.map((item) => (
                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Fakultas Yang akan ditempuh</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={fakultasnya} onChange={(e) => setFakultasnya(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Prodi Yang akan ditempuh</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={prodinya} onChange={(e) => setProdinya(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-default">simpan</button>
                        </div>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Ruang</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-default btn-xs" onClick={modalAddOpen}><FaPlus /> tambah data</button>
                            </div>
                            <div>
                                <form className='mb-1' onSubmit={cariData}>
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
                                        <th scope="col" className="px-6 py-3">Kode Ruang</th>
                                        <th scope="col" className="px-6 py-3">Nama Ruang</th>
                                        <th scope="col" className="px-6 py-3">Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className='px-6 py-3'>Prodi</th>
                                        <th scope="col" className='px-6 py-3'>Status</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RuangList.map((rng, index) => (
                                        <tr key={rng.id_ruang} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-6 py-2'>{rng.code_ruang}</td>
                                            <td className='px-6 py-2'>{rng.nama_ruang}</td>
                                            <td className='px-6 py-2'>{rng.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2'>{rng.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2'>{rng.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2'>{rng.status == "aktif" ? <span className="badge btn-default badge-sm">Aktif</span> : <span className="badge badge-error badge-sm">Tidak Aktif</span>}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div>
                                                    <button className="btn btn-xs btn-circle text-white btn-warning mr-1" onClick={() => modalEditOpen(rng.id_ruang)} title='Edit'><FaEdit /></button>
                                                    <button className="btn btn-xs btn-circle text-white btn-danger" onClick={() => nonaktifkan(rng.id_ruang)} title='Hapus'><FaTrash /></button>
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

export default ListRuang