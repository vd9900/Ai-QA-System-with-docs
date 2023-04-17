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
