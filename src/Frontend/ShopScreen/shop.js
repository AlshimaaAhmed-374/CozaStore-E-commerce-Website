import React from 'react'
import './shop.css';
import { FaHeart ,FaEye} from "react-icons/fa";

const Shop =({shop,Filter,allcatefilter,addtocart})=>{
    return(      
        <>
        <div className='shop'> 
            <h2>#shop</h2>
            <p>Home . shop</p>
           <div className='containar'>
              <div className='left_box'>
               <div className='category'>
                <div children='header'>
                    <h3>all categories</h3>
                </div>
                <div className='box'>
                    <ul>
                       <li onClick={()=>allcatefilter()}>#All</li>
                        <li onClick={()=>Filter("tv")}>#tv</li>
                        <li onClick={()=>Filter("laptop")}>#laptop</li>
                        <li onClick={()=>Filter("watch")}>#watch</li>
                        <li onClick={()=>Filter("speaker")}>#speaker</li>
                        <li onClick={()=>Filter("electronics")}>#electronics</li>
                        <li onClick={()=>Filter("headphone")}>#headphone</li>
                        <li onClick={()=>Filter("phone")}>#phone</li>
                    </ul>
                </div>
            </div>
            {/* <div className='banner'>
                <div className='img_box'>
                <img src='img/shop2.jpg' alt='' />
                </div>
            </div> */}
            </div>
            <div className='right_box'>
              <div className='banner'>
                <div className='img_box'>
                   <img src='img/shop3.jpg' alt='' />   
                </div> 
               </div>
               <div className='product_box'>
                   <h2>shop product</h2>
                 <div className='product_container'>
                    {
                        shop.map((curElm)=>
                        {
                            return(
                                <>
                                <div className='box'>
                                   <div className='img_box'>
                                      <img src={curElm.img} alt=''/>
                                      <div className='icon'>
                                      <li><FaHeart /></li>
                                     <li><FaEye /></li> 
                                      </div>
                                   </div>
                                   <div className='detail'>
                                    <h3>{curElm.Name}</h3>
                                    <p>${curElm.price}</p>
                                    <button onClick={()=>addtocart(curElm)}>Add to cart</button>
                                   </div>
                                </div>
                                
                                </>
                            )
                                                
                        })

                    }
                 </div>
               </div>
            </div>
            </div>

        </div>
        
        </>



)
    
}

export default Shop;
