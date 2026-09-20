import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Heart,
  Sparkles,
} from 'lucide-react'

import Lumi from '../components/Lumi'
import { getPersonalizedSuggestion } from '../utils/personalization'


function SupportRecommendation({
  checkInData,
  onBack,
  onSelectRoute,
}) {

  const personalizedSuggestion =
    getPersonalizedSuggestion()

  const personalizedEffectiveRoute =
    personalizedSuggestion?.effectiveRoute || null

  const personalizedEffectiveRouteCount =
    personalizedSuggestion?.effectiveRouteCount || 0

  const recommendations = []

  const intensity =
    checkInData.intensityBefore ?? 0


  // --------------------------------------------------
  // RULE 1
  // If the user is feeling alone or missing someone,
  // human connection can be a useful option.
  // --------------------------------------------------

  if (
    checkInData.emotion === 'alone' ||
    checkInData.emotion === 'missing-someone'
  ) {

    recommendations.push({
      id: 'connect',

      title:
        'Talk to someone who understands',

      description:
        'LUMI can help you find a LUMI Companion with a compatible experience.',

      icon: Heart,
    })
  }


  // --------------------------------------------------
  // RULE 2
  // If the user is overthinking or frustrated,
  // structured reflection can help them slow down
  // the thought.
  // --------------------------------------------------

  if (
    checkInData.emotion === 'overthinking' ||
    checkInData.emotion === 'frustrated' ||
    (
      intensity >= 3 &&
      intensity <= 6 &&
      checkInData.emotion === 'dont-know'
    )
  ) {

    recommendations.push({
      id: 'process',

      title:
        'Make sense of what is on your mind',

      description:
        'LUMI will guide you through a short structured reflection.',

      icon: Brain,
    })
  }


  // --------------------------------------------------
  // RULE 3
  // Higher intensity means calming support becomes
  // more relevant, regardless of the exact emotion.
  // --------------------------------------------------

  if (
    intensity >= 7 ||
    checkInData.emotion === 'overwhelmed' ||
    checkInData.emotion === 'stressed' ||
    checkInData.emotion === 'low'
  ) {

    recommendations.push({
      id: 'calm',

      title:
        'Take a calmer moment',

      description:
        intensity >= 7
          ? 'This moment feels quite heavy. You do not need to explain everything—let’s make the next minute a little quieter.'
          : 'You do not need to explain everything. Take one quiet minute with LUMI.',

      icon: Sparkles,
    })
  }


  // --------------------------------------------------
  // PERSONALIZATION
  //
  // LUMI first looks at what the user explicitly said
  // was helpful in previous sessions.
  //
  // If there is also a route that was followed by a
  // decrease in self-reported intensity, that becomes
  // an additional signal.
  // --------------------------------------------------

  if (personalizedSuggestion) {

    const helpfulRouteMap = {

      understood:
        'connect',

      'sorting-thoughts':
        'process',

      'calming-down':
        'calm',

      'having-space':
        'calm',

      'next-step':
        'process',
    }


    let suggestedRoute =
      helpfulRouteMap[
        personalizedSuggestion.value
      ]


    // If we don't know the route from the user's
    // "what helped" answer, use the route history.

    if (
      !suggestedRoute &&
      personalizedEffectiveRoute
    ) {

      suggestedRoute =
        personalizedEffectiveRoute
    }


    // Add the personalized route only when the
    // current rules have not already added it.

    if (
      suggestedRoute &&
      !recommendations.some(
        (item) =>
          item.id === suggestedRoute
      )
    ) {

      if (suggestedRoute === 'connect') {

        recommendations.push({

          id: 'connect',

          title:
            'Talk to someone who understands',

          description:
            personalizedSuggestion.type ===
              'helpful-support'
              ? 'You have previously found being understood helpful.'
              : 'This support route has been part of previous sessions where you reported lower intensity.',

          icon: Heart,
        })
      }


      if (suggestedRoute === 'process') {

        recommendations.push({

          id: 'process',

          title:
            'Make sense of what is on your mind',

          description:
            personalizedSuggestion.type ===
              'helpful-support'
              ? 'You have previously found sorting your thoughts helpful.'
              : 'This support route has been part of previous sessions where you reported lower intensity.',

          icon: Brain,
        })
      }


      if (suggestedRoute === 'calm') {

        recommendations.push({

          id: 'calm',

          title:
            'Take a calmer moment',

          description:
            personalizedSuggestion.type ===
              'helpful-support'
              ? 'You have previously found calming or having space helpful.'
              : 'This support route has been part of previous sessions where you reported lower intensity.',

          icon: Sparkles,
        })
      }
    }
  }


  // --------------------------------------------------
  // FALLBACK
  //
  // If no specific rule matched the current emotion,
  // give the user all three core routes.
  // --------------------------------------------------

  if (recommendations.length === 0) {

    recommendations.push(

      {
        id: 'connect',

        title:
          'Talk to someone who understands',

        description:
          'Find human understanding from a compatible LUMI Companion.',

        icon: Heart,
      },

      {
        id: 'process',

        title:
          'Make sense of what is on your mind',

        description:
          'Work through the thought with structured reflection.',

        icon: Brain,
      },

      {
        id: 'calm',

        title:
          'Take a calmer moment',

        description:
          'Give yourself a quiet minute without needing to explain.',

        icon: Sparkles,
      }
    )
  }


  // --------------------------------------------------
  // REMOVE DUPLICATES
  // --------------------------------------------------

  const uniqueRecommendations =
    recommendations
      .filter(
        (recommendation, index, array) =>
          index ===
          array.findIndex(
            (item) =>
              item.id === recommendation.id
          )
      )
      .slice(0, 3)


  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (

    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">

      <header className="mx-auto flex max-w-6xl items-center justify-between">

        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#716b75] transition hover:bg-white hover:text-[#29252d]"
        >

          <ArrowLeft size={18} />

          Back

        </button>


        <div className="text-lg font-semibold tracking-tight">
          lumi
        </div>


        <div className="w-16" />

      </header>


      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">

          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>


          <div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              LUMI SUGGESTION
            </p>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              You don't have to know what you need yet.
            </h1>


            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              Based on what you shared, here are a few kinds
              of support that may fit this moment.
            </p>


            {/* WHY LUMI SUGGESTED THESE */}

            <div className="mt-6 rounded-2xl border border-[#e8e0e9] bg-[#f8f3fa] p-4">

              <p className="text-sm font-semibold text-[#514b54]">
                Why LUMI suggested these
              </p>


              <p className="mt-2 text-sm leading-6 text-[#716b75]">

                You shared that you are feeling{' '}

                <span className="font-medium text-[#514b54]">

                  {checkInData.emotion === 'alone'
                    ? 'alone'
                    : checkInData.emotion === 'overthinking'
                      ? "unable to stop thinking"
                      : checkInData.emotion === 'missing-someone'
                        ? 'like you are missing someone'
                        : checkInData.emotion === 'overwhelmed'
                          ? 'overwhelmed'
                          : checkInData.emotion === 'frustrated'
                            ? 'frustrated'
                            : checkInData.emotion === 'stressed'
                              ? 'stressed'
                              : checkInData.emotion === 'low'
                                ? 'low'
                                : 'uncertain about what you need'}

                </span>

                {' '}and described the moment as{' '}

                <span className="font-medium text-[#514b54]">
                  {intensity}/10
                </span>

                .

              </p>


              <p className="mt-2 text-xs leading-5 text-[#958d97]">
                LUMI uses this information to suggest support options.
                It does not diagnose or make a medical judgment.
              </p>

            </div>


            {/* PERSONALIZATION INSIGHT */}

            {personalizedSuggestion && (
              <div className="mt-4 rounded-2xl border border-[#e8e0e9] bg-white p-4">

                <p className="text-sm font-semibold text-[#514b54]">
                  Something LUMI noticed
                </p>


                {personalizedSuggestion.type ===
                  'helpful-support' ? (

                  <p className="mt-2 text-sm leading-6 text-[#716b75]">

                    In your previous sessions, you found{' '}

                    <span className="font-medium text-[#514b54]">

                      {personalizedSuggestion.value ===
                        'understood'
                        ? 'being understood'
                        : personalizedSuggestion.value ===
                            'sorting-thoughts'
                          ? 'sorting your thoughts'
                          : personalizedSuggestion.value ===
                              'calming-down'
                            ? 'calming down'
                            : personalizedSuggestion.value ===
                                'having-space'
                              ? 'having some space'
                              : personalizedSuggestion.value ===
                                  'next-step'
                                ? 'having a next step'
                                : 'some support'}

                    </span>

                    {' '}helpful.

                  </p>

                ) : (

                  <p className="mt-2 text-sm leading-6 text-[#716b75]">

                    In{' '}

                    <span className="font-medium text-[#514b54]">
                      {personalizedEffectiveRouteCount}
                    </span>

                    {' '}
                    {personalizedEffectiveRouteCount === 1
                      ? 'previous session'
                      : 'previous sessions'}

                    , you reported lower intensity after using{' '}

                    <span className="font-medium text-[#514b54]">

                      {personalizedEffectiveRoute === 'connect'
                        ? 'CONNECT'
                        : personalizedEffectiveRoute === 'process'
                          ? 'PROCESS'
                          : 'CALM'}

                    </span>

                    .

                  </p>
                )}


                <p className="mt-2 text-xs leading-5 text-[#958d97]">
                  This reflects your previous self-reported experience.
                  It is not a medical prediction.
                </p>

              </div>
            )}


            {/* SUPPORT OPTIONS */}

            <div className="mt-8 space-y-4">

              {uniqueRecommendations.map(
                (recommendation) => {

                  const Icon =
                    recommendation.icon


                  return (

                    <button
                      key={recommendation.id}
                      onClick={() =>
                        onSelectRoute(
                          recommendation.id
                        )
                      }
                      className="group flex w-full items-center gap-5 rounded-3xl border border-[#e8e0e9] bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#cdb4db] hover:shadow-md sm:p-6"
                    >

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">

                        <Icon size={21} />

                      </div>


                      <div className="min-w-0 flex-1">

                        <h2 className="text-base font-semibold sm:text-lg">
                          {recommendation.title}
                        </h2>


                        <p className="mt-1 text-sm leading-6 text-[#7c747f]">
                          {recommendation.description}
                        </p>

                      </div>


                      <ArrowRight
                        size={19}
                        className="shrink-0 text-[#aaa2ad] transition group-hover:translate-x-1 group-hover:text-[#80668d]"
                      />

                    </button>

                  )
                }
              )}

            </div>


            <p className="mt-6 text-xs leading-5 text-[#958d97]">
              This is a suggestion, not a diagnosis.
              You are always in control of which support
              you choose.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}


export default SupportRecommendation