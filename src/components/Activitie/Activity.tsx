import React from 'react'
import styles from './Activity.module.scss'

const Activitie = () => {
  return (
    <div className={styles.activity}>
      <input type="checkbox" id='checkbox'/>
      <label htmlFor='checkbox'>Lorem</label> 
      <div>icon</div>
    </div>
  )
}

export default Activitie