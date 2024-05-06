import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectKitCustomConnectButton, FaucetButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => (
  <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary sm:px-2 py-2">
    <div className="navbar-start w-auto lg:w-1/2">
      <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
        <div className="flex relative w-14 h-14">
          <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.png" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold leading-tight">GHOFund</span>
          <span className="text-xs">
            Forkable Treasury
            <br />
            Management Platform
          </span>
        </div>
      </Link>
    </div>
    <Link href="/" passHref className="flex lg:hidden items-center gap-2 ml-4 mr-6 shrink-0">
      <div className="flex relative w-14 h-14">
        <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.png" />
      </div>
    </Link>
    <div className="navbar-end flex-grow mr-4">
      <ConnectKitCustomConnectButton />
      <FaucetButton />
    </div>
  </div>
);
