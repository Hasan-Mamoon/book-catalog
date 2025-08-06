import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import ClientLayout from "../components/client-layout";

export const metadata = {
  title: "Books Catalogue",
  description: "A really simple books catalogue",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
