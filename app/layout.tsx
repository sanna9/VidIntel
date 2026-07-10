import Providers from "./providers";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren)  {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}