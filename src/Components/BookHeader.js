import React from 'react'

const BookHeader = ({ Cart, seatNo = [] }) => {

  const { dayOfMonth, month } = Cart?.allTime

  return (
    <>
    {Cart?.times?.length !== 0 &&
      <div className="header flex items-center justify-between shadow-md px-2 md:px-8 py-2 min-h-[5rem]">
        <div>
          <p className="text-base">{Cart?.movieData.heading} ({Cart?.Resolution})</p>
          <div className=' flex flex-col md:flex-row'>
          <p className="font-bold text-sm">Guruji Complex Cinema Hall</p>
          <p className="font-bold text-sm hidden md:block mx-2"> | </p>
          <p className="font-bold text-sm">{dayOfMonth} {month}, {Cart?.ChooseTime} </p>
          </div>
        </div>
        {seatNo?.reduce((total, i) => total + i.Seat.length, 0) !== 0 &&
          <div className="py-0.5 px-2 border-2 border-black rounded-md">
            {seatNo?.reduce((total, i) => total + i.Seat.length, 0)} tickets
          </div>}
      </div>}
    </>
  )
}

export default BookHeader