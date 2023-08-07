import React, { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from 'react-icons/sl'
import { Link } from "react-router-dom"
import axios from 'axios'
import ReactPaginate from "react-paginate"
import Swal from "sweetalert2"

const ListMataKuliah = () => {
    const [Makul, setMakul] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")

    useEffect(() => {
        getMakulAll()
    }, [page, keyword])

    const getMakulAll = async () => {
        const response = await axios.get(`v1/mataKuliah/all?page=${page}&search=${keyword}`)
        setMakul(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
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

    const nonaktifkan = (makulId) => {
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
                        `v1/mataKuliah/delete/${makulId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getMakulAll()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Mata Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Link to="/matakuliah/add" state={{ collaps: 'kuliah', activ: '/matakuliah' }} className="btn btn-success btn-sm capitalize rounded-md"><FaPlus /> <span className='ml-1'>tambah data</span></Link>
                            </div>
                            <div>
                                {/* <select className="select select-bordered select-xs max-w-xs">
                                    <option value="">Tahun Ajaran</option>
                                </select> */}
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
                                        <th scope="col" className="px-6 py-2 text-sm">Tahun Ajaran</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Kode</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Nama</th>
                                        <th scope="col" className="px-6 py-2 text-sm">SKS</th>
                                        <th scope="col" className='px-6 py-2 text-sm'>Prodi</th>
                                        <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Makul.map((mkl, index) => (
                                        <tr key={mkl.id_mata_kuliah} className='bg-white border-b text-gray-500 border-x'>
                                            <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-6 py-2 font-semibold'>{mkl.tahunAjarans[0].tahun_ajaran}</td>
                                            <td className='px-6 py-2 font-semibold'>{mkl.code_mata_kuliah}</td>
                                            <td className='px-6 py-2 font-semibold'>{mkl.nama_mata_kuliah}</td>
                                            <td className='px-6 py-2 font-semibold'>{mkl.sks}</td>
                                            <td className='px-6 py-2 font-semibold'>{mkl.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div>
                                                    <Link to={`/matakuliah/edit/${mkl.id_mata_kuliah}`} state={{ collaps: 'kuliah', activ: '/matakuliah' }} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                    <button className="ml-1 btn btn-xs btn-circle text-white btn-error" onClick={() => nonaktifkan(mkl.id_mata_kuliah)} title='Hapus'><FaTrash /></button>
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

export default ListMataKuliah