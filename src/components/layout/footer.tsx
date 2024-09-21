import Link from 'next/link';

import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 text-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <Link href="#">
              <Icon icon="streamline-emojis:rocket" width={40} height={40} />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <p className="mt-2 text-sm">
              © {new Date().getFullYear()} YourCompany. All rights reserved.
            </p>
          </div>
          <nav className="mb-6 w-full md:mb-0 md:w-1/3">
            <ul className="flex flex-wrap justify-center space-x-6 md:justify-end">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Orders
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex w-full justify-center space-x-4 md:w-1/3 md:justify-end">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Icon icon="mdi:facebook" width={24} height={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Icon icon="mdi:twitter" width={24} height={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Icon icon="mdi:instagram" width={24} height={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Icon icon="mdi:linkedin" width={24} height={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
