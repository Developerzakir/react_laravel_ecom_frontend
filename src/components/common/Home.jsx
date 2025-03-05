import React from 'react';
import LatestProducts from './LatestProducts';
import FeaturedProducts from './FeaturedProducts';
import Slider from './Slider';
import Layout from './Layout';


const Home = () => {
  return (
    <>
      
      <Layout>
      

       {/* Slider section start  */}
         <Slider />
       {/* Slider section end  */}

       {/* New Arrivals section start  */}
         <LatestProducts />
       {/* New Arrivals section  end  */}

       {/* Featured Products section start  */}
       <FeaturedProducts />
       {/* Featured Products section  end  */}

       
      </Layout>

    </>
  )
}

export default Home