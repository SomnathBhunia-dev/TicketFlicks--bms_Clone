import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import mIcon from './icons8-smartphone-50.png'
import { GlobalState } from './Context';

const SlotPage = () => {
  const [BookDate, setBookDate] = useState(0)
  const [mapView, setmapView] = useState(false)
  const location = useLocation();
  const additionalData = location.state?.additionalData;
  const mainData = location.state?.mainData;
  const { addToCart } = GlobalState()

  const navigate = useNavigate()


  const getNext5DaysDetails = (showTimes) => {
    const daysOfWeekShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsShort = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const today = new Date();
    const next5DaysDetails = [];

    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);

      const dayOfWeek = daysOfWeekShort[nextDay.getDay()].toUpperCase();
      const dayOfMonth = nextDay.getDate();
      const month = monthsShort[nextDay.getMonth()].toUpperCase();

      const showTimesForDay = showTimes.map((time) => {
        const showTimeDate = new Date(nextDay);
        showTimeDate.setHours(time.split(':')[0], time.split(':')[1], 0, 0);
        return showTimeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      });

      next5DaysDetails.push({
        dayOfWeek,
        dayOfMonth,
        month,
        times: showTimesForDay
      });
    }

    return next5DaysDetails;
  };

  const filterShowTimes = (showTimes) => {
    const currentTime = new Date();

    // Filter show times based on the allowed booking window
    const filteredShowTimes = showTimes.filter((showTime) => {
      // Extract hours, minutes, and period (AM/PM) from the show time string
      const [hours, minutes, period] = showTime.split(/:|\s/);

      // Convert hours to 24-hour format
      const adjustedHours = period === 'PM' ? parseInt(hours, 10) + 12 : parseInt(hours, 10);

      // Create a new Date object with the show time
      const showTimeDate = new Date();
      showTimeDate.setHours(adjustedHours, parseInt(minutes, 10), 0, 0);

      // Calculate the difference in milliseconds between the current time and the show time
      const timeDifference = showTimeDate.getTime() - currentTime.getTime();

      // Check if the show time is at least 10 minutes later than the current time
      const isWithinBookingWindow = timeDifference > 10 * 60 * 1000;

      return isWithinBookingWindow;
    });

    return filteredShowTimes;
  };

  const allShowTimes = ['10:00', '15:35', '20:00'];
  const next5DaysDetails = getNext5DaysDetails(allShowTimes);
  const ShowDateWithTime = next5DaysDetails.map((i) => (i.dayOfMonth === new Date().getDate() ? { ...i, times: filterShowTimes(i.times) } : i)).filter((i) => i.times.length > 0); // Remove objects with empty times array

  const BookSlot = (i) => {
    let { dayOfMonth, dayOfWeek, month } = ShowDateWithTime[BookDate]
    const movieData = {
      movieData: mainData,
      allTime: ShowDateWithTime[BookDate],
      ChooseTime: i,
      Resolution: additionalData.dimension,
      Language: additionalData.language,
      MovieName: mainData?.heading,
      BookingDate: dayOfMonth + month + dayOfWeek,
    }
    addToCart(movieData)
    navigate(`/booktickets/${mainData.heading}`);
  }


  return (
    <>
      <div>
        <div className="container w-full lg:w-4/6 mx-auto">
          <div className="head border-b-2 space-y-6 pb-4 px-4">
            <div className="name text-2xl md:text-3xl lg:text-4xl font-medium">{mainData.heading} - {additionalData.language} Movie</div>
            <div className='flex w-fit justify-around space-x-4'>
              <p className="detail pb-0.5 px-2 text-[#666] border border-[#666] w-fit rounded-full">{mainData.censor}</p>
              {mainData.genres.map((i) => <p key={i.label} className="detail py-0.5 px-2 text-[#666] border border-[#666] w-fit rounded-full">{i.label}</p>)}
            </div>
          </div>
          <div className="date flex justify-between flex-col lg:flex-row lg:w-3/4">
            <div className='flex p-1.5'>
              {ShowDateWithTime?.map((i, index) => (
                <div key={index} className={`${BookDate === index ? 'text-white bg-[#eb4e62]' : 'text-black bg-white'} font-medium cursor-pointer  py-0.5 px-4 mx-2 rounded-lg`} onClick={() => setBookDate(index)}>
                  <p className='text-xs'>{i.dayOfWeek}</p>
                  <p className='text-lg'>{i.dayOfMonth}</p>
                  <p className='text-xs'>{i.month}</p>
                </div>
              ))}
            </div>
            <div className='border-y-2 lg:border-x-2 lg:border-b-4 lg:border-b-[#eb4e62] p-4 font-bold'>
              {additionalData.language}-{additionalData.dimension}
            </div>
          </div>
        </div>
        <div className='bg-[#f2f2f2] p-4'>
          <div className="slot bg-white container w-11/12 xl:w-4/6 mx-auto h-[80vh] rounded-xl p-8 flex lg:flex-row flex-col">
            <div className="name flex w-full lg:w-80 justify-between items-start">
              <div className='space-y-4'>
                <p className='font-bold'>Guruji Complex Cinema Hall</p>
                <div className='text-[#49ba8e] lg:flex hidden'>
                  <img src={mIcon} alt="" className='w-6 mx-2' />
                  <p>M - ticket</p>
                </div>
              </div>
              <div className='text-[#7d7d7d] text-[10px] flex items-center' onClick={() => setmapView(true)}>
                <img src="https://in.bmscdn.com/moviemode/cinemaphotoshowcase/info.png" className='w-4' alt='' />
                <p className='font-medium text-[#7d7d7d] text-[10px]'>INFO</p>
              </div>
            </div>
            {mapView &&
              <div className='fixed inset-0 opacity-100 bg-[#222222cc] flex justify-center items-center' >
                <div className='w-fit min-w-[20rem] p-4 h-fit bg-white absolute rounded-xl animate-anim-up'>
                  <div className='flex justify-between'>
                    <p className='font-bold'>Guruji Complex Cinema Hall, Midnapure</p>
                    <div onClick={() => setmapView(false)} className='cursor-pointer'>
                      <svg width="16" height="16" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="#333" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 1l21 21M22 1L1 22"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className=''>
                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d776.4068173607631!2d87.57834136828171!3d22.23119702412954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02b5e364b25279%3A0x6af53a4282aa9608!2sParadise!5e0!3m2!1sen!2sin!4v1705657001074!5m2!1sen!2sin" height="300" className='border-none w-80 sm:w-96' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                </div>
                </div>}
          <div className="time py-2 flex h-fit space-x-6 flex-wrap">
            {ShowDateWithTime[BookDate].times?.map((i) => <div key={i} className='py-2 px-4 hover:text-white hover:bg-[#49ba8e] text-[#49ba8e] hover:border-[#49ba8e]  border border-[#49ba8e] rounded-md cursor-pointer m-4' onClick={() => BookSlot(i)}>{i}</div>)}
          </div>
        </div>
      </div>
    </div >
      </>
      )
}

export default SlotPage;
