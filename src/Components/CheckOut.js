import React, { useEffect, useState } from 'react'
import BookHeader from './BookHeader'
import { GlobalState } from './Context'
import StatusDial from './StatusDial'
import { useNavigate } from 'react-router-dom'
import LoadingState from "./LoadingState";

const CheckOut = () => {
    const [DetailsDial, setDetailsDial] = useState(false)
    const [profile, setprofile] = useState({ Name: '', Email: '' })
    const { Cart, CartTotal, Fee, makePayment, statusDial, statusDialMsg, saveProfile, Profile, Loading, loadingState } = GlobalState()
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cart || Object.keys(Cart).length === 0) {
            navigate(-1);
        }
    }, [Cart, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setprofile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };
    const payment = (e) => {
        e.preventDefault();
        saveProfile(profile);
        if (Object.keys(Profile)?.length > 0) {
            setDetailsDial(false)
            makePayment();
            loadingState(true)
        }
    }
    return (
        <>
            {Loading ? <LoadingState /> :
                (!Cart || Object.keys(Cart).length) !== 0 &&
                <div>
                    <BookHeader Cart={Cart} />
                    <div className="bg-[#f5f5f5] h-[80vh]">
                        <div className="container mx-auto p-2 flex flex-col md:flex-row justify-evenly">
                            <div className='bg-white p-2 md:w-3/5 h-fit shadow-md'>
                                <img src="https://in.bmscdn.com/webin/modal/bookasmile-03.jpg?v123" alt="" />
                            </div>
                            <div className='lg:w-80 md:w-2/5'>
                                <div className='bg-white p-4 shadow-lg'>
                                    <p className='text-[#c02c39] text-sm tracking-[3px] mb-6'>BOOKING SUMMARY</p>
                                    {Cart?.SeatDetails?.map((i, index) => (
                                        <div key={index} className='p-2 flex justify-between'>
                                            <p>{i.Tag}- {i.Seat.map((i) => i).join(",")}<span className='text-xs mx-2 md:max-lg:block'>({i.Seat?.length} Tickets)</span></p>
                                            <p>Rs. {i.Price}.00</p>
                                        </div>
                                    ))}
                                    <div className='flex justify-between p-2 mb-2'>
                                        <p className='text-xs'>Convienence Fee</p>
                                        <p>Rs. {Fee}.00</p>
                                    </div>
                                    <hr className='h-0.5 text-black' />
                                    <div className='flex justify-between p-2 mb-2'>
                                        <p>Sub Total</p>
                                        <p>Rs. {CartTotal}.00</p>
                                    </div>
                                </div>
                                <div className='flex justify-between px-4 py-2 bg-yellow-200'>
                                    <p>Amount Payable</p>
                                    <p>Rs. {CartTotal}.00</p>
                                </div>
                                <button className='bg-[#eb4e62] text-white p-2 w-full text-base font-medium rounded-lg my-8' onClick={() => setDetailsDial(true)}>Proceed</button>
                            </div>
                            {DetailsDial &&
                                <div className='min-w-fit h-fit bg-white absolute top-1/3 rounded-xl animate-anim-up p-4 shadow-2xl'>
                                    <section className="bg-white dark:bg-gray-900">
                                        <div onClick={() => setDetailsDial(false)} className='cursor-pointer m-4 float-right'>
                                            <svg width="16" height="16" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                                <g stroke="#333" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 1l21 21M22 1L1 22"></path>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Details</h2>
                                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">We will Send You Your Ticket Details to Your mail Id</p>
                                            <form action='#' onSubmit={payment} className="space-y-8">
                                                <div>
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                                    <input type="email" name='Email' id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@xyz.com" required value={profile.Email} onChange={handleInputChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                                                    <input type="text" name='Name' id="Name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Name" required value={profile.Name} onChange={handleInputChange} />
                                                </div>
                                                <button type='submit' className='bg-[#eb4e62] text-white p-2 w-40 text-base font-medium rounded-lg my-8'>Proceed</button>
                                            </form>
                                        </div>
                                    </section>
                                </div>}
                        </div>
                    </div>
                    {statusDial && <StatusDial status={statusDial} statusType={statusDialMsg} />}
                </div>
            }
        </>
    )
}

export default CheckOut