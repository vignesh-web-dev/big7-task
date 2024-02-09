import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function Home() {
  // const [session, setSession] = useState();
  const session = await getServerSession(options);

  return (
    <div className=" flex gap-10 flex-col justify-center items-center">
      {session ? (
        <>
          <h1 className=" text-[9vw]">Welcome</h1>
          <h1 className=" text-[4vw]">{session?.user.name}</h1>
          <h1 className=" text-[4vw]">{session?.user.role}</h1>
        </>
      ) : (
        <h1 className=" text-[9vw]">Welcome</h1>
      )}

      <Link href="/restraunts" className=" bg-blue-500 rounded-lg p-2">
        Click to see the restaurants
      </Link>
    </div>
  );
  // <>{session ? <></> : <div className=" pt-24"></div>}</>;
}
