"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image"
import Logo from '../assets/logo.png';

const Navbar = () => {

  const path = usePathname();

  const navigation = [
    {
      title: 'Home',
      nav: '/'
    },
    {
      title: 'Courses',
      nav: '/courses',
    },
    {
      title: 'About Us',
      nav: '/about'
    },
    {
      title: 'Contact Us',
      nav: '/contact'
    }
  ]

  const hideNavPaths = ['/register', '/login', '/verification'];

  if (hideNavPaths.includes(path)) { return null }

  return (
    <div className="w-full border-b-2 border-zinc-100 shadow-sm">
      <nav className="container relative flex flex-wrap items-center justify-between p-5 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src={Logo}
                        alt="Learnify Logo"
                        width={180}
                      />
                    </span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-primary focus:text-primary">
                  <svg
                    className="w-8 h-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link key={index} href={item.nav} className={`w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-primary ${path === item.nav ? ' text-primary font-semibold' : ''}`}>
                        {item.title}
                      </Link>
                    ))}
                    <Link href="/login" className="w-full px-6 py-2 mt-3 flex text-lg justify-center align-middle gap-2 text-center text-white bg-primary rounded-md lg:ml-5">
                      Login <IoIosArrowForward color="#fff" size={27} />
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3" key={index}>
                <Link href={menu.nav} className={`inline-block px-4 py-2 text-lg font-normal no-underline rounded-md dark:text-gray-200 hover:text-primary ${path === menu.nav ? ' text-primary font-semibold' : ''} `}>
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link href="/login" className="px-6 py-2 text-white bg-primary text-lg rounded-md flex justify-center align-middle gap-3 md:ml-5">
            Login <IoIosArrowForward color="#fff" size={25} />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
