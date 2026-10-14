'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
export default function ForgotPasswordPage() {
 const [email,setEmail]=useState('');
 const [message,setMessage]=useState('');
 const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setBusy(true);setMessage('');
  const {error}=await createClient().auth.resetPasswordForEmail(email,{
   redirectTo:window.location.origin+'/auth/callback?next=/reset-password'
  });
  setBusy(false);
  setMessage(error?error.message:'If an account exists for this email, you will receive a password reset link. Check spam too.');
 }
 return <main className="auth"><div className="authcard"><div className="logo">✚ <strong>RX Price Analyzer</strong></div><h1>Reset your password</h1><p>Enter your registered email address. We will email you a link to choose a new password.</p><form onSubmit={submit}><label>Email address<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><button className="primary full" disabled={busy}>{busy?'Sending…':'Send password reset link'}</button></form>{message&&<p role="status">{message}</p>}<p><Link href="/login">Return to login</Link></p></div></main>
}
