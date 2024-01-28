/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import footage from './board.png'
import { GlobalState } from "./Context";
import { Link, useNavigate } from "react-router-dom";
import BookHeader from "./BookHeader";

const SeatingChart = () => {
  const [data, setdata] = useState([])
  const [seatNo, setseatNo] = useState([{ Tag: '', Price: 0, Seat: [] }])
  const [Reserved, setReserved] = useState([])
  const { Cart, toggleSlot, SeataddToCart } = GlobalState()

  const fetchApi = async () => {
    try {
      // Make the Axios request
      const response = await axios.get('/api/public/showtimes', {
        headers: {
          'X-App-Code': 'WEB',
          // Add any other headers if needed
        },
      });
      const dataFromBookMyShow = response.data;
      setdata(dataFromBookMyShow)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchBookesSeat = async () => {
    try {
      // Make the Axios request
      const response = await axios.get('/api/private/bookings', {
        params: {
          bookingDate: Cart?.BookingDate,
          chooseTime: Cart?.ChooseTime,
          movieName: Cart?.MovieName,
          resolution: Cart?.Resolution,
          language: Cart?.Language
        },
        headers: {
          'X-App-Code': 'WEB',
          // Add any other headers if needed
        },
      });
      const dataFromBookMyShow = response.data;
      setReserved(dataFromBookMyShow[0]?.SeatDetails)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])
  useEffect(() => {
    fetchBookesSeat()
  }, [Cart?.ChooseTime])

  const PickSeat = (i) => {
    const exist = seatNo.some((s) => s.Tag === i.Tag);

    if (exist) {
      const updatedSeat = seatNo.map((s) => {
        if (s.Tag === i.Tag) {
          if (!s.Seat.includes(i.Seat)) {
            return { ...s, Seat: [...s.Seat, i.Seat] };
          } else {
            // If the seat is already selected, remove it
            return { ...s, Seat: s.Seat.filter((k) => k !== i.Seat) };
          }
        } else {
          return s;
        }
      });
      return setseatNo(updatedSeat);
    } else {
      setseatNo([...seatNo, { Tag: i.Tag, Price: i.Price, Seat: [i.Seat] }]);
    }
  };


  useEffect(() => {
    setseatNo([])
  }, [Cart?.ChooseTime])

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the Cart state is empty
    if (!Cart || Object.keys(Cart).length === 0) {
      // Redirect to the previous page or any other route
      navigate(-1); // Redirect to the previous page
      // OR
      // navigate('/some-other-route'); // Redirect to another route
    }
  }, [Cart, navigate]);

  return (
    (!Cart || Object.keys(Cart).length !== 0) ?
      <>
        <BookHeader Cart={Cart} seatNo={seatNo} />
        <div className="time flex space-x-4 bg-[#f5f5fa] lg:px-8 py-2 min-h-[3rem]">
          <div className="time px-4 lg:px-8 py-2 flex h-fit space-x-6">
            {Cart?.allTime.times?.map((i) => <div key={i} className={`py-2 px-2 lg:px-4 hover:text-white hover:bg-[#49ba8e] text-[#49ba8e] hover:border-[#49ba8e] ${Cart?.ChooseTime === i && 'bg-[#49ba8e] text-white'}  border border-[#49ba8e] rounded-md cursor-pointer`} onClick={() => toggleSlot(i)} >{i}</div>)}
          </div>
          {/* onClick={() => BookSlot(i)} */}
        </div>
        <div className="bg-[#fafafa]">
          <div className="p-4 container flex md:justify-center overflow-auto">
            <div className="mb-4 w-fit flex flex-col items-center">
              {data.map((s, index) => (
                <div key={index} className="flex flex-col space-x-1 mb-1">
                  <div>
                    <h2 className="text-xs text-[#999] font-bold mb-2">{s.SeatTag} Rs. - {s.Price}</h2>
                    <hr />
                  </div>
                  <div>
                    {s.SeatBlock.map((b, index) => (
                      <div key={index} className="flex space-x-1 mb-1 items-center">
                        <p className="text-[#999] mr-2">{b.BlockName}</p>
                        {b.AllBlock.map((i, index) => (
                          <div key={index} className={`w-6 h-6 m-1 text-xs text-center ${i.Status === 'hidden' && 'invisible'} flex justify-center items-center ${!i.Reserverd ? 'text-[#1ea83c] border border-[#1ea83c] hover:text-white hover:bg-[#1ea83c] cursor-pointer'
                            : 'bg-[#eee] text-[#eb4e62] pointer-events-none'} ${Reserved.some((s) => s.Seat.includes(i.SeatBlock + i.SeatNo)) && 'bg-[#eee] text-[#eb4e62] pointer-events-none border-none'} ${seatNo?.some((s) => s.Seat.includes(i.SeatBlock + i.SeatNo)) && 'text-white bg-[#1ea83c]'}`} onClick={() => PickSeat(
                              { Tag: s.SeatTag, Price: s.Price, Seat: (i.SeatBlock + i.SeatNo) })}> {i.SeatNo}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="">
              <img src={footage} alt="" className="w-80" />
              <p className="text-center mt-4">All eyes this way please!</p>
            </div>
            </div>        
          </div>
        </div>
        {seatNo?.reduce((total, i) => total + i.Seat.length, 0) !== 0 &&
            <div className='fixed bottom-0 w-full p-4 bg-white flex justify-center shadow-md h-16 items-center'>
            <Link to='/checkout' className="w-fit">
              <button className="bg-[#eb4e62] text-white p-2 w-full text-base font-medium rounded-lg" onClick={() => SeataddToCart(seatNo)}>Proceed Rs. {seatNo?.reduce((total, i) => total + i.Price * i.Seat.length, 0)}.00</button>
            </Link>
          </div>}
      </>
      : ''
  );
};

export default SeatingChart;
