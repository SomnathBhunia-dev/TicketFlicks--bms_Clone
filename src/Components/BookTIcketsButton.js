/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BookTIcketsButton = ({ data, mainData }) => {
    const [warning, setwarning] = useState(false)
    const [langBan, setlangBan] = useState(false)

    const confirmed = () => {
        setwarning(!warning)
    }

    const langChoose = () => {
        setlangBan(!langBan)
    }
    const divRef = useRef(null);
    // Function to handle clicks outside the div
    const handleOutsideClick = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            // Clicked outside the div, hide it
            setwarning(false);
            setlangBan(false)
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <>
            <button className='px-10 py-3 font-bold text-lg rounded-lg bg-[#f84464] text-white w-full' onClick={() => confirmed()}>Book Tickets</button>
            {warning &&
                <>
                    <div className='fixed inset-0 opacity-100 bg-[#222222cc] flex justify-center items-center' >
                        <div className='w-fit min-w-[20rem] h-fit bg-white absolute rounded-xl animate-anim-up' ref={divRef}>
                            {data?.meta?.cta ?
                                <div>
                                    <div className='w-[20rem] p-4'>
                                        {data?.meta?.cta.additionalData?.bottomSheetData?.widgets[0]?.data.map((i) => (
                                            <div key={i.styleId}>
                                                <p className={`${i.styleId === 'headers-style' ? 'font-medium text-lg text-black' : 'font-normal text-sm text-[#666666]'}`}>{i.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='w-11/12 mx-auto mb-2'>
                                        <button className='bg-[#eb4e62] text-white p-2 text-base w-full font-medium  rounded-lg' onClick={() => { langChoose(); confirmed() }}>Continue</button>
                                    </div>
                                </div>
                                : <LangBanner data={data?.meta} mainData={mainData} />}
                        </div>
                    </div>
                </>
            }
            {langBan &&
                <div className='fixed inset-0 opacity-100 bg-[#222222cc] flex justify-center items-center'>
                    <div className='absolute min-w-[23rem] h-fit bg-white rounded-xl animate-anim-up' ref={divRef}>
                        <LangBanner data={data?.meta} mainData={mainData} />
                    </div>
                </div>
            }
        </>
    )
}

export default BookTIcketsButton

const LangBanner = ({ data, mainData }) => {
    const [resolution, setResolution] = useState()
    const navigate = useNavigate()

    const chooseSlot = (i) => {
        if (i) {
            navigate('/slotPick', { state: { additionalData: { language: i.language, dimension: i.dimension }, mainData: mainData } });
        }
    }

    return (
        <>
            <div className=''>
                <div className='p-4 text-black'>
                    <p className='text-xs'>{data?.title}</p>
                    <p className='text-lg font-medium'>{data?.subtitle}</p>
                </div>
                {data?.options.map((k) => (
                    <div key={k.language}>
                        <p className='w-full bg-[#f2f5f9] text-[#666666] pt-2 px-4 pb-1'>{k.language}</p>
                        <div className='flex m-4 space-x-4'>
                            {k.formats.map((i, index) => <div key={index} onClick={() => setResolution({ dimension: i.dimension, language: k.language })} className={`py-2 text-sm px-3 min-w-[5rem] w-fit text-center rounded-2xl ${resolution?.dimension === i.dimension ? 'bg-[#eb4e62] text-white' : 'text-[#eb4e62]'} hover:bg-[#eb4e62] hover:text-white cursor-pointer border border-[#eb4e62] `}>{i.dimension}</div>)}
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-11/12 mx-auto mb-2'>
                <button onClick={() => chooseSlot(resolution)} className='bg-[#eb4e62] text-white p-2 text-base w-full font-medium rounded-lg'>Continue</button>
            </div>
        </>
    )
}