import moment from 'moment'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const TanggalPresensi = () => {
    const [tanggal, setTanggal] = useState("")

    return (
        <>
            <div className='w-full lg:w-1/2 mx-auto'>
                <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                    <div className="card-body p-4">
                        <div className="grid gap-2">
                            <input type="date"
                                value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                                className='input input-sm input-bordered w-full' />
                        </div>
                    </div>
                </div>
                {tanggal ?
                    <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                        <div className="card-body p-4">
                            <div className="grid gap-2">
                                <div>
                                    Anda dapat melakukan absen dosen
                                </div>
                                <div>
                                    <Link to="/presensi/proses" state={{ tgl: tanggal, mom: moment(tanggal).format('DD MMMM YYYY') }} className="btn btn-success btn-sm">Absen</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""
                }
            </div>
        </>
    )
}

export default TanggalPresensi