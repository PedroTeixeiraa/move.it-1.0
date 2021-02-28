import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallegensProvider } from '../contexts/ChallegensContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    }
  };
}

export default function Home(props: HomeProps) {
  return (
    <ChallegensProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
      session={props.session}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div> 
              <Profile session={props.session}/>
              <CompletedChallenges />
              <CountDown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallegensProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
