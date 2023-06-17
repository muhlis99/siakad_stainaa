import React from 'react'
import { Link } from "react-router-dom"
import { FaCog, FaInfo } from "react-icons/fa"

const ListPlotingKelas = () => {

    const smt = []
    for (let semester = 0; semester < 9; semester++) {
        if (semester % 1 == 0) {
            smt.push(
                <div key={semester} className="w-full h-9 bg-slate-600 rounded-md shadow-2xl pt-1.5 px-3 grid grid-cols-2">
                    <div>
                        <h3 className='text-base-100 font-mono'>Semester {semester}</h3>
                    </div>
                    <div>
                        <div className='float-right flex gap-1'>
                            <div className="tooltip tooltip-bottom" data-tip="Detail">
                                <button className='btn btn-blue btn-xs btn-circle'><FaInfo /></button>
                            </div>
                            <div className="tooltip tooltip-bottom" data-tip="Setting">
                                <button className='btn btn-secondary btn-xs btn-circle'><FaCog /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // else {
        //     smt.push(
        //         <div key={semester} className="w-full h-9 bg-slate-600 rounded-md shadow-2xl pt-1.5 px-3 grid grid-cols-2">
        //             <div>
        //                 <h3 className='text-base-100 font-mono'>Semester {semester}</h3>
        //             </div>
        //             <div>
        //                 <div className='float-right flex gap-1'>
        //                     <div className="tooltip tooltip-bottom" data-tip="Detail">
        //                         <button className='btn btn-blue btn-xs btn-circle'><FaInfo /></button>
        //                     </div>
        //                     <div className="tooltip tooltip-bottom" data-tip="Setting">
        //                         <button className='btn btn-secondary btn-xs btn-circle'><FaCog /></button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
    }

    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Ploting Kelas</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid lg:grid-cols-3 gap-3">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tahun Ajaran</span>
                                </label>
                                <select className="select select-bordered select-sm w-full">
                                    <option value="">Tahun Ajaran</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Fakultas</span>
                                </label>
                                <select className="select select-bordered select-sm w-full">
                                    <option value="">Fakultas</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Program Studi</span>
                                </label>
                                <select className="select select-bordered select-sm w-full">
                                    <option value="">Program Studi</option>
                                </select>
                            </div>
                            <div className="col-span-3">
                                <hr className="mt-2" />
                            </div>
                        </div>
                        <div className="grid gap-2 mt-2">
                            <div>
                                {smt}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListPlotingKelas