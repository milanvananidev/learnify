import { Toaster } from 'react-hot-toast';
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./globals.css";
import Head from 'next/head';
import { Providers } from '../redux/provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Learnify</title>
      </Head>
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
