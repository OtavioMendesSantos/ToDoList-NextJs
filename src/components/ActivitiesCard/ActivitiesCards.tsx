import React from 'react'
import styles from './ActivitiesCards.module.scss'
import Activitie from '../Activitie/Activity'

const ActivitiesCards = () => {
  return (
    <div className={styles.mainCard}>
      <h2 className="text-secondary">Suas tarefas de hoje</h2>
      <Activitie />
    </div>
  )
}

export default ActivitiesCards