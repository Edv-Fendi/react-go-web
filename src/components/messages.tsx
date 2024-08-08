import { useParams } from "react-router-dom";
import { Message } from "./message";
import { GetRoomMessages } from "../http/get-room-message";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebSockets } from "../hooks/use-messages-websockets";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Sem id da sala");
  }

  const { data } = useSuspenseQuery({
    queryFn: () => GetRoomMessages({ roomId }),
    queryKey: ["messages", roomId],
  });

  useMessagesWebSockets({ roomId });

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions;
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((message) => (
        <Message
          id={message.id}
          key={message.id}
          text={message.text}
          amountOfReactions={message.amountOfReactions}
          answered={message.answered}
        />
      ))}
    </ol>
  );
}
