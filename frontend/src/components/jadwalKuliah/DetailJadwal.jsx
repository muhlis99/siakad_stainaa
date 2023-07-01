import React from 'react'
import { FaAngleDown, FaSave } from 'react-icons/fa'

const DetailJadwal = () => {
    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="col-span-2 mb-3 border-b-2 pb-3 border-b-[#2D7F5F]">
                                <div className="float-right flex gap-1">
                                    <button className='btn btn-sm btn-blue'><FaSave /><span className='ml-1'>simpan</span></button>
                                    {/* <div>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-sm btn-default"><span className='mr-1'>Opsi</span><FaAngleDown /></label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a>Item 1</a></li>
                                                <li><a>Item 2</a></li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Tahun Ajaran</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>2023/2024</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Semester</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>1</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Fakultas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>Teknik</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Program Studi</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>Teknik Informatika</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Mata Kuliah</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>Program Android</a>
                                    </div>
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Kelas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>A</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Kapasitas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>20 Mahasiswa</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Tanggal Mulai</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>20 Juli 2023</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Tanggal Selesai</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>20 Desember 2023</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Jumlah Pertemuan</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>20</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 border-t-2 border-t-[#2D7F5F] grid grid-cols-2'>
                            <div className="col-span-2 my-2">
                                <div className="tabs">
                                    <a className="tab tab-lifted tab-active">Jadwal Mingguan</a>
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div>
                                    <label>
                                        <span className="">Kapasitas</span>
                                    </label>
                                    <input type="text" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Tanggal Mulai</span>
                                    </label>
                                    <input type="text" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Tanggal Selesai</span>
                                    </label>
                                    <input type="text" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Jumlah Pertemuan</span>
                                    </label>
                                    <input type="text" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailJadwal