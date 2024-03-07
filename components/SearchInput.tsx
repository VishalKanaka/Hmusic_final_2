import { useRouter } from "next/router";
import { useMusic } from "../context/MusicContext";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";

export default function SearchInput() {
  const router = useRouter();

  const { query, setQuery } = useMusic();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query);
    router.push(`/search/${query}`);
  };

  if (!router.pathname.includes("/search")) {
    return null;
  }

  return (
    <form
      className="flex items-center justify-between w-70 gap-3 px-3 py-1.5 bg-white rounded-full"
      onSubmit={handleSubmit}
    >
      <IoSearchOutline className="text-2xl text-[#121212]" />

      <input
        type="text"
        className=" w-full text-sm font-semibold bg-transparent text-paper focus:outline-none"
        placeholder="Artists and songs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
      />

      {query && (
        <button
          type="button"
          className="flex items-center focus:outline-none"
          onClick={() => setQuery("")}
        >
          <IoCloseOutline className="text-2xl text-[#121212]" />
        </button>
      )}
    </form>
  );
}
