import { useRef, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import AuthField from "./AuthField";
type Field='name'|'email'|'password'|'confirmPassword';
type Values=Record<Field,string>;
function validate(field:Field,values:Values,registration:boolean):string {
  const value=values[field];
  if(field==='name')return !value.trim()?'Enter your full name.':value.trim().length>100?'Use 100 characters or fewer.':'';
  if(field==='email')return !value.trim()?'Enter your email address.':!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())||value.trim().length>254?'Enter a valid email address.':'';
  if(field==='confirmPassword')return !value||value!==values.password?'Passwords must match.':'';
  if(!value)return 'Enter your password.';
  return registration&&(value.length<8||new TextEncoder().encode(value).length>72)?'Use at least 8 characters and no more than 72 UTF-8 bytes.':'';
}
export default function CustomerAuthForm({mode}:{mode:'login'|'register'}) {
  const registration=mode==='register';
  const {user,loading:restoring,login,register}=useAuth();
  const navigate=useNavigate();
  const [values,setValues]=useState<Values>({name:'',email:'',password:'',confirmPassword:''});
  const [errors,setErrors]=useState<Partial<Record<Field,string>>>({});
  const [failure,setFailure]=useState('');const [busy,setBusy]=useState(false);const pending=useRef(false);
  if(restoring)return <p role="status" className="py-16 text-sm text-slate-600">Checking your session...</p>;
  if(user)return <Navigate to="/" replace/>;
  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();if(pending.current)return;
    const fields:Field[]=registration?['name','email','password','confirmPassword']:['email','password'];
    const next:Partial<Record<Field,string>>={};
    for(const field of fields){const error=validate(field,values,registration);if(error)next[field]=error;}
    setErrors(next);setFailure('');const first=fields.find(field=>next[field]);
    if(first){event.currentTarget.querySelector<HTMLInputElement>('[name="'+first+'"]')?.focus();return;}
    pending.current=true;setBusy(true);
    try{
      if(registration)await register(values.name.trim(),values.email.trim(),values.password);else await login(values.email.trim(),values.password);
      toast.success(registration?'Your account is ready.':'Welcome back.');navigate('/',{replace:true});
    }catch(error){
      let message='Unable to sign in. Please try again.';
      if(axios.isAxiosError(error)){
        if(!error.response)message="We couldn't connect. Check your connection and try again.";
        else if(error.response.status===401)message='The email or password is incorrect. Please try again.';
        else if(registration&&error.response.status===409)message='An account with this email may already exist. Try signing in.';
        else if(registration&&error.response.status===400)message='Check your details and password requirements, then try again.';
        else message='The service is temporarily unavailable. Please try again.';
      }setFailure(message);
    }finally{pending.current=false;setBusy(false);}
  };
  const props=(field:Field)=>({id:'customer-'+mode+'-'+field,name:field,value:values[field],error:errors[field],disabled:busy,required:true,
    onChange:(event:ChangeEvent<HTMLInputElement>)=>{setValues(v=>({...v,[field]:event.target.value}));setErrors(v=>({...v,[field]:''}));setFailure('');},
    onBlur:()=>setErrors(v=>({...v,[field]:validate(field,values,registration)}))});
  return <div className="w-full max-w-md">
    <header className="mb-8"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Your ShopZone account</p><h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{registration?'Make yourself at home.':'Welcome back.'}</h1><p className="mt-3 text-sm leading-6 text-slate-600">{registration?'Create an account for your next great find.':'Sign in to keep shopping and manage your orders.'}</p></header>
    <form onSubmit={submit} noValidate aria-busy={busy} className="space-y-5">
      {failure&&<div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm leading-6 text-red-800">{failure}</div>}
      {registration&&<AuthField {...props('name')} label="Full name" autoComplete="name" placeholder="Your full name" maxLength={100}/>}
      <AuthField {...props('email')} label="Email address" type="email" autoComplete="username" inputMode="email" autoCapitalize="none" spellCheck={false} placeholder="you@example.com" maxLength={254}/>
      <AuthField {...props('password')} label="Password" type="password" autoComplete={registration?'new-password':'current-password'} hint={registration?'At least 8 characters; maximum 72 UTF-8 bytes. Choose a long, unique password.':undefined}/>
      {registration&&<AuthField {...props('confirmPassword')} label="Confirm password" type="password" autoComplete="new-password"/>}
      <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-70">
        {busy&&<svg aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity=".3"/><path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3"/></svg>}
        {busy?registration?'Creating your account...':'Signing in...':registration?'Create account':'Sign in'}
      </button><span role="status" className="sr-only">{busy?'Your request is being processed.':''}</span>
    </form>
    <p className="mt-7 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">{registration?'Already have an account? ':'New to ShopZone? '}<Link to={registration?'/login':'/register'} className="rounded font-semibold text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">{registration?'Sign in':'Create an account'}</Link></p>
  </div>;
}
