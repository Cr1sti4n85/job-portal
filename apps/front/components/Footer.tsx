import Link from "next/link";
import { FaFacebookSquare, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full border-t border-t-gray-200 text-white py-2">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold">BuscaPega</h1>
            <p className="text-sm text-gray-500">
              © 2024 Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-4 md:mt-0">
            <Link href="#">
              <FaFacebookSquare
                className="text-black-600 hover:text-black-800"
                size={24}
              />
            </Link>
            <Link href="#">
              <FaLinkedinIn
                className="text-black-600 hover:text-black-800"
                size={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
