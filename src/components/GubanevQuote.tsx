import React, { useEffect } from "react";

const SEVEN_DAYS_IN_MS = 6.048e8;

export default function GubanevQuote() {

  useEffect(() => {
    async function updateLocalQuotes() {
      const fetchPromise = await fetch(
        "https://raw.githubusercontent.com/AlexGarrity/gubanevs-book-of-pastry/master/src/assets/quotes.json"
      );

      const quotes: string[] = await fetchPromise.json();

      localStorage.setItem("quotes", JSON.stringify(quotes));
      localStorage.setItem(
        "quotes_expiry",
        (Date.now() + SEVEN_DAYS_IN_MS).toString()
      );
    }

    async function getRandomGubanevQuote() {
      if (!("quotes" in localStorage)) {
        await updateLocalQuotes();
      } else if (
        Number.parseInt(localStorage.getItem("quotes_expiry")) < Date.now()
      ) {
        await updateLocalQuotes();
      }

      const quotes: string[] = JSON.parse(localStorage.getItem("quotes"));
      return quotes.at(Math.floor(Math.random() * quotes.length));
    }

    getRandomGubanevQuote().then((quote) => {
      const quoteDOM = document.getElementById("gubanev-quote");
      if (quoteDOM) {
        quoteDOM.innerHTML = "&quot;" + quote + "&quot;";
      }
    },);
  });

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <img
        src="https://i.imgur.com/HmdTQEi.png"
        width={200}
        className="rounded-full mb-8"
      />
      <div className="flex flex-col flew-wrap text-center">
        <i id="gubanev-quote" className="self-start w-2/3 mb-2 mx-auto">
          &quot;Gubanev is thinking.  Gubanev know too, this is rare&quot;
        </i>
      </div>
    </div>
  );
}
