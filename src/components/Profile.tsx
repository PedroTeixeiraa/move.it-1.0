import { signOut } from 'next-auth/client'
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallegensContext'
import styles from '../styles/components/Profile.module.css'

import axios from 'axios'

interface ProfileProps {
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    }
  };
}

export function Profile(props: ProfileProps) {

  const { level } = useContext(ChallengesContext)

  async function signOutMoveOn() {
    signOut();
  }

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
      <button type="button" onClick={ signOutMoveOn } title="Sair do Move On" ><img src="icons/close.svg" alt="Sair" /></button>
    </div> 
  )
}