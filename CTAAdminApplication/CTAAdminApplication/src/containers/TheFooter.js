import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://atidantech.com/" target="_blank" rel="noopener noreferrer">Atidan Technologies</a>
        <span className="ml-1">&copy; 2020 Atidan Technologies Pvt. Ltd</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://atidantech.com/" target="_blank" rel="noopener noreferrer">Atidan</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
