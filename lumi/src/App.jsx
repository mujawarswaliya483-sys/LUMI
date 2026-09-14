import { useState } from 'react'
import { Check, X } from 'lucide-react'

// --------------------------------------------------
// MAIN SCREENS
// --------------------------------------------------

import Home from './pages/Home'
import RoleSelection from './pages/RoleSelection'
import CheckIn from './pages/CheckIn'
import SafetyCheck from './pages/SafetyCheck'
import SafetySupport from './pages/SafetySupport'
import NeedDiscovery from './pages/NeedDiscovery'

// --------------------------------------------------
// CONNECT ROUTE
// --------------------------------------------------

import Connect from './pages/Connect'
import ConnectionConsent from './pages/ConnectionConsent'
import CompanionRequest from './pages/CompanionRequest'
import Chat from './pages/chat'
import ConversationEnded from './pages/ConversationEnded'

// --------------------------------------------------
// PROCESS ROUTE
// --------------------------------------------------

import ProcessStart from './pages/ProcessStart'
import ProcessThought from './pages/ProcessThought'
import ProcessFeeling from './pages/ProcessFeeling'
import ProcessNeed from './pages/ProcessNeed'
import ProcessSummary from './pages/ProcessSummary'
import ProcessNextStep from './pages/ProcessNextStep'
import ProcessOutcome from './pages/ProcessOutcome'
import SessionComplete from './pages/SessionComplete'
import Calm from './pages/Calm'
import CalmOutcome from './pages/CalmOutcome'

