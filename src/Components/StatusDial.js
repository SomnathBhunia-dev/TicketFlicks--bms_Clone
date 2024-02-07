import React from 'react'
import { Link } from 'react-router-dom'
import { txnClear } from '../Redux/Actions/action'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const StatusDial = ({ status, statusType }) => {
    const dispatch = useDispatch()

    const Booking = useSelector(state => state.Cart.Booking)
    
    const BookOnServer = () => {
        axios.post('/.netlify/functions/booking', Booking)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            {status && <div className="fixed top-0 left-0 right-0 z-50">
                <div className="bg-gray-400 h-screen bg-opacity-60 py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="relative mx-auto flex h-80 w-full top-60 items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:w-96">
                            {statusType === 'failed' ? <div className="relative flex flex-col items-center justify-center p-8 md:p-12">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                                    <path fill="#ed7899" d="M31 3A28 28 0 1 0 31 59A28 28 0 1 0 31 3Z"></path><path fill="#f9e3ae" d="M31,3C15.536,3,3,15.536,3,31s12.536,28,28,28s28-12.536,28-28S46.464,3,31,3z M31,53 C18.85,53,9,43.15,9,31S18.85,9,31,9c5.883,0,11.226,2.309,15.174,6.07c0.231,0.22,0.456,0.444,0.677,0.674 c0.258,0.268,0.51,0.543,0.755,0.825C50.966,20.432,53,25.478,53,31C53,43.15,43.15,53,31,53z"></path><path fill="#f6d397" d="M31,53C18.85,53,9,43.15,9,31H7.339c-2.491,0-4.361,2.25-3.945,4.706C5.631,48.929,17.14,59,31,59 s25.369-10.071,27.606-23.294C59.022,33.25,57.152,31,54.661,31H53C53,43.15,43.15,53,31,53z"></path><path fill="#8d6c9f" d="M31,2C15.01,2,2,15.009,2,31s13.01,29,29,29s29-13.009,29-29S46.99,2,31,2z M31,58 C16.112,58,4,45.888,4,31S16.112,4,31,4s27,12.112,27,27S45.888,58,31,58z"></path><path fill="#8d6c9f" d="M31 50c-.553 0-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2C32 50.448 31.553 50 31 50zM37.013 50.077c-.143-.534-.691-.852-1.225-.707-.533.143-.85.691-.707 1.225l.518 1.932c.119.447.523.742.965.742.086 0 .173-.011.26-.035.533-.143.85-.691.707-1.225L37.013 50.077zM21.75 47.521c-.478-.275-1.09-.112-1.366.366l-1 1.732c-.276.478-.112 1.09.366 1.366.157.091.329.134.499.134.346 0 .682-.179.867-.5l1-1.732C22.393 48.41 22.229 47.798 21.75 47.521zM41.616 47.888c-.277-.479-.89-.642-1.366-.366-.479.276-.643.888-.366 1.366l1 1.732c.186.321.521.5.867.5.17 0 .342-.043.499-.134.479-.276.643-.888.366-1.366L41.616 47.888zM26.212 49.37c-.533-.144-1.082.173-1.225.707l-.518 1.932c-.143.534.174 1.082.707 1.225.087.023.174.035.26.035.441 0 .846-.295.965-.742l.518-1.932C27.062 50.061 26.745 49.512 26.212 49.37z"></path><path fill="#faefde" d="M40.192,38.778L32.414,31l7.778-7.778c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0 L31,29.586l-7.778-7.778c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L29.586,31l-7.778,7.778 c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293L31,32.414l7.778,7.778 c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293C40.583,39.802,40.583,39.169,40.192,38.778z"></path><path fill="#8d6c9f" d="M38.351 11.322c.713.267 1.42.576 2.1.919.145.073.298.107.449.107.365 0 .718-.201.894-.549.249-.493.051-1.095-.442-1.343-.744-.376-1.519-.715-2.301-1.007-.518-.194-1.093.07-1.286.586C37.57 10.553 37.833 11.128 38.351 11.322zM16.15 16.151c4.748-4.748 11.548-6.949 18.188-5.886.545.088 1.059-.284 1.146-.829.088-.545-.284-1.059-.829-1.146-7.268-1.167-14.717 1.246-19.918 6.446-8.967 8.967-8.967 23.559 0 32.526.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414C7.963 37.661 7.963 24.339 16.15 16.151zM47.264 14.737c-.658-.659-1.363-1.283-2.094-1.856-.437-.341-1.063-.264-1.404.17-.341.435-.265 1.063.17 1.404.668.523 1.312 1.094 1.914 1.696 8.188 8.188 8.188 21.51 0 29.698-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293C56.23 38.296 56.23 23.704 47.264 14.737z"></path>
                                </svg>
                                <h1 className="mb-6 text-center text-2xl font-bold text-red-500 md:text-3xl lg:text-4xl">Payment Failed </h1>
                                <Link to="/" className="inline-block rounded-lg bg-red-700 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-red-900 focus-visible:ring active:text-green-700 md:text-base">Retry</Link>
                            </div> :
                                <div className="relative flex flex-col items-center justify-center p-8 md:p-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                                        <path fill="#72caaf" d="M31 3A28 28 0 1 0 31 59A28 28 0 1 0 31 3Z"></path><path fill="#f9e3ae" d="M31,3A28,28,0,1,0,59,31,28,28,0,0,0,31,3Zm0,50A22,22,0,1,1,46.17,15.07l.68.67q.39.4.75.82A22,22,0,0,1,31,53Z"></path><path fill="#f6d397" d="M31,53A22,22,0,0,1,9,31H7.34a4,4,0,0,0-3.95,4.71,28,28,0,0,0,55.21,0A4,4,0,0,0,54.66,31H53A22,22,0,0,1,31,53Z"></path><path fill="#8d6c9f" d="M31,2A29,29,0,1,0,60,31,29,29,0,0,0,31,2Zm0,56A27,27,0,1,1,58,31,27,27,0,0,1,31,58Z"></path><path fill="#8d6c9f" d="M31 50a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V51A1 1 0 0 0 31 50zM37 50.08a1 1 0 0 0-1.93.52l.52 1.93A1 1 0 0 0 37.53 52zM21.75 47.52a1 1 0 0 0-1.37.37l-1 1.73a1 1 0 0 0 1.73 1l1-1.73A1 1 0 0 0 21.75 47.52zM41.62 47.89a1 1 0 0 0-1.73 1l1 1.73a1 1 0 1 0 1.73-1zM26.21 49.37a1 1 0 0 0-1.22.71L24.47 52a1 1 0 1 0 1.93.52l.52-1.93A1 1 0 0 0 26.21 49.37z"></path><path fill="#faefde" d="M42.29,22.29,28,36.59l-7.29-7.29a1,1,0,0,0-1.41,1.41l8,8a1,1,0,0,0,1.41,0l15-15a1,1,0,0,0-1.41-1.41Z"></path><path fill="#8d6c9f" d="M38.35 11.32a21.1 21.1 0 0 1 2.1.92 1 1 0 0 0 .45.11 1 1 0 0 0 .45-1.89 22.71 22.71 0 0 0-2.3-1 1 1 0 0 0-.7 1.87zM16.15 16.15a21.07 21.07 0 0 1 18.19-5.88 1 1 0 1 0 .32-2 23 23 0 0 0-19.92 39 1 1 0 0 0 1.41-1.41A21 21 0 0 1 16.15 16.15zM47.26 14.74a23.16 23.16 0 0 0-2.09-1.86 1 1 0 1 0-1.23 1.57 21.27 21.27 0 0 1 1.91 1.7 21 21 0 0 1 0 29.7 1 1 0 1 0 1.41 1.41A23 23 0 0 0 47.26 14.74z"></path>
                                    </svg>
                                    <h1 className="mb-6 text-center text-2xl font-bold text-green-600 md:text-3xl lg:text-4xl">Payment Successful </h1>
                                    <Link to="/Bookings" className="inline-block rounded-lg bg-green-700 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-green-700 md:text-base" onClick={() => { dispatch(txnClear()); BookOnServer() }}>View Tickets</Link>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default StatusDial