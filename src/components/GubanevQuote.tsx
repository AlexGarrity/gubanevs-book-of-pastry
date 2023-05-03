import React from "react";

function getRandomGubanevQuote() {
  let quote: string = null;
  fetch(
    "https://gist.githubusercontent.com/AlexGarrity/f277b1ccd41b0a7fd07b992466d5727b/raw/f487536e0b9427581fcbdd0bd91840e02fb6266a/gubanev_quotes.jsonc"
  ).then((response) => {
    response.json().then((jsonValue: string[]) => {
      quote = jsonValue.at(Math.floor(Math.random() * jsonValue.length));
    });
  });
  return quote;
}

export default function GubanevQuote() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center border-t border-b">
      <img
        src="https://i.imgur.com/HmdTQEi.png"
        width={200}
        className="rounded-full mb-8"
      />
      <div className="flex flex-col text-center">
        <i className="self-start">&quot;{getRandomGubanevQuote()}&quot;</i>
        <p className="self-end">- Gubanev</p>
      </div>
    </div>
  );
}
