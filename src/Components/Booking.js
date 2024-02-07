/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Qr from './qr.png'
import Stamp from './booked.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Booking = () => {
  const Booking = useSelector(state =>  state.Cart.Booking)

  const navigate = useNavigate();

  useEffect(() => {
      if (Booking?.length === 0) {
          navigate(-1);
      }
  }, [Booking, navigate]);
  return (
    <>
    {Booking?.length !== 0 &&
      <div className="container sm:w-[22rem] m-auto my-4 h-fit bg-[#203a6a] text-white px-6 py-2">
        <div>
          Booking Summary
        </div>
        <div className='bg-white text-black mt-2 h-fit p-4 rounded-sm mb-4'>
          <div className='flex'>
            <div className='flex w-[25rem]'>
              <img src={Booking?.movieData?.multimedia?.objectData?.imageUrl} className='w-20 rounded-md' alt="" />
              <div className='flex px-2 flex-col text-sm text-[#666666] space-y-1'>
                <p>{Booking?.movieData.censor}, {Booking?.Resolution}, {Booking?.Language}</p>
                <h1 className='text-lg font-bold text-black'>{Booking?.MovieName}</h1>
                <p>Guruji Complex Cinema Hall</p>
                <p>{Booking?.BookingDate} | {Booking?.BookingTime}</p>
              </div>
            </div>
            {/* <div className='rotate-90'>
              <p>
                M - ticket
              </p>
            </div> */}
          </div>
          <div className='flex my-4 justify-between border-y-2'>
            <div className='w-28'>
              <p className='text-sm text-[#666666]'>Screen</p>
              <p className='text-lg font-bold text-black'>Audi - 1</p>
            </div>
            <div>
              <p className='text-sm text-[#666666]'>Seats</p>
              {Booking?.SeatDetails.map((i) =>
                <div key={i.Tag} className='text-lg font-bold text-black'>
                  <p>{i.Tag}- <span>{i.Seat.map(s => s).join(', ')}</span></p>
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-around relative'>
            <img src={Qr} alt="" />
            <div className='absolute left-[-23px] w-44 -rotate-[20deg]'>
              <img src={Stamp} alt="" />
            </div>
          </div>
        </div>
          <p className='text-sm text-white'>*Ticket will be sent to {Booking?.Profile?.Email} </p>
      </div>}
    </>
  )
}

export default Booking