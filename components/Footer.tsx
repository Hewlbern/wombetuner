import Link from "next/link"
// Header Component
export const Footer = () => {
    return (

        <footer className="flex flex-col items-center mt-auto mb-10">
        <Link href="/" className="text-lg text-green-400">
          About the project 
        </Link>
      </footer>


    );
};