import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import { useQuery } from "react-query";

export const memeSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  box_count: z.number(),
});
export type SingleMeme = z.infer<typeof memeSchema>;

export const requestSchema = z.object({
  success: z.boolean(),
  data: z.object({
    memes: z.array(memeSchema),
  }),
});

const memeContext = createContext<{
  selectedMeme: string | null;
  selectMeme: (memeId: string) => void;
  memes: SingleMeme[];
} | null>(null);

export function useMemeContext() {
  const ctx = useContext(memeContext);
  if (ctx == null) throw new Error("Hey provide meme context");
  return ctx;
}

export function useSelectedMeme() {
  const memeContext = useMemeContext();
  const selected = memeContext.memes.find((item) => {
    return memeContext.selectedMeme === item.id;
  });
  return selected || memeContext.memes[0];
}

export function useRandomMeme() {
  const memeContext = useMemeContext();
  return () => {
    const randomNumber = Math.floor(Math.random() * memeContext.memes.length);
    const meme = memeContext.memes[randomNumber];
    memeContext.selectMeme(meme.id);
  };
}

export function MemeProvider(props: PropsWithChildren<{}>) {
  const [selectedMeme, selectMeme] = useState<string | null>(null);
  const { isLoading, data, error } = useQuery("meme", async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const c = await res.json();
    const c_1 = requestSchema.parse(c);
    const c_2 = c_1.data.memes;
    return c_2.filter((c_3) => c_3.box_count <= 2);
  });

  if (isLoading) return <div>Loading...</div>;
  if (data == null) return <div>Loading...</div>;
  if (error) return <div>Huston we have error...</div>;
  return (
    <memeContext.Provider
      value={{
        memes: data,
        selectedMeme,
        selectMeme,
      }}
    >
      {props.children}
    </memeContext.Provider>
  );
}

export function MemePricingGuard(props: PropsWithChildren<{}>) {
  const ss = useMemeContext();
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((c) => c + 1);
  }, [ss.selectedMeme]);

  useEffect(() => {
    if (count === 10) {
      alert("Buy this product asshole");
    }
  }, [count]);

  console.log(count);

  if (count > 10) {
    return (
      <>
        <div>Send me mony to this walete: dasdhkajs</div>
      </>
    );
  }
  return <>{props.children}</>;
}

const ChatContext = createContext<{
  rnd: number;
  setRND: (nr: number) => void;
} | null>(null);

export function ChatProvider(props: PropsWithChildren<{}>) {
  const [rnd, setRND] = useState<number>(Math.random());
  return (
    <ChatContext.Provider
      value={{
        setRND,
        rnd,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (ctx == null) throw new Error("Provide chat context");
  return ctx;
}

export function useUserContext() {
  const { rnd, setRND } = useChatContext();
  return [
    rnd,
    () => {
      const random = Math.random() * 1000;
      setRND(random);
    },
  ] as const;
}

export function Sample() {
  const [random] = useUserContext();
  return <div>{random}</div>;
}
