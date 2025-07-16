
'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Confirmation = () => {
    const [data, setdata] = useState({
        bank: '',
        branch: '',
        accName: '',
        accNo: '',
        file: ''
    })

    const [status, setStatus] = useState('');

    const router = useRouter();

    const handleAction = (action: string) => {
       setStatus(action);
    }

    useEffect(() => {
        const info = localStorage.getItem('form');
        if (info) {
            setdata(JSON.parse(info));
        }
    }, [])
  return (
    <div className='bg-gray-100 w-[90%] m-4 flex flex-col'>
        {status && <span className='self-end text-green-600 mr-2 mt-2'>{status}</span>}
      <h2>Fund Withdrawal Option</h2>
      <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
        <div className='flex-1'>
            <div className='flex flex-col'>
                <span className='font-bold'>BANK NAME</span>
                <span>{data.bank}</span>
            </div>
            <div className='flex flex-col'>
                <span className='font-bold'>BANK BRANCH NAME</span>
                <span>{data.branch}</span>
            </div>
        </div>
         
       <div className='flex-1'>
            <div className='flex flex-col'>
                <span className='font-bold'>ACCOUNT NUMBER</span>
                <span>{data.accNo}</span>
            </div>
            <div className='flex flex-col'>
                <span className='font-bold'>PROOF OF BANK ACCOUNT</span>
                <span className='text-green-600'>{data.file}</span>
            </div>
       </div>
        <div className='flex-1 flex flex-col'>
            <span className='font-bold'>ACCOUNT NAME</span>
            <span>{data.accName}</span>
        </div>
      </div>
     <div className='flex items-center justify-end gap-4 my-2 '>
        <button className='bg-green-600 text-white font-bold py-2 px-4 rounded-md' onClick={() => router.back()}>Back</button>
        <button type='button' className='bg-green-600 text-white font-bold py-2 px-4 rounded-md' onClick={() => handleAction('Draft Saved')}>Draft</button>
        <button type='button' className='bg-green-600 text-white font-bold py-2 px-4 rounded-md' onClick={() => handleAction('Submitted')}>Submit</button>
      </div>
    </div>
  )
}

export default Confirmation;
