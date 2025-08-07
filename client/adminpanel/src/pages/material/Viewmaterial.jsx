import React, { useEffect, useState } from 'react'
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';

export default function Viewmaterial() {
  let [search, setSearch] = useState(false)
  let [materialList, setMaterialList] = useState([])
  let [ids, setIds] = useState([])
  let [selectAll, setSelectAll] = useState(false)

  let [materialName, setMaterialName] = useState('')

  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, setTotalPages] = useState(null)
  let [limit, setLimit] = useState(4)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL

  let getMaterials = () => {
    axios.get(`${apiBaseUrl}material/view`,
      {
        params: {
          materialName,
          currentPage,
          limit
        }
      }
    )
      .then((res) => res.data)
      .then((finalRes) => {
        setMaterialList(finalRes.materialData)
        setTotalPages(finalRes.pages)
      })
  }
  useEffect(() => {
    getMaterials()
  }, [materialName, currentPage, limit])

  let getCheckedValue = (event) => {
    if (event.target.checked && !ids.includes(event.target.value)) {
      setIds([...ids, event.target.value]);
    }
    else {
      setIds(ids.filter((v) => v != event.target.value))
    }
  }

  let deleteMaterial = () => {
    axios.post(`${apiBaseUrl}material/delete`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        getMaterials()
        setIds([])

      })
  }

  let changeStatus = () => {
    axios.post(`${apiBaseUrl}material/status-change`, { ids })
      .then((res) => res.data)
      .then((finalRes) => {
        getMaterials()
        setIds([])

      })
  }

  let handleAll = (event) => {
    if (event.target.checked) {
      let allIds = materialList.map((items) => items._id)
      setIds(allIds)
    } else {
      setIds([])
    }
  }

  useEffect(() => {
    if (materialList.length >= 1) {
      if (materialList.length == ids.length) {
        setSelectAll(true)
      }
      else {
        setSelectAll(false)
      }
    }
  }, [ids])


  return (
    <div>
      <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
        <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Material /</span>
          <span className='text-gray-800'> View </span>
        </div>
      </div>

      <div className=''>
        <form className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
          <div className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
            <input onChange={(e) => setMaterialName(e.target.value)} type="text" placeholder='Search Name' name="" id="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[0px] outline-gray-700' />
            <button onClick={getMaterials} className='px-[10px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white text-center ' /></button>
          </div>
        </form>

        <div className='px-[20px] py-[20px]'>
          <div className=' border-[0.1px] border-gray-300 rounded-[8px] mb-7'>
            <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
              <h2 className='text-[22px] font-medium'>View Material</h2>
              <div className='flex gap-[10px]'>
                <select onChange={(e) => setLimit(e.target.value)} name="" id="" className='border'>
                  <option value="4">Change Limit</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                </select>
                <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                  {search ?
                    <MdFilterAltOff />
                    : <MdFilterAlt />}
                </button>
                <button onClick={changeStatus} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Change Status</button>
                <button onClick={deleteMaterial} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Delete</button>
              </div>
            </div>
            <table className='w-[100%] rounded-[10px] bg-gray-800 '>
              <thead className=' w-[100%] bg-gray-700 '>
                <tr className='flex justify-between p-[20px]'>
                  <th className='basis-[2%] text-left'>
                    <input onChange={handleAll} checked={selectAll} value={selectAll} type="checkbox" className=' scale-140' />
                  </th>
                  <th className='basis-[8%] text-gray-300 uppercase text-left text-[13px] font-medium'>Sr. No </th>
                  <th className='basis-[40%] text-gray-300 text-left uppercase text-[13px] font-medium'>material Name</th>
                  <th className='basis-[10%] text-gray-300 text-left uppercase text-[13px] font-medium'>order </th>
                  <th className='basis-[10%] text-gray-300 text-left uppercase text-[13px] font-medium'>status</th>
                  <th className='basis-[10%] text-gray-300 text-left uppercase text-[13px] font-medium'>action</th>
                </tr>
              </thead>

              <tbody className=''>
                {materialList.length >= 1
                  ?
                  materialList.map((items, index) => {
                    return (
                      <tr key={index} className='flex justify-between items-center px-[20px] py-[15px]'>
                        <td className='basis-[2%] '>
                          <input onChange={getCheckedValue} checked={ids.includes(items._id)} type="checkbox" value={items._id} className=' scale-140' />
                        </td>
                        <td className='basis-[8%] text-gray-300 uppercase text-[13px] font-medium'>
                          {(currentPage - 1) * limit + (index + 1)}
                        </td>
                        <td className='basis-[40%] text-gray-300 uppercase text-[13px] font-medium'>{items.materialName}</td>
                        <td className='basis-[10%] text-white text-left'>{items.materialOrder}</td>
                        <td className='basis-[10%] text-left'>
                          {items.materialStatus
                            ?
                            <button className='bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-tl text-white text-[14px] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                            :
                            <button className='bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tl text-white text-[14px] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                          }
                        </td>
                        <td className='basis-[10%] text-left'>
                          <Link to={`/material/edit/${items._id}`}>
                            <button className='w-[35px] h-[35px] bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr className=''>
                    <td className='flex justify-between items-center px-[20px] py-[15px] text-white'> No Material List Found</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
