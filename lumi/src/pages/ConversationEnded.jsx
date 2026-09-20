import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShieldCheck,
} from 'lucide-react'
import Lumi from '../components/Lumi'

function ConversationEnded({
  onBack,
  onContinue,
}) {
  const handleContinue = () => {
    onContinue()
  }

  return (
    <div className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col">

        {/* Top navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#6f6575] transition hover:bg-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-sm font-medium text-[#8a7d91]">
            CONNECTION ENDED
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">

          <Lumi />

          <div className="-mt-2 max-w-lg">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee3f2]">
              <Heart
                size={24}
                className="text-[#80678b]"
              />
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              You made space for yourself.
            </h1>

            <p className="mt-4 text-base leading-7 text-[#756d78]">
              You don't need to have everything figured out.
              Taking a moment to talk, listen, or simply be heard
              can be enough for right now.
            </p>

          </div>

          {/* Gentle reminder */}
          <div className="mt-8 w-full max-w-lg rounded-3xl border border-[#e8dfe9] bg-white p-5 text-left">
            <div className="flex gap-3">

              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#80678b]"
              />

              <div>
                <p className="text-sm font-medium text-[#554b59]">
                  The connection has ended
                </p>

                <p className="mt-1 text-xs leading-5 text-[#817783]">
                  Your conversation does not need to continue.
                  You can reflect on how you feel now and tell LUMI
                  what was helpful.
                </p>
              </div>

            </div>
          </div>

          {/* Continue */}
          <button
            onClick={handleContinue}
            className="mt-7 flex w-full max-w-lg items-center justify-center gap-2 rounded-2xl bg-[#4f4654] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#403843]"
          >
            Check in with myself
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onBack}
            className="mt-4 text-xs font-medium text-[#8b7d8f] underline-offset-4 transition hover:text-[#5d5261] hover:underline"
          >
            Go back to the conversation
          </button>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] leading-5 text-[#958a98]">
          You are always in control of your connections on LUMI.
        </p>

      </div>
    </div>
  )
}

export default ConversationEnded