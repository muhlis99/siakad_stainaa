import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { FaEdit, FaSave, FaSearch } from 'react-icons/fa'

const FormSettingRfid = () => {
    const [loading, setLoading] = useState(false)
    const [Mahasiswa, setMahasiswa] = useState([])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
        document.getElementById('rfid').focus()
    }, [])

    useEffect(() => {
        getRfidAll()
    }, [])

    const getRfidAll = async () => {
        try {
            const response = await axios.get(`v1/rfid/all`)
            setMahasiswa(response.data.data)
        } catch (error) {

        }
    }

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Setting RFID</h1>
            </section>
            <section>
                <div className="grid grid-cols-3 gap-2">
                    <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                        <div className="card-body p-4">
                            <form action="">
                                <div className='grid gap-3'>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">RFID</span>
                                        </label>
                                        <input type="number" id='rfid' placeholder="RFID" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        // value={nik} onChange={(e) => setNik(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">NIM</span>
                                        </label>
                                        <input type="number" placeholder="NIM" className="input input-sm input-bordered w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        // value={nik} onChange={(e) => setNik(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Nama</span>
                                        </label>
                                        <input type="text" placeholder="Nama" className="input input-sm input-bordered w-full"
                                        // value={nik} onChange={(e) => setNik(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Prodi</span>
                                        </label>
                                        <input type="text" placeholder="Prodi" className="input input-sm input-bordered w-full"
                                        // value={nik} onChange={(e) => setNik(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <div className='col-span-2 mb-3'>
                                        <hr />
                                    </div>
                                    <div>
                                        <div className='float-right'>
                                            <div className='lg:pl-1'>
                                                <button className='btn btn-sm btn-success capitalize rounded-md'><FaSave /><span className="">Selesai</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-span-2 card bg-base-100 card-bordered shadow-md mb-2'>
                        <div className="card-body p-4">
                            <div>
                                <div className="form-control">
                                    <div className="input-group justify-end">
                                        <input
                                            type="text"
                                            // onChange={cariData}
                                            className="input input-sm input-bordered input-success"
                                            placeholder='Cari'
                                        />
                                        <button className="btn btn-sm btn-square btn-success">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto mb-2">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className='text-gray-700 bg-[#d4cece]'>
                                        <tr>
                                            <th scope="col" className="px-2 py-2 text-sm">NO</th>
                                            <th scope="col" className="px-2 py-2 text-sm">RFID</th>
                                            <th scope="col" className="px-2 py-2 text-sm">NIM</th>
                                            <th scope="col" className="px-2 py-2 text-sm">Nama</th>
                                            <th scope="col" className='px-2 py-2 text-sm'>Prodi</th>
                                            <th scope="col" className="px-2 py-2 text-sm" align='center'>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Mahasiswa.map((item, index) => (
                                            <tr key={item.id_rfid} className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-2 py-2 text-[12px]'>{index + 1}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.code_rfid}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.nim}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.mahasiswas[0].nama}</td>
                                                <td className='px-2 py-2 text-[12px]'>{item.mahasiswas[0].prodis[0].nama_prodi}</td>
                                                <td className='px-2 py-2 text-[12px]'>
                                                    <button className="btn btn-xs btn-circle text-white btn-warning mr-1" title='Edit'><FaEdit /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormSettingRfid