import React, { useEffect, useState,useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react';
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';

const Create = ({ placeholder }) => {

  const editor = useRef(null);
	const [content, setContent] = useState('');
  

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder || ''
  }),
  [placeholder]
);


   const [disable,setDisable] = useState(false)
   const [categories,setCategories] = useState([]);
   const [brands,setBrands] = useState([]); 
   const [gallery, setGallery] = useState([]);
   const [galleryImages, setGalleryImages] = useState([]);
   
      const navigate = useNavigate()
  
          const {
              register,
              handleSubmit,
              watch,
              setError,
              formState: { errors },
            } = useForm();
  
            const saveProduct = async (data)=>{

              const formData = {...data, "description":content, "gallery":gallery}
           
             
              setDisable(true);
  
                 const res = await fetch(`${apiUrl}/products`,{
                      method:"POST",
                      headers:{
                          'Content-type': 'application/json',
                          'Accept'      : 'application/json',
                          'Authorization': `Bearer ${adminToken()}`
                      },
                      body: JSON.stringify(formData)
                  }).then(res=>res.json())
                  .then(result=>{
                      setDisable(false);
                  
                      if(result.status == 200){
                         toast.success(result.message)
                         navigate("/admin/products")
                      }else{
                          const formErrors = result.errors;
                         Object.keys(formErrors).forEach((field) => {
                            setError(field, {message: formErrors[field[0]]});
                        })
                      }
                  })
            } 


            //fetch categories
            const fetchCategories = async ()=>{
              const res = await fetch(`${apiUrl}/categories`,{
                method:"GET",
                headers:{
                    'Content-type': 'application/json',
                    'Accept'      : 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
               
            }).then(res=>res.json())
            .then(result=>{
              setCategories(result.data);
            })
            }

            //fetch brands
            const fetchBrands = async ()=>{
              const res = await fetch(`${apiUrl}/brands`,{
                method:"GET",
                headers:{
                    'Content-type': 'application/json',
                    'Accept'      : 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }
               
            }).then(res=>res.json())
            .then(result=>{
              setBrands(result.data);
            })
            }

            //image upload
            const handleFile  = async (e)=>{
              const formData = new FormData();
              const file  = e.target.files[0];
              formData.append("image",file);
              setDisable(true)

                  const res = await fetch(`${apiUrl}/temp-images`,{
                    method:"POST",
                    headers:{
                        'Accept'      : 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    },
                    body:formData

                  }).then(res=>res.json())
                  .then(result=>{
                    gallery.push(result.data.id)
                    setGallery(gallery)

                    galleryImages.push(result.data.image_url)
                    setGalleryImages(galleryImages)

                    setDisable(false)

                    //after choose image image field rest
                    e.target.value = ""
                  })
            }


            //gallery image delete if need before insert product
            const deleteImage = (image)=>{
              const newGallery = galleryImages.filter(gallery=>gallery != image)
              setGalleryImages(newGallery)
            }

            //useeffect
            useEffect(()=>{
              fetchCategories();
              fetchBrands();
            },[]) 


  return (
    <Layout>
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-between mt-5 pb-3">
                <h4 className="h4 pb-0 mb-0">Add Product</h4>
                <Link to="/admin/products" className='btn btn-primary'>All Product</Link>
                </div>
                <div className="col-md-3">
                <Sidebar />
                </div>
                <div className="col-md-9">
                  <form onSubmit={handleSubmit(saveProduct)}>
                      <div className="card shadow">
                          <div className="card-body p-4">
                              <div className="mb-3">
                                  <label htmlFor="" className='form-label'>
                                      Title
                                  </label>
                                  <input
                                      {
                                          ...register("title",{
                                              required: "The title field is required",
                                          })
                                      }
                                    type="text"
                                    className={`form-control ${errors.title && 'is-invalid'}`} 
                                    placeholder='Title' />
                                    {
                                          errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                    }
                              </div>

                              <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                          <label className='form-label' htmlFor="">Category</label>
                                          <select
                                           {
                                            ...register("category_id",{
                                                required: "Please Select a Category",
                                            })
                                           }
                                          className={`form-control ${errors.category_id && 'is-invalid'}`}
                                           >
                                              <option value="">Select a Category</option>
                                              {
                                                categories && categories.map((category)=>{
                                                  return (
                                                    <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                                                  )
                                                })
                                              }
                                          </select>
                                          {
                                          errors.category_id && <p className='invalid-feedback'>{errors.category_id?.message}</p>
                                          }
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                          <label className='form-label' htmlFor="">Brand</label>
                                          <select
                                             {
                                              ...register("brand_id",{
                                                  required: "Please Select a Brand",
                                              })
                                             }
                                             className={`form-control ${errors.brand_id && 'is-invalid'}`}
                                           >
                                              <option value="">Select a Brand</option>
                                              {
                                                brands && brands.map((brand)=>{
                                                  return (
                                                    <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                                                  )
                                                })
                                              }
                                          </select>
                                          {
                                          errors.brand_id && <p className='invalid-feedback'>{errors.brand_id?.message}</p>
                                          }
                                      </div>
                                    </div>
                              </div>

                              <div className="mb-3">
                                <label htmlFor="" className='form-label'>Short Description</label>
                                <textarea

                                  {
                                    ...register("short_description")
                                  }
                                 className='form-control' placeholder='Short Description' rows={4}></textarea>
                              </div>

                              <div className="mb-3">
                                <label htmlFor="" className='form-label'>Description</label>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                   
                                  />
                              </div>

                              <h3 className='py-3 border-bottom mb-3'>Pricing</h3>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Price</label>
                                    <input type="text"

                                        {
                                          ...register("price",{
                                              required: "Price field is required",
                                          })
                                        }
                                    
                                        className={`form-control ${errors.price && 'is-invalid'}`}
                                        placeholder='Price' />
                                         {
                                          errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>
                                          }
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Discounted Price</label>
                                    <input type="text"
                                    {
                                      ...register("compare_price")
                                    }
                                     className='form-control' placeholder='Discounted Price' />
                                  </div>
                                </div>
                              </div>

                              <h3 className='py-3 border-bottom mb-3'>Inventory</h3>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="" className='form-label'>SKU</label>
                                    <input type="text"
                                       {
                                        ...register("sku",{
                                            required: "Sku field is required",
                                        })
                                      }
                                  
                                      className={`form-control ${errors.sku && 'is-invalid'}`}
                                      placeholder='SKU' />
                                       {
                                          errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>
                                        }
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Barcode</label>
                                    <input type="text"
                                     {
                                      ...register("barcode")
                                    }
                                     className='form-control' placeholder='Barcode' />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="" className='form-label'>QTY</label>
                                    <input type="text"
                                     {
                                      ...register("qty")
                                    }
                                     className='form-control' placeholder='QTY' />
                                  </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                      <label htmlFor="" className='form-label'>
                                          Status
                                      </label>
                                      <select
                                        {
                                          ...register("status",{
                                              required: "The status field is required",
                                          })
                                        }
                                        className={`form-control ${errors.status && 'is-invalid'}`} 
                                      >
                                          <option value="">Select Status</option>
                                          <option value="1">Active</option>
                                          <option value="0">Block</option>
                                      </select>
                                        {
                                              errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                        }
                                  </div>
                                </div>
                              </div>

                               <div className="mb-3">
                                      <label htmlFor="" className='form-label'>
                                          Featured
                                      </label>
                                      <select
                                        {
                                          ...register("is_featured",{
                                              required: "This  field is required",
                                          })
                                        }
                                        className={`form-control ${errors.is_featured && 'is-invalid'}`} 
                                      >
                                          
                                          <option value="1">Yes</option>
                                          <option value="0">No</option>
                                      </select>
                                        {
                                              errors.is_featured && <p className='invalid-feedback'>{errors.is_featured?.message}</p>
                                        }
                                  </div>

                              <h3 className='py-3 border-bottom mb-3'>Gallery</h3>

                              <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Image</label>
                                    <input
                                    onChange={handleFile}
                                     type="file" className='form-control' />
                              </div>

                              <div className="mb-3">
                                <div className="row">
                                  {
                                    galleryImages && galleryImages.map((image,index)=>{
                                      return(
                                        <div className="col-md-3" key={`image-${index}`}>
                                            <div className="card shadow">
                                              <img src={image} className='w-100' alt="" />
                                              <button className='btn btn-danger btn-sm'
                                              onClick={()=> deleteImage(image)}
                                              >Delete</button>
                                            </div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              </div>

                            
                          </div>
                      </div>
                      <button
                      disabled={disable}
                      className='btn btn-primary mt-3 mb-4'>Create</button>
                </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Create