import React from 'react'

export default function HeaderCard({ mainTitle, titleDesc }) {
  return (
    <>
      <h1 className="mainTitle">{mainTitle}</h1>
      <p className="mainTitle__desc">{titleDesc}</p>
      <img src="/assets/logo.png" alt="Ho-Ho!'s logo" />
    </>
  )
}
