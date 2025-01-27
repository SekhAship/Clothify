import React from 'react'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const navigate=useNavigate();
    const handleCheckout=()=>{
        navigate("/checkout?step=2");
    }
    return (
        
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {[1,1,1,1].map((item)=><CartItem />)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className='border'>
                        <div className='mr-3 ml-3'>
                        <p className='uppercase font-bold opacity-60 pb-4 mt-2'>PRICe DETAILS</p>
                        <hr />
                        <div className='space-y-3 font-semibold'>
                            <div className='flex justify-between pt-3 text-black font-bold'>
                                <span>Price</span>
                                <span>₹4697</span>
                            </div>
                        </div>
                        <div className='space-y-3 font-semibold'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Discount</span>
                                <span className=' text-green-600'>-₹3419</span>
                            </div>
                        </div>
                        <div className='space-y-3 font-semibold'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Delivery charge</span>
                                <span className=' text-green-600'>Free</span>
                            </div>
                        </div>
                        <div className='space-y-3 font-semibold'>
                            <div className='flex justify-between pt-3 text-black font-bold'>
                                <span>Total Amount</span>
                                <span className=' text-green-600'>₹1278</span>
                            </div>
                        </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            type="submit"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Cart
