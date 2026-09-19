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
//
// saveSession() stores completed LUMI sessions in
// the browser's localStorage.
//
// This is currently only for our frontend prototype.
// Later this will be replaced by backend/database
// storage.
// ==================================================

import { saveSession } from './utils/sessionStorage'
import { buildPersonalSupportProfile } from './utils/personalization'

function App() {

  console.log(
  'LUMI Personal Support Profile:',
  buildPersonalSupportProfile()
)

  // ==================================================
  // CURRENT SCREEN
  // ==================================================
  //
  // This is our simple navigation system for now.
  //
  // Example:
  //
  // screen = "home"
  //          ↓
  //        Home
  //
  // screen = "check-in"
  //          ↓
  //        CheckIn
  //
  // Later we can replace this with React Router.
  // ==================================================

  const [screen, setScreen] = useState('home')


  // ==================================================
  // USER ROLE
  // ==================================================

  const [userRole, setUserRole] = useState(null)


  // ==================================================
  // CHECK-IN DATA
  // ==================================================
  //
  // This stores the emotional state selected at the
  // beginning of the session.
  //
  // Example:
  //
  // emotion = "overthinking"
  // intensityBefore = 8
  // ==================================================

  const [checkInData, setCheckInData] = useState({
    emotion: '',
    intensityBefore: null,
  })


  // ==================================================
  // SUPPORT ROUTE
  // ==================================================
  //
  // LUMI chooses one of:
  //
  // connect
  // process
  // calm
  //
  // This becomes important for personalization later.
  // ==================================================

  const [supportRoute, setSupportRoute] = useState(null)


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
  //
  // CONNECT, PROCESS and CALM eventually reach the
  // same completion screen.
  //
  // Therefore we keep the final outcome here.
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
//
// This stores the personalized profile created from
// the user's completed LUMI sessions.
//
// buildPersonalSupportProfile() reads the sessions
// saved in localStorage and converts them into useful
// patterns for the user.
// ==================================================

const [personalProfile, setPersonalProfile] = useState(
  () => buildPersonalSupportProfile()
)

  // ==================================================
  // COMPLETE SESSION
  // ==================================================
  //
  // IMPORTANT:
  //
  // All three routes use this function:
  //
  // CONNECT
  // PROCESS
  // CALM
  //
  // This prevents us from having three different
  // storage systems.
  //
  // Once the user finishes an intervention:
  //
  // 1. Create one completed session object.
  // 2. Save it to localStorage.
  // 3. Store it in React state.
  // 4. Show SessionComplete.
  // ==================================================

  const completeSession = ({
    intensityAfter,
    whatHelped,
  }) => {

    // ----------------------------------------------
    // Create the final session object.
    // ----------------------------------------------

    const completedSession = {

      // Emotional state selected at Check-In
      emotion: checkInData.emotion,

      // CONNECT / PROCESS / CALM
      route: supportRoute,

      // User's self-reported intensity before support
      intensityBefore:
        checkInData.intensityBefore,

      // User's self-reported intensity after support
      intensityAfter,

      // What the user says helped
      whatHelped,

    }


    // ----------------------------------------------
    // Save the completed session.
    //
    // sessionStorage.js handles localStorage.
    // ----------------------------------------------

    saveSession(completedSession)

    // Recalculate the personal profile after the
// newly completed session has been saved.
//
// This means LUMI learns from the latest session
// immediately instead of waiting for a page refresh.

const updatedProfile =
  buildPersonalSupportProfile()

setPersonalProfile(updatedProfile)
    // ----------------------------------------------
    // Also keep the same data in React state.
    //
    // React state allows the next screen to display
    // the data immediately.
    // ----------------------------------------------

    setSessionData((previousData) => ({

      ...previousData,

      route: supportRoute,

      interventionCompleted: true,

      intensityBefore:
        checkInData.intensityBefore,

      intensityAfter,

      whatHelped,

    }))


    // ----------------------------------------------
    // Show the common completion screen.
    // ----------------------------------------------

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


    // ----------------------------------------------
    // SUPPORT SEEKER
    // ----------------------------------------------

    if (role === 'support-seeker') {

      setScreen('check-in')

      return
    }


    // ----------------------------------------------
    // COMPANION
    // ----------------------------------------------

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


          // Save emotional state.

          setCheckInData({

            emotion:
              data.emotion,

            intensityBefore:
              data.intensityBefore,

          })


          // Start a fresh common session.

          setSessionData({

            route: null,

            interventionCompleted: false,

            intensityBefore:
              data.intensityBefore,

            intensityAfter: null,

            whatHelped: '',

          })


          // Continue to safety check.

          setScreen('safety-check')
        }}

      />
    )
  }


  // ==================================================
  // SAFETY CHECK
  // ==================================================

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


          // ------------------------------------------
          // SAFE
          // ------------------------------------------

          if (answer === 'safe') {

            setScreen('need-discovery')

            return
          }


          // ------------------------------------------
          // UNSURE / IMMEDIATE HELP
          // ------------------------------------------
          //
          // These users do NOT enter random Companion
          // matching.
          // ------------------------------------------

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


  // ==================================================
  // SAFETY SUPPORT
  // ==================================================

  if (screen === 'safety-support') {

    return (
      <SafetySupport

        onBack={() =>
          setScreen('safety-check')
        }

      />
    )
  }


  // ==================================================
  // NEED DISCOVERY
  // ==================================================
  //
  // This is where LUMI currently routes the user.
  //
  // CONNECT
  // PROCESS
  // CALM
  // ==================================================

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


          // ------------------------------------------
          // CONNECT
          // ------------------------------------------

          if (need === 'connect') {

            setSupportRoute('connect')

            setSessionData((previousData) => ({

              ...previousData,

              route: 'connect',

            }))


            setScreen('connect')

            return
          }


          // ------------------------------------------
          // PROCESS
          // ------------------------------------------

          if (need === 'process') {

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


          // ------------------------------------------
          // CALM
          // ------------------------------------------

          if (need === 'calm') {

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


          // ------------------------------------------
          // UNKNOWN
          // ------------------------------------------

          if (need === 'unknown') {

            console.log(
              'LUMI will help decide the support route.'
            )

            return
          }

        }}

      />
    )
  }


  // ==================================================
  // PROCESS — START
  // ==================================================

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


  // ==================================================
  // PROCESS — THOUGHT
  // ==================================================

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


  // ==================================================
  // PROCESS — FEELING
  // ==================================================

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


  // ==================================================
  // PROCESS — NEED
  // ==================================================

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


  // ==================================================
  // PROCESS — SUMMARY
  // ==================================================

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


  // ==================================================
  // PROCESS — NEXT STEP
  // ==================================================

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


          // For this prototype all PROCESS options
          // currently lead to the same outcome screen.

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


          // Save PROCESS outcome.

          setProcessData((previousData) => ({

            ...previousData,

            intensityAfter:
              outcome.intensityAfter,

            whatHelped:
              outcome.whatHelped,

          }))


          // ------------------------------------------
          // IMPORTANT
          // ------------------------------------------
          //
          // Instead of directly going to
          // SessionComplete, we use completeSession().
          //
          // This saves the session to localStorage.
          // ------------------------------------------

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


          // Save CALM outcome in its own state too.

          setCalmData((previousData) => ({

            ...previousData,

            intensityAfter:
              outcome.intensityAfter,

            whatHelped:
              outcome.whatHelped,

          }))


          // Save common completed session.

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

        onBack={() =>
          setScreen('need-discovery')
        }

        onContinue={() => {

          console.log(
            'Connection request prepared.'
          )


          // Mutual consent is required before
          // opening the conversation.

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

        onBack={() =>
          setScreen('connect')
        }

        onAccept={() => {

          console.log(
            'Support Seeker accepted connection.'
          )


          // Temporary frontend simulation.
          //
          // Later this will be controlled by the
          // backend and Companion account.

          setScreen('companion-request')

        }}

        onDecline={() => {

          console.log(
            'Support Seeker cancelled connection.'
          )


          setScreen('need-discovery')

        }}

      />
    )
  }


  // ==================================================
  // CONNECTION PENDING
  // ==================================================

  if (screen === 'connection-pending') {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf8f5] px-5 text-[#29252d]">

        <div className="max-w-xl rounded-3xl border border-[#e8e0e9] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">

            <Check size={25} />

          </div>

          <h1 className="mt-6 text-3xl font-semibold">
            Request sent
          </h1>

          <p className="mt-4 leading-7 text-[#716b75]">
            The Companion has been asked whether they
            would like to connect.
          </p>

          <p className="mt-4 text-sm leading-6 text-[#958d97]">
            LUMI only creates a conversation after both
            people agree.
          </p>

          <button
            onClick={() =>
              setScreen('need-discovery')
            }
            className="mt-7 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3540]"
          >
            Back to support options
          </button>

        </div>

      </main>
    )
  }


  // ==================================================
  // COMPANION REQUEST
  // ==================================================

  if (screen === 'companion-request') {

    return (
      <CompanionRequest

        onBack={() =>
          setScreen('home')
        }

        onAccept={() => {

          console.log(
            'Companion accepted connection.'
          )


          setScreen(
            'connection-established'
          )

        }}

        onDecline={() => {

          console.log(
            'Companion declined connection.'
          )


          setScreen(
            'connection-declined'
          )

        }}

      />
    )
  }


  // ==================================================
  // CONNECTION ESTABLISHED
  // ==================================================

  if (screen === 'connection-established') {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf8f5] px-5 text-[#29252d]">

        <div className="max-w-xl rounded-3xl border border-[#e8e0e9] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f1ed] text-[#54786b]">

            <Check size={26} />

          </div>

          <h1 className="mt-6 text-3xl font-semibold">
            Connection established
          </h1>

          <p className="mt-4 leading-7 text-[#716b75]">
            Both people agreed to connect.
            You can now start a protected LUMI conversation.
          </p>

          <button
            onClick={() =>
              setScreen('chat')
            }
            className="mt-7 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3540]"
          >
            Open conversation
          </button>

        </div>

      </main>
    )
  }


  // ==================================================
  // CONNECTION DECLINED
  // ==================================================

  if (screen === 'connection-declined') {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf8f5] px-5 text-[#29252d]">

        <div className="max-w-xl rounded-3xl border border-[#e8e0e9] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">

            <X size={25} />

          </div>

          <h1 className="mt-6 text-3xl font-semibold">
            Request declined
          </h1>

          <p className="mt-4 leading-7 text-[#716b75]">
            That's okay. A Companion can decline whenever
            they don't feel comfortable or available.
          </p>

          <p className="mt-4 text-sm leading-6 text-[#958d97]">
            LUMI can offer another suitable Companion or
            another support route such as PROCESS or CALM.
          </p>

          <button
            onClick={() =>
              setScreen('need-discovery')
            }
            className="mt-7 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3540]"
          >
            Choose another support option
          </button>

        </div>

      </main>
    )
  }


  // ==================================================
  // CHAT
  // ==================================================

  if (screen === 'chat') {

    return (
      <Chat

        onBack={() =>
          setScreen('connection-established')
        }

        onLeave={() => {

          console.log(
            'User left the conversation.'
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

        onContinue={() => {

          setScreen('connect-outcome')

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

        onBack={() =>
          setScreen('conversation-ended')
        }

        onContinue={(data) => {

          console.log(
            'CONNECT outcome:',
            data
          )


          // ------------------------------------------
          // Save CONNECT session.
          //
          // completeSession() handles:
          //
          // 1. localStorage
          // 2. React session state
          // 3. navigation
          // ------------------------------------------

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
  //
  // All three routes now arrive here:
  //
  // CONNECT
  // PROCESS
  // CALM
  //
  // And all three use sessionData.
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

      onContinue={() => {

        // ------------------------------------------
        // Reset current session.
        // ------------------------------------------

        setCheckInData({

          emotion: '',

          intensityBefore: null,

        })


        setSupportRoute(null)


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


        // ------------------------------------------
        // Show Personal Support Profile.
        // ------------------------------------------

        setScreen('personal-support-profile')

      }}

    />
  )
}
  
  // ==================================================
  // PERSONAL SUPPORT PROFILE
  // ==================================================
  //
  // This screen exists already.
  //
  // We will connect it to getSessions() in the next
  // personalization step.
  // ==================================================

  if (screen === 'personal-support-profile') {
  return (
    <PersonalSupportProfile
      profile={personalProfile}
      onBack={() => setScreen('home')}
      onContinue={() => setScreen('home')}
    />
  )
}


  // ==================================================
  // FALLBACK
  // ==================================================

  return null
}


export default App