'use client';
import { FormEvent,useState,Suspense } from 'react';
import Link from 'next/link';
import { useRouter,useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
function LoginForm(){
 const router=useRouter(),search=useSearchParams(),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError('');const {error}=await createClient().auth.signInWithPassword({email,password});setBusy(false);if(error){setError(error.message);return}const next=search.get('next');router.replace(next?.startsWith('/')&&!next.startsWith('//')?next:'/dashboard');router.refresh()}
 return <main className="auth"><div className="authcard"><div className="logo">✚ <strong>RX Price Analyzer</strong></div><h1>Welcome back</h1><p>Sign in to your private pharmacy pricing workspace.</p><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/></label><button className="primary full" disabled={busy}>{busy?'Signing in…':'Sign in'}</button></form>{error&&<p className="error" role="alert">{error}</p>}<p><Link href="/forgot-password">Forgot your password?</Link></p><p>New to RX Price Analyzer? <Link href="/signup">Create an account</Link></p></div></main>
}
export default function LoginPage(){return <Suspense fallback={<main className="auth">Loading…</main>}><LoginForm/></Suspense>}
