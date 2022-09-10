import { useState } from "react";
import { useRandomMeme, useSelectedMeme } from "../context";

export function SelectedMemeImage() {
  const selectedMeme = useSelectedMeme();
  return <img src={selectedMeme.url} alt={"Meme"} />;
}

export function GenerateRandomeMemeButton() {
  const randomeMeme = useRandomMeme();
  return (
    <button
      className="w-full bg-purple-200 rounded hover:shadow-xl hover:bg-purple-300 border border-gray-300"
      onClick={randomeMeme}
    >
      Get a new meme image
    </button>
  );
}

export function Meme() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  return (
    <main className="grid gap-5 px-20">
      <div className="grid grid-cols-2 gap-y-5 gap-x-5  ">
        <input
          type="text"
          placeholder="Top text"
          className="border border-gray-300"
          onChange={(event) => {
            setTopText(event.target.value);
          }}
          name="topText"
          value={topText}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="border border-gray-300"
          onChange={(event) => {
            setBottomText(event.target.value);
          }}
          name="bottomText"
          value={bottomText}
          autoComplete="off"
        />
      </div>
      <div>
        <GenerateRandomeMemeButton></GenerateRandomeMemeButton>
      </div>
      <div className="flex flex-col relative justify-center items-center ">
        <SelectedMemeImage></SelectedMemeImage>

        <h2 className="flex absolute text-white text-4xl uppercase top-2">
          {topText}
        </h2>
        <h2 className="flex absolute text-white text-4xl uppercase bottom-2">
          {bottomText}
        </h2>
      </div>
    </main>
  );
}
