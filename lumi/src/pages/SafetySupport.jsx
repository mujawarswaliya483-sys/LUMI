import { ArrowLeft, Phone, UserRound, ShieldAlert } from 'lucide-react'
import Lumi from '../components/Lumi'

// This screen is shown when the user indicates
// that they may need immediate human support.
//
// IMPORTANT:
// LUMI is NOT an emergency service.
// The purpose of this screen is to encourage
// the user to connect with a real person or
// appropriate emergency/professional support.
function SafetySupport({ onBack }) {

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">

      {/* ==================================================
          HEADER
          ================================================== */}

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


      {/* ==================================================
          MAIN CONTENT
          ================================================== */}

      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">


          {/* ==================================================
              LUMI CHARACTER
              ================================================== */}

          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>


          {/* ==================================================
              SAFETY MESSAGE
              ================================================== */}

          <div>

            {/* Safety label */}
            <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-[#9a6666]">

              <ShieldAlert size={17} />

              Immediate support

            </div>


            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              You don't have to handle this alone.
            </h1>


            <p className="mt-5 max-w-xl text-base leading-7 text-[#716b75]">
              Based on what you told LUMI, it may be important to
              connect with a real person who can support you right now.
            </p>


            {/* ==================================================
                TRUSTED PERSON
                ================================================== */}

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4e8e8] text-[#966565]">

                  <UserRound size={20} />

                </div>


                <div>

                  <h2 className="font-semibold">
                    Reach someone you trust
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#7c747f]">
                    Consider calling or staying with a trusted friend,
                    family member, mentor, teacher, or another person
                    who can be with you.
                  </p>

                </div>

              </div>

            </div>


            {/* ==================================================
                EMERGENCY SUPPORT
                ================================================== */}

            <div className="mt-4 rounded-3xl border border-[#eadede] bg-[#fffafa] p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4e8e8] text-[#966565]">

                  <Phone size={20} />

                </div>


                <div>

                  <h2 className="font-semibold">
                    If you are in immediate danger
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#7c747f]">
                    Contact your local emergency service or go to
                    the nearest emergency department. If possible,
                    stay with someone you trust rather than being alone.
                  </p>

                </div>

              </div>

            </div>


            {/* ==================================================
                IMPORTANT NOTE
                ================================================== */}

            <div className="mt-6 rounded-2xl bg-[#f1e7f5] px-5 py-4">

              <p className="text-sm leading-6 text-[#685b6d]">
                LUMI is a wellbeing support tool, not an emergency
                service or replacement for professional care.
              </p>

            </div>


            {/* Back option */}

            <button
              onClick={onBack}
              className="mt-6 text-sm font-medium text-[#80668d] transition hover:text-[#5f4c69]"
            >
              Go back
            </button>

          </div>

        </div>

      </section>

    </main>
  )
}

export default SafetySupport