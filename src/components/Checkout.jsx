import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import productImg  from '../assets/images/Mens/six.jpg'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const handlePaymentMethod = (e)=>{
        setPaymentMethod(e.target.value);
    }
    
  return (
    <Layout>
        <div className="container pb-5">
            <div className="row">
                <div className="col-md-12">
                    <nav aria-label="breadcrumb py-5">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">
                              Checkout
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row">
                <div className="col-md-7">
                    <h3 className='border-bottom pb-3'><b>Billing Details</b></h3>

                    <form action="">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <input type="text" className='form-control' placeholder='Name' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <input type="text" className='form-control' placeholder='Email' />
                                </div>
                            </div>

                            <div className="mb-3">
                                <textarea className='form-control' row={3} placeholder='Address'></textarea>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                   <input type="text" className='form-control' placeholder='City' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <input type="text" className='form-control' placeholder='State' />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                   <input type="text" className='form-control' placeholder='Zip' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                   <input type="text" className='form-control' placeholder='Phone' />
                                </div>
                            </div>
                        </div>

                        
                    </form>
                    
                </div>

                <div className="col-md-5">
                    <h3 className='border-bottom pb-3'><b>Items</b></h3>

                    <table className='table'>
                        <tbody>
                            <tr>
                                <td width={100}>
                                <img src={productImg} alt="" width={60} />
                                </td>
                                <td width={600}>
                                <h6>Product Dummy Title</h6>
                                <div className='d-flex align-items-center pt-3'>
                                    <span>$10</span>
                                    <div className="ps-3">
                                        <button className='btn btn-size'>S</button>
                                    </div>
                                    <div className="ps-5">X 1</div>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table> 

                        <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between border-bottom pb-2">
                                <div><b>Sub Total: </b></div>
                                <div>$20</div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom py-2">
                                <div><b>Shipping: </b></div>
                                <div>$5</div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom py-2">
                                <div><b>Grand Total: </b></div>
                                <div>$25</div>
                            </div>

                           

                        </div>
                        </div>

                        <h3 className='border-bottom pb-3'><b>Payment Methods</b></h3>
                        <div>
                            <input type="radio"
                             onClick={handlePaymentMethod}
                             checked={paymentMethod == 'stripe'} value={'stripe'} />
                            <label htmlFor="" className='form-label ps-1'>Stripe</label>

                            <input type="radio"
                             onClick={handlePaymentMethod}
                             checked={paymentMethod == 'cod'} value={'cod'} className='ms-3' />
                            <label htmlFor="" className='form-label ps-1'>COD</label>
                        </div>
                      

                        <div className='d-flex py-3'>
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>


                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Checkout