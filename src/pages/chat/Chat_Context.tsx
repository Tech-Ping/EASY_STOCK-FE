import React, { createContext, useState, ReactNode, useContext } from "react";

interface Chat {
  isLoading: any;
  id: number;
  content: string;
  isUser: boolean;
}

interface ChatContextType {
  chat: Chat[];
  setChat: React.Dispatch<React.SetStateAction<Chat[]>>;
  addMessage: (message: Chat) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chat, setChat] = useState<Chat[]>([
    { id: 1, content: "안녕하세요! 무엇을 도와드릴까요?", isUser: false, isLoading: false },
  ]);

  const addMessage = (message: Chat) => {
    setChat((prevChat) => [...prevChat, message]);
  };

  return (
    <ChatContext.Provider value={{ chat, setChat, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
