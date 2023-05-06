import React, { type ReactElement, type ReactNode } from 'react'

interface FormClusterProps {
  children?: ReactNode | undefined
  title: string
}

export default function FormCluster (props: FormClusterProps): ReactElement {
  return (
    <div className="space-y-2 pb-3">
      <h1 className="text-lg font-bold">{props.title}</h1>
      {props.children}
    </div>
  )
}
