"use client";

// import fetchSuggestion from "@/lib/fetchSuggestion";
import { useBoardStore } from "@/store/BoardStore";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";

const Header = () => {
  const [setSearchString, board] = useBoardStore((state) => [
    state.setSearchString,
    state.board,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [suggestion, setSuggestion] = useState<string>("");

  const handleSearch = (e: any) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    // const fetchSuggestinFunc = async () => {
    //   const suggestion = await fetchSuggestion(board);
    //   setSuggestion(suggestion);
    //   setLoading(false);
    // };

    // fetchSuggestinFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rouded-b-2xl md:justify-between">
        <div
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl 
        opacity-50 -z-50"
        />
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5">
          {/* Search Box */}

          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 " />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              onChange={handleSearch}
            />
            <button hidden>Search</button>
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/* Avatar */}
          <Avatar name="Yaroslav Trofimov" round color="#0055D1" size="50" />
        </div>
      </div>
      {/* 
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm font-light p-5 pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarising your tasks for the day..."}
          GPT is summarising your tasks for the day...
        </p>
      </div> */}
    </header>
  );
};

export default Header;
