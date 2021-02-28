import styles from '../styles/pages/Login.module.css'
import { signIn } from 'next-auth/client'

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src="simbolo.svg" alt="simbolo fundo"/>
      </div>
      <div className={styles.rightContainer}>
        <img src="logo-full-white.svg" alt="logo moveit"/>
        <strong>Bem-vindo</strong>
        <div>
          <img src="icons/github.svg" alt="Github"/>
          <p>Faça login com seu Github para começar</p>
        </div>
        <button type="button" onClick={() => signIn('github') } >   
          Fazer login
        </button>
      </div>
    </div>
  )
}