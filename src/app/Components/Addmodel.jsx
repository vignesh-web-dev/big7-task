import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const Addmodel = ({ handleSubmit, close }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className=" fixed w-screen h-screen top-0 left-0 bg-[#00000077] flex justify-center items-center">
      <div className=" bg-white w-full max-w-80 flex flex-col gap-5 p-5 rounded-lg">
        <Input
          className="bg-[#0000000c] border border-black outline-none"
          value={title}
          onChange={(e) => {
            debugger;
            setTitle(e.target.value);
          }}
        ></Input>
        <Textarea
          className="bg-[#0000000c] border border-black outline-none"
          value={desc}
          name="text"
          onChange={(e) => setDesc(e.target.value)}
          id=""
          cols="30"
          rows="10"
        ></Textarea>
        {title != "" && desc != "" ? (
          <>
            <button
              className=" bg-blue-500 rounded-lg p-2"
              onClick={() => handleSubmit(title, desc)}
            >
              Submit
            </button>
            <button
              className=" bg-red-500 text-white rounded-lg p-2"
              onClick={() => close()}
            >
              Discard
            </button>
          </>
        ) : (
          <>
            <button
              className=" bg-blue-500 rounded-lg opacity-50 p-2"
              onClick={() => handleSubmit(title, desc)}
            >
              Submit
            </button>
            <button
              className=" bg-red-500 text-white rounded-lg p-2"
              onClick={() => close()}
            >
              Discard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Addmodel;
