import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm  dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-gray-400">Books Catalog</span>
        <span className="text-gray-400">Made with love ❤️</span>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <Link href="https://github.com/Hasan-Mamoon" className="hover:underline">
            Hassan Mamoon
          </Link>

        </span>
        
      </div>
    </footer>
  );
};
export default Footer;
