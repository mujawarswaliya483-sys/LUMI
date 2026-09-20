import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

function CompanionRequest({
  companionId,
  onBack,
  onContinue,
}) {

  const handleContinue = () => {

    console.log(
      'Connection request confirmed:',
      companionId
    )

    onContinue(companionId)
  }

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-10 text-[#29252d]">

      <div className="mx-auto max-w-4xl">

        {/* ------------------------------------------
            HEADER
        ------------------------------------------ */}

        <div className="text-center">

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#9277a0]">
            CONNECTION REQUEST
          </p>

          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Your request is ready.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#716b75] sm:text-base">
            You are about to send a connection request
            to a LUMI Companion who has chosen to support
            people with similar experiences.
          </p>

        </div>


        {/* ------------------------------------------
            MAIN CARD
        ------------------------------------------ */}

        <div className="mt-12 rounded-[32px] border border-[#e8e0e9] bg-white p-7 shadow-sm sm:p-10">

          {/* ----------------------------------------
              COMPANION SUMMARY
          ---------------------------------------- */}

          <div className="rounded-3xl border border-[#e8e0e9] bg-[#faf7fb] p-6">

            <p className="text-sm font-medium uppercase tracking-wide text-[#9277a0]">
              LUMI COMPANION
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Someone who chose to listen
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#716b75]">
              This Companion has opted into supporting
              people who may be going through experiences
              similar to theirs.
            </p>

          </div>


          {/* ----------------------------------------
              WHAT HAPPENS NEXT
          ---------------------------------------- */}

          <div className="mt-8">

            <h2 className="text-xl font-semibold">
              What happens next
            </h2>

            <div className="mt-6 space-y-6">

              {/* STEP 1 */}

              <div className="flex gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1e7f5] text-[#80668d]">
                  <CheckCircle2 size={19} />
                </div>

                <div>

                  <h3 className="font-medium">
                    Send the connection request
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#716b75]">
                    The Companion will be able to decide
                    whether they are comfortable connecting.
                  </p>

                </div>

              </div>


              {/* STEP 2 */}

              <div className="flex gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1e7f5] text-[#80668d]">
                  <CheckCircle2 size={19} />
                </div>

                <div>

                  <h3 className="font-medium">
                    Wait for mutual acceptance
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#716b75]">
                    A conversation will not begin unless
                    both people agree to connect.
                  </p>

                </div>

              </div>


              {/* STEP 3 */}

              <div className="flex gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1e7f5] text-[#80668d]">
                  <CheckCircle2 size={19} />
                </div>

                <div>

                  <h3 className="font-medium">
                    Start the supported conversation
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#716b75]">
                    If both people agree, LUMI will open
                    the conversation.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ----------------------------------------
              PRIVACY / SAFETY NOTE
          ---------------------------------------- */}

          <div className="mt-8 rounded-3xl border border-[#eadfea] bg-[#faf6fb] p-5">

            <div className="flex gap-4">

              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-[#80668d]"
              />

              <div>

                <h3 className="font-semibold">
                  You stay in control
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#716b75]">
                  You can leave the conversation at any
                  time. Do not share personal information
                  you are not comfortable sharing.
                </p>

              </div>

            </div>

          </div>


          {/* ----------------------------------------
              BUTTONS
          ---------------------------------------- */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              type="button"
              onClick={onBack}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#dfd4e1] bg-white px-6 py-4 text-sm font-medium text-[#51485a] transition hover:bg-[#faf7fb]"
            >

              <ArrowLeft size={18} />

              Go back

            </button>


            <button
              type="button"
              onClick={handleContinue}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540]"
            >

              Send connection request

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </main>
  )
}

export default CompanionRequest