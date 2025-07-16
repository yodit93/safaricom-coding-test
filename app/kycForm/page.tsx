'use client'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Error {
    branch?: string;
    accName?: string;
    accNo?: string;
    file?: string;
}

const KYCForm = () => {
    const router = useRouter();
    const [data, setData] = useState({
        bank: 'CBE',
        branch: '',
        accName: '',
        accNo: '',
        file: null as File | null
    })

    const [errors, setErrors] = useState<Error>({
        branch: '',
        accName: '',
        accNo: '',
        file: ''
    });
    const [touched, setTouched] = useState({
        bank: false,
        branch: false,
        accName: false,
        accNo: false,
        file: false
    });

    const validateBranch = () => {
        if(!data.branch) {
            return 'Branch Name is required'
        }
    }

    const validateAccName = () => {
        if(!data.accName) {
            return 'Bank Account Name is required'
        }
    }

    const validateAccNo = () => {
        if(!data.accNo) {
            return 'Bank Account Number is required'
        } else if(/[a-zA-z]/.test(data.accNo)) {
            return 'Account number should be numeric'
        }
    }

    const validateFile = () => {
        if(!data.file) {
            return 'Bank Account File is required'
        }
    }


    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        if (e.target.type === 'file') {
            const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            const file = e.target.files?.[0];
            if(file && acceptedTypes.includes(file.type)) {
                setData((prev) => ({
                    ...prev,
                    [name]: file
                }))
            } else {
                setTouched((prev) => ({...prev, file: true}))
                setErrors((prev) => ({
                    ...prev,
                    [name]: 'The file type is not accepted. Only pdf, png, and jpg are accepted'
                }))
            }
            
        } else{
            setData((prev) => ({
                    ...prev,
                    [name]: value
            }))
        }
    }

    const handleNext = () => {
        const newErrors = {
            branch: validateBranch(),
            accName: validateAccName(),
            accNo: validateAccNo(),
            file: validateFile()
        }
        setErrors(newErrors);
        setTouched({
            bank: true,
            branch: true,
            accName: true,
            accNo: true,
            file: true
        })
        if(Object.values(newErrors).some((error) => error)) {
            return
        }
        localStorage.setItem('form', JSON.stringify({
            bank: data.bank,
            branch: data.branch,
            accName: data.accName,
            accNo:data.accNo,
            file: data.file?.name
        }));
        router.push('/confirmation')
    }


    useEffect(() => {
        const newErrors = {
            branch: validateBranch(),
            accName: validateAccName(),
            accNo: validateAccNo(),
            file: validateFile()
        }
        setErrors(newErrors);
    }, [data])
  return (
    <div className='bg-gray-200 w-[90%] p-4 mx-auto'>
      <div className="flex items-center gap-1">
        <hr className='text-green-600 flex-1'/>
        <span>Fund Withdrawal option</span>
        <hr className='text-green-600 flex-1' />
      </div>
      <div className='flex  gap-2 border border-gray-300 rounded-md w-[150px] py-2'>
        <Check className='bg-green-600 rounded-md text-white'/>
        <span>Bank</span>
      </div>

      <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
        <div className='flex flex-col'>
            <label htmlFor="bank">Bank</label>
            <select 
                name="bank" 
                id="bank"
                className='outline-0 border-2 border-gray-300 w-full sm:w-[200px] py-2 px-4 rounded-md'
                value={data.bank}
                onChange={handleChange}
            >
                <option value="cbe">CBE</option>
                <option value="abay">Abay</option>
                <option value="abyssinia">Abyssinia</option>
            </select>
        </div>
        <div className='flex flex-col'>
            <label htmlFor="branch">Select Branch</label>
            <select 
                name="branch" 
                id="branch"
                className='outline-0 border-2 border-gray-300 w-full sm:w-[200px] py-2 px-4 rounded-md'
                value={data.branch}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({...prev, branch: true}))}
            >
                <option value=""></option>
                <option value="branch-1">Branch 1</option>
                <option value="branch-2">Banch 2</option>
                <option value="branch-3">Branch-3</option>
            </select>
            {touched.branch && errors.branch && <span className='text-red-500 text-xs mb-2'>{errors.branch}</span>}
        </div>
        <div className="flex flex-col">
            <label htmlFor="accName">Account Name</label>
            <input 
                type="text"
                className='outline-0 border-2 border-gray-300 w-full sm:w-[200px] py-2 px-4 rounded-md'
                name='accName'
                id='accName'
                value={data.accName}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({...prev, accName: true}))}
            />
            {touched.accName && errors.accName && <span className='text-red-500 text-xs mb-2'>{errors.accName}</span>}
        </div>
        <div className="flex flex-col">
            <label htmlFor="accName">Account Number</label>
            <input 
                type="text"
                className='outline-0 border-2 border-gray-300 w-full sm:w-[200px] py-2 px-4 rounded-md'
                name='accNo'
                id='accNo'
                value={data.accNo}
                onChange={handleChange}
                onBlur={() => setTouched((prev) => ({...prev, accNo: true}))}
            />
            {touched.accNo && errors.accNo && <span className='text-red-500 text-xs mb-2'>{errors.accNo}</span>}
        </div>
        <div className="">
            <span>Proof of Bank Account</span>
            <div className='outline-0 border-2 border-gray-300 w-full sm:w-[200px] py-2 px-4 rounded-md'>
                <label htmlFor="file" className='border-2 border-gray-300 p-1 rounded-md text-gray-400'>{data.file ? data.file.name : 'Choose file'}</label>
                <input 
                    type="file"
                    className='hidden'
                    name='file'
                    id='file'
                    accept='.pdf, .png, .jpg'
                    onChange={handleChange}
                    onBlur={() => setTouched((prev) => ({...prev, file: true}))}
                />
            </div>
            {touched.file && errors.file && <span className='text-red-500 text-xs mb-2'>{errors.file}</span>}
        </div>
      </div>
      <div className='flex items-center justify-end gap-4'>
        <button className='bg-green-600 text-white forn-bold py-2 px-4 rounded-md' onClick={() => router.back()}>Back</button>
        <button type='button' className='bg-green-600 text-white forn-bold py-2 px-4 rounded-md' onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default KYCForm
