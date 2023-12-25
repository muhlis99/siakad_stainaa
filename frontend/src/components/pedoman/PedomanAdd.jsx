import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaReply, FaSave } from 'react-icons/fa'

const PedomanAdd = () => {
    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pedoman</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form>
                            <div className="grid lg:grid-cols-2 gap-2">
                                <div>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Judul</span>
                                    </label>
                                    <input type="text" placeholder="Judul" className="input input-sm input-bordered w-full" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="label flex-initial w-64">
                                            <span className="text-base label-text font-semibold">Tanggal Penerbitan</span>
                                        </label>
                                        <input type="date" placeholder="Judul" className="input input-sm input-bordered w-full" />
                                    </div>
                                    <div>
                                        <label className="label flex-initial w-64">
                                            <span className="text-base label-text font-semibold">Level</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full">
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
                                    <textarea className="textarea textarea-bordered w-full" placeholder="Deskripsi"></textarea>
                                </div>
                                <div>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">File Pedoman</span>
                                    </label>
                                    <input type="file" className="file-input file-input-bordered file-input-sm file-input-success w-full" />
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-3'>
                                    <hr />
                                </div>
                                <div>
                                    <Link className='btn btn-sm btn-error rounded-md capitalize'><FaReply /><span>Kembali</span></Link>
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

export default PedomanAdd