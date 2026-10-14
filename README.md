# RX Price Analyzer

A Next.js Pharmacy Price Checker, backed by Supabase. Includes user registration, email/password sign-in, protected dashboard, supplier management, price entries, invoice lines and estimated savings.

## Setup

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env.local`, then set the Supabase publishable key from Supabase Dashboard → Project Settings → API Keys.
3. Run `npm run dev`.
4. Deploy to Vercel, setting both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel project environment variables.
5. In Supabase Auth → URL Configuration, add your production site URL as Site URL and `https://YOUR-DOMAIN/auth/callback` to Redirect URLs. Enable email/password auth in Supabase Auth → Providers.

Supabase project: `uoofexmnariegrlulobs`. The database already includes three RLS-enabled per-user tables: `ppc_suppliers`, `ppc_price_entries`, `ppc_invoice_lines`.

**Safety:** This is a purchasing decision-support prototype, not a prescription, clinical decision tool or validated reimbursement database. Potential savings require human verification of NDC, product equivalence, contract prices and returnability.

Bulk CSV and PDF import are not implemented. No patient information should be entered.
