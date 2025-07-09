
'use client'
import React, { useEffect, useState } from 'react'

const Confirmation = () => {
    const [data, setdata] = useState({
        bank: '',
        branch: '',
        accName: '',
        accNon: '',
        file: ''

    })

    useEffect(() => {
        const info = localStorage.getItem('form');
        if (info) {
            setdata(JSON.parse(info));
        }
    }, [])
  return (
    <div className='bg-gray-100 w-[90%]'>
      <h2>Fund Withdrawal Option</h2>
      <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
        <div className='flex-1'>
            <div className='flex flex-col'>
                <span className='font-bold'>BANK NAME</span>
                <span>{data.bank}</span>
            </div>
            <div>
                <span className='font-bold'>BANK BRANCH NAME</span>
                <span>{data.branch}</span>
            </div>
        </div>
         
       <div className='flex-1'>
            <div>
                <span className='font-bold'>ACCOUNT NUMBER</span>
                <span>{data.accNon}</span>
            </div>
            <div>
                <span className='font-bold'>PROOF OF BANK ACCOUNT</span>
                <span className='text-green-600'>{data.file}</span>
            </div>
       </div>
        <div className='flex-1'>
            <span className='font-bold'>ACCOUNT NAME</span>
            <span>{data.accName}</span>
        </div>
      </div>
     
    </div>
  )
}

export default Confirmation
