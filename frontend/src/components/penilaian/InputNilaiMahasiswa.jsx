import React, { useState } from 'react'
import Loading from '../Loading'

const InputNilaiMahasiswa = () => {
    const [jenjang, setJenjang] = useState("")
    const [tahun, setTahun] = useState("")
    const [fakul, setFakul] = useState("")
    const [loading, setLoading] = useState(false)



    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Penilaian Mahasiswa</h1>
            </section>
            <div className="card bg-base-100 card-bordered shadow-md mb-2">
                <div className="card-body p-4">
                    <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-md">
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Jenjang Pendidikan</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{jenjang}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Tahun Ajaran</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{tahun}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Fakultas</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{fakul}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Semester</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{sem}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Prodi</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{prodi}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Mata Kuliah</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{nmMk}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Kelas</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{nmKls}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Kode Matakuliah</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{kodeMk}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputNilaiMahasiswa