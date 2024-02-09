"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import "./restraunt.css";
import Addmodel from "../Components/Addmodel";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const [data, setData] = useState();
  const [pagination, setPagination] = useState(1);
  const itemsPerPage = 10;

  const [isLoading, setIsLoading] = useState(true);

  const [addModel, setAddModel] = useState(false);

  const [added, setAdded] = useState();

  const session = useSession({
    required: false,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/restraunts");
    },
  });

  useEffect(() => {
    const dummy = data;
    const fetchData = async () => {
      try {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
          .then((response) => response.json())
          .then((json) => {
            setData(json);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [added]);

  const paginate = (pageNumber) => {
    setPagination(pageNumber);
  };
  const handleSubmit = () => {
    const id = Date.now();
    const dup = {
      title: "Lorem Ipsum",
      body: "bar",
      userId: 1,
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    //   .then((json) => setAdded(json));
    setData([...data, dup]);
    setAddModel(false);
  };
  const close = () => {
    setAddModel(false);
  };

  const indexOfLastRestaurant = pagination * itemsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - itemsPerPage;
  const currentRestaurants = data?.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );
  if (isLoading) {
    return (
      <div className=" p-10">
        <h1 className=" text-base font-bold text-center ">Loading...</h1>
      </div>
    );
  }
  return (
    <>
      {addModel && (
        <Addmodel handleSubmit={handleSubmit} close={close}></Addmodel>
      )}
      <div className=" pb-20">
        {session.data?.user.role == "admin" && (
          <div className=" bg-blue-300 text-sm font-normal gap-4 flex flex-row justify-end items-center p-4">
            <button
              className=" bg-white rounded-lg py-3 px-5"
              onClick={() => setAddModel(true)}
            >
              Add
            </button>
          </div>
        )}
        <h1>{session?.user?.name}</h1>
        <div className=" text-base grid grid-cols-2">
          {currentRestaurants &&
            currentRestaurants.map((item, index) => (
              <>
                {session?.data ? (
                  <Link
                    key={index}
                    href={{
                      pathname: `/product/${item?.id}`,
                      query: { id: item.id },
                    }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.body}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ) : (
                  <div key={index}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.body}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                )}
              </>
            ))}
        </div>
        <div>
          {data?.length > itemsPerPage && (
            <Pagination>
              <PaginationContent>
                {Array.from({
                  length: Math.ceil(data.length / itemsPerPage),
                }).map((_, index) => (
                  <PaginationItem
                    onClick={() => paginate(index + 1)}
                    key={index}
                    className={`page-item cursor-pointer ${
                      pagination === index + 1 ? "active" : ""
                    }`}
                  >
                    <button className="page-link">{index + 1}</button>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
