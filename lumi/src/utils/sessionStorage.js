// =====================================================
// LUMI SESSION STORAGE
// =====================================================
//
// This file contains the functions responsible for
// saving and reading LUMI session history.
//
// For the prototype we use browser localStorage.
//
// Later this can be replaced with API calls such as:
//
// POST /api/session
// GET  /api/user/support-profile
//
// without changing the UI components.
//

const STORAGE_KEY = 'lumi_session_history'


// =====================================================
// GET ALL SAVED SESSIONS
// =====================================================

export function getSessions() {

  // localStorage stores everything as strings.
  const savedData = localStorage.getItem(STORAGE_KEY)


  // If nothing has been saved yet,
  // return an empty array.
  if (!savedData) {
    return []
  }


  try {

    // Convert the JSON string back into
    // a JavaScript array.
    return JSON.parse(savedData)

  } catch (error) {

    // If stored data is somehow corrupted,
    // don't crash the application.
    console.error(
      'Could not read LUMI session history:',
      error
    )

    return []
  }
}


// =====================================================
// SAVE ONE NEW SESSION
// =====================================================

export function saveSession(session) {

  // First get existing sessions.
  const existingSessions = getSessions()


  // Add the new session.
  const updatedSessions = [
    ...existingSessions,
    {
      ...session,

      // Give every session a unique ID.
      id: crypto.randomUUID(),

      // Save when the session happened.
      createdAt: new Date().toISOString(),
    },
  ]


  // Convert the JavaScript array into JSON
  // because localStorage only stores strings.
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedSessions)
  )


  // Return the updated list.
  return updatedSessions
}


// =====================================================
// DELETE ALL SESSION HISTORY
// =====================================================

export function clearSessions() {

  localStorage.removeItem(STORAGE_KEY)
}