import { ArrowRight } from "lucide-react";
import imagePrincipal from "../assets/imagePrincipal.avif";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../http/create-room";
import { toast } from "sonner";

export function CreateRoom() {
  const navigate = useNavigate();

  async function handleCreateRoom(data: FormData) {
    const theme = data.get("theme")?.toString();

    if (!theme) {
      return;
    }

    try {
      const { roomId } = await createRoom({ theme });
      navigate(`room/${roomId}`);
    } catch (err) {
      toast.error("Erro ao criar sala.");
      console.error("Error creating room:", err);
    }
  }

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <div className="flex flex-col gap-6 items-center justify-center ">
        <div className="max-w-[450px] mb-8">
          <img
            src={imagePrincipal}
            alt="Pergunta"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            className="rounded-"
          />
        </div>
        <p className="leading-relaxed text-zinc-300 text-center">
          Crie uma sala publica e comece a responder seus amigos da interweb.
        </p>

        <form
          action={handleCreateRoom}
          className="flex w-full items-center gap-2 p-2 rounded-xl border bg-zinc-900 border-zinc-800  ring-orange-400 ring-offset-4 focus-within:border-orange-400"
        >
          <input
            type="text"
            name="theme"
            autoComplete="off"
            placeholder="Nome da sala"
            className="flex-1  text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
            required
          />

          <button
            type="submit"
            className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors"
          >
            Criar Sala <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  );
}
