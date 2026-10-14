import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Workspace from '@/components/workspace';
export default async function DashboardPage(){
 const supabase=await createClient();
 const {data,error}=await supabase.auth.getClaims();
 if(error||!data?.claims?.sub)redirect('/login');
 return <Workspace email={String(data.claims.email??'Account')}/>;
}
