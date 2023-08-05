import React, { useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom"
import { FaPlus, FaSearch, FaTrash, FaInfo, FaEdit, FaImages, FaPrint, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import ReactPaginate from "react-paginate"
import Swal from "sweetalert2"

const ListMahasiswa = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [idMhs, setIdMhs] = useState("")
    const [stat, setStat] = useState("")

    useEffect(() => {
        getMahasiwa()
    }, [page, keyword])

    const getMahasiwa = async () => {
        const response = await axios.get(`v1/mahasiswa/all?page=${page}&search=${keyword}`)
        setMahasiswa(response.data.data)
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

    const tbMhs = async () => {
        const response = await axios.post('v1/mahasiswa/createFirst')
        setIdMhs(response.data.data)
        setStat("add")
    }

    // const nonaktifkan = (mhsId) => {
    //     Swal.fire({
    //         title: "Hapus data ini?",
    //         text: "Anda tidak dapat mengembalikan ini",
    //         icon: "question",
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Ya, hapus!',
    //         cancelButtonText: 'Batal'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 axios.put(
    //                     `v1/mahasiswa/nonAktif/${mhsId}`
    //                 ).then((response) => {
    //                     console.log(response.data)
    //                     Swal.fire({
    //                         title: "Terhapus",
    //                         text: response.data.message,
    //                         icon: "success"
    //                     }).then(() => {
    //                         getMahasiwa()
    //                     });
    //                 })

    //             } catch (error) {

    //             }
    //         }
    //     })
    // }

    return (
        <div className='mt-2 container'>
            {idMhs && <Navigate to={`form1/${stat}/${idMhs}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} />}
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-success btn-xs" onClick={tbMhs}><FaPlus /> tambah data</button>
                            </div>
                            <div>
                                <div className="form-control">
                                    <div className="input-group justify-end">
                                        <input
                                            type="text"
                                            onChange={cariData}
                                            className="input input-xs input-bordered input-success"
                                            placeholder='Cari'
                                        />
                                        <button type='submit' className="btn btn-xs btn-square btn-success">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">NIM</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className='px-6 py-3'>Prodi</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((mhs, index) => (
                                        <tr key={mhs.id_mahasiswa} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-6 py-2'>{mhs.nim}</td>
                                            <td className='px-6 py-2'>{mhs.nama}</td>
                                            <td className='px-6 py-2'>{mhs.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2'>{mhs.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2'>{mhs.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div className='flex gap-1'>
                                                    <Link to={`/mahasiswa/detail/${mhs.id_mahasiswa}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} className="btn btn-xs btn-circle text-white btn-info" title='Detail'><FaInfo /></Link>
                                                    <Link to={`/mahasiswa/form1/edit/${mhs.id_mahasiswa}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                    <Link to={`/mahasiswa/upload/berkas/${mhs.id_mahasiswa}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} className="btn btn-xs btn-circle text-white btn-primary" title='Upload Berkas'><FaImages /></Link>
                                                    <Link to={`/mahasiswa/print/${mhs.id_mahasiswa}`} target='_blank' className="btn btn-xs btn-circle text-white btn-secondary" title='Print Berkas'><FaPrint /></Link>
                                                    {/* <button onClick={() => nonaktifkan(mhs.id_mahasiswa)} className="btn btn-xs btn-circle text-white btn-error" title='Hapus'><FaTrash /></button> */}
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

export default ListMahasiswa