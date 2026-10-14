import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'RX Price Analyzer | Pharmacy Price Checker',description:'Compare pharmacy suppliers and estimate invoice savings'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
