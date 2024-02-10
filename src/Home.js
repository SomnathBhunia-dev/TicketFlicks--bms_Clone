/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import FilterOption from './Components/FilterOption';
import { Link } from 'react-router-dom';
import LoadingState from './Components/LoadingState'
import { useDispatch, useSelector } from 'react-redux';
import { loadingState, setData, updateFilterProduct } from './Redux/Actions/action';
import axios from 'axios';

const Home = () => {
    const [FilterToggle, setFilterToggle] = useState(false)
    const dispatch = useDispatch()

    const Data = useSelector((state) => state.Product.Data);
    const Product = useSelector((state) => state.Product.Product);
    const Filtered = useSelector((state) => state.Filter.Filtered);
    const FilterBy = useSelector((state) => state.Filter.FilterBy);

    const fetchApi = async () => {
        try {
            dispatch(loadingState(true))
            const response = await axios.get("/api/public/movies", {
                headers: {
                    'X-App-Code': 'WEB',
                },
            });
            const dataFromBookMyShow = response.data;
            dispatch(setData(dataFromBookMyShow))
            dispatch(updateFilterProduct(dataFromBookMyShow[0]?.MovieList))
            dispatch(loadingState(false))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    useEffect(() => {
        dispatch(updateFilterProduct(Product))
    }, [FilterBy])

    
    return (
        <>
            <div className="bg-white">
                {Data.length === 0 ? <LoadingState />
                    :
                    <div className="container mx-auto flex">
                        <aside className="w-1/5 p-4 lg:block hidden">
                            <h2 className="font-bold mb-2">Filters</h2>
                            {Data[0].filters?.map((i, index) => (
                                <div className="mb-4" key={index}>
                                    <FilterOption Topic={i} open={false} />
                                </div>
                            ))}
                        </aside>
                        <main className="w-full xl:w-2/3 p-4">
                            <h2 className="font-bold mb-4">Movies In Kolkata</h2>
                            {Filtered?.length !== 0
                                ?
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {Filtered?.map((i) => (
                                        <Link to={`/movies/${i.seoText}`} key={i.id}>
                                            <div className="border p-2" >
                                                <img src={i.image.url} alt={i.image.altText} className="mb-2" />
                                                <div>
                                                    {i.text.map((i, index) => (
                                                        <p className={` ${index === 0 ? 'font-semibold' : 'text-sm'}`} key={index}>{i.components.map((i) => i.text)}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                : <h1 className='font-bold text-2xl'>"Didn't Find Any match"</h1>}
                            <div onClick={() => setFilterToggle(true)} className='min-w-[48px] h-12 bg-[#eb4e62] fixed rounded-3xl right-9 bottom-5 flex justify-center items-center lg:hidden'>
                                <img src="https://assets-in.bmscdn.com/discovery-catalog/icons/tr:w-48,h-48/filter-white-202007011722.png" alt="" width="20px" height="20px" />
                            </div>
                            {FilterToggle && <div className='w-full h-full bg-white fixed top-0 rounded-xl animate-anim-up p-4 shadow-2xl overflow-y-auto z-50'>
                                <div className='fixed top-0 left-0 right-0 bg-white p-4 shadow-md z-50'>
                                    <div className='flex items-center justify-between'>
                                        <h2 className="font-bold mb-2">Filters</h2>
                                        <div onClick={() => setFilterToggle(false)} className='cursor-pointer mr-4 '>
                                            <svg width="16" height="16" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                                <g stroke="#333" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 1l21 21M22 1L1 22"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-12'>
                                    {Data[0].filters?.map((i, index) => (
                                        <div className="mb-4" key={index}>
                                            <FilterOption Topic={i} open={true} />
                                        </div>
                                    ))}
                                    <button className='bg-[#eb4e62] text-white p-2 w-full text-base font-medium rounded-lg my-8' onClick={() => setFilterToggle(false)} >Apply</button>
                                </div>
                            </div>}
                        </main>
                    </div>
                }
            </div>
        </>
    )
}

export default Home