import React from "react";
import { ConverterContextProps } from "../types";

export const ConversationContext = React.createContext<ConverterContextProps>({
  converterState: [],
  setConverterState: () => {},
});
