"use client";
import React, { useEffect, useState } from "react";
import Editmodel from "@/app/Components/EditModel";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page({ params }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editModel, setEditModel] = useState(false);
  const [update, setUpdate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
          .then((response) => response.json())
          .then((json) => setData(json))
          .then((json) => console.log("updated"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [update]);
  const session = useSession({
    required: false,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/restraunts");
    },
  });
  const handleSubmit = (title, desc, id, userID) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        title: { title },
        body: { desc },
        userId: { userID },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => json);
    setUpdate(Date.now);
    setEditModel(false);
  };
  const handleDelete = (e) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${e}`, {
      method: "DELETE",
    });
    router.push(`/restraunts`);
  };
  const close = () => {
    setEditModel(false);
  };

  if (isLoading) {
    return (
      <div className=" p-10">
        <h1 className=" text-base font-bold text-center ">Loading...</h1>
      </div>
    );
  }

  if (session?.data) {
    if (session.data.user.role != "admin") {
      return <h1> Access Denied</h1>;
    }
  }
  return (
    <>
      {editModel && (
        <Editmodel
          data={data}
          handleSubmit={handleSubmit}
          close={close}
        ></Editmodel>
      )}
      <div className=" bg-blue-300 text-sm font-normal gap-4 flex flex-row justify-end items-center p-4">
        <button
          className=" bg-white rounded-lg py-3 px-5"
          onClick={() => setEditModel(true)}
        >
          Edit
        </button>
        <button
          onClick={(e) => handleDelete(data?.id)}
          className=" bg-red-600 text-white rounded-lg py-3 px-5"
        >
          Delete
        </button>
      </div>

      <div className="p-10">
        <Image
          src="/image-hotel.jpg"
          width={3000}
          height={3000}
          className="w-full h-auto"
        ></Image>
        <h1 className=" text-[40px] font-bold">{data?.title}</h1>
        <p>{data?.body}</p>
      </div>
    </>
  );
}
