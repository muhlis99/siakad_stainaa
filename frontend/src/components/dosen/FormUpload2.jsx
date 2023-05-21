import React, { useState, useEffect } from 'react'
import { FaReply, FaTelegramPlane } from "react-icons/fa"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const FormUpload2 = () => {
    const [namanya, setNamanya] = useState("")
    const navigate = useNavigate()
    const { idDsn } = useParams()

    useEffect(() => {
        const getDsnById = async () => {
            try {
                const response = await axios.get(`v1/dosen/getById/${idDsn}`)
                setNamanya(response.data.data.nama)
            } catch (error) {

            }
        }
        getDsnById()
    }, [idDsn])

    return (
        <div className='container mt-2'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Upload Berkas {namanya && <span>Dari <span className='text-red-500'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-16">
                    <div className="card-body p-4">
                        <form>
                            <div className='grid lg:grid-cols-4 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Foto Diri</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                        </div>
                                    </div>
                                    <input type="file" className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Foto Diri</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                        </div>
                                    </div>
                                    <input type="file" className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Foto Diri</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                        </div>
                                    </div>
                                    <input type="file" className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Foto Diri</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                        </div>
                                    </div>
                                    <input type="file" className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormUpload2