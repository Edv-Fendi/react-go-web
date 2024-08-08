import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { CreateMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { RemoveMessageReaction } from "../http/remove-message.reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  id: messageId,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Sem id da sala");
  }
  const [hasReacted, setHasReacted] = useState(false);

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await CreateMessageReaction({ messageId, roomId });
    } catch {
      toast.error("Erro ao curtir mensagem.");
    }
    setHasReacted(true);
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await RemoveMessageReaction({ messageId, roomId });
    } catch {
      toast.error("Erro ao retirar curtida de mensagem.");
    }
    setHasReacted(true);
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}

      {hasReacted ? (
        <button
          type="button"
          onClick={removeMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-orange-400 font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir({amountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={createMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-zinc-400 font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir({amountOfReactions})
        </button>
      )}
    </li>
  );
}