function App() {

  // ==================================================
  // CURRENT SCREEN
  // ==================================================
  //
  // This is our temporary navigation system.
  //
  // Example:
  //
  // screen === 'home'
  // → Home is displayed.
  //
  // screen === 'connect'
  // → Connect is displayed.
  //
  // Later we can replace this with React Router.
  // ==================================================

  const [screen, setScreen] = useState('home')


  // ==================================================
  // USER ROLE
  // ==================================================

  const [userRole, setUserRole] = useState(null)


  // ==================================================
  // PROCESS SESSION DATA
  // ==================================================
  //
  // This stores the answers collected during
  // the PROCESS journey.
  //
  // Example:
  //
  // thought → "I keep thinking about my friend."
  // feeling → "Guilty"
  // need    → "Reassurance"
  //
  // Later this information can be sent to
  // our Express backend and MongoDB.
  // ==================================================

  const [processData, setProcessData] = useState({
  thought: '',
  feeling: '',
  need: '',
  intensityBefore: 5,
  intensityAfter: null,
  whatHelped: '',
})


  // ==================================================
  // ROLE SELECTION
  // ==================================================

  const handleRoleSelection = (role) => {

    // Save selected role.
    setUserRole(role)

    console.log('Selected LUMI role:', role)


    // Support seeker → start support journey.
    if (role === 'support-seeker') {

      setScreen('check-in')

    }


    // Companion onboarding will be built later.
    if (role === 'companion') {

      console.log('Companion onboarding will come next.')

    }

  }


  // ==================================================
  // HOME
  // ==================================================

  if (screen === 'home') {

    return (
      <Home
        onStart={() => setScreen('role-selection')}
      />
    )

  }


  // ==================================================
  // ROLE SELECTION
  // ==================================================

  if (screen === 'role-selection') {

    return (
      <RoleSelection
        onSelectRole={handleRoleSelection}
        onBack={() => setScreen('home')}
      />
    )

  }


  // ==================================================
  // EMOTIONAL CHECK-IN
  // ==================================================

  if (screen === 'check-in') {

    return (
      <CheckIn

        onBack={() =>
          setScreen('role-selection')
        }

        onContinue={(emotion) => {

          console.log(
            'Selected emotional state:',
            emotion
          )

          // Later we will store the emotion
          // inside the support session.

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


          // Safe → continue normal support flow.
          if (answer === 'safe') {

            setScreen('need-discovery')

          }


          // Unsure / immediate danger →
          // do NOT send to Companion matching.
          if (
            answer === 'unsure' ||
            answer === 'immediate-help'
          ) {

            setScreen('safety-support')

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


          // ------------------------------------------------
          // CONNECT
          // ------------------------------------------------

          if (need === 'connect') {

            setScreen('connect')

            return

          }


          // ------------------------------------------------
          // PROCESS
          // ------------------------------------------------

          if (need === 'process') {

            // Reset previous PROCESS answers
            // whenever a new PROCESS journey begins.

            setProcessData({
              thought: '',
              feeling: '',
              need: '',
            })

            setScreen('process-start')

            return

          }


          // ------------------------------------------------
          // CALM
          // ------------------------------------------------

          if (need === 'calm') {

            console.log(
              'CALM route will come next.'
            )

            return

          }


          // ------------------------------------------------
          // UNKNOWN
          // ------------------------------------------------

          if (need === 'unknown') {

            console.log(
              'LUMI will help decide the route.'
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


          // Save thought.
          setProcessData((previousData) => ({

            ...previousData,

            thought: thought,

          }))


          // Move to feeling.
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


          // Save feeling.
          setProcessData((previousData) => ({

            ...previousData,

            feeling: feeling,

          }))


          // Move to need.
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


          // Save support need.
          setProcessData((previousData) => ({

            ...previousData,

            need: need,

          }))


          // Move to summary.
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

        thought={processData.thought}

        feeling={processData.feeling}

        need={processData.need}


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


          // ------------------------------------------------
          // CONNECT
          // ------------------------------------------------

          if (nextStep === 'connect') {

            setScreen('connect')

            return

          }


          // ------------------------------------------------
          // CALM
          // ------------------------------------------------

          if (nextStep === 'calm') {

            console.log(
              'CALM route will come next.'
            )

            return

          }


          // ------------------------------------------------
          // WRITE
          // ------------------------------------------------

          if (nextStep === 'write') {

            console.log(
              'Writing reflection will come next.'
            )

            return

          }


          // ------------------------------------------------
          // SPACE
          // ------------------------------------------------
         
          onSelect={(nextStep) => {

  console.log(
    'Selected next step:',
    nextStep
  )


  // Save the selected next step.
  setProcessData((previousData) => ({
    ...previousData,
    nextStep: nextStep,
  }))


  // For now all PROCESS next steps
  // eventually lead to the outcome check.
  //
  // Later:
  //
  // write → writing activity
  // connect → CONNECT
  // calm → CALM
  // space → short pause
  //
  // After the intervention:
  //
  // outcome measurement
  //


  setScreen('process-outcome')

}}

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


        // Save outcome data.
        setProcessData((previousData) => ({

          ...previousData,

          intensityAfter:
            outcome.intensityAfter,

          whatHelped:
            outcome.whatHelped,

        }))


        // Move to completion screen.
        setScreen('session-complete')

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
        processData.intensityBefore
      }

      intensityAfter={
        processData.intensityAfter
      }

      whatHelped={
        processData.whatHelped
      }


      onContinue={() => {

        // Start fresh support journey.

        setProcessData({
          thought: '',
          feeling: '',
          need: '',
          intensityBefore: 5,
          intensityAfter: null,
          whatHelped: '',
        })


        setScreen('home')

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
            'Connection request sent.'
          )


          // Matching does NOT immediately
          // create a chat.
          //
          // Mutual consent is required.

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
            'Connection request confirmed.'
          )


          // ------------------------------------------------
          // FRONTEND DEMO
          // ------------------------------------------------
          //
          // For now we simulate the Companion side.
          //
          // In the real application:
          //
          // Support Seeker
          //       ↓
          // Backend
          //       ↓
          // Companion
          //       ↓
          // Accept / Decline
          //       ↓
          // Backend
          //
          // ------------------------------------------------

          setScreen('companion-request')

        }}


        onDecline={() => {

          console.log(
            'Connection request cancelled.'
          )


          setScreen('need-discovery')

        }}

      />
    )

  }


  // ==================================================
  // CONNECTION PENDING
  // ==================================================
  //
  // This screen is currently kept for the future
  // backend implementation.
  //
  // Later this will wait for a real Companion response.
  // ==================================================

  if (screen === 'connection-pending') {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf8f5] px-5 text-[#29252d]">

        <div className="max-w-xl rounded-3xl border border-[#e8e0e9] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">
            ✓
          </div>


          <h1 className="mt-6 text-3xl font-semibold">
            Request sent
          </h1>


          <p className="mt-4 leading-7 text-[#716b75]">
            The Companion has been asked whether they would like
            to connect. LUMI will only create the conversation
            after both people agree.
          </p>


          <p className="mt-4 text-sm leading-6 text-[#958d97]">
            In the real version, this screen would wait for the
            Companion's response through the backend.
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
  //
  // This simulates the Companion's side.
  //
  // Later this screen will be opened on another
  // user's device through the backend.
  // ==================================================

  if (screen === 'companion-request') {

    return (
      <CompanionRequest

        onBack={() =>
          setScreen('home')
        }


        onAccept={() => {

          console.log(
            'Companion accepted the connection.'
          )


          setScreen('connection-established')

        }}


        onDecline={() => {

          console.log(
            'Companion declined the connection.'
          )


          setScreen('connection-declined')

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
            Both people agreed to connect. You can now start a
            protected LUMI conversation.
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
            That's okay. Companions can decline a request whenever
            they don't feel comfortable or available.
          </p>


          <p className="mt-4 text-sm leading-6 text-[#958d97]">
            In the real LUMI system, the Support Seeker could be
            offered another suitable Companion or another support
            route such as PROCESS or CALM.
          </p>


          <button
            onClick={() =>
              setScreen('home')
            }
            className="mt-7 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3540]"
          >
            Return to LUMI
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


          // Show the dedicated conversation-ended
          // screen instead of immediately jumping
          // back to Need Discovery.

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

          setScreen('need-discovery')

        }}

      />
    )

  }


  // ==================================================
  // FALLBACK
  // ==================================================
  //
  // If screen somehow contains an unknown value,
  // render nothing instead of crashing.
  // ==================================================

  return null
}


exports default App