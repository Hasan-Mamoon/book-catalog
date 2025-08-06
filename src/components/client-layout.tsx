"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarFooterOn = ["/auth/signin", "/auth/register"];
  const shouldHideNavbarFooter = hideNavbarFooterOn.includes(pathname);

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}
