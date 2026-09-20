import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
} from 'lucide-react'

import { getPersonalizedSuggestion } from '../utils/personalization'


function PersonalSupportProfile({
  profile,
  onBack,
  onContinue,
}) {

  // --------------------------------------------------
  // Convert stored IDs into user-friendly labels.
  // --------------------------------------------------

  const emotionLabels = {
    alone: 'Feeling alone',
    overthinking: "Can't stop thinking",
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
    understood: 'Being understood',
    'sorting-thoughts': 'Sorting my thoughts',
    'calming-down': 'Calming down',
    'having-space': 'Having some space',
    'next-step': 'Having a next step',
    'something-else': 'Something else',
  }


  // --------------------------------------------------
  // Get LUMI's personalized suggestion.
  // --------------------------------------------------

  const personalizedSuggestion =
    getPersonalizedSuggestion()


  // --------------------------------------------------
  // Empty profile state.
  // --------------------------------------------------

  if (profile.totalSessions === 0) {

    return (
      <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

        <div className="mx-auto max-w-3xl">

          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
          >
            <ArrowLeft size={17} />
            Back
          </button>


          <div className="rounded-3xl border border-[#e8e0e9] bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4edf7]">
              <Heart
                size={28}
                className="text-[#80668d]"
              />
            </div>


            <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
              YOUR SUPPORT PROFILE
            </p>


            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              LUMI is still learning what helps you.
            </h1>


            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#716b75]">
              Complete a few LUMI sessions and your profile will
              gradually show patterns in the kind of support that
              feels useful to you.
            </p>


            <button
              onClick={onContinue}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#3b3540]"
            >
              Continue
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </main>
    )
  }


  // --------------------------------------------------
  // Main profile.
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

      <div className="mx-auto max-w-4xl">

        {/* -------------------------------------------- */}
        {/* Back button */}
        {/* -------------------------------------------- */}

        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
        >
          <ArrowLeft size={17} />
          Back
        </button>


        {/* -------------------------------------------- */}
        {/* Header */}
        {/* -------------------------------------------- */}

        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            YOUR SUPPORT PROFILE
          </p>


          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            What LUMI has learned about your support preferences
          </h1>


          <p className="mt-4 max-w-2xl leading-7 text-[#716b75]">
            This profile is built from your own LUMI sessions.
            It helps you notice what kinds of support have felt
            useful to you over time.
          </p>

        </div>


        {/* -------------------------------------------- */}
        {/* Total sessions */}
        {/* -------------------------------------------- */}

        <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4edf7]">

              <Heart
                size={22}
                className="text-[#80668d]"
              />

            </div>


            <div>

              <p className="text-sm text-[#958d97]">
                Sessions completed
              </p>

              <p className="mt-1 text-3xl font-semibold">
                {profile.totalSessions}
              </p>

            </div>

          </div>

        </section>


        {/* -------------------------------------------- */}
        {/* Personalized insight */}
        {/* -------------------------------------------- */}

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
                    `Being understood has helped you in ${personalizedSuggestion.count} previous ${
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
                    `Calming down has helped you in ${personalizedSuggestion.count} previous ${
                      personalizedSuggestion.count === 1
                        ? 'session'
                        : 'sessions'
                    }.`
                  }


                  {personalizedSuggestion.value === 'having-space' &&
                    `Having some space has helped you in ${personalizedSuggestion.count} previous ${
                      personalizedSuggestion.count === 1
                        ? 'session'
                        : 'sessions'
                    }.`
                  }


                  {personalizedSuggestion.value === 'next-step' &&
                    `Having a next step has helped you in ${personalizedSuggestion.count} previous ${
                      personalizedSuggestion.count === 1
                        ? 'session'
                        : 'sessions'
                    }.`
                  }


                  {personalizedSuggestion.value === 'something-else' &&
                    `Something else has helped you in ${personalizedSuggestion.count} previous ${
                      personalizedSuggestion.count === 1
                        ? 'session'
                        : 'sessions'
                    }.`
                  }

                </p>


                <p className="mt-3 text-xs leading-5 text-[#958d97]">
                  This is based only on your own LUMI sessions.
                  It is not a medical assessment.
                </p>

              </div>

            </div>

          </section>

        )}


        {/* -------------------------------------------- */}
        {/* Pattern cards */}
        {/* -------------------------------------------- */}

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Common emotions */}

          <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Common emotional states
            </h2>


            <p className="mt-2 text-sm leading-6 text-[#958d97]">
              States you've selected most often.
            </p>


            <div className="mt-6 space-y-3">

              {profile.commonEmotions.length === 0 ? (

                <p className="text-sm text-[#958d97]">
                  Not enough data yet.
                </p>

              ) : (

                profile.commonEmotions
                  .slice(0, 5)
                  .map((item) => (

                    <div
                      key={item.value}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-[#fcf8f5] px-4 py-3"
                    >

                      <span className="text-sm font-medium text-[#514b54]">
                        {emotionLabels[item.value] || item.value}
                      </span>


                      <span className="shrink-0 text-xs text-[#958d97]">
                        {item.count}
                      </span>

                    </div>

                  ))

              )}

            </div>

          </section>


          {/* Helpful support */}

          <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Helpful support
            </h2>


            <p className="mt-2 text-sm leading-6 text-[#958d97]">
              What you've said helped after sessions.
            </p>


            <div className="mt-6 space-y-3">

              {profile.helpfulSupport.length === 0 ? (

                <p className="text-sm text-[#958d97]">
                  Not enough data yet.
                </p>

              ) : (

                profile.helpfulSupport
                  .slice(0, 5)
                  .map((item) => (

                    <div
                      key={item.value}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-[#fcf8f5] px-4 py-3"
                    >

                      <span className="text-sm font-medium text-[#514b54]">
                        {helpfulLabels[item.value] || item.value}
                      </span>


                      <span className="shrink-0 text-xs text-[#958d97]">
                        {item.count}
                      </span>

                    </div>

                  ))

              )}

            </div>

          </section>

          <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm">

  <h2 className="text-lg font-semibold">
    LUMI recommendations
  </h2>

  <p className="mt-2 text-sm leading-6 text-[#958d97]">
    Support options you chose after asking LUMI to help you decide.
  </p>

  <div className="mt-6 space-y-3">

    {profile.recommendedRoutesUsed.length === 0 ? (

      <p className="text-sm text-[#958d97]">
        No recommendation patterns yet.
      </p>

    ) : (

      profile.recommendedRoutesUsed
        .slice(0, 5)
        .map((item) => (

          <div
            key={item.value}
            className="flex items-center justify-between gap-4 rounded-2xl bg-[#fcf8f5] px-4 py-3"
          >

            <span className="text-sm font-medium text-[#514b54]">

              {routeLabels[item.value] || item.value}

            </span>

            <span className="shrink-0 text-xs text-[#958d97]">
              {item.count}
            </span>

          </div>

        ))

    )}

  </div>

</section>

          {/* Common routes */}

          <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Support routes
            </h2>


            <p className="mt-2 text-sm leading-6 text-[#958d97]">
              Ways you've chosen to receive support.
            </p>


            <div className="mt-6 space-y-3">

              {profile.commonRoutes.length === 0 ? (

                <p className="text-sm text-[#958d97]">
                  Not enough data yet.
                </p>

              ) : (

                profile.commonRoutes
                  .slice(0, 5)
                  .map((item) => (

                    <div
                      key={item.value}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-[#fcf8f5] px-4 py-3"
                    >

                      <span className="text-sm font-medium text-[#514b54]">
                        {routeLabels[item.value] || item.value}
                      </span>


                      <span className="shrink-0 text-xs text-[#958d97]">
                        {item.count}
                      </span>

                    </div>

                  ))

              )}

            </div>

          </section>

        </div>


        {/* -------------------------------------------- */}
        {/* Intensity summary */}
        {/* -------------------------------------------- */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            Your self-reported intensity
          </h2>


          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#958d97]">
            These numbers describe how heavy your moments felt
            according to your own 0–10 check-ins.
          </p>


          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-[#fcf8f5] p-5">

              <p className="text-sm text-[#958d97]">
                Before support
              </p>


              <p className="mt-2 text-2xl font-semibold">

                {profile.averageIntensityBefore !== null
                  ? profile.averageIntensityBefore.toFixed(1)
                  : '—'
                }

              </p>

            </div>


            <div className="rounded-2xl bg-[#fcf8f5] p-5">

              <p className="text-sm text-[#958d97]">
                After support
              </p>


              <p className="mt-2 text-2xl font-semibold">

                {profile.averageIntensityAfter !== null
                  ? profile.averageIntensityAfter.toFixed(1)
                  : '—'
                }

              </p>

            </div>


            <div className="rounded-2xl bg-[#fcf8f5] p-5">

              <p className="text-sm text-[#958d97]">
                Average change
              </p>


              <p className="mt-2 text-2xl font-semibold">

                {profile.averageChange !== null
                  ? profile.averageChange > 0
                    ? `-${profile.averageChange.toFixed(1)}`
                    : profile.averageChange.toFixed(1)
                  : '—'
                }

              </p>

            </div>

          </div>


          <p className="mt-5 text-xs leading-5 text-[#958d97]">
            A lower number after a session reflects your own
            self-reported experience. It does not establish
            medical effectiveness.
          </p>

        </section>


        {/* -------------------------------------------- */}
        {/* Privacy */}
        {/* -------------------------------------------- */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            Your data and privacy
          </h2>


          <p className="mt-3 leading-7 text-[#716b75]">
            LUMI builds this profile from the information you
            choose to provide during your sessions. The profile
            is intended to help personalize your experience,
            not to diagnose or label you.
          </p>


          <p className="mt-3 leading-7 text-[#716b75]">
            You should be able to review, manage, and delete
            your support history as the product develops.
          </p>

        </section>


        {/* -------------------------------------------- */}
        {/* Continue */}
        {/* -------------------------------------------- */}

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