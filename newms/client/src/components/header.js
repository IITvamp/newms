import React, { useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import logo from "../images/newlogo.png";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
const navigation = [
  { name: "About", href: "#about" },
  { name: "How it works", href: "#howItWorks" },
  { name: "Contact", href: "#contact" },
  { name: "Institutions", href: "/institutions" },
];

const Navbar = ({ setIsVisible }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={"bg-black text-white z-10 pt-8 pb-2 sm:pt-4 relative px-12"}>      
      {!mobileMenuOpen && (
        <nav
          className="flex h-9 items-center justify-between"
          aria-label="Global"
        >
          <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Zoth.io</span>
              <img className="h-8" src={logo} alt="" />
            </a>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <FiAlignJustify
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden md:flex md:justify-center md:items-center md:gap-x-12 md:px-8 md:ml-24">
            {/* {navigation.map((item) => ( */}
            <a
              href="#about"
              className="font-semibold hover:text-gray-100"
            >
              About
            </a>
            <a
              href="#howItWorks"
              className="font-semibold hover:text-gray-100"
            >
              How it Works
            </a>

            <Link
              to="/institutions"
              className="font-semibold hover:text-gray-100"
            >
              Institutions{" "}
              {/* <span className="inline-flex text-sm px-2"> (Coming Soon) </span> */}
            </Link>

            <a href="#contact" className="font-semibold hover:text-gray-100">
              Contact
            </a>

            {/* Solution dropdown */}
            {/* <div className="relative inline-block text-left">
              <div>
                <button className="peer inline-flex w-full justify-center font-semibold hover:text-gray-100">
                  Solutions <span className="inline-flex text-sm px-2"> (Coming Soon) </span>
                </button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  show={true}
                >
                  <div className="hidden peer-hover:flex absolute right-0 z-10 w-56 mx-auto origin-top-right pt-2 bg-black text-white shadow-lg hover:flex flex-col">
                    <div className="mt-2 rounded-md bg-black text-white ring-1 ring-gray-100 focus:outline-none hover:flex flex-col">
                      <div>
                        <a
                          href="#"
                          className="block rounded-lg py-2 px-3 text-base font-semibold leading-7"
                        >
                          For Institutions{" "}
                        </a>
                      </div>
                      <div>
                        <a
                          href="#"
                          className="block rounded-lg py-2 px-3 text-base font-semibold leading-7"
                        >
                          Zoth Token{" "}
                        </a>
                      </div>
                      <div>
                        <a
                          href="#"
                          className="block rounded-lg py-2 px-3 text-base font-semibold leading-7"
                        >
                          Zoth DeFi{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div> */}
          </div>
          <div className="hidden md:flex md:min-w-0 md:flex-1 md:justify-end md:gap-x-6 px-20">
            <Link to="/login"
              className="inline-block rounded-full px-6 py-2 text-base font-semibold text-white hover:text-black hover:bg-white shadow-sm ring-1 ring-white hover:ring-white"
              // onClick={() => setIsVisible(true)}
            >
              Join waitlist{" "}
            </Link>
          </div>
        </nav>
      )}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel
          focus="true"
          className="fixed inset-0 z-10 overflow-y-auto bg-black text-white px-6 py-6 md:hidden"
        >
          <div className="flex h-9 items-center justify-between">
            <div className="flex">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Zoth</span>
                <img className="h-8" src={logo} alt="" />
              </a>
            </div>
            <div className="flex">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Close menu</span>
                <FiAlignJustify className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white-500/10">
              <div className="space-y-2 py-6 text-center">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(!mobileMenuOpen);
                    }}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 hover:bg-white hover:text-black"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 space-y-2 text-center">
                <Link to="/login"
                  className="inline-block rounded-full px-3 py-2 text-base font-semibold text-white hover:text-black hover:bg-white shadow-sm ring-1 ring-white hover:ring-white"
                  // onClick={() => setIsVisible(true)}
                >
                  Get Exclusive Invite{" "}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Navbar;
