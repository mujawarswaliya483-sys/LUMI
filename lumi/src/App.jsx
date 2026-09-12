// useState lets React remember information that can change,
// such as which screen the user is currently viewing.
import { useState } from 'react'

// Import our different pages/components.
import Home from './pages/Home'
import RoleSelection from './pages/RoleSelection'
import CheckIn from './pages/CheckIn'
import SafetyCheck from './pages/SafetyCheck'

function App() {

  // `screen` stores the current screen.
  //
  // At the beginning:
  // screen = "home"
  //
  // Later, when we call setScreen("role-selection"),
  // React will show the RoleSelection component.
  const [screen, setScreen] = useState('home')


  // This will store whether the person wants support
  // or wants to become a LUMI Companion.
  //
  // It starts as null because nothing has been selected yet.
  const [userRole, setUserRole] = useState(null)


  // This function runs when the user selects
  // an option on the RoleSelection screen.
  const handleRoleSelection = (role) => {

    // Save the selected role.
    setUserRole(role)

    // Show the selected role in the browser console.
    // This is useful while developing and debugging.
    console.log('Selected LUMI role:', role)

    // ==================================================
// CHECK-IN SCREEN
// ==================================================
//
// This screen appears after the user chooses:
// "I need support"
//
// The CheckIn component will send the selected
// emotional state back to this App component.
if (screen === 'check-in') {
  return (
    <CheckIn

      // If the user presses Back on CheckIn,
      // return to RoleSelection.
      onBack={() => setScreen('role-selection')}

      // This receives the emotional state selected
      // by the user.
      onContinue={(emotion) => {

        // For now, just show the value in the console.
        //
        // Example:
        // "alone"
        // "overthinking"
        // "stressed"
        console.log('Selected emotional state:', emotion)

        // We are NOT moving to the next screen yet.
        //
        // First we will build the Safety Check.
      }}
    />
  )
}

    // IMPORTANT:
    //
    // We are NOT navigating anywhere yet.
    //
    // We will create the Support Check-In and
    // Companion Onboarding screens next.
    //
    // For now, we simply store the selected role.
  }


  if (screen === 'safety-check') {
  return (
    <SafetyCheck
      onBack={() => setScreen('check-in')}
      onAnswer={(answer) => {
        console.log('Safety answer:', answer)

        if (answer === 'safe') {
          setScreen('need-discovery')
        }

        if (answer === 'unsure' || answer === 'immediate-help') {
          setScreen('safety-support')
        }
      }}
    />
  )
}

  // ==================================================
  // HOME SCREEN
  // ==================================================

  if (screen === 'home') {
    return (
      <Home
        // We give Home a function called `onStart`.

        // When the user clicks the main button,
        // this function changes the screen from:
        //
        // "home"
        //
        // to:
        //
        // "role-selection"
        onStart={() => setScreen('role-selection')}
      />
    )
  }


  // ==================================================
  // ROLE SELECTION SCREEN
  // ==================================================

  if (screen === 'role-selection') {
    return (
      <RoleSelection

        // Give RoleSelection the function that handles
        // the selected role.
        onSelectRole={handleRoleSelection}

        // If the user presses Back,
        // return to the Home screen.
        onBack={() => setScreen('home')}
      />
    )
  }

  // ==================================================
// CHECK-IN SCREEN
// ==================================================
//
// This screen appears after the user chooses:
// "I need support"
//
// The CheckIn component will send the selected
// emotional state back to this App component.
if (screen === 'check-in') {
  return (
    <CheckIn

      // If the user presses Back on CheckIn,
      // return to RoleSelection.
      onBack={() => setScreen('role-selection')}

      // This receives the emotional state selected
      // by the user.
      onContinue={(emotion) => {

        // For now, just show the value in the console.
        //
        // Example:
        // "alone"
        // "overthinking"
        // "stressed"
        console.log('Selected emotional state:', emotion)

        // We are NOT moving to the next screen yet.
        //
        // First we will build the Safety Check.
      }}
    />
  )
}

  // If React doesn't recognize the current screen,
  // don't render anything.
  return null
}


export default App