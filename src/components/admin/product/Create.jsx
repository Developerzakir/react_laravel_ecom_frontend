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
   
      const navigate = useNavigate()
  
          const {
              register,
              handleSubmit,
              watch,
              formState: { errors },
            } = useForm();
  
            const saveProduct = async (data)=>{
              setDisable(true);
  
                 const res = await fetch(`${apiUrl}/products`,{
                      method:"POST",
                      headers:{
                          'Content-type': 'application/json',
                          'Accept'      : 'application/json',
                          'Authorization': `Bearer ${adminToken()}`
                      },
                      body: JSON.stringify(data)
                  }).then(res=>res.json())
                  .then(result=>{
                      setDisable(false);
                  
                      if(result.status == 200){
                         toast.success(result.message)
                         navigate("/admin/products")
                      }else{
                          alert('somwthing went wrong');
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
                                    className={`form-control ${errors.name && 'is-invalid'}`} 
                                    placeholder='Title' />
                                    {
                                          errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                    }
                              </div>

                              <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                          <label className='form-label' htmlFor="">Category</label>
                                          <select className="form-control">
                                              <option value="">Select a Category</option>
                                              {
                                                categories && categories.map((category)=>{
                                                  return (
                                                    <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                                                  )
                                                })
                                              }
                                          </select>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                       <div className="mb-3">
                                          <label className='form-label' htmlFor="">Brand</label>
                                          <select className="form-control">
                                              <option value="">Select a Brand</option>
                                              {
                                                brands && brands.map((brand)=>{
                                                  return (
                                                    <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                                                  )
                                                })
                                              }
                                          </select>
                                      </div>
                                    </div>
                              </div>

                              <div className="mb-3">
                                <label htmlFor="" className='form-label'>Short Description</label>
                                <textarea className='form-control' placeholder='Short Description' rows={4}></textarea>
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
                      <button
                      disabled={disable}
                      className='btn btn-primary mt-3'>Create</button>
                </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Create