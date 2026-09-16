import { ArrowLeft, Brain, Heart, Sparkles } from 'lucide-react'

function PersonalSupportProfile({
  profile,
  onBack,
  onContinue,
}) {

  // --------------------------------------------------
  // If there is not enough session history yet,
  // show a simple empty state.
  // --------------------------------------------------

  const hasHistory =
    profile &&
    profile.totalSessions > 0


  // --------------------------------------------------
  // EMPTY STATE
  // --------------------------------------------------

  if (!hasHistory) {
    return (
      <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

        <div className="mx-auto max-w-2xl">

          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
          >
            <ArrowLeft size={17} />
            Back
          </button>


          <div className="rounded-3xl border border-[#e8e0e9] bg-white p-8 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4edf7]">
              <Brain
                size={23}
                className="text-[#80668d]"
              />
            </div>


            <h1 className="mt-6 text-3xl font-semibold tracking-tight">
              Your LUMI pattern
            </h1>


            <p className="mt-4 leading-7 text-[#716b75]">
              As you use LUMI, we can learn which kinds
              of support you find useful during difficult
              moments.
            </p>


            <div className="mt-8 rounded-2xl bg-[#fcf8f5] p-5">

              <p className="text-sm font-medium text-[#514b54]">
                Nothing to show yet.
              </p>

              <p className="mt-2 text-sm leading-6 text-[#958d97]">
                Complete a support session and LUMI
                will start building your personal pattern.
              </p>

            </div>

          </div>

        </div>

      </main>
    )
  }


  // --------------------------------------------------
  // PROFILE WITH HISTORY
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">

      <div className="mx-auto max-w-2xl">

        {/* Back button */}

        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#716b75] transition hover:text-[#29252d]"
        >
          <ArrowLeft size={17} />
          Back
        </button>


        {/* Heading */}

        <div className="mb-8">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#92769d]">
            YOUR LUMI PATTERN
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            What seems to help you?
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-[#716b75]">
            These patterns come from your own LUMI
            check-ins and are meant to help personalize
            future support.
          </p>

        </div>


        {/* Session count */}

        <section className="rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4edf7]">
              <Sparkles
                size={22}
                className="text-[#80668d]"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold">
                {profile.totalSessions}
              </p>

              <p className="text-sm text-[#958d97]">
                completed support session
                {profile.totalSessions !== 1 ? 's' : ''}
              </p>
            </div>

          </div>

        </section>


        {/* Common emotional states */}

        {profile.commonEmotions &&
          profile.commonEmotions.length > 0 && (

          <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-center gap-3">

              <Heart
                size={20}
                className="text-[#80668d]"
              />

              <h2 className="text-lg font-semibold">
                You often check in feeling
              </h2>

            </div>


            <div className="mt-5 flex flex-wrap gap-2">

              {profile.commonEmotions.map((emotion) => (

                <span
                  key={emotion}
                  className="rounded-full bg-[#f4edf7] px-4 py-2 text-sm text-[#5f4c67]"
                >
                  {emotion}
                </span>

              ))}

            </div>

          </section>
        )}


        {/* Helpful support types */}

        {profile.helpfulSupport &&
          profile.helpfulSupport.length > 0 && (

          <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-center gap-3">

              <Brain
                size={20}
                className="text-[#80668d]"
              />

              <h2 className="text-lg font-semibold">
                Support you've found useful
              </h2>

            </div>


            <div className="mt-5 space-y-3">

              {profile.helpfulSupport.map((support) => (

                <div
                  key={support}
                  className="rounded-2xl border border-[#e8e0e9] bg-[#fcf8f5] p-4"
                >
                  <p className="text-sm font-medium text-[#514b54]">
                    {support}
                  </p>
                </div>

              ))}

            </div>

          </section>
        )}


        {/* Privacy explanation */}

        <section className="mt-6 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold">
            About your pattern
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#716b75]">
            LUMI uses your previous check-ins and
            support outcomes to understand what you
            personally found helpful.
          </p>

          <p className="mt-3 text-sm leading-6 text-[#958d97]">
            This is not a diagnosis or medical assessment.
            It is simply a record of your own reported
            experiences with LUMI.
          </p>

        </section>


        {/* Continue */}

        <button
          onClick={onContinue}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#3b3540]"
        >
          Continue
        </button>

      </div>

    </main>
  )
}

export default PersonalSupportProfile