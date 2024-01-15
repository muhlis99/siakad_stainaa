import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import moment from "moment"
import { FaCalendarAlt } from 'react-icons/fa'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import './cek.css'

const PedomanDetail = () => {
    const [judul, setJudul] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [level, setLevel] = useState("")
    const [filePedoman, setFilePedoman] = useState("")
    const [urlDoc, setUrlDoc] = useState("")
    const location = useLocation()

    useEffect(() => {
        const getPedomanById = async () => {
            try {
                const response = await axios.get(`v1/pedoman/getById/${location.state.idPedoman}`)
                setJudul(response.data.data.judul_pedoman)
                setDeskripsi(response.data.data.deskripsi)
                setTanggal(response.data.data.tanggal_terbit)
                setLevel(response.data.data.level)
                setFilePedoman(response.data.data.file_pedoman)
            } catch (error) {

            }
        }
        getPedomanById()
    }, [location])

    useEffect(() => {
        if (filePedoman == null) {
            setUrlDoc('')
        } else {
            setUrlDoc('https://api-siakad.stainaa.ac.id/v1/pedoman/public/seeLampiranPedoman/lampiranPedoman/' + filePedoman)
        }
    }, [filePedoman])

    const docs = [
        { uri: urlDoc }
    ]

    const download = () => {
        fetch(`https://api-siakad.stainaa.ac.id/v1/pedoman/public/seeLampiranPedoman/lampiranPedoman/${filePedoman}`).then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob)

                let alink = document.createElement("a")
                alink.href = fileURL
                alink.download = judul
                alink.click()
            })
        })
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pedoman Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='border border-black border-dashed p-2 rounded-md'>
                                <span className='font-bold'>Judul Pedoman</span>
                                <div className='text-[14px] text-secondary  mt-1'>
                                    {judul}
                                </div>
                            </div>
                            <div className='border border-black border-dashed p-2 rounded-md'>
                                <span className='font-bold'>Tanggal Penerbitan</span>
                                <div className='text-[14px] text-secondary  mt-1'>
                                    {moment(tanggal).format('DD MMMM YYYY')}
                                </div>
                            </div>
                            <div className='border border-black border-dashed p-2 rounded-md'>
                                <span className='font-bold'>Deskripsi</span>
                                <div className='text-[14px] text-secondary  mt-1'>
                                    {deskripsi}
                                </div>
                            </div>
                            <div className='border border-black border-dashed p-2 rounded-md'>
                                <span className='font-bold'>Download</span>
                                <div className='text-[14px] text-secondary  mt-1'>
                                    <button className='btn btn-sm btn-primary' onClick={download}>Download</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='border border-black border-dashed p-2 rounded-md'>
                                <DocViewer
                                    documents={docs}
                                    config={{
                                        header: {
                                            disableHeader: false,
                                            disableFileName: true,
                                            retainURLParams: false,
                                        }
                                    }}
                                    pluginRenderers={DocViewerRenderers}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PedomanDetail