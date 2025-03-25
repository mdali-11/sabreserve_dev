// import { VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import "./Loading.css"

function Loading({isLoading}) {
  useEffect(() => {
   console.log("isloading insde laoding comp" , isLoading)
  } , [])
  return (
    <div  className={`loader ${isLoading ? 'show' : ''}`}>
      <ReactLoading type={"bubbles"} color={"blue"} height={200} width={200} />
    </div>
  );
}

export default Loading;