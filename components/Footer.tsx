"use client"
import { GrFormEdit } from "react-icons/gr";
import { Button } from './ui/Button';
import { Check } from 'lucide-react';
import { useFormStore } from '@/store/store';

function Footeri() {
  const { formFields } = useFormStore()
  return (
    <footer className='flex justify-between items-center px-10 h-14 bg-slate-300/50'>
      <Button disabled={formFields.length===0} size={"sm"} className='text-sm bg-white px-2 py-1 rounded-lg flex items-center space-x-4'><GrFormEdit/> Save as Draft</Button>
      <Button disabled={formFields.length===0} size={"sm"} className='bg-[#00aa45] border border-[#1e874b] text-white text-sm px-2 py-1 rounded-xl flex items-center space-x-4'><Check/> Publish form</Button>
    </footer>
  )
}

export default Footeri
