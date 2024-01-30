import React from "react";
import  loading  from "./loading.gif";

const LoadingState = () => {
    return (
        <div className="container m-auto flex h-[90vh]">
           <img src={loading} alt='loading'  width={100} className='m-auto' />
        </div>
    )
}
export default LoadingState;