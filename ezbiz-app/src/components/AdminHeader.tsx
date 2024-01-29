"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@headlessui/react";
import { MenuIcon, XIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import logo from "@/../public/logo.jpg";
import Image from "next/image";
import LoadingDots from "./LoadingDots";

const AdminHeader = () => {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log(session?.user);

  if (status === "loading") return <LoadingDots />;

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              className="h-14 w-auto"
              src={logo}
              alt="Ezbiz Logo"
              width={40}
              height={40}
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {status === "authenticated" && (
            <Link
              href="/admin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Admin
            </Link>
          )}
        </div>
        {/* <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div> */}
        <div className="hidden lg:items-center lg:flex lg:flex-1 lg:justify-end">
          {session?.user.firstName ? (
            <div className="flex items-center space-x-2">
              <span>
                Welcome, <strong>{session.user.firstName}</strong>
              </span>
              <Button type="button" onClick={() => signOut()}>
                Log out
              </Button>
            </div>
          ) : (
            <a
              href="/auth/signin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {status === "authenticated" && (
                  <Link
                    href="/admin"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Admin
                  </Link>
                )}
              </div>
              <div className="py-6">
                {session ? (
                  <div className="-mx-3 space-y-2 flex flex-col justify-center items-start">
                    <span>
                      Welcome, <strong>{session.user.firstName}</strong>
                    </span>
                    <Button type="button" onClick={() => signOut()}>
                      Log out
                    </Button>
                  </div>
                ) : (
                  <a
                    href="/auth/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default AdminHeader;
