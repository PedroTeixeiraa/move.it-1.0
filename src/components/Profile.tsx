import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallegensContext'
import styles from '../styles/components/Profile.module.css'

interface ProfileProps {
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    }
  }
}

export function Profile(props: ProfileProps) {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src={props.session.user.image} alt={props.session.user.name}/>
      <div>
        <strong>{props.session.user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div> 
  )
}