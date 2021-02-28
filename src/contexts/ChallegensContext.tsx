import { createContext, useState, ReactNode, useEffect } from 'react'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'
import axios from 'axios'

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallegesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  isLevelUpModalOpen: boolean;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallegensProviderProps {
  children: ReactNode;
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    }
  }
}

export const ChallengesContext = createContext({} as ChallegesContextData) 

export function ChallegensProvider({ 
  children, 
  ...rest 
}: ChallegensProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [totalExperience, setTotalExperience] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const [isUserCharged, setIsUserCharged] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    async function initialUser() {
      await axios.post('/api/initial-user', rest.session.user).then(response => {
        setLevel(response.data.level)
        setCurrentExperience(response.data.currentExperience)
        setChallengesCompleted(response.data.challengesCompleted)
        setTotalExperience(response.data.totalExperience)
        setIsUserCharged(true)
      })
    }
    initialUser()
  }, [])

  useEffect(() => {
    async function updateUserData() {
      if (isUserCharged) {
        const data = {
          name: rest.session.user.name,
          email: rest.session.user.email,
          image: rest.session.user.image,
          level,
          currentExperience,
          challengesCompleted,
          totalExperience,
        }
     
        axios.put('/api/update-user', data).then(response => {
          setLevel(response.data.level)
          setCurrentExperience(response.data.currentExperience)
          setChallengesCompleted(response.data.challengesCompleted)
        })
      }
    }
    updateUserData()
  }, [level, currentExperience, challengesCompleted, totalExperience])

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🥳', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }
    
    const { amount } = activeChallenge 

    let finalExperience = currentExperience + amount
    
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
    setTotalExperience(totalExperience + amount)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp,
        isLevelUpModalOpen,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}