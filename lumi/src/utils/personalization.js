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
// ==================================================


// ==================================================
// COUNT FREQUENCY
// ==================================================

function countFrequency(items) {

  const counts = {}

  items.forEach((item) => {

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

export function buildPersonalSupportProfile() {

  const sessions = getSessions()


  // ----------------------------------------------
  // No previous sessions.
  // ----------------------------------------------

  if (sessions.length === 0) {

    return {

      totalSessions: 0,

      commonEmotions: [],

      helpfulSupport: [],

      commonRoutes: [],

      recommendedRoutesUsed: [],

      effectiveRoutes: [],

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
  // RECOMMENDED ROUTES USED
  // ==================================================

  const recommendedRoutes =
    sessions
      .filter(
        (session) =>
          session.routeSource === 'recommended'
      )
      .map(
        (session) =>
          session.route
      )

  const recommendedRouteCounts =
    countFrequency(recommendedRoutes)

  const recommendedRoutesUsed =
    sortByFrequency(
      recommendedRouteCounts
    )


  // ==================================================
  // INTENSITY
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
  // SESSION-BY-SESSION CHANGE
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
  // EFFECTIVE SUPPORT ROUTES
  // ==================================================
  //
  // This does NOT mean the route is medically
  // effective.
  //
  // It only means the user reported lower intensity
  // after those particular sessions.
  // ==================================================

  const effectiveRoutes =
    sessionsWithBoth
      .filter(
        (session) =>
          session.intensityAfter <
          session.intensityBefore
      )
      .map(
        (session) =>
          session.route
      )

  const effectiveRouteCounts =
    countFrequency(effectiveRoutes)

  const effectiveRoutesSorted =
    sortByFrequency(
      effectiveRouteCounts
    )


  // ==================================================
  // RETURN PERSONAL PROFILE
  // ==================================================

  return {

    totalSessions:
      sessions.length,

    commonEmotions,

    helpfulSupport,

    commonRoutes,

    recommendedRoutesUsed,

    effectiveRoutes:
      effectiveRoutesSorted,

    averageIntensityBefore,

    averageIntensityAfter,

    averageChange,

  }
}


// ==================================================
// GET PERSONALIZED SUGGESTION
// ==================================================
//
// Priority:
//
// 1. What the user explicitly said helped.
// 2. Routes where self-reported intensity decreased.
//
// This does NOT automatically force a route.
// ==================================================

export function getPersonalizedSuggestion() {

  const profile =
    buildPersonalSupportProfile()


  // ----------------------------------------------
  // No previous sessions.
  // ----------------------------------------------

  if (profile.totalSessions === 0) {
    return null
  }


  // ==================================================
  // PRIORITY 1:
  // USER'S EXPLICIT HELPFUL FEEDBACK
  // ==================================================

  if (
    profile.helpfulSupport.length > 0
  ) {

    // FIX:
    // Get the most frequently reported helpful
    // support option before using it below.

    const mostHelpful =
      profile.helpfulSupport[0]


    const mostEffective =
      profile.effectiveRoutes.length > 0
        ? profile.effectiveRoutes[0]
        : null


    return {

      type:
        'helpful-support',

      value:
        mostHelpful.value,

      count:
        mostHelpful.count,

      effectiveRoute:
        mostEffective?.value || null,

      effectiveRouteCount:
        mostEffective?.count || 0,

    }
  }


  // ==================================================
  // PRIORITY 2:
  // EFFECTIVE ROUTE
  // ==================================================

  if (
    profile.effectiveRoutes.length > 0
  ) {

    const mostEffectiveRoute =
      profile.effectiveRoutes[0]


    return {

      type:
        'effective-route',

      value:
        mostEffectiveRoute.value,

      count:
        mostEffectiveRoute.count,

      effectiveRoute:
        mostEffectiveRoute.value,

      effectiveRouteCount:
        mostEffectiveRoute.count,

    }
  }


  // ----------------------------------------------
  // No useful personalization signal yet.
  // ----------------------------------------------

  return null
}