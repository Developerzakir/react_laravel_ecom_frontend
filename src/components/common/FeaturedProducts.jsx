import React from 'react'
import ProductImg from '../../assets/images/Mens/eight.jpg';

const FeaturedProducts = () => {
  return (
    <section className='section-2 py-5'>
           <div className="container">
           <h3>Featured Products</h3>
            <div className="row mt-4">
                <div className="col-md-3 col-6">
                    <div className="product card border-0">
                        <div className="card-img">
                            <img src={ProductImg} alt="" className='w-100' />
                        </div>
                        <div className="card-body pt-3">
                        <a href="">
                            Red Check Shirt for men
                        </a>
                        <div className="price">
                            $50 <del>$80</del>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="product card border-0">
                        <div className="card-img">
                            <img src={ProductImg} alt="" className='w-100' />
                        </div>
                        <div className="card-body pt-3">
                        <a href="">
                            Red Check Shirt for men
                        </a>
                        <div className="price">
                            $50 <del>$80</del>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="product card border-0">
                        <div className="card-img">
                            <img src={ProductImg} alt="" className='w-100' />
                        </div>
                        <div className="card-body pt-3">
                        <a href="">
                            Red Check Shirt for men
                        </a>
                        <div className="price">
                            $50 <del>$80</del>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="product card border-0">
                        <div className="card-img">
                            <img src={ProductImg} alt="" className='w-100' />
                        </div>
                        <div className="card-body pt-3">
                        <a href="">
                            Red Check Shirt for men
                        </a>
                        <div className="price">
                            $50 <del>$80</del>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
           </div> 
       </section>
  )
}

export default FeaturedProducts