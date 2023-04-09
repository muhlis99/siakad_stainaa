import React, { useState, useEffect } from 'react'
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { FaSearch, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const ListJenjang = () => {
    const [Jenjang, setJenjang] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setrows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getJenjang()
    }, [page])

    const getJenjang = async () => {
        const response = await axios.get(`v1/jenjangPendidikan/all?&page=${page}`);
        console.log(response.data)
        setJenjang(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
    }

    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsg("Jika tidak menemukan data yang anda cari, silakan cari data dengan kata kunci yang spesifik!")
        } else {
            setMsg("")
        }
    }

    return (
        <div className="container mt-2">
            <section className='mb-7'>
                <h1 className='text-3xl font-bold'>Jenjang Pendidikan</h1>
            </section>
            <section>
                <div className="card bg-base-100 shadow-xl mb-36">
                    <div className="card-body">
                        <div className="form-control mb-2">
                            <label className="input-group justify-end">
                                <input type="text" className="input input-sm input-bordered input-success" />
                                <span><FaSearch /></span>
                            </label>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Kode Jenjang</th>
                                        <th>Nama Jenjang Pendidikan</th>
                                        <th align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Jenjang.map((jenj, index) => (
                                        <tr key={jenj.id_jenjang_pendidikan}>
                                            <th>{index + 1}</th>
                                            <td>{jenj.code_jenjang_pendidikan}</td>
                                            <td>{jenj.nama_jenjang_pendidikan}</td>
                                            <td align='center'>
                                                <button className="btn btn-sm btn-circle btn-warning mr-2"><BiEdit /></button>
                                                <button className="btn btn-sm btn-circle bg-[#FF0000] hover:bg-[#FF0000]"><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <p>Total Data : {rows} page: {rows ? page : 0}</p>
                        </div>
                        <div className="btn-group justify-center">
                            <ReactPaginate>
                                previousLabel={"< Prev"}
                                nextLabel={"Next >"}
                                pageCount={Math.min(10, pages)}
                                onPageChange={changePage}
                            </ReactPaginate>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default ListJenjang