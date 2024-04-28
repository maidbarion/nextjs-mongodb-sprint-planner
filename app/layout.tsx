import "./globals.css";
import { Rubik } from "next/font/google";
import { Navbar } from "./components/Navbar";
import { ReactNode } from "react";

interface Metadata {
  title: string;
  description: string;
}

interface Props {
  children?: ReactNode;
}

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Sprint App",
  description: "An app to monitor sprint progression in agile projects",
};

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
