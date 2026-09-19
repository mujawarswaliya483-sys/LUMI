import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
} from 'lucide-react'

import { getPersonalizedSuggestion } from '../utils/personalization'

// ==================================================
// PERSONAL SUPPORT PROFILE
// ==================================================
//
// This screen displays patterns learned from the
// user's own completed LUMI sessions.
//
// IMPORTANT:
//
// These are self-reported patterns.
// They are NOT medical measurements or diagnoses.
// ==================================================

function PersonalSupportProfile({
  profile,
  onBack,
  onContinue,
}) {

    const personalizedSuggestion =
    getPersonalizedSuggestion()
  // ==================================================
  // LABEL HELPERS
  // ==================================================
  //
  // Our database/localStorage stores IDs such as:
  //
  // "overthinking"
  // "alone"
  // "process"
  //
  // We convert them into user-friendly text here.
  // ==================================================

  const emotionLabels = {

    alone: 'Feeling alone',

    overthinking: 'Overthinking',

    'missing-someone': 'Missing someone',

    overwhelmed: 'Feeling overwhelmed',

    frustrated: 'Feeling frustrated',

    stressed: 'Feeling stressed',

    low: 'Feeling low',

    'dont-want-to-talk': "Not wanting to talk",

    'dont-know': "Not knowing what to do",

  }


  const routeLabels = {

    connect: 'Human connection',

    process: 'Structured reflection',

    calm: 'Calming support',

  }


  const helpfulLabels = {

    'being-understood':
      'Being understood',

    'talking-to-someone':
      'Talking to someone',

    'sharing-my-experience':
      'Sharing your experience',

    'sorting-my-thoughts':
      'Sorting your thoughts',

    'calming-down':
      'Calming down',

    'having-some-space':
      'Having some space',

    'having-a-next-step':
      'Having a next step',

    breathing:
      'Slowing your breathing',

    surroundings:
      'Noticing your surroundings',

    'quiet-moment':
      'Having a quiet moment',

    'break-from-thought':
      'Taking a break from the thought',

    'nothing-in-particular':
      'Nothing in particular',

    'something-else':
      'Something else',

  }


  // ==================================================
  // EMPTY STATE
  // ==================================================
  //
  // If there are no completed sessions yet, there is
  // nothing meaningful to personalize.
  // ==================================================

  if (!profile || profile.totalSessions === 0) {

    return (
      <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

        <div className="mx-auto max-w-3xl">

          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
          >
            <ArrowLeft size={17} />
            Back
          </button>


          <div className="mt-16 rounded-3xl border border-[#e8e0e9] bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">
              <Heart size={28} />
            </div>


            <h1 className="mt-6 text-3xl font-semibold">
              Your support profile is still growing
            </h1>


            <p className="mx-auto mt-4 max-w-lg leading-7 text-[#716b75]">
              Complete a few LUMI sessions and we'll
              start showing patterns based on what you
              experience and what helps you.
            </p>


            <button
              onClick={onContinue}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#29252d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3b3540]"
            >
              Start a LUMI session
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </main>
    )
  }


  // ==================================================
  // TOP EMOTIONS
  // ==================================================

  const topEmotions =
    profile.commonEmotions.slice(0, 3)


  // ==================================================
  // TOP SUPPORT METHODS
  // ==================================================

  const topHelpfulSupport =
    profile.helpfulSupport.slice(0, 3)


  // ==================================================
  // TOP ROUTES
  // ==================================================

  const topRoutes =
    profile.commonRoutes.slice(0, 3)


  // ==================================================
  // DISPLAY AVERAGE
  // ==================================================

  const averageBefore =
    profile.averageIntensityBefore !== null
      ? profile.averageIntensityBefore.toFixed(1)
      : '—'


  const averageAfter =
    profile.averageIntensityAfter !== null
      ? profile.averageIntensityAfter.toFixed(1)
      : '—'


  const averageChange =
    profile.averageChange !== null
      ? profile.averageChange.toFixed(1)
      : '—'


  return (

    <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

      <div className="mx-auto max-w-4xl">

        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
        >
          <ArrowLeft size={17} />
          Back
        </button>


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mt-10">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            YOUR LUMI PROFILE
          </p>


          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Understanding what helps you
          </h1>


          <p className="mt-4 max-w-2xl leading-7 text-[#716b75]">
            LUMI looks at your own check-ins and session
            outcomes to understand what kinds of support
            have been useful for you.
          </p>

        </div>


        {/* ==========================================
            SESSION COUNT
        ========================================== */}

        <section className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">
              <Sparkles size={23} />
            </div>


            <div>

              <p className="text-sm text-[#958d97]">
                Completed LUMI sessions
              </p>

              <p className="mt-1 text-3xl font-semibold">
                {profile.totalSessions}
              </p>

            </div>

          </div>

        </section>


        {/* ==========================================
            EMOTIONAL PATTERNS
        ========================================== */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-semibold">
            What you've been experiencing
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            These are the emotional states you've
            selected most often.
          </p>


          <div className="mt-6 space-y-3">

            {topEmotions.map((item) => (

              <div
                key={item.value}
                className="flex items-center justify-between rounded-2xl bg-[#fcf8f5] px-4 py-3"
              >

                <span className="text-sm font-medium">
                  {emotionLabels[item.value] || item.value}
                </span>


                <span className="rounded-full bg-[#f1e7f5] px-3 py-1 text-xs font-medium text-[#80668d]">
                  {item.count}{' '}
                  {item.count === 1 ? 'session' : 'sessions'}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* ==========================================
            WHAT HELPS
        ========================================== */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-semibold">
            What seems to help you
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            Based on what you've selected after your
            LUMI sessions.
          </p>


          <div className="mt-6 space-y-3">

            {topHelpfulSupport.map((item) => (

              <div
                key={item.value}
                className="flex items-center justify-between rounded-2xl bg-[#fcf8f5] px-4 py-3"
              >

                <span className="text-sm font-medium">
                  {helpfulLabels[item.value] || item.value}
                </span>


                <span className="rounded-full bg-[#e9f1ed] px-3 py-1 text-xs font-medium text-[#54786b]">
                  {item.count}{' '}
                  {item.count === 1 ? 'time' : 'times'}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* ==========================================
            SUPPORT ROUTES
        ========================================== */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-semibold">
            Support you've used
          </h2>

          <div className="mt-6 space-y-3">

            {topRoutes.map((item) => (

              <div
                key={item.value}
                className="flex items-center justify-between rounded-2xl bg-[#fcf8f5] px-4 py-3"
              >

                <span className="text-sm font-medium">
                  {routeLabels[item.value] || item.value}
                </span>


                <span className="text-xs text-[#958d97]">
                  {item.count}{' '}
                  {item.count === 1 ? 'session' : 'sessions'}
                </span>

              </div>

            ))}

          </div>

        </section>


        {/* ==========================================
            INTENSITY PATTERN
        ========================================== */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-semibold">
            Your self-reported intensity
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#958d97]">
            These numbers describe your own ratings
            during LUMI sessions. They are not medical
            measurements.
          </p>


          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-[#fcf8f5] p-5">

              <p className="text-sm text-[#958d97]">
                Before support
              </p>

              <p className="mt-2 text-3xl font-semibold">
                {averageBefore}
              </p>

              <p className="mt-1 text-xs text-[#958d97]">
                average / 10
              </p>

            </div>


            <div className="rounded-2xl bg-[#fcf8f5] p-5">

              <p className="text-sm text-[#958d97]">
                After support
              </p>

              <p className="mt-2 text-3xl font-semibold">
                {averageAfter}
              </p>

              <p className="mt-1 text-xs text-[#958d97]">
                average / 10
              </p>

            </div>


            <div className="rounded-2xl bg-[#f1e7f5] p-5">

              <p className="text-sm text-[#80668d]">
                Average change
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#5f4c67]">
                {averageChange}
              </p>

              <p className="mt-1 text-xs text-[#80668d]">
                before − after
              </p>

            </div>

          </div>

        </section>

        {personalizedSuggestion && (
  <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-[#f8f3fa] p-6 shadow-sm sm:p-8">

    <div className="flex items-start gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white">
        <Sparkles
          size={20}
          className="text-[#80668d]"
        />
      </div>

      <div>

        <h2 className="text-lg font-semibold">
          Something LUMI noticed
        </h2>

        <p className="mt-2 leading-7 text-[#716b75]">
          {personalizedSuggestion.value === 'understood' &&
            `Feeling understood has helped you in ${personalizedSuggestion.count} previous ${
              personalizedSuggestion.count === 1
                ? 'session'
                : 'sessions'
            }.`
          }

          {personalizedSuggestion.value === 'sorting-thoughts' &&
            `Sorting your thoughts has helped you in ${personalizedSuggestion.count} previous ${
              personalizedSuggestion.count === 1
                ? 'session'
                : 'sessions'
            }.`
          }

          {personalizedSuggestion.value === 'calming-down' &&
            `Taking a calmer moment has helped you in ${personalizedSuggestion.count} previous ${
              personalizedSuggestion.count === 1
                ? 'session'
                : 'sessions'
            }.`
          }

          {personalizedSuggestion.value !== 'understood' &&
            personalizedSuggestion.value !== 'sorting-thoughts' &&
            personalizedSuggestion.value !== 'calming-down' &&
            `You have found "${personalizedSuggestion.value}" helpful in ${personalizedSuggestion.count} previous ${
              personalizedSuggestion.count === 1
                ? 'session'
                : 'sessions'
            }.`
          }
        </p>

        <p className="mt-3 text-xs leading-5 text-[#958d97]">
          This is based only on your own LUMI sessions.
          
        </p>

      </div>

    </div>

  </section>
)}

        {/* ==========================================
            PRIVACY
        ========================================== */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-[#f8f3fa] p-6 sm:p-8">

          <h2 className="text-lg font-semibold">
            Your data, your choice
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#716b75]">
            LUMI uses your session history to personalize
            future support. These patterns describe your
            own responses and are not a diagnosis.
          </p>

        </section>



        {/* ==========================================
            CONTINUE
        ========================================== */}

        <button
          onClick={onContinue}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#3b3540]"
        >
          Continue
          <ArrowRight size={17} />
        </button>

      </div>

    </main>
  )
}


export default PersonalSupportProfile