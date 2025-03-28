"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            CVInsight
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCardIcon className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
};
