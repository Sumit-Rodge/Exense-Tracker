import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export const Home = () => {
  const uri = 'http://localhost:4002';
  const [data,setData]=useState([]);
  const [amount,setAmount]=useState('');
  const [description,setDescription]=useState('');
  const [categories,setCategories]=useState(['Food','Entertainment','Education','Health','Lend','Others']);
  const [selectedCategory,setSelectedCategory]=useState('sdf');
  const navigate = useNavigate();

  const cookieValue = document.cookie.split('=')[1];

  async function getData(){
      try {
        const encryptedId = document.cookie.split('=')[1];
        await axios.get(`${uri}/user/${encryptedId}`)
        .then(dataa=>setData(dataa.data))
      } catch (error) {
        console.log(error)
      }
  }

  async function handleAddExpense(){
    try {
      await axios.put(`${uri}/addexpense/${cookieValue}`,{
        "amount":amount,
        "description":description,
        "category":selectedCategory
      });
      alert('added')
    } catch (error) {
      console.log(error)
    }
  }
  function deleteCookie(){
    const cookie = document.cookie
    document.cookie=cookie+";max-age=0";
    navigate('/login');
  }

  function handleCategoryChange(e){
    setSelectedCategory(e.target.value)
  }

  
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className='bg-gray-900 h-screen w-full flex   text-white  flex-col'>
        <div className='flex justify-between px-5 mt-4'>
          <h1>
            HOME
          </h1>
          <button className='bg-red-600 p-2 rounded-lg w-fit' onClick={deleteCookie}>
            Log-Out  
          </button>
        </div>

        {/* add expense */}
        <div className="flex justify-center  ">
          <div className='flex flex-col justify-center '>
            <div className='flex flex-col'>
              <label htmlFor="amount">Enter Amount</label>
              <input type="number" name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="p-3 rounded-lg text-black mr-2"/>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="description">Description</label>
              <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="p-3 rounded-lg text-black mr-2"/>
            </div>

            <div className="flex flex-col ">
              <label htmlFor="categories">Select Category For Expense</label>
              <select name="categories" id="categoreis" className='p-3 text-black rounded-lg' onChange={handleCategoryChange} >
                {
                  categories.map(category=>{
                    return (
                      <option value={category} key={category} className='text-black'>
                        {category}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <button className='bg-green-700 p-3 rounded-lg font-mono px-4 w-fit mx-auto mt-4' onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
    </div>
  )
}
