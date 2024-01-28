import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <header className="text-gray-600 body-font bg-[#e5e5e5] shadow-lg">
                <div className="container mx-auto flex flex-wrap p-5 flex-row max-md:justify-between items-center">
                    <Link to='/' className="flex title-font font-medium items-center text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-[#f84464] rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl text-[#f84464]">TicketFlicks</span>
                    </Link>
                    <nav className="md:ml-auto md:mr-auto hidden md:flex flex-wrap items-center text-base justify-center text-[#666666]">
                        <Link to='/' className="mr-5 hover:text-gray-900">Movies</Link>
                        <Link className="mr-5 hover:text-gray-900">Plays</Link>
                        <Link className="mr-5 hover:text-gray-900">Stream</Link>
                        <Link className="mr-5 hover:text-gray-900">Sports</Link>
                    </nav>
                    <button className="inline-flex items-center bg-[#f84464] text-white border-0 py-1 px-3 focus:outline-none rounded text-base">Midnapur
                    <svg width="20" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.08786 6.08783C4.24407 5.93162 4.49734 5.93162 4.65355 6.08783L7.8707 9.30498L11.0879 6.08783C11.2441 5.93162 11.4973 5.93162 11.6535 6.08783C11.8098 6.24404 11.8098 6.4973 11.6535 6.65351L8.22426 10.0828C8.029 10.2781 7.71241 10.2781 7.51715 10.0828L4.08786 6.65351C3.93165 6.4973 3.93165 6.24404 4.08786 6.08783Z" fill="#fdfdfd"></path></svg>
                    </button>
                </div>
            </header>
        </>
    )
}

export default Navbar