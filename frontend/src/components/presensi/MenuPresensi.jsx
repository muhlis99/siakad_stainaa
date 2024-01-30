import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { Link } from "react-router-dom"
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import * as locales from 'react-date-range'

const MenuPresensi = () => {
    const [loading, setLoading] = useState(false)
    const [locale, setLocale] = React.useState('ja')
    const [date, setDate] = useState(null)

    const nameMapper = {
        ar: 'Arabic',
        bg: 'Bulgarian',
        ca: 'Catalan',
        cs: 'Czech',
        cy: 'Welsh',
        da: 'Danish',
        de: 'German',
        el: 'Greek',
        enGB: 'English (United Kingdom)',
        enUS: 'English (United States)',
        eo: 'Esperanto',
        es: 'Spanish',
        et: 'Estonian',
        faIR: 'Persian',
        fi: 'Finnish',
        fil: 'Filipino',
        fr: 'French',
        hi: 'Hindi',
        hr: 'Croatian',
        hu: 'Hungarian',
        hy: 'Armenian',
        id: 'Indonesian',
        is: 'Icelandic',
        it: 'Italian',
        ja: 'Japanese',
        ka: 'Georgian',
        ko: 'Korean',
        lt: 'Lithuanian',
        lv: 'Latvian',
        mk: 'Macedonian',
        nb: 'Norwegian Bokmål',
        nl: 'Dutch',
        pl: 'Polish',
        pt: 'Portuguese',
        ro: 'Romanian',
        ru: 'Russian',
        sk: 'Slovak',
        sl: 'Slovenian',
        sr: 'Serbian',
        sv: 'Swedish',
        th: 'Thai',
        tr: 'Turkish',
        uk: 'Ukrainian',
        vi: 'Vietnamese',
        zhCN: 'Chinese Simplified',
        zhTW: 'Chinese Traditional'
    }

    const localeOptions = Object.keys(locales)
        .map(key => ({
            value: key,
            label: `${key} - ${nameMapper[key] || ''}`
        }))
        .filter(item => nameMapper[item.value]);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Presensi</h1>
            </section>
            <section>
                <div className='w-full lg:w-1/2 mx-auto'>
                    <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                        <div className="card-body p-4">
                            <div className="grid gap-2">
                                <input type="date" className='input input-bordered w-full' />
                                {/* <div className='flex justify-center'>
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn btn-sm btn-primary content-center">Click</div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96">
                                            <li>
                                                <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                                                    <Calendar onChange={item => setDate(item)}
                                                        locale={locales[locale]} date={date} />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                                {/* <details className="dropdown">
                                    <summary className="m-1 btn">Tanggalnya</summary>
                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-96">
                                        
                                    </ul>
                                </details> */}
                            </div>
                        </div>
                    </div>
                    <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                        <div className="card-body p-4">
                            <div className="grid gap-2">
                                <div>
                                    Anda dapat melakukan absen dosen
                                </div>
                                <div>
                                    <Link to="/presensi/dosen" className="btn btn-success btn-sm"></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MenuPresensi