import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { CreateMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Sem id da sala");
  }

  async function createMessageAction(data: FormData) {
    const message = data.get("message")?.toString();

    if (!message || !roomId) {
      return;
    }

    try {
      await CreateMessage({ message, roomId });
    } catch {
      toast.error("Erro ao enviar pergunta! Tente novamente.");
    }
  }
  return (
    <form
      action={createMessageAction}
      className="flex w-full items-center gap-2 p-2 rounded-xl border bg-zinc-900 border-zinc-800  ring-orange-400 ring-offset-4 focus-within:border-orange-400"
    >
      <input
        type="text"
        name="message"
        autoComplete="off"
        placeholder="Qual a sua pergunta?"
        className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
        required
      />

      <button
        type="submit"
        className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors"
      >
        Criar Pergunta <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
