import { getSessions } from './sessionStorage'


// ==================================================
// PERSONALIZATION UTILITIES
// ==================================================
//
// This file converts LUMI's saved session history
// into simple personal support patterns.
//
// IMPORTANT:
//
// This is NOT a medical diagnosis system.
//
// It only summarizes what the user has reported
// during their own LUMI sessions.
//
// Example:
//
// User completes 5 sessions:
//
// overthinking → PROCESS → sorting thoughts helped
// alone       → CONNECT → being understood helped
// stressed    → CALM    → calming helped
//
// LUMI can then show:
//
// Common emotional states:
// - overthinking
// - feeling alone
//
// Helpful support:
// - sorting thoughts
// - being understood
//
// ==================================================


// COUNT FREQUENCY
// ==================================================
//
// Example:
//
// ["alone", "alone", "stressed", "alone"]
//
// becomes:
//
// {
//   alone: 3,
//   stressed: 1
// }
//
// This helps us discover repeated patterns.
// ==================================================

function countFrequency(items) {

  const counts = {}

  items.forEach((item) => {

    // Ignore empty values.

    if (!item) {
      return
    }

    counts[item] =
      (counts[item] || 0) + 1
  })

  return counts
}


// ==================================================
// SORT BY FREQUENCY
// ==================================================
//
// Converts:
//
// {
//   alone: 3,
//   stressed: 1,
//   overthinking: 2
// }
//
// into:
//
// [
//   { value: "alone", count: 3 },
//   { value: "overthinking", count: 2 },
//   { value: "stressed", count: 1 }
// ]
// ==================================================

function sortByFrequency(counts) {

  return Object.entries(counts)

    .map(([value, count]) => ({
      value,
      count,
    }))

    .sort((a, b) =>
      b.count - a.count
    )
}


// ==================================================
// BUILD PERSONAL SUPPORT PROFILE
// ==================================================
//
// This is the main function.
//
// It reads all completed sessions and creates a
// simple profile that the UI can understand.
// ==================================================

export function buildPersonalSupportProfile() {

  // ----------------------------------------------
  // Get all sessions saved in localStorage.
  // ----------------------------------------------

  const sessions = getSessions()


  // ----------------------------------------------
  // If the user has never completed a session,
  // return an empty profile.
  // ----------------------------------------------

  if (sessions.length === 0) {

    return {

      totalSessions: 0,

      commonEmotions: [],

      helpfulSupport: [],

      commonRoutes: [],

      averageIntensityBefore: null,

      averageIntensityAfter: null,

      averageChange: null,

    }
  }

  

  // ==================================================
  // EMOTIONAL PATTERNS
  // ==================================================

  const emotions = sessions.map(
    (session) =>
      session.emotion
  )

  const emotionCounts =
    countFrequency(emotions)

  const commonEmotions =
    sortByFrequency(emotionCounts)


  // ==================================================
  // WHAT HELPED
  // ==================================================

  const helpfulAnswers =
    sessions.map(
      (session) =>
        session.whatHelped
    )

  const helpfulCounts =
    countFrequency(helpfulAnswers)

  const helpfulSupport =
    sortByFrequency(helpfulCounts)


  // ==================================================
  // SUPPORT ROUTES
  // ==================================================

  const routes =
    sessions.map(
      (session) =>
        session.route
    )

  const routeCounts =
    countFrequency(routes)

  const commonRoutes =
    sortByFrequency(routeCounts)


  // ==================================================
  // INTENSITY
  // ==================================================
  //
  // We calculate averages from the user's own
  // self-reported 0–10 ratings.
  //
  // These are NOT medical measurements.
  // ==================================================

  const sessionsWithBefore =
    sessions.filter(
      (session) =>
        typeof session.intensityBefore === 'number'
    )

  const sessionsWithAfter =
    sessions.filter(
      (session) =>
        typeof session.intensityAfter === 'number'
    )


  const averageIntensityBefore =
    sessionsWithBefore.length > 0
      ? sessionsWithBefore.reduce(
          (total, session) =>
            total + session.intensityBefore,
          0
        ) / sessionsWithBefore.length
      : null


  const averageIntensityAfter =
    sessionsWithAfter.length > 0
      ? sessionsWithAfter.reduce(
          (total, session) =>
            total + session.intensityAfter,
          0
        ) / sessionsWithAfter.length
      : null


  // ==================================================
  // AVERAGE SELF-REPORTED CHANGE
  // ==================================================
  //
  // Positive value:
  //
  // before > after
  //
  // Negative value:
  //
  // after > before
  //
  // Again, this describes self-reported session
  // changes. It does NOT establish clinical efficacy.
  // ==================================================

  const sessionsWithBoth =
    sessions.filter(
      (session) =>
        typeof session.intensityBefore === 'number' &&
        typeof session.intensityAfter === 'number'
    )


  const averageChange =
    sessionsWithBoth.length > 0
      ? sessionsWithBoth.reduce(
          (total, session) =>
            total +
            (
              session.intensityBefore -
              session.intensityAfter
            ),
          0
        ) / sessionsWithBoth.length
      : null


  // ==================================================
  // RETURN PERSONAL PROFILE
  // ==================================================

    return {

    totalSessions:
      sessions.length,

    commonEmotions,

    helpfulSupport,

    commonRoutes,

    averageIntensityBefore,

    averageIntensityAfter,

    averageChange,

  }
}


export function getPersonalizedSuggestion() {

  const profile = buildPersonalSupportProfile()

  if (profile.totalSessions === 0) {
    return null
  }

  if (profile.helpfulSupport.length === 0) {
    return null
  }

  const mostHelpful =
    profile.helpfulSupport[0]

  return {
    type: 'helpful-support',
    value: mostHelpful.value,
    count: mostHelpful.count,
  }
}