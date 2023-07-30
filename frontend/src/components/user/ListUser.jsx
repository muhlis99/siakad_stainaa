import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaArrowLeft, FaArrowRight, FaEdit, FaPlus, FaSave, FaSearch, FaTimes, FaTrash } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'
import { SlOptions } from 'react-icons/sl'

const ListUser = () => {
    const [Users, setUsers] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [id, setId] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("")
    const [modal, setModal] = useState("")

    useEffect(() => {
        getDataUsers()
    }, [page, keyword])

    const getDataUsers = async () => {
        const response = await axios.get(`v1/registrasi/all?page=${page}&search=${keyword}`)
        setUsers(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const pageCount = Math.ceil(rows / perPage)

    const changePage = (event) => {
        const newOffset = (event.selected + 1)
        setPage(newOffset)
        if (event.selected === 9) {
            setMsg("Jika tidak menemukan data yang dicari, maka lakukan pencarian data secara spesifik!")
        } else {
            setMsg("")
        }
    }

    const cariData = (e) => {
        e.preventDefault()
        setPage(0)
        setKeyword(query)
    }

    const modalOpen = async (e, f) => {
        try {
            setModal(e)
            setId(f)
            if (e == 'Edit') {
                const response = await axios.get(`v1/registrasi/getById/${f}`)
                setUserName(response.data.data.username)
                setEmail(response.data.data.email)
                setRole(response.data.data.role)
            }
            document.getElementById('my-modal').checked = true
        } catch (error) {
        }
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setUserName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setRole("")
        setId("")
    }

    const simpanDataUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/registrasi/create', {
                username: userName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                role: role
            }).then(function (response) {
                document.getElementById('my-modal').checked = false
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    setUserName("")
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                    setRole("")
                    setId("")
                    getDataUsers()
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

    const updateDataUser = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/registrasi/update/${id}`, {
                username: userName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                role: role
            }).then(function (response) {
                document.getElementById('my-modal').checked = false
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    setUserName("")
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                    setRole("")
                    setId("")
                    getDataUsers()
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

    const nonaktifkan = (userId) => {
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
                    axios.delete(
                        `v1/registrasi/delete/${userId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getDataUsers()
                        })
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}>
                        <FaTimes /></button>
                    <form onSubmit={modal == 'Tambah' ? simpanDataUser : updateDataUser}>
                        <h3 className="font-bold text-xl">
                            {modal}
                        </h3>
                        <div className="py-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Username </span>
                                </label>
                                <input type="text" placeholder="Masukkan Username" value={userName} onChange={(e) => setUserName(e.target.value)} className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Email</span>
                                </label>
                                <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Password</span>
                                </label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Konfirmasi Password</span>
                                </label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Role</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="dosen">Dosen</option>
                                    <option value="mahasiswa">Mahasiswa</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-action">
                            {modal == 'Tambah' ? <button type='submit' className="btn btn-sm btn-primary"><FaSave /><span>simpan</span></button> : <button type='submit' className="btn btn-sm btn-primary"><FaEdit /><span>Update</span></button>}
                        </div>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Users</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-success btn-xs" onClick={() => modalOpen('Tambah', '')}><FaPlus />tambah data</button>
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
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Role</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Users.map((use, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-6 py-2'>{use.username}</td>
                                            <td className='px-6 py-2'>{use.email}</td>
                                            <td className='px-6 py-2'>{use.role}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div>
                                                    <button className="btn btn-xs btn-circle text-white btn-warning mr-1" onClick={() => modalOpen('Edit', use.id)}
                                                        title='Edit'><FaEdit /></button>
                                                    <button className="btn btn-xs btn-circle text-white btn-error" onClick={() => nonaktifkan(use.id)} title='Hapus'><FaTrash /></button>
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
                                previousLinkClassName={"btn btn-xs btn-success btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-xs btn-success btn-circle btn-default-activ"}
                                pageLinkClassName={"btn btn-xs btn-success btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-xs btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListUser