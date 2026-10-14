'use client';
import { FormEvent,useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
export default function SignupPage(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);const {error}=await createClient().auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+'/auth/callback?next=/dashboard'}});setBusy(false);setMessage(error?error.message:'Check your email to confirm your account, then sign in.')}
 return <main className="auth"><div className="authcard"><div className="logo">✚ <strong>RX Price Analyzer</strong></div><h1>Create account</h1><p>Start comparing wholesale pharmacy prices securely.</p><form onSubmit={submit}><label>Email address<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password (minimum 8 characters)<input type="password" minLength={8} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="primary full" disabled={busy}>{busy?'Creating…':'Create account'}</button></form>{message&&<p role="status">{message}</p>}<p>Already have an account? <Link href="/login">Sign in</Link></p></div></main>
}
