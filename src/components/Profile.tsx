import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallegensContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

  const { level } = useContext(ChallengesContext)
  return (
    <div className={styles.profileContainer}>
      <img src="http://github.com/PedroTeixeiraa.png" alt="Pedro Teixeira"/>
      <div>
        <strong>Pedro Teixeira</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}