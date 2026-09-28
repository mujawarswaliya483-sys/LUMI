import { useState } from 'react'
import { Check, X } from 'lucide-react'

// ==================================================
// MAIN SCREENS
// ==================================================

import Home from './pages/Home'
import RoleSelection from './pages/RoleSelection'
import CheckIn from './pages/CheckIn'
import SafetyCheck from './pages/SafetyCheck'
import SafetySupport from './pages/SafetySupport'
import NeedDiscovery from './pages/NeedDiscovery'
import SupportRecommendation from './pages/SupportRecommendation'

// ==================================================
// CONNECT ROUTE
// ==================================================

import Connect from './pages/Connect'
import ConnectionConsent from './pages/ConnectionConsent'
import CompanionRequest from './pages/CompanionRequest'
import Chat from './pages/Chat'
import ConversationEnded from './pages/ConversationEnded'
import ConnectOutcome from './pages/ConnectOutcome'

// ==================================================
// PROCESS ROUTE
// ==================================================

import ProcessStart from './pages/ProcessStart'
import ProcessThought from './pages/ProcessThought'
import ProcessFeeling from './pages/ProcessFeeling'
import ProcessNeed from './pages/ProcessNeed'
import ProcessSummary from './pages/ProcessSummary'
import ProcessNextStep from './pages/ProcessNextStep'
import ProcessOutcome from './pages/ProcessOutcome'

// ==================================================
// CALM ROUTE
// ==================================================

import Calm from './pages/Calm'
import CalmOutcome from './pages/CalmOutcome'

// ==================================================
// COMMON SCREENS
// ==================================================

import SessionComplete from './pages/SessionComplete'
import PersonalSupportProfile from './pages/PersonalSupportProfile'

// ==================================================
// STORAGE
// ==================================================

import { saveSession } from './utils/sessionStorage'
import { buildPersonalSupportProfile } from './utils/personalization'

