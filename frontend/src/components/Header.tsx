"use client";

import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            Placeholder Logo
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Dashboard
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Income
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Expenses
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Accounts
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Budget
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* TODO: create a separate component for the user menu that uses Popover */}
          <a
            href="#"
            className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900"
          >
            Marc
            <ChevronDownIcon className="size-5 flex-none text-gray-400" />
          </a>
        </div>
      </nav>
    </header>
  );
}
