// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "Music Tracks",
  description: "An app for managing music tracks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <main>{children}</main>
      </body>
    </html> 
  );
}
