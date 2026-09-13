import {
  ArrowLeft,
  Check,
  Clock3,
  MessageCircle,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'

import Lumi from '../components/Lumi'

// TEMPORARY DATA
// Later this information will come from the backend.
//
// We are intentionally NOT showing:
// - real name
// - profile photo
// - exact location
// - followers
// - popularity
//
// This keeps the Companion system focused on
// support rather than social-media behaviour.
const companion = {
  name: 'LUMI Companion',
  experience: 'Has experience with loneliness',
  supportStyle: 'Prefers listening rather than giving advice',
  availability: 'Available now',
}

function ConnectionConsent({ onBack, onAccept, onDecline }) {
  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">

      {/* Header */}
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

      {/* Main content */}
      <section className="mx-auto mt-8 max-w-6xl">

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">

          {/* Lumi illustration */}
          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>

          {/* Right side */}
          <div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              Mutual connection
            </p>

            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Let's make sure you're both comfortable.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#716b75]">
              Your request has been sent. A connection only starts if
              the Companion also chooses to accept.
            </p>

            {/* Companion card */}
            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm sm:p-7">

              <div className="flex items-start gap-4">

                {/* Anonymous avatar */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">
                  <UserRound size={24} />
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="font-semibold">
                      {companion.name}
                    </h2>

                    <span className="rounded-full bg-[#e6f1ed] px-2.5 py-1 text-xs font-medium text-[#54786b]">
                      {companion.availability}
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-[#8a828d]">
                    Anonymous Companion
                  </p>

                </div>
              </div>

              {/* Why match */}
              <div className="mt-7">

                <h3 className="text-sm font-semibold">
                  Why this connection was suggested
                </h3>

                <div className="mt-4 space-y-3">

                  <div className="flex items-start gap-3">

                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#54786b]"
                    />

                    <p className="text-sm leading-6 text-[#716b75]">
                      {companion.experience}
                    </p>

                  </div>

                  <div className="flex items-start gap-3">

                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#54786b]"
                    />

                    <p className="text-sm leading-6 text-[#716b75]">
                      {companion.supportStyle}
                    </p>

                  </div>

                </div>

              </div>

              {/* Consent explanation */}
              <div className="mt-7 rounded-2xl bg-[#f8f4fa] p-4">

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#80668d]"
                  />

                  <div>

                    <p className="text-sm font-medium">
                      Your connection stays private
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7c747f]">
                      Neither person has to share their real name,
                      phone number, social media, exact location,
                      or other personal contact details.
                    </p>

                  </div>

                </div>

              </div>

              {/* What happens next */}
              <div className="mt-6 rounded-2xl border border-[#eee7ef] bg-[#fcf8f5] p-4">

                <div className="flex items-start gap-3">

                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-[#80668d]"
                  />

                  <div>

                    <p className="text-sm font-medium">
                      What happens next?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#7c747f]">
                      The Companion can accept or decline the request.
                      If they accept, you can start a protected LUMI
                      conversation.
                    </p>

                  </div>

                </div>

              </div>

              {/* Buttons */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                <button
                  onClick={onDecline}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#e5dfe6] bg-white px-5 py-4 text-sm font-medium text-[#716b75] transition hover:border-[#cfc5d2] hover:bg-[#faf8fb]"
                >
                  <X size={18} />
                  Cancel request
                </button>

                <button
                  onClick={onAccept}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#29252d] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#3b3540]"
                >
                  <MessageCircle size={18} />
                  Continue
                </button>

              </div>

            </div>

            {/* Safety note */}
            <div className="mt-5 flex items-start gap-3">

              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-[#9a7ba5]"
              />

              <p className="text-xs leading-5 text-[#958d97]">
                LUMI Companions are there to listen and share lived
                experience. They are not therapists and should not
                diagnose, treat, or take responsibility for someone's
                mental health.
              </p>

            </div>

          </div>
        </div>

      </section>
    </main>
  )
}

export default ConnectionConsent