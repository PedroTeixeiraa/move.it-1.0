import Head from 'next/head'
// import { GetServerSideProps } from 'next'

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallegensProvider } from '../contexts/ChallegensContext';
import Sidebar from '../components/Sidebar';

interface HomeProps {
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
      session={props.session}
    >
      <Sidebar />
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// }
