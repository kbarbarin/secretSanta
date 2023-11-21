import React from 'react'

import HeaderCard from '../../layout/HeaderCard/HeaderCard'
import HeaderSummary from '../../components/HeaderSummary/HeaderSummary'

import './Summary.scss'

export default function Summary() {
  return (
    <div className="summary">
      <HeaderCard
        mainTitle={'Secret Santa’s Name'}
        titleDesc={'by Lucas'}
        className="summary__headerCard"
      />
      <HeaderSummary />
    </div>
  )
}
