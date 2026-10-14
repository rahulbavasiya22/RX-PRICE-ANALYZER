import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export async function GET(request:Request){
 const url=new URL(request.url),code=url.searchParams.get('code'),next=url.searchParams.get('next');
 const safe=next?.startsWith('/')&&!next.startsWith('//')?next:'/dashboard';
 if(code){const client=await createClient(),{error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(safe,url.origin))}
 return NextResponse.redirect(new URL('/login?error=confirmation_failed',url.origin));
}
