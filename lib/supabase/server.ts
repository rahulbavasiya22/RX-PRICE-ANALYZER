import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type CookieUpdate = { name: string; value: string; options?: CookieOptions };

export async function createClient() {
  const store = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Configure Supabase public environment variables');

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(values: CookieUpdate[]) {
        try {
          values.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Cookies cannot be changed from a Server Component.
          // The proxy refreshes the session on the request path.
        }
      },
    },
  });
}
