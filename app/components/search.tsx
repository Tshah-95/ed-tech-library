"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Search({
  disabled,
  value,
  setValue,
  placeholder,
}: {
  disabled?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
}) {
  const [search, setSearch] = useState("");

  const searchValue = value ?? search;
  const setSearchValue = setValue ?? setSearch;

  return (
    <div className="relative mt-5 max-w-md w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <MagnifyingGlassIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm text-brand-black"
          placeholder={placeholder ?? "Search by title or description..."}
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
    </div>
  );
}
