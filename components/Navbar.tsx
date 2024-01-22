"use client";
import React, { useState } from "react";
import logo from "../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { TiArrowLeftThick } from "react-icons/ti";
import { RiStockFill, RiStockLine } from "react-icons/ri";
import {
  IoNewspaper,
  IoNewspaperOutline,
  IoPersonOutline,
  IoPersonSharp,
} from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface SideNavItemsType {
  icon: {
    icon?: React.ReactNode;
    filledIcon: React.ReactNode;
  };
  label: string;
  href: string;
}

const sidebarItems: SideNavItemsType[] = [
  {
    href: "/",
    label: "Home",
    icon: {
      icon: <IoHomeOutline />,
      filledIcon: <IoHomeSharp />,
    },
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: {
      icon: <RiStockLine />,
      filledIcon: <RiStockFill />,
    },
  },
  {
    href: "/search",
    label: "Add more",
    icon:{
      icon: <IoIosSearch />,
      filledIcon: <FaSearch />
    }
  },
  {
    href: "/news",
    label: "News",
    icon: {
      icon: <IoNewspaperOutline />,
      filledIcon: <IoNewspaper />,
    },
  },
  {
    href: "/about",
    label: "About Me",
    icon: {
      icon: <IoPersonOutline />,
      filledIcon: <IoPersonSharp />,
    },
  },
];

const Navbar = () => {
  const [isSideopen, setisSideopen] = useState(true);
  return (
    <div
      className={cn(
        "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-8 pr-3 pt-2 flex flex-col gap-3 border-r-[1px] pl-[50px]",
        isSideopen && "md:w-[300px]"
      )}
    >
      <HoverContainer>
        <Link href={"/"}>
          <Image src={logo} width={50} alt="Mylofo"></Image>
        </Link>
      </HoverContainer>
      {sidebarItems.map((d, i) => (
        <HoverContainer key={i}>
          <SideNavItems
            icon={d.icon}
            href={d.href}
            label={d.label}
            isSideopen={isSideopen}
          />
        </HoverContainer>
      ))}
      <section className={cn("flex w-full justify-end", 
      !isSideopen && "justify-start")}>
        <HoverContainer>
          <TiArrowLeftThick
            onClick={() => setisSideopen(!isSideopen)}
            className={cn(
              "transition-all text-4xl",
              !isSideopen && "rotate-180"
            )}
          />
        </HoverContainer>
      </section>
    </div>
  );
};

function SideNavItems({
  href,
  isSideopen,
  icon,
  label,
}: SideNavItemsType & { isSideopen: boolean }) {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActivePage = pathname == href;
  return (
    <Link
      ref={animationParent}
      href={href}
      className="flex gap-2 items-center cursor-pointer"
    >
      <div className="w-[35px] h-[35px] text-3xl">
        {isActivePage ? icon?.filledIcon : icon?.icon}
      </div>
      {isSideopen && (
        <p
          className={cn(
            "text-xl pt-[4px] pr-4 hidden md:block transition-all",
            isActivePage && "font-bold"
          )}
        >
          {label}
        </p>
      )}
    </Link>
  );
}

function HoverContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className="p-3 transition-all text-fourth rounded-full cursor-pointer hover:bg-first
      w-fit dark:hover:bg-white"
    >
      {children}
    </div>
  );
}
export default Navbar;
