import Header from "@/src/components/Menu";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css"
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
      <ToastContainer />
        <Header />
        {children}
      </body>

    </html>
  );
}
