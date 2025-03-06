'use client';

import { croissant_one } from "@/styles/fonts";
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaCookieBite } from "react-icons/fa";
import { HiBars3, HiOutlineXMark } from 'react-icons/hi2';
import Container from './container';

const siteDetails = {
  siteName: 'Savorit',
  siteUrl: 'https://savorit.com.br',
  metadata: {
    title: 'Savorit | Salve e organize receitas do Instagram com facilidade',
    description: 'A plataforma ideal para salvar e organizar suas receitas do Instagram com facilidade e eficiência.',
  },
  language: 'en-us',
  locale: 'en-US',
  siteLogo: `${process.env.BASE_PATH || ''}/images/logo.png`, // or use a string for the logo e.g. "TechStartup"
  googleAnalyticsId: '', // e.g. G-XXXXXXX,
}

const menuItems: { text: string; url: string }[] = [
  // {
  //   text: "Features",
  //   url: "#features"
  // },
  // {
  //   text: "Pricing",
  //   url: "#pricing"
  // },
  // {
  //   text: "Testimonials",
  //   url: "#testimonials"
  // }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
      <Container className="!px-0">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <FaCookieBite className="text-foreground min-w-fit w-7 h-7" />
            <span className={`manrope text-2xl font-semibold text-foreground cursor-pointer ${croissant_one.className}`}>
              {siteDetails.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map(item => (
              <li key={item.text}>
                <Link href={item.url} className="text-foreground hover:text-foreground-accent transition-colors">
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sign-in" className="text-black bg-emerald hover:bg-emerald-accent px-8 py-3 rounded-full transition-colors">
                Sign In
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-emerald text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map(item => (
              <li key={item.text}>
                <Link href={item.url} className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sign-in" className="text-black bg-emerald hover:bg-emerald-accent px-5 py-2 rounded-full block w-fit" onClick={toggleMenu}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};
