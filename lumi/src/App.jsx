// useState allows React to remember values
// that change while the user interacts with the app.
import { useState } from 'react'
import { Check, X } from 'lucide-react'

// Import all screens/pages used by LUMI.
import Home from './pages/Home'
import RoleSelection from './pages/RoleSelection'
import CheckIn from './pages/CheckIn'
import SafetyCheck from './pages/SafetyCheck'
import SafetySupport from './pages/SafetySupport'
import NeedDiscovery from './pages/NeedDiscovery'
import Connect from './pages/connect'
import ConnectionConsent from './pages/ConnectionConsent'
import CompanionRequest from './pages/CompanionRequest'
import Chat from './pages/chat'
function App() {

  // screen tells LUMI which page should currently be displayed.
  //
  // Example:
  // screen = "home"
  // → Home component is shown.
  //
  // screen = "connect"
  // → Connect component is shown.
  const [screen, setScreen] = useState('home')

  // This stores whether the person is using LUMI
  // as a support seeker or Companion.
  const [userRole, setUserRole] = useState(null)


  // --------------------------------------------------
  // ROLE SELECTION
  // --------------------------------------------------

  const handleRoleSelection = (role) => {

    // Save the selected role in React state.
    setUserRole(role)

    console.log('Selected LUMI role:', role)

    // If the person needs support,
    // start the support journey.
    if (role === 'support-seeker') {
      setScreen('check-in')
    }

    // Companion onboarding will be built later.
    if (role === 'companion') {
      console.log('Companion onboarding will come next.')
    }
  }


  // --------------------------------------------------
  // HOME
  // --------------------------------------------------

  if (screen === 'home') {
    return (
      <Home
        onStart={() => setScreen('role-selection')}
      />
    )
  }


  // --------------------------------------------------
  // ROLE SELECTION
  // --------------------------------------------------

  if (screen === 'role-selection') {
    return (
      <RoleSelection
        onSelectRole={handleRoleSelection}
        onBack={() => setScreen('home')}
      />
    )
  }


  // --------------------------------------------------
  // EMOTIONAL CHECK-IN
  // --------------------------------------------------

  if (screen === 'check-in') {
    return (
      <CheckIn
        onBack={() => setScreen('role-selection')}

        onContinue={(emotion) => {

          console.log('Selected emotional state:', emotion)

          // Save the emotion later in our backend.
          //
          // For now we only move to the next screen.
          setScreen('safety-check')
        }}
      />
    )
  }


  // --------------------------------------------------
  // SAFETY CHECK
  // --------------------------------------------------

  if (screen === 'safety-check') {
    return (
      <SafetyCheck
        onBack={() => setScreen('check-in')}

        onAnswer={(answer) => {

          console.log('Safety answer:', answer)

          // Safe users can continue normally.
          if (answer === 'safe') {
            setScreen('need-discovery')
          }

          // If the person is unsure or indicates
          // immediate danger, don't send them to
          // Companion matching.
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


  // --------------------------------------------------
  // SAFETY SUPPORT
  // --------------------------------------------------

  if (screen === 'safety-support') {
    return (
      <SafetySupport
        onBack={() => setScreen('safety-check')}
      />
    )
  }


  // --------------------------------------------------
  // NEED DISCOVERY
  // --------------------------------------------------

  if (screen === 'need-discovery') {
    return (
      <NeedDiscovery

        onBack={() => setScreen('safety-check')}

        onSelectNeed={(need) => {

          console.log('Selected support need:', need)

          // CONNECT route
          if (need === 'connect') {
            setScreen('connect')
          }

          // PROCESS will be implemented next.
          if (need === 'process') {
            console.log('PROCESS route will come next.')
          }

          // CALM will be implemented after PROCESS.
          if (need === 'calm') {
            console.log('CALM route will come next.')
          }

          // LUMI can later intelligently decide
          // the route when the user doesn't know.
          if (need === 'unknown') {
            console.log('LUMI will help decide the route.')
          }
        }}
      />
    )
  }


  // --------------------------------------------------
  // CONNECT
  // --------------------------------------------------

  if (screen === 'connect') {
    return (
      <Connect

        // Back → Need Discovery
        onBack={() => setScreen('need-discovery')}

        // User clicked "Request connection"
        onContinue={() => {

          console.log('Connection request sent.')

          // IMPORTANT:
          // We DO NOT open chat immediately.
          //
          // Matching ≠ consent.
          //
          // The Companion must accept first.
          setScreen('connection-consent')
        }}
      />
    )
  }

  // --------------------------------------------------
  // CONNECTION CONSENT
  // --------------------------------------------------

  if (screen === 'connection-consent') {
    return (
      <ConnectionConsent

        // Back → Connect screen
        onBack={() => setScreen('connect')}

        // User continues after understanding
        // the consent process.
        onAccept={() => {

          console.log('Waiting for Companion consent.')

          // For now we will go to a temporary
          // connection-pending screen.
          setScreen('companion-request')
        }}

        // User cancels the request.
        onDecline={() => {

          console.log('Connection request cancelled.')

          setScreen('need-discovery')
        }}
      />
    )
  }


  // --------------------------------------------------
  // CONNECTION PENDING
  // --------------------------------------------------

  if (screen === 'connection-pending') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcf8f5] px-5 text-[#29252d]">

        <div className="max-w-xl rounded-3xl border border-[#e8e0e9] bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">
            <Check size={26} />
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
            onClick={() => setScreen('need-discovery')}
            className="mt-7 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3540]"
          >
            Back to support options
          </button>

        </div>

      </main>
    )
  }

  // --------------------------------------------------
// COMPANION REQUEST
// --------------------------------------------------
//
// This represents the Companion's side of the system.
//
// In the real application this screen would appear
// when the backend tells the Companion that someone
// has requested a connection.
//
// For now we open it manually for frontend testing.
if (screen === 'companion-request') {
  return (
    <CompanionRequest

      // Back → previous screen
      onBack={() => setScreen('home')}

      // Companion accepted
      onAccept={() => {
        console.log('Companion accepted the connection.')

        setScreen('connection-established')
      }}

      // Companion declined
      onDecline={() => {
        console.log('Companion declined the connection.')

        setScreen('connection-declined')
      }}
    />
  )
}

// --------------------------------------------------
// CONNECTION ESTABLISHED
// --------------------------------------------------

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
          onClick={() => setScreen('chat')}
          className="mt-7 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3540]"
        >
          Open conversation
        </button>

      </div>

    </main>
  )
}


// --------------------------------------------------
// CONNECTION DECLINED
// --------------------------------------------------

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
          onClick={() => setScreen('home')}
          className="mt-7 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b3540]"
        >
          Return to LUMI
        </button>

      </div>

    </main>
  )
}

// --------------------------------------------------
// CHAT
// --------------------------------------------------

if (screen === 'chat') {
  return (
    <Chat

      // Back → connection established screen
      onBack={() => setScreen('connection-established')}

      // Leave conversation
      onLeave={() => {
        console.log('User left the conversation.')

        setScreen('need-discovery')
      }}
    />
  )
}
  return null
}

export default App