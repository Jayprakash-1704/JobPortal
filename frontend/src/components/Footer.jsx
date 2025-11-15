import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram ,Twitter} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-neutral-800 text-white border-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-4 lg:py-5">
        {/* Top Section */}
        <div className="md:flex md:justify-between md:items-start">
          {/* Brand */}
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <Link
              to="/"
              className="flex items-center space-x-2 text-3xl font-extrabold"
            >
             <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1762201840/hire-linker-high-resolution-logo_dwjrcz.png" alt="logo" className="object-contain h-14" />
            </Link>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            {/* Resources */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Resources</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="hover:underline hover:text-[var(--color-red)]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline hover:text-[var(--color-red)]">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="hover:underline hover:text-[var(--color-red)]">
                    Explore
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Follow Us</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://github.com/Jayprakash-1704-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[var(--color-red)]"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/channels/1334202410100588635/1334202410100588638"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[var(--color-red)]"
                  >
                    Twitter
                  </a>
                  </li>
                  <li>
                  <a
                    href="https://discord.com/channels/1334202410100588635/1334202410100588638"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[var(--color-red)]"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase">Legal</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="#" className="hover:underline hover:text-[var(--color-red)]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline hover:text-[var(--color-red)]">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-black sm:mx-auto lg:my-4" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <span className="text-xs sm:text-sm text-gray-600">
            © 2025{" "}
            <Link to="/" className="hover:underline font-medium">
              HireLinker
            </Link>
            . All Rights Reserved.
          </span>

          {/* Social Icons */}
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <a
              href="#"
              className="p-2 rounded-full transition   hover:bg-[var(--color-red)]"
            >
              <Facebook size={18} />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="p-2 rounded-full transition   hover:bg-[var(--color-red)]"
            >
              <Instagram size={18} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://github.com/Jayprakash-1704-"
              target="_blank"
              rel="noopener noreferrer"
             className="p-2 rounded-full transition   hover:bg-[var(--color-red)]"
            >
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
