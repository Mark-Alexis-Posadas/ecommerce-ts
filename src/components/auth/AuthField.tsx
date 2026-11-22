import { useState } from "react";
import type { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string };
export default function AuthField({label,error,hint,id,type='text',...input}:Props) {
  const [visible,setVisible]=useState(false);
  return <div>
    <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-800">{label}</label>
    <div className="relative">
      <input {...input} id={id} type={type==='password'&&visible?'text':type} aria-invalid={!!error} aria-describedby={error?id+'-error':hint?id+'-hint':undefined}
        className={'h-12 w-full rounded-xl border bg-white px-3.5 text-base text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 disabled:bg-slate-50 '+(type==='password'?'pr-16 ':'')+(error?'border-red-500':'border-slate-300')}/>
      {type==='password'&&<button type="button" disabled={input.disabled} aria-label={(visible?'Hide ':'Show ')+label.toLowerCase()} aria-pressed={visible} aria-controls={id} onClick={()=>setVisible(v=>!v)} className="absolute inset-y-1 right-1 rounded-lg px-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-indigo-600">{visible?'Hide':'Show'}</button>}
    </div>
    {error?<p id={id+'-error'} className="mt-2 text-sm text-red-700">{error}</p>:hint?<p id={id+'-hint'} className="mt-2 text-sm leading-5 text-slate-500">{hint}</p>:null}
  </div>;
}
