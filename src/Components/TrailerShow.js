import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

const TrailerShow = () => {
    const location = useLocation();
    const additionalData = location.state?.additionalData;
    console.log(additionalData)
    const { keyword } = useParams()
    return (
        <>
            <div className="container w-full  lg:w-[50rem] p-4 bg-slate-300 mx-auto">
                <div className='p-2 border-b-2'>Videos For <span className='font-bold text-lg'>{keyword}</span></div>
                <div>{additionalData?.videos.map((i) => (
                    <div key={i.videoId} className='my-8 rounded-xl overflow-hidden'>
                        <iframe frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="YouTube video player" width="100%" src={`https://www.youtube.com/embed/${i.videoId}?enablejsapi=1&amp;modestbranding=1&amp;origin=https%3A%2F%2Fin.bookmyshow.com&amp;playsinline=1&amp;fs=1&amp;widgetid=1&controls=0`} id="widget2" data-gtm-yt-inspected-25="true" className='h-60 md:h-[405px]'></iframe>
                    </div>
                ))}</div>
            </div>
        </>
    )
}

export default TrailerShow