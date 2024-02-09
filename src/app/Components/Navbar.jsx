import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({ user, session }) => {
  const buttons = session ? (
    <Link href="/api/auth/signout?callbackUrl=/">
      <button className=" bg-blue-500 rounded-lg p-2">SignOut</button>
    </Link>
  ) : (
    <Link href="/api/auth/signin">
      <button className=" bg-blue-500 rounded-lg p-2">SignIn</button>
    </Link>
  );
  return (
    <nav className=" w-full h-24 flex justify-center items-center">
      <div className=" w-[90%] m-auto max-w-7xl flex flex-row justify-between items-center">
        <Image
          alt="logo"
          src="/logo.svg"
          width={3000}
          height={3000}
          className=" max-w-20 h-auto w-auto"
        ></Image>
        <div className=" flex flex-row gap-3 justify-start items-center  text-lg font-medium">
          <p className=" text-lg font-medium">{user?.name}</p>

          {buttons}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
