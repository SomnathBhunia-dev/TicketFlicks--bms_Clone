/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import star from './icons8-star-filled-96.png'
import BookTIcketsButton from './BookTIcketsButton';
import LoadingState from './LoadingState'
import { useDispatch, useSelector } from 'react-redux';
import { loadingState } from '../Redux/Actions/action';

const SingleMovies = () => {
    const [data, setdata] = useState([])
    const { keyword } = useParams()
    const Loading = useSelector(state =>  state.Product.Loading)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchApi = async () => {
        try {
            dispatch(loadingState(true))
            const response = await axios.get(`/.netlify/functions/movies/${keyword}`, {
                headers: {
                    'X-App-Code': 'WEB',
                },
            });
            const dataFromBookMyShow = response.data;
            setdata(dataFromBookMyShow)
            dispatch(loadingState(false))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const redirectTrailerPage = () => {
        navigate(`/TrailerPage/${keyword}`, { state: { additionalData: data.bannerWidget?.multimedia?.objectData?.meta } });
    }

    return (
        <>
            {Loading ? <LoadingState /> :
                <div>
                    <div className='lg:bg-[#1a1a1a] lg:mb-8'>
                        <div className="container lg:w-3/4 xl:w-3/5 mx-auto bg-center bg-cover min-h-[480px] bg-no-repeat flex p-4 lg:p-0 lg:bg-[image:var(--bg-image-url)]" style={{ "--bg-image-url": `url(${data.bannerWidget?.bannerImageUrl})` }}>
                            <div className='lg:bg-gradient-bms flex flex-col lg:flex-row w-full items-center '>
                                <div className='rounded-md overflow-hidden relative'>
                                    <img src={data.bannerWidget?.multimedia?.objectData?.imageUrl} alt="" className='hidden lg:block' />
                                    <img src={data.bannerWidget?.bannerImageUrl} alt="" className='block lg:hidden' />
                                    <div className='font-medium text-xs text-center bg-black text-white py-1'>
                                        <p>In cinemas</p>
                                    </div>
                                    <div onClick={() => redirectTrailerPage()} className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-[#222222cc] rounded-3xl px-2 cursor-pointer'>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkElEQVR4nO3bP49MYRjG4YcIiiUKoiBKf1ZCoZJQKURUvsAmFFrBF5BQKGn0lNtpSUi23ka72ZBQKMhuIytW7CVvcWILEkYmmZn7vdpTzS8nM+c87zNVXdd1XdeNAvtxBqewu1LgEJ7iq1/W8AD7apbhKD74s3btWs0qvPR3nuNYzRKc9m++4C521SzAgtG8wfmadrhtdD/wBAdqWuGO//ex3UkVHGDwGicrOECzgXvYU6EBBiu4VMEBmi08a0+ZFRpg+yP1Teyo0ACDJcxXcIBmEw+xt0IDDFZxOTnAYBGHkwM067iFnakBBss4lxyg+Y7HmEsNMHiLi8kBmm+4mhyg+TTWoazJD9DcSA/wqAcIvwOup38JziX/DF4Z24ef8ADvcKHGzeQFiH4UXk59GVpPfh1eTB2IrKaOxDaTh6JLqWPxtdSDka3ko7GV1MPRjeTj8Vc4UdNEX5ERvyS1kL4mNx+9KNngReyqbIMjeB+7LN3g4G/W5T/j/syvy2/XRlE4i+NRf5jouq7rupoJPwECz3qHmQACegAAAABJRU5ErkJggg==" className='w-4 h-4' alt='' />
                                        <p>{data.bannerWidget?.multimedia?.objectData?.subtitle}</p>
                                    </div>
                                </div>
                                <div className='details w-full lg:w-3/5 lg:mx-8' >
                                    <div className='lg:text-white lg:my-8 flex flex-col justify-evenly items-start h-60 lg:h-[25rem]'>
                                        <h1 className='font-bold text-4xl hidden lg:block'>{data.bannerWidget?.heading}</h1>
                                        <div className='flex justify-between w-48 lg:w-56 items-center order-1'>
                                            <p className='text-xl lg:text-2xl font-bold flex items-center'><img src={star} alt="" className='w-8 lg:w-12' /> {data.bannerWidget?.rating.objectData.title}</p>
                                            <p className='sm:max-lg:text-base'>{data.bannerWidget?.rating.objectData.subtitle}</p>
                                        </div>
                                        <div className='flex px-6 py-3 bg-[#333333] rounded-lg w-fit order-4 lg:order-1'>
                                            <div className='mr-12'>
                                                <p className='text-white text-xs lg:text-lg font-bold'>{data.bannerWidget?.rating.objectData.preTitle}</p>
                                                <p className='text-[#cccccc] text-xs lg:text-base'>{data.bannerWidget?.rating.objectData.preSubtitle}</p>
                                            </div>
                                            <button className='px-3 py-1 lg:py-2 font-bold text-lg rounded-lg bg-white text-black'>{data.bannerWidget?.rating.objectData.ctaText}</button>
                                        </div>
                                        <div className='flex order-2 text-xs lg:text-base'>
                                            <p className='bg-[#e5e5e5] text-black mr-2 py-0.5 px-2 rounded-sm'>{data.bannerWidget?.resolutions.map((i) => i.label).join(', ')}</p>
                                            <p className='bg-[#e5e5e5] text-black py-0.5 px-2 rounded-sm'>{data.bannerWidget?.languages.map((i) => i.label).join(', ')}</p>
                                        </div>
                                        <p className='font-normal text-base order-3'>{data.bannerWidget?.duration}{data.bannerWidget?.splitter}{data.bannerWidget?.genres.map((i) => i.label).join(', ')}{data.bannerWidget?.splitter}{data.bannerWidget?.censor}{data.bannerWidget?.splitter}{data.bannerWidget?.releaseDate}</p>
                                        <div className='hidden lg:block order-5'>
                                            <BookTIcketsButton data={data.bannerWidget?.pageCta[0]} mainData={data.bannerWidget} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {data.Description &&
                        <div className="container lg:w-3/4 xl:w-3/5 px-4 lg:p-0 mx-auto space-y-8 mb-4">
                            {data.Description['1'] &&
                                <div className='space-y-4'>
                                    <p className='text-2xl font-bold'>{data.Description['1'].objectData.title}</p>
                                    <div dangerouslySetInnerHTML={{ __html: data.Description['1'].objectData.description }} />
                                </div>}
                            {data.Description['4'] &&
                                <div className='space-y-4'>
                                    <p className='text-2xl font-bold'>{data.Description['4'].header.title}</p>
                                    <div className='overflow-x-auto'>
                                        <div className='flex space-x-4 w-fit'>
                                            {data.Description['4'].listData.map((i) => (
                                                <div key={i.title} className='text-center w-28 lg:w-36'>
                                                    <img src={i.imageUrl} alt={i.title} className='w-full rounded-full' />
                                                    <p className='text-base'>{i.title}</p>
                                                    <p className='lg:text-sm text-xs text-[#666666]'>{i.subtitle}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div >
                                </div>}
                            {data.Description['5'] &&
                                <div className='space-y-4'>
                                    <p className='text-2xl font-bold'>{data.Description['5'].header.title}</p>
                                    <div className='overflow-x-scroll'>
                                        <div className='flex space-x-4 w-fit'>
                                            {data.Description['5'].listData.map((i) => (
                                                <div key={i.title} className='text-center w-28 lg:w-36'>
                                                    <img src={i.imageUrl} alt={i.title} className='w-full rounded-full ' />
                                                    <div className='px-4'>
                                                        <p className='text-base'>{i.title}</p>
                                                        <p className='lg:text-sm text-xs text-[#666666]'>{i.subtitle}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    }
                    <div className='block lg:hidden fixed bottom-0 w-full p-4 bg-white'>
                        <BookTIcketsButton data={data.bannerWidget?.pageCta[0]} mainData={data.bannerWidget} />
                    </div>
                </div>}
        </>
    )
}

export default SingleMovies