function App() {
 8
  // ==================================================
  // CURRENT SCREEN
  // ==================================================

  const [screen, setScreen] = useState('home')

  // ==================================================
  // USER ROLE
  // ==================================================

  const [userRole, setUserRole] = useState(null)

  // ==================================================
  // CHECK-IN DATA
  // ==================================================

  const [checkInData, setCheckInData] = useState({
    emotion: '',
    intensityBefore: null,
  })

  // ==================================================
  // SUPPORT ROUTE
  // ==================================================

  const [supportRoute, setSupportRoute] = useState(null)
  const [routeSource, setRouteSource] = useState(null)

  // ==================================================
  // CONNECT DATA
  // ==================================================
  //
  // This stores the Companion selected during CONNECT.
  //
  // Later this will come from the backend/database.
  // ==================================================

  const [selectedCompanion, setSelectedCompanion] = useState(null)

  // ==================================================
  // PROCESS DATA
  // ==================================================

  const [processData, setProcessData] = useState({
    thought: '',
    feeling: '',
    need: '',
    intensityBefore: null,
    intensityAfter: null,
    whatHelped: '',
    nextStep: '',
  })

  // ==================================================
  // CALM DATA
  // ==================================================

  const [calmData, setCalmData] = useState({
    intensityBefore: null,
    intensityAfter: null,
    whatHelped: '',
  })

  // ==================================================
  // COMMON SESSION DATA
  // ==================================================

  const [sessionData, setSessionData] = useState({
    route: null,
    interventionCompleted: false,
    intensityBefore: null,
    intensityAfter: null,
    whatHelped: '',
  })

  // ==================================================
  // PERSONAL SUPPORT PROFILE
  // ==================================================

  const [personalProfile, setPersonalProfile] = useState(
    () => buildPersonalSupportProfile()
  )

  // ==================================================
  // COMPLETE SESSION
  // ==================================================
  //
  // CONNECT, PROCESS and CALM all use this function.
  //
  // This keeps session saving in one place.
  // ==================================================

  const completeSession = ({
    intensityAfter,
    whatHelped,
  }) => {

    const completedSession = {
      emotion: checkInData.emotion,

      route: supportRoute,

      routeSource,

      intensityBefore:
        checkInData.intensityBefore,

      intensityAfter,

      whatHelped,
    }

    // Save completed session
    saveSession(completedSession)

    // Recalculate personalization
    const updatedProfile =
      buildPersonalSupportProfile()
    setPersonalProfile(updatedProfile)

    // Update common session state
    setSessionData((previousData) => ({
      ...previousData,

      route: supportRoute,

      interventionCompleted: true,

      intensityBefore:
        checkInData.intensityBefore,

      intensityAfter,

      whatHelped,
    }))

    // Move to common completion screen
    setScreen('session-complete')
  }

  // ==================================================
  // ROLE SELECTION
  // ==================================================

  const handleRoleSelection = (role) => {

    setUserRole(role)

    console.log(
      'Selected LUMI role:',
      role
    )

    if (role === 'support-seeker') {

      setScreen('check-in')

      return
    }

    if (role === 'companion') {

      console.log(
        'Companion onboarding will come next.'
      )

      return
    }
  }

  // ==================================================
  // HOME
  // ==================================================

  if (screen === 'home') {

    return (
      <Home
        onStart={() =>
          setScreen('role-selection')
        }
      />
    )
  }

  // ==================================================
  // ROLE SELECTION
  // ==================================================

  if (screen === 'role-selection') {

    return (
      <RoleSelection
        onSelectRole={
          handleRoleSelection
        }

        onBack={() =>
          setScreen('home')
        }
      />
    )
  }

  // ==================================================
  // CHECK-IN
  // ==================================================

  if (screen === 'check-in') {

    return (
      <CheckIn
        onBack={() =>
          setScreen('role-selection')
        }

        onContinue={(data) => {

          console.log(
            'Check-in data:',
            data
          )

          setCheckInData({
            emotion:
              data.emotion,

            intensityBefore:
              data.intensityBefore,
          })

          // Start fresh session
          setSessionData({
            route: null,

            interventionCompleted: false,

            intensityBefore:
              data.intensityBefore,

            intensityAfter: null,

            whatHelped: '',
          })

          setScreen('safety-check')
        }}
      />
    )
  }

  // SAFETY CHECK

  if (screen === 'safety-check') {

    return (
      <SafetyCheck
        onBack={() =>
          setScreen('check-in')
        }

        onAnswer={(answer) => {

          console.log(
            'Safety answer:',
            answer
          )

          // Safe users continue normally
          if (answer === 'safe') {

            setScreen('need-discovery')

            return
          }

          // Higher-risk answers do not enter
          // random Companion matching.
          if (
            answer === 'unsure' ||
            answer === 'immediate-help'
          ) {

            setScreen('safety-support')

            return
          }
        }}
      />
    )
  }

  // SAFETY SUPPORT

  if (screen === 'safety-support') {

    return (
      <SafetySupport
        onBack={() =>
          setScreen('safety-check')
        }
      />
    )
  }

  // NEED DISCOVERY

  if (screen === 'need-discovery') {

    return (
      <NeedDiscovery
        onBack={() =>
          setScreen('safety-check')
        }

        onSelectNeed={(need) => {

          console.log(
            'Selected support need:',
            need
          )

          // UNKNOWN

          if (need === 'unknown') {

            setScreen(
              'support-recommendation'
            )

            return
          }

          // CONNECT

          if (need === 'connect') {

            setSupportRoute('connect')
            setRouteSource('direct')

            setSessionData((previousData) => ({
              ...previousData,

              route: 'connect',
            }))

            setScreen('connect')
            return
          }

          // PROCESS

          if (need === 'process') {

            setSupportRoute('process')
            setRouteSource('direct')

            setSessionData((previousData) => ({
              ...previousData,

              route: 'process',
            }))

            setProcessData({
              thought: '',
              feeling: '',
              need: '',

              intensityBefore:
                checkInData.intensityBefore,

              intensityAfter: null,

              whatHelped: '',

              nextStep: '',
            })

            setScreen('process-start')

            return
          }

          // CALM

          if (need === 'calm') {

            setSupportRoute('calm')
            setRouteSource('direct')

            setSessionData((previousData) => ({
              ...previousData,

              route: 'calm',
            }))

            setCalmData({
              intensityBefore:
                checkInData.intensityBefore,

              intensityAfter: null,

              whatHelped: '',
            })

            setScreen('calm')
            return
          }
        }}
      />
    )
  }

  // SUPPORT RECOMMENDATION

  if (screen === 'support-recommendation') {

    return (
      <SupportRecommendation
        checkInData={checkInData}

        onBack={() => {
          setScreen('need-discovery')
        }}

        onSelectRoute={(route) => {

          setRouteSource('recommended')

          console.log(
            'Recommended route selected:',
            route
          )

          // CONNECT

          if (route === 'connect') {

            setSupportRoute('connect')

            setSessionData((previousData) => ({
              ...previousData,

              route: 'connect',
            }))

            setScreen('connect')

            return
          }

          // PROCESS

          if (route === 'process') {

            setSupportRoute('process')

            setSessionData((previousData) => ({
              ...previousData,

              route: 'process',
            }))

            setProcessData({
              thought: '',
              feeling: '',
              need: '',

              intensityBefore:
                checkInData.intensityBefore,

              intensityAfter: null,

              whatHelped: '',

              nextStep: '',
            })

            setScreen('process-start')

            return
          }

          // CALM

          if (route === 'calm') {

            setSupportRoute('calm')

            setSessionData((previousData) => ({
              ...previousData,

              route: 'calm',
            }))

            setCalmData({
              intensityBefore:
                checkInData.intensityBefore,
              intensityAfter: null,

              whatHelped: '',
            })

            setScreen('calm')
            return
          }
        }}
      />
    )
  }

  // PROCESS — START

  if (screen === 'process-start') {

    return (
      <ProcessStart
        onBack={() =>
          setScreen('need-discovery')
        }

        onContinue={() => {
          setScreen('process-thought')
        }}
      />
    )
  }

  // PROCESS — THOUGHT

  if (screen === 'process-thought') {

    return (
      <ProcessThought
        onBack={() =>
          setScreen('process-start')
        }

        onContinue={(thought) => {

          console.log(
            'Process thought:',
            thought
          )

          setProcessData((previousData) => ({
            ...previousData,

            thought,
          }))

          setScreen('process-feeling')
        }}
      />
    )
  }

  // PROCESS — FEELING

  if (screen === 'process-feeling') {

    return (
      <ProcessFeeling
        onBack={() =>
          setScreen('process-thought')
        }

        onContinue={(feeling) => {

          console.log(
            'Process feeling:',
            feeling
          )

          setProcessData((previousData) => ({
            ...previousData,

            feeling,
          }))

          setScreen('process-need')
        }}
      />
    )
  }

  // PROCESS — NEED

  if (screen === 'process-need') {

    return (
      <ProcessNeed
        onBack={() =>
          setScreen('process-feeling')
        }

        onContinue={(need) => {

          console.log(
            'Process need:',
            need
          )

          setProcessData((previousData) => ({
            ...previousData,

            need,
          }))

          setScreen('process-summary')
        }}
      />
    )
  }

  // PROCESS — SUMMARY

  if (screen === 'process-summary') {

    return (
      <ProcessSummary
        thought={
          processData.thought
        }

        feeling={
          processData.feeling
        }

        need={
          processData.need
        }

        onBack={() =>
          setScreen('process-need')
        }

        onContinue={() => {
          setScreen('process-next-step')
        }}
      />
    )
  }

  // PROCESS — NEXT STEP

  if (screen === 'process-next-step') {

    return (
      <ProcessNextStep
        onBack={() =>
          setScreen('process-summary')
        }

        onSelect={(nextStep) => {

          console.log(
            'Selected next step:',
            nextStep
          )

          setProcessData((previousData) => ({
            ...previousData,

            nextStep,
          }))

          setScreen('process-outcome')
        }}
      />
    )
  }

  // ==================================================
  // PROCESS — OUTCOME
  // ==================================================

  if (screen === 'process-outcome') {

    return (
      <ProcessOutcome
        onBack={() =>
          setScreen('process-next-step')
        }

        onContinue={(outcome) => {

          console.log(
            'PROCESS outcome:',
            outcome
          )

          setProcessData((previousData) => ({
            ...previousData,

            intensityAfter:
              outcome.intensityAfter,

            whatHelped:
              outcome.whatHelped,
          }))

          completeSession({
            intensityAfter:
              outcome.intensityAfter,

            whatHelped:
              outcome.whatHelped,
          })
        }}
      />
    )
  }

  // ==================================================
  // CALM
  // ==================================================

  if (screen === 'calm') {

    return (
      <Calm
        onBack={() =>
          setScreen('need-discovery')
        }

        onComplete={() => {
          setScreen('calm-outcome')
        }}
      />
    )
  }

  // ==================================================
  // CALM — OUTCOME
  // ==================================================

  if (screen === 'calm-outcome') {

    return (
      <CalmOutcome
        onBack={() =>
          setScreen('calm')
        }

        onContinue={(outcome) => {

          console.log(
            'CALM outcome:',
            outcome
          )

          setCalmData((previousData) => ({
            ...previousData,

            intensityAfter:
              outcome.intensityAfter,

            whatHelped:
              outcome.whatHelped,
          }))

          completeSession({
            intensityAfter:
              outcome.intensityAfter,

            whatHelped:
              outcome.whatHelped,
          })
        }}
      />
    )
  }

  // ==================================================
  // CONNECT
  // ==================================================

  if (screen === 'connect') {
  return (
    <Connect
      onBack={() => setScreen('need-discovery')}
      onContinue={(companion) => {
        setSelectedCompanion(companion)
        setScreen('connection-consent')
      }}
    />
  )
}

  // ==================================================
  // CONNECTION CONSENT
  // ==================================================

  if (screen === 'connection-consent') {

    return (
      <ConnectionConsent
        companionId={
          selectedCompanion?.id
        }

        onBack={() =>
          setScreen('connect')
        }

        onContinue={(companionId) => {

          console.log(
            'Connection request sent for:',
            companionId
          )

          setScreen('companion-request')
        }}
      />
    )
  }

  // ==================================================
  // COMPANION REQUEST
  // ==================================================
if (screen === 'companion-request') {
  return (
    <CompanionRequest
      companionId={selectedCompanion?.id}
      onBack={() => setScreen('connection-consent')}
      onContinue={(companionId) => {
        console.log('Companion accepted connection:', companionId)
        setScreen('chat')
      }}
    />
  )
}

  // ==================================================
  // CHAT
  // ==================================================

  if (screen === 'chat') {

    return (
      <Chat
        companionId={
          selectedCompanion?.id
        }

        onBack={() =>
          setScreen('companion-request')
        }

        onContinue={(chatData) => {

          console.log(
            'Conversation ended:',
            chatData
          )

          setScreen('conversation-ended')
        }}
      />
    )
  }

  // ==================================================
  // CONVERSATION ENDED
  // ==================================================

  if (screen === 'conversation-ended') {

    return (
      <ConversationEnded
        onBack={() =>
          setScreen('chat')
        }

        onContinue={() => {

          setScreen(
            'connect-outcome'
          )
        }}
      />
    )
  }

  // ==================================================
  // CONNECT — OUTCOME
  // ==================================================

  if (screen === 'connect-outcome') {

    return (
      <ConnectOutcome
        intensityBefore={
          checkInData.intensityBefore
        }

        onBack={() =>
          setScreen('conversation-ended')
        }

        onContinue={(data) => {

          console.log(
            'CONNECT outcome:',
            data
          )

          completeSession({
            intensityAfter:
              data.intensityAfter,

            whatHelped:
              data.whatHelped,
          })
        }}
      />
    )
  }

  // ==================================================
  // SESSION COMPLETE
  // ==================================================

  if (screen === 'session-complete') {

    return (
      <SessionComplete
        intensityBefore={
          sessionData.intensityBefore
        }

        intensityAfter={
          sessionData.intensityAfter
        }

        whatHelped={
          sessionData.whatHelped
        }

        routeSource={
          routeSource
        }

        onContinue={() => {

          // ------------------------------------------
          // Reset current session
          // ------------------------------------------

          setCheckInData({
            emotion: '',
            intensityBefore: null,
          })

          setSupportRoute(null)

          setRouteSource(null)

          setSelectedCompanion(null)

          setProcessData({
            thought: '',
            feeling: '',
            need: '',
            intensityBefore: null,
            intensityAfter: null,
            whatHelped: '',
            nextStep: '',
          })

          setCalmData({
            intensityBefore: null,
            intensityAfter: null,
            whatHelped: '',
          })

          setSessionData({
            route: null,
            interventionCompleted: false,
            intensityBefore: null,
            intensityAfter: null,
            whatHelped: '',
          })

          // Show updated personal profile
          setScreen(
            'personal-support-profile'
          )
        }}
      />
    )
  }

  // ==================================================
  // PERSONAL SUPPORT PROFILE
  // ==================================================

  if (screen === 'personal-support-profile') {

    return (
      <PersonalSupportProfile
        profile={
          personalProfile
        }

        onBack={() =>
          setScreen('home')
        }

        onContinue={() =>
          setScreen('home')
        }
      />
    )
  }

  // ==================================================
  // FALLBACK
  // ==================================================

  return null
}

export default App