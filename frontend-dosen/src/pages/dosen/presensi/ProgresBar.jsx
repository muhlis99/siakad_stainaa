import React from 'react'

const ProgresBar = ({ bgcolor, progress, height, jumlahMahasiswaAbsen }) => {
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        transition: 'linear 500ms',
        // transitionTimingFunction: '',
        textAlign: 'right'
    }

    const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${jumlahMahasiswaAbsen}`}</span>
            </div>
        </div>
    )
}

export default ProgresBar