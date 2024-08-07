import { useNavigate, useParams } from "react-router-dom";
import imagePrincipal from "../assets/imagePrincipal.avif";
import { ArrowRight, ArrowUp, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Message } from "../components/message";

export function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  function handleShareRoom() {
    const url = window.location.href.toString();

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
      toast.info("Você copiou a URL da sala.");
    }
  }

  function handleCreateRoom(data: FormData) {
    const theme = data.get("theme")?.toString();

    navigate(`room/${theme}`);
  }
  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center justify-center gap-3 px-3">
        <div className="w-20 h-20  rounded-full">
          <img
            src={imagePrincipal}
            alt="Imagem principal"
            className="object-cover rounded-full w-full h-full"
          />
        </div>
        <span className="text-sm text-zinc-500 truncate">
          Código da Sala: <span className="text-zinc-300">{roomId}</span>
        </span>
        <button
          type="submit"
          className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors"
          onClick={handleShareRoom}
        >
          Compartilhar <Share2 className="size-4" />
        </button>
      </div>
      <div className="h-px w-full bg-zinc-900" />
      <form
        action={handleCreateRoom}
        className="flex w-full items-center gap-2 p-2 rounded-xl border bg-zinc-900 border-zinc-800  ring-orange-400 ring-offset-4 focus-within:border-orange-400"
      >
        <input
          type="text"
          name="theme"
          autoComplete="off"
          placeholder="Qual a sua pergunta?"
          className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
        />

        <button
          type="submit"
          className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors"
        >
          Criar Pergunta <ArrowRight className="size-4" />
        </button>
      </form>

      <ol className="list-decimal list-outside px-3 space-y-8">
        <Message text="Isso é um teste" amountOfReactions={100} answered/>
        <Message text="Isso é outro teste" amountOfReactions={20} />
        <Message text="Isso é outro outro teste" amountOfReactions={10} />
        <Message text="Isso é outro outro  teste" amountOfReactions={8} />

        <li className="ml-4">
          opuasdysagduisahdisaoasujdhsokdhsaidiuqsdqsdsadjasjdkashuhweufhsaujghsdku
          ghUIHOAERUJGHEOUGBa
          <button
            type="button"
            className="mt-3 flex items-center gap-2 text-zinc-400 font-medium hover:text-zinc-300"
          >
            <ArrowUp className="size-4" />
            Curtir(1)
          </button>
        </li>
      </ol>
    </div>
  );
}
