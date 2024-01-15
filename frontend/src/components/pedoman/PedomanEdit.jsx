import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaReply, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'
import axios from 'axios'

const PedomanEdit = () => {
    const [judul, setJudul] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [level, setLevel] = useState("")
    const [filePedoman, setFilePedoman] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const getPedomanById = async () => {
            try {
                const response = await axios.get(`v1/pedoman/getById/${location.state.idPedoman}`)
                setJudul(response.data.data.judul_pedoman)
                setDeskripsi(response.data.data.deskripsi)
                setTanggal(response.data.data.tanggal_terbit)
                setLevel(response.data.data.level)
            } catch (error) {

            }
        }
        getPedomanById()
    }, [location])

    const loadFile = (e) => {
        const file = e.target.files[0]
        setFilePedoman(file)
    }

    const simpanPedoman = async (e) => {
        e.preventDefault()
        if (judul == '') {
            Swal.fire({
                title: 'Judul Pedoman kosong',
                icon: 'error'
            })
        } else if (deskripsi == '') {
            Swal.fire({
                title: 'Deskripsi Pedoman kosong',
                icon: 'error'
            })
        } else if (tanggal == '') {
            Swal.fire({
                title: 'Tanggal Penerbitan  kosong',
                icon: 'error'
            })
        } else if (level == '') {
            Swal.fire({
                title: 'Level kosong',
                icon: 'error'
            })
        } else {
            const formData = new FormData()
            formData.append('judul_pedoman', judul)
            formData.append('deskripsi', deskripsi)
            formData.append('tanggal_terbit', tanggal)
            formData.append('level', level)
            formData.append('file_pedoman', filePedoman)
            try {
                await axios.put(`v1/pedoman/update/${location.state.idPedoman}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate('/pedoman', { state: { collaps: 'kuliah', activ: '/pedoman' } })
                    });
                })
            } catch (error) {

            }
        }
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pedoman Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanPedoman}>
                            <div className="grid lg:grid-cols-2 gap-2">
                                <div>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Judul</span>
                                    </label>
                                    <input type="text" placeholder="Judul" value={judul} onChange={(e) => setJudul(e.target.value)} className="input input-sm input-bordered w-full" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="label flex-initial w-64">
                                            <span className="text-base label-text font-semibold">Tanggal Penerbitan</span>
                                        </label>
                                        <input type="date" placeholder="tanggal" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="input input-sm input-bordered w-full" />
                                    </div>
                                    <div>
                                        <label className="label flex-initial w-64">
                                            <span className="text-base label-text font-semibold">Level</span>
                                        </label>
                                        <select value={level} onChange={(e) => setLevel(e.target.value)} className="select select-sm select-bordered w-full">
                                            <option value="">Pilih Level</option>
                                            <option value="dosen">Dosen</option>
                                            <option value="mahasiswa">Mahasiswa</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Deskripsi</span>
                                    </label>
                                    <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="textarea textarea-bordered w-full" placeholder="Deskripsi"></textarea>
                                </div>
                                <div>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">File Pedoman</span>
                                    </label>
                                    <input type="file" onChange={loadFile} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-3'>
                                    <hr />
                                </div>
                                <div>
                                    <Link to="/pedoman" state={{ collaps: 'kuliah', activ: '/pedoman' }} className='btn btn-sm btn-error rounded-md capitalize'><FaReply /><span>Kembali</span></Link>
                                </div>
                                <div>
                                    <button className='btn btn-sm btn-primary rounded-md capitalize float-right'><FaSave /> <span>Simpan</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PedomanEdit