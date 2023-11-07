import React, { useRef } from 'react'
import CetakPdf from './CetakPdf'
import jsPDF from 'jspdf'

const ViewKhsPdf = () => {
    const templateRef = useRef(null)

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'pt',
        })

        doc.setFont('Inter-Regular', 'normal')
        doc.setFontSize(1);

        doc.html(templateRef.current, {
            async callback(doc) {
                await doc.save('document')
            }
        })
    }

    return (
        <div>
            <button onClick={handleGeneratePdf}>
                Generate PDF
            </button>
            <div className='d-none'>
                <div ref={templateRef}>
                    <CetakPdf />
                </div>
            </div>

        </div>
    )
}

export default ViewKhsPdf