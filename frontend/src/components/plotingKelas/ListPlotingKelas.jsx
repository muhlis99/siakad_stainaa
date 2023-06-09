import React from 'react'
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

const ListPlotingKelas = () => {
    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Ploting Kelas</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <Link to="/ploting/add" className="btn btn-default btn-xs"><FaPlus /> <span className='ml-1'>tambah data</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListPlotingKelas