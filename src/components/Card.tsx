import React, { type ReactElement, type PropsWithChildren, type ReactNode } from 'react'

interface CardProps {
  children?: ReactNode | undefined
}

export default function Card (props: CardProps): ReactElement {
  return (
    <div className="border flex flex-col flex-1 basis-72 mx-4 my-8 justify-between rounded-xl text-slate-800 bg-slate-50">
      {props.children}
    </div>
  )
}

export function CardHeader (props: PropsWithChildren): ReactElement {
  return (
    <div className="text-center text-xl border-b border-gray-200 p-3 mb-2 rounded-t-xl bg-slate-800 text-white font-bold tracking-wider">
      {props.children}
    </div>
  )
}

export function CardBody (props: PropsWithChildren): ReactElement {
  return (
    <div className="text-md p-4 space-y-2 text-justify">
      {props.children}
    </div>
  )
}

export function CardFooter (props: PropsWithChildren): ReactElement {
  return (
    <div className="text-md border-t border-gray-200 p-3 mt-2 rounded-b-xl bg-slate-100 text-slate-600">
      {props.children}
    </div>
  )
}

export function CardGrid (props: PropsWithChildren): ReactElement {
  return (
    <div className="flex space-y-2 flex-col">
      {props.children}
    </div>
  )
}

export function CardGridRow (props: PropsWithChildren): ReactElement {
  return (
    <div className="flex justify-between flex-row flex-nowrap">
      {props.children}
    </div>
  )
}
