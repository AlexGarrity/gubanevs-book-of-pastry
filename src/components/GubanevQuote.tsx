import React, { type ReactElement, useEffect } from 'react'

const SEVEN_DAYS_IN_MS = 6.048E8

export default function GubanevQuote (): ReactElement {
  useEffect(() => {
    async function updateLocalQuotes (): Promise<void> {
      const fetchPromise = await fetch(
        'https://raw.githubusercontent.com/AlexGarrity/gubanevs-book-of-pastry/master/src/assets/quotes.json'
      )

      const quotes: string[] = await fetchPromise.json()

      localStorage.setItem('quotes', JSON.stringify(quotes))
      localStorage.setItem(
        'quotes_expiry',
        (Date.now() + SEVEN_DAYS_IN_MS).toString()
      )
    }

    async function getRandomGubanevQuote (): Promise<string> {
      if (!('quotes' in localStorage)) {
        await updateLocalQuotes()
      }

      const quotesExpiry = localStorage.getItem('quotes_expiry')
      if (quotesExpiry == null) {
        return 'Gubanev is think that website may be throw error'
      }

      if (Number.parseInt(quotesExpiry) < Date.now()) {
        await updateLocalQuotes()
      }

      const quotesJson = localStorage.getItem('quotes')
      if (quotesJson == null) {
        return 'Gubanev is think that website may be throw error'
      }

      const quotes: string[] = JSON.parse(quotesJson)
      if (quotesJson === undefined) {
        return 'Gubanev is think that website may be throw error'
      }

      const randomIndex = Math.floor(Math.random() * quotes.length)
      return quotes[randomIndex]
    }

    getRandomGubanevQuote().then((quote) => {
      const quoteDOM = document.getElementById('gubanev-quote')
      if (quoteDOM != null) {
        quoteDOM.innerHTML = '&quot;' + quote + '&quot;'
      }
    }).catch(() => {
      console.log('Something went wrong in setting a random quote')
    })
  })

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
  )
}
