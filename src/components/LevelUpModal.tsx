import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallegensContext'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){
  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModalContainer}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="icons/close.svg" alt="Close Modal"/>
        </button>
      </div>
    </div>
  )
}