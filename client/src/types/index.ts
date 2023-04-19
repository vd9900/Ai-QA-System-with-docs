import React from "react";

export interface ConverterState {
  user: String;
  text: String;
  time?: Date | "";
}

export interface ConverterContextProps {
  converterState: ConverterState[];
  setConverterState: React.Dispatch<React.SetStateAction<ConverterState[]>>;
}

export interface ConverterProviderProps {
  children: React.ReactNode;
}

export interface ClientBoxprops {
  user?: String;
  text: String;
}

export interface ResponseData {
  text: string | null;
}

export interface Error {
  isError: boolean;
  error: Error | null;
}

export interface Fetch {
  loading: boolean;
  data: String | null;
  error: Error;
}
export interface UseFetchResult {
  loading: boolean;
  data: {
    text?: string;
  };
  error: Error | null;
  getData: (url: string) => void;
}
