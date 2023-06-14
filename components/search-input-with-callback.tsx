"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import Input from "./input";

type SearchInputWithCallbackProps = {
  onChange: (value: string) => void
  placeholder?: string
}

const SearchInputWithCallback: React.FC<SearchInputWithCallbackProps> = ({ onChange, placeholder }) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    onChange(debouncedValue);

  }, [debouncedValue]);

  return (
    <Input
      placeholder={placeholder || 'Search..'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SearchInputWithCallback
