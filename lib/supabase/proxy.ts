import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

type CookieUpdate = { name: string; value: string; options?: CookieOptions };

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase environment variables');

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(values: CookieUpdate[]) {
        values.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        values.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  const authenticated = !error && Boolean(data?.claims?.sub);
  const path = request.nextUrl.pathname;

  if (path.startsWith('/dashboard') && !authenticated) {
    const dest = request.nextUrl.clone();
    dest.pathname = '/login';
    dest.searchParams.set('next', path);
    return NextResponse.redirect(dest);
  }
  if ((path === '/login' || path === '/signup') && authenticated) {
    const dest = request.nextUrl.clone();
    dest.pathname = '/dashboard';
    dest.search = '';
    return NextResponse.redirect(dest);
  }
  return response;
}
