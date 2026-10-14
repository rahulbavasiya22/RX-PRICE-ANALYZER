'use client';
import {useState,type FormEvent} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {createClient} from '@/lib/supabase/client';
export default function ResetPasswordPage(){
 const router=useRouter(),[password,setPassword]=useState(''),[confirm,setConfirm]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(password!==confirm){setMessage('Passwords do not match.');return}
  setBusy(true);setMessage('');
  const supabase=createClient();
  const {data}=await supabase.auth.getUser();
  if(!data.user){setBusy(false);setMessage('Your recovery link has expired or is invalid. Please request a new password reset email.');return}
  const {error}=await supabase.auth.updateUser({password});
  setBusy(false);
  if(error){setMessage(error.message);return}
  setMessage('Your password has been updated. Redirecting to the dashboard.');
  router.replace('/dashboard');router.refresh();
 }
 return <main className="auth"><div className="authcard"><div className="logo">✚ <strong>RX Price Analyzer</strong></div><h1>Choose a new password</h1><p>Open this page using the recovery link from your email, then choose a new password.</p><form onSubmit={submit}><label>New password<input type="password" minLength={8} autoComplete="new-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><label>Confirm password<input type="password" minLength={8} autoComplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)}/></label><button className="primary full" disabled={busy}>{busy?'Updating…':'Update password'}</button></form>{message&&<p role="status">{message}</p>}<p><Link href="/forgot-password">Request another reset link</Link></p></div></main>;
}
