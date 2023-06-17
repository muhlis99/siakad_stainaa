import React from 'react'

const FormAddMataKuliah = () => {
    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Tambah Mata Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <form>
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nama Mata Kuliah</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Nama Mata Kuliah" className="input input-sm input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nama Mata Kuliah</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Nama Mata Kuliah" className="input input-sm input-bordered w-full" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormAddMataKuliah