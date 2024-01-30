/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { Reducer } from './Reducer'

const GlobalContext = createContext()
const Kid = process.env.REACT_APP_RAZORPAY_KEY_ID

const Context = ({ children }) => {
    const initialState = {
        Data: [],
        Product: [],
        Cart: {},
        Fee: 49,
        CartTotal: 0,
        Booking: [],
        Filtered: [],
        FilterBy: {
            Format: [],
            Genres: [],
            Languages: []
        },
        Profile: {},
        Loading: true
    }

    const [state, dispatch] = useReducer(Reducer, initialState)

    const fetchApi = async () => {
        try {
            loadingState(true)
            const response = await axios.get("/.netlify/functions/moviesList", {
                headers: {
                    'X-App-Code': 'WEB',
                },
            });
            const dataFromBookMyShow = response.data;
            dispatch({ type: "SET_DATA", payload: dataFromBookMyShow })
            loadingState(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const loadingState = (i)=>{
        dispatch({type: "LOADING", payload: i})
    }
    const toggleSlot = (i) => {
        dispatch({ type: "CHANGE_SLOT", payload: i })
    }
    const addToCart = (i) => {
        dispatch({ type: "ADD_TO_CART", payload: i })
    }
    const SeataddToCart = (i) => {
        dispatch({ type: "SEAT_ADD_TO_CART", payload: i })
    }
    useEffect(() => {
        dispatch({ type: "CART_UPDATE" })
    }, [state.Cart])

    const BookOnServer = () => {
        axios.post('/.netlify/functions/booking', state.Booking)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const orderSuccess = () => {
        const booking = {
            BookingDate: state.Cart.BookingDate,
            BookingTime: state.Cart.ChooseTime,
            MovieName: state.Cart.MovieName,
            movieData: state.Cart.movieData,
            SeatDetails: state.Cart.SeatDetails,
            Amount: state.CartTotal,
            Resolution: state.Cart.Resolution,
            Language: state.Cart.Language,
            Profile: state.Profile
        }
        dispatch({ type: 'SET_TXN_STATUS', payload: { Item: booking, Msg: 'success' } })
    };

    const onScriptLoad = async () => {
        const res = await initiatePayment();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        let orderAmount = parseInt(state.CartTotal * 100);
        const data = await fetch("/.netlify/functions/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Sub_Total: orderAmount }),
        }).then((t) => t.json());


        var options = {
            key: Kid,
            name: "Guruji Films Pvt Ltd",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: state.Cart.MovieName + state.Cart.BookingDate + state.Cart.ChooseTime,
            image:
                "https://cdn.telanganatoday.com/wp-content/uploads/2022/12/AI-1.jpg",
            handler: function (response) {
                orderSuccess(response);
            },
            prefill: {
                name: state.Profile.Name,
                email: state.Profile.Email,
                contact: "9898525231",
            },
            theme: {
                color: "#9333ea",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    const initiatePayment = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const makePayment = () => {
        onScriptLoad();
    };
    const txnClear = () => {
        dispatch({ type: "REMOVE_TXN_STATUS", });
    }


    const FilterTag = (e) => {
        let Name = e.target.name
        let value = e.target.value
        let isChecked = e.target.checked
        dispatch({ type: "FILTER_TAG", payload: { Name, value, isChecked } })
    }
    useEffect(() => {
        dispatch({ type: "UPDATE_FILTER_PRODUCT", payload: state.FilterBy })
    }, [state.FilterBy]);

    const saveProfile = (i) => {
        dispatch({ type: "ADD_PROFILE", payload: i });
    }
    return (
        <GlobalContext.Provider value={{ ...state, toggleSlot, addToCart, SeataddToCart, makePayment, txnClear, BookOnServer, FilterTag, saveProfile, loadingState}}>
            {children}
        </GlobalContext.Provider>
    )
}
export const GlobalState = () => {
    return useContext(GlobalContext)
}

export default Context