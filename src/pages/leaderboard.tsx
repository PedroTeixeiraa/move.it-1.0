import Sidebar from "../components/Sidebar";

import styles from '../styles/pages/Leaderboard.module.css'

import Head from 'next/head'
import { useEffect, useState } from "react";

import axios from 'axios'

export default function LeaderBoard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/users').then(response => {
      console.log(response.data, 'users')
      setUsers(response.data)
    })
  }, [])
  
  return (
    <div>
      {console.log(users, 'teste')}
      <Sidebar/>
      <div className={styles.container}>

        <Head>
          <title>Leaderboard | move.it</title>
        </Head>

        <header>Leaderboard</header>
        <div>
          <span className={styles.posicao}>POSIÇÃO</span>
          <span className={styles.usuario}>USUÁRIO</span>
          <span className={styles.desafios}>DESAFIOS</span>
          <span className={styles.experiencia}>EXPERIÊNCIA</span>
        </div>

        { users.map((user, index) => (
          <main key={index + 1}>
            <div className={styles.level}>{index + 1}</div>
            <div className={styles.profile}>
              <img src={user.image} alt={user.name}/>
              <div>
                <strong>{user.name}</strong>
                <div className={styles.description}>
                  <img src="icons/level.svg" alt="Level"/>
                  <p>Level {user.level}</p>
                </div>
              </div>
            </div>  
            <div className={styles.challengesCompleted}>
              <span>{user.challengesCompleted}</span>
              completados
            </div>
            <div className={styles.totalXp}>
              <span>{user.totalExperience}</span>
              xp
            </div>
          </main>
        )) }
      </div>
    </div>
  )
}