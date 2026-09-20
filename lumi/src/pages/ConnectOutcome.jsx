import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
} from 'lucide-react'
import Lumi from '../components/Lumi'

function ConnectOutcome({
  intensityBefore,
  onBack,
  onContinue,
}) {
  const helpfulOptions = [
    {
      id: 'understood',
      label: 'Being understood',
    },
    {
      id: 'talking-to-someone',
      label: 'Talking to someone',
    },
    {
      id: 'sharing-experience',
      label: 'Sharing my experience',
    },
    {
      id: 'having-space',
      label: 'Having some space',
    },
    {
      id: 'nothing',
      label: 'Nothing in particular',
    },
  ]

  const [intensityAfter, setIntensityAfter] = useState(null)
  const [whatHelped, setWhatHelped] = useState('')

  const handleContinue = () => {
    if (intensityAfter === null || !whatHelped) return

    onContinue({
      intensityAfter,
      whatHelped,
    })
  }

  return (
    <div className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#6f6575] transition hover:bg-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-sm font-medium text-[#8a7d91]">
            CHECK-IN
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-[2rem] border border-[#e8dfe9] bg-white p-6 shadow-[0_20px_50px_rgba(90,65,100,0.06)] sm:p-9">

          {/* Lumi */}
          <div className="flex justify-center">
            <Lumi />
          </div>

          <div className="-mt-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee3f2]">
              <Heart
                size={23}
                className="text-[#80678b]"
              />
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight">
              How are you feeling now?
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#756d78]">
              There is no right answer. This helps LUMI understand
              what kind of support was useful to you.
            </p>
          </div>

          {/* Intensity */}
          <div className="mt-9">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  How heavy does it feel now?
                </h2>

                <p className="mt-1 text-xs text-[#8a7d91]">
                  Choose a number from 0 to 10.
                </p>
              </div>

              {intensityAfter !== null && (
                <div className="text-2xl font-semibold text-[#80678b]">
                  {intensityAfter}
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-11 gap-1.5 sm:gap-2">
              {Array.from({ length: 11 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setIntensityAfter(index)}
                  className={`flex h-10 items-center justify-center rounded-xl text-xs font-medium transition ${
                    intensityAfter === index
                      ? 'bg-[#80678b] text-white'
                      : 'bg-[#f5f0f6] text-[#766b79] hover:bg-[#ebe2ed]'
                  }`}
                >
                  {index}
                </button>
              ))}
            </div>

            <div className="mt-2 flex justify-between text-[11px] text-[#968b98]">
              <span>Not heavy</span>
              <span>Very heavy</span>
            </div>
          </div>

          {/* Helpful option */}
          <div className="mt-9">
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-[#80678b]"
              />

              <h2 className="text-base font-semibold">
                What helped most?
              </h2>
            </div>

            <p className="mt-1 text-xs text-[#8a7d91]">
              Your answer helps LUMI personalize future support.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {helpfulOptions.map((option) => {
                const isSelected =
                  whatHelped === option.id

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      setWhatHelped(option.id)
                    }
                    className={`rounded-2xl border px-4 py-3.5 text-left text-sm transition ${
                      isSelected
                        ? 'border-[#9d83a8] bg-[#f7f0f9] text-[#554b59]'
                        : 'border-[#e6dde8] bg-white text-[#6f6575] hover:bg-[#faf7fb]'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Before / after */}
          {intensityAfter !== null &&
            intensityBefore !== null && (
              <div className="mt-7 rounded-2xl bg-[#faf7fb] p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#93849a]">
                  Your check-in
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#8a7d91]">
                      Before
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                      {intensityBefore}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-[#a094a4]"
                  />

                  <div className="text-right">
                    <p className="text-xs text-[#8a7d91]">
                      Now
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                      {intensityAfter}
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Privacy note */}
          <div className="mt-6 rounded-2xl border border-[#eee6ef] p-4">
            <p className="text-xs leading-5 text-[#817783]">
              LUMI uses your answer to improve your future support
              suggestions. Your intensity score is self-reported
              and is not a medical measurement.
            </p>
          </div>

          {/* Continue */}
          <button
            onClick={handleContinue}
            disabled={
              intensityAfter === null ||
              !whatHelped
            }
            className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-medium transition ${
              intensityAfter !== null && whatHelped
                ? 'bg-[#4f4654] text-white hover:bg-[#403843]'
                : 'cursor-not-allowed bg-[#e7e1e7] text-[#aaa1ad]'
            }`}
          >
            Finish check-in
            <ArrowRight size={18} />
          </button>

        </div>

        <p className="mt-5 text-center text-[11px] leading-5 text-[#958a98]">
          You do not need to feel completely better for this
          check-in to be useful.
        </p>

      </div>
    </div>
  )
}

export default ConnectOutcome