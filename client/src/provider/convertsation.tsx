import React from "react";
import { ConverterProviderProps, ConverterState } from "../types";
import { ConversationContext } from "../context/conversationContext";

export const ConverterProvider: React.FC<ConverterProviderProps> = ({
  children,
}) => {
  const [converterState, setConverterState] = React.useState<ConverterState[]>(
    []
  );
  console.log("chat", converterState);
  return (
    <ConversationContext.Provider value={{ converterState, setConverterState }}>
      {children}
    </ConversationContext.Provider>
  );
};
