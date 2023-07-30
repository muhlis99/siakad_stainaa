import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'

const ListKategoriNilai = () => {
    const [ListNilai, setListNilai] = useState([])
    const [Tahun, setTahun] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeThn, setKodeThn] = useState("")
    const [nilaiAtas, setNilaiAtas] = useState("")
    const [nilaiBawah, setNilaiBawah] = useState("")
    const [nilaiHuruf, setNilaiHuruf] = useState("")
    const [skor, setSkor] = useState("")
    const [kategori, setKategori] = useState("")
    const [keterangan, setKeterangan] = useState("")
    const [judul, setJudul] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
        getKategoriNilai()
    }, [page, keyword])

    useEffect(() => {
        getTahunAjaran()
    }, [])

    const getKategoriNilai = async () => {
        const response = await axios.get(`v1/kategoriNilai/all?page=${page}&search=${keyword}`)
        setListNilai(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const pageCount = Math.ceil(rows / perPage);

    const changePage = (event) => {
        const newOffset = (event.selected + 1);
        setPage(newOffset);
        if (event.selected === 9) {
            setMsg("Jika tidak menemukan data yang dicari, maka lakukan pencarian data secara spesifik!")
        } else {
            setMsg("")
        }
    }

    const cariData = (e) => {
        e.preventDefault();
        setPage(0)
        setKeyword(query)
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const modalAddOpen = () => {
        setJudul("Tambah")
        document.getElementById('my-modal').checked = true
    }

    const simpanKatNilai = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/kategoriNilai/create', {
                nilai_atas: nilaiAtas,
                nilai_bawah: nilaiBawah,
                nilai_huruf: nilaiHuruf,
                interfal_skor: skor,
                kategori: kategori,
                keterangan: keterangan,
                code_tahun_ajaran: kodeTahun
            }).then(function (response) {
                document.getElementById('my-modal').checked = false
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getKategoriNilai()
                    setNilaiAtas("")
                    setNilaiBawah("")
                    setNilaiHuruf("")
                    setSkor("")
                    setKategori("")
                    setKeterangan("")
                    setKodeTahun("")
                })
            })
        } catch (error) {
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const modalEditOpen = async (e, f) => {
        try {
            const response = await axios.get(`v1/kategoriNilai/getById/${e}`)
            setId(e)
            setNilaiAtas(response.data.data.nilai_atas)
            setNilaiBawah(response.data.data.nilai_bawah)
            setNilaiHuruf(response.data.data.nilai_huruf)
            setSkor(response.data.data.interfal_skor)
            setKategori(response.data.data.kategori)
            setKeterangan(response.data.data.keterangan)
            setKodeTahun(response.data.data.code_tahun_ajaran)
            setJudul(f)
            document.getElementById('my-modal').checked = true
        } catch (error) {

        }
    }

    const updateKtg = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/kategoriNilai/update/${id}`, {
                nilai_atas: nilaiAtas,
                nilai_bawah: nilaiBawah,
                nilai_huruf: nilaiHuruf,
                interfal_skor: skor,
                kategori: kategori,
                keterangan: keterangan,
                code_tahun_ajaran: kodeTahun
            }).then(function (response) {
                document.getElementById('my-modal').checked = false
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getKategoriNilai()
                    setId("")
                    setNilaiAtas("")
                    setNilaiBawah("")
                    setNilaiHuruf("")
                    setSkor("")
                    setKategori("")
                    setKeterangan("")
                })
            })
        } catch (error) {
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setId("")
        setKodeTahun("")
        setNilaiAtas("")
        setNilaiBawah("")
        setNilaiHuruf("")
        setSkor("")
        setKategori("")
        setKeterangan("")
    }

    const nonaktifkan = (ktgId) => {
        Swal.fire({
            title: "Hapus data ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(
                        `v1/kategoriNilai/delete/${ktgId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getKategoriNilai()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='container mt-2'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle btn-danger absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <form onSubmit={judul == 'Tambah' ? simpanKatNilai : updateKtg}>
                        <h3 className="font-bold text-xl">{judul}</h3>
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tahun Ajaran</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nilai Atas</span>
                                    </label>
                                    <input type="number" className="input input-sm input-bordered w-full" value={nilaiAtas} onChange={(e) => setNilaiAtas(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nilai Bawah</span>
                                    </label>
                                    <input type="number" className="input input-sm input-bordered w-full" value={nilaiBawah} onChange={(e) => setNilaiBawah(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nilai Huruf</span>
                                    </label>
                                    <input type="text" className="input input-sm input-bordered w-full" value={nilaiHuruf} onChange={(e) => setNilaiHuruf(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Interfal Skor</span>
                                    </label>
                                    <input type="text" className="input input-sm input-bordered w-full" value={skor} onChange={(e) => setSkor(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Kategori</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kategori} onChange={(e) => setKategori(e.target.value)}>
                                    <option value="">-Kategori-</option>
                                    <option value="Istimewa">Istimewa</option>
                                    <option value="Sangat Baik">Sangat Baik</option>
                                    <option value="Lebih Baik">Lebih Baik</option>
                                    <option value="Baik">Baik</option>
                                    <option value="Cukup Baik">Cukup Baik</option>
                                    <option value="Lebih Cukup">Lebih Cukup</option>
                                    <option value="Cukup">Cukup</option>
                                    <option value="Kurang">Kurang</option>
                                    <option value="Kurang Sekali">Kurang Sekali</option>
                                </select>
                            </div>
                            <div className='col-span-2'>
                                <label className="label">
                                    <span className="text-base label-text">Keterangan</span>
                                </label>
                                <input type="text" className="input input-sm input-bordered w-full" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-primary">simpan</button>
                        </div>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Kategori Nilai</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div className='flex gap-2'>
                                <button className="btn btn-success btn-xs" onClick={modalAddOpen}><FaPlus /> <span>tambah data</span></button>
                                <select className='select select-sm select-bordered max-w-xs' value={kodeThn} onChange={(e) => setKodeThn(e.target.value)}>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <form className='mb-1' onSubmit={cariData}>
                                    <div className="form-control">
                                        <div className="input-group justify-end">
                                            <input
                                                type="text"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                className="input input-xs input-bordered input-success"
                                                placeholder='Cari'
                                            />
                                            <button type='submit' className="btn btn-xs btn-square btn-success">
                                                <FaSearch />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3" align='center'>#</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Tahun Ajaran</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Nilai Angka</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Nilai Huruf</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Intefal Skor</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Kategori</th>
                                        <th scope="col" className='px-6 py-3' align='center'>Keterangan</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListNilai.map((ktg, index) => {
                                        return kodeThn == 0 ? (
                                            <tr key={ktg.id_kategori_nilai} className='bg-white border-b text-gray-500'>
                                                <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap" align='center'>{index + 1}</th>
                                                <td className='px-6 py-2' align='center'>{ktg.tahunAjarans[0].tahun_ajaran}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.nilai_bawah} - {ktg.nilai_atas}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.nilai_huruf}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.interfal_skor}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.kategori}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.keterangan}</td>
                                                <td className='px-6 py-2' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning mr-1" title='Edit' onClick={() => modalEditOpen(ktg.id_kategori_nilai, 'Edit')}><FaEdit /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-error" title='Hapus' onClick={() => nonaktifkan(ktg.id_kategori_nilai)}><FaTrash /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : ktg.code_tahun_ajaran == kodeThn ? (
                                            <tr key={ktg.id_kategori_nilai} className='bg-white border-b text-gray-500'>
                                                <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap" align='center'>{index + 1}</th>
                                                <td className='px-6 py-2' align='center'>{ktg.nilai_bawah} - {ktg.nilai_atas}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.nilai_huruf}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.interfal_skor}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.kategori}</td>
                                                <td className='px-6 py-2' align='center'>{ktg.keterangan}</td>
                                                <td className='px-6 py-2' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning mr-1" title='Edit' onClick={() => modalEditOpen(ktg.id_kategori_nilai, 'Edit')}><FaEdit /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-error" title='Hapus' onClick={() => nonaktifkan(ktg.id_kategori_nilai)}><FaTrash /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            ""
                                        )
                                    })}
                                    {/* {ListNilai.map((ktg, index) => (
                                        <tr key={ktg.id_kategori_nilai} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap" align='center'>{index + 1}</th>
                                            <td className='px-6 py-2' align='center'>{ktg.nilai_bawah} - {ktg.nilai_atas}</td>
                                            <td className='px-6 py-2' align='center'>{ktg.nilai_huruf}</td>
                                            <td className='px-6 py-2' align='center'>{ktg.interfal_skor}</td>
                                            <td className='px-6 py-2' align='center'>{ktg.kategori}</td>
                                            <td className='px-6 py-2' align='center'>{ktg.keterangan}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div>
                                                    <button className="btn btn-xs btn-circle text-white btn-warning mr-1" title='Edit' onClick={() => modalEditOpen(ktg.id_kategori_nilai, 'Edit')}><FaEdit /></button>
                                                    <button className="btn btn-xs btn-circle text-white btn-error" title='Hapus' onClick={() => nonaktifkan(ktg.id_kategori_nilai)}><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span className='text-sm'>Total Data : {rows} page: {rows ? page : 0} of {pages}</span>
                            <p className='text-sm text-red-700'>{msg}</p>
                        </div>
                        <div className="mt-2 justify-center btn-group" key={rows} aria-label='pagination'>
                            <ReactPaginate
                                className='justify-center btn-group'
                                breakLabel={<SlOptions />}
                                previousLabel={<FaArrowLeft />}
                                pageCount={Math.min(10, pageCount)}
                                onPageChange={changePage}
                                nextLabel={<FaArrowRight />}
                                previousLinkClassName={"btn btn-xs btn-success btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-xs btn-success btn-circle btn-default-activ"}
                                pageLinkClassName={"btn btn-xs btn-success btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-xs btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListKategoriNilai