import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'


const TanggalPresensi = () => {
    const [tanggal, setTanggal] = useState("")
    const [Tahun, setTahun] = useState([])
    const [kodeTahun, setKodeTahun] = useState("")

    useEffect(() => {
        getTahunAjaran()
    }, [])

    const getTahunAjaran = async () => {
        try {
            const response = await axios.get('v1/tahunAjaran/all')
            setTahun(response.data.data)
        } catch (error) {

        }
    }

    return (
        <>
            <div className='w-full lg:w-1/2 mx-auto'>
                <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                    <div className="card-body p-4">
                        <div className="grid gap-2">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-semibold">Tanggal</span>
                                </label>
                                <input type="date"
                                    value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                                    className='input input-sm input-bordered w-full' />
                            </div>
                            <div>
                                {tanggal && kodeTahun ?
                                    <Link to="/presensi/proses" state={{ tgl: tanggal, mom: moment(tanggal).format('DD MMMM YYYY'), kodeTahun: kodeTahun }}
                                        className="bg-[#17A2B8] mt-3 float-right py-1 px-2 rounded-md text-white inline-flex gap-1 items-center no-underline">Absen</Link>
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TanggalPresensi