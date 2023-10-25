import React, { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [selectedImage, setSelectedImage] = useState<null | string>(null);

  return (
    <>
    <Header setSelectedImage={(src: string) => setSelectedImage(src)} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;