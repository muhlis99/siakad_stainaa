import React from 'react'
import { useParams } from "react-router-dom"
import { FaTimes, FaReply, FaArrowRight, FaArrowLeft } from "react-icons/fa"

const FormMhs3 = () => {
    const { idMhs } = useParams()
    const { stat } = useParams()
    return (
        <div className='container mt-2'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Detail Orang Tua</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className='grid lg:grid-cols-3 gap-4'>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">NIK Ayah</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div className='lg:col-span-2'>
                                <label className="label">
                                    <span className="text-base label-text">Nama Ayah</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tanggal</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Bulan</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tahun</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Pekerjaan Ayah</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Penghasilan Ayah</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Pendidikan Ayah</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div className='lg:col-span-3'>
                                <hr />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">NIK Ibu</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div className='lg:col-span-2'>
                                <label className="label">
                                    <span className="text-base label-text">Nama Ibu</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tanggal</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Bulan</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tahun</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Pekerjaan Ibu</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Penghasilan Ibu</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Pendidikan Ibu</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                            </div>
                        </div>
                        <div className='mt-5 grid lg:grid-cols-2'>
                            <div className='col-span-2 mb-5'>
                                <hr />
                            </div>
                            <div>
                                {stat == "add" ? <button className='btn btn-sm btn-danger'><FaTimes /> <span className="ml-1">Batal</span></button> : <button className='btn btn-sm btn-danger'><FaReply /> <span className='ml-1'>Kembali Ke Data Mahasiswa</span></button>}
                            </div>
                            <div>
                                <div className='grid lg:grid-flow-col gap-1 float-right'>
                                    <div>
                                        <button className='btn btn-sm btn-blue w-full'><FaArrowLeft /><span className="ml-1">Kembali</span></button>
                                    </div>
                                    <div className='lg:pl-1'>
                                        <button className='btn btn-sm btn-blue w-full'><span className="mr-1">Simpan dan lanjut</span><FaArrowRight /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormMhs3