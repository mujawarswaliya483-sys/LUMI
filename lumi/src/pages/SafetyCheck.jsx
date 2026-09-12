import { ArrowLeft, ShieldCheck } from 'lucide-react'
import Lumi from '../components/Lumi'

// This component shows an important safety question
// before LUMI continues with normal support routing.
//
// Props:
// onBack → sends the user back to the previous screen.
// onAnswer → sends the selected safety answer to App.jsx.
function SafetyCheck({ onBack, onAnswer }) {
  const safetyOptions = [
    {
      id: 'safe',
      title: 'No, I can continue',
      description: 'I am not in immediate danger.',
    },
    {
      id: 'unsure',
      title: "I'm not sure",
      description: 'I need a moment or some human support.',
    },
    {
      id: 'immediate-help',
      title: 'Yes, I need immediate help',
      description: 'I may be in immediate danger right now.',
    },
  ]

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
        <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">

          {/* Lumi illustration */}
          <div className="hidden justify-center lg:flex">
            <Lumi />
          </div>

          {/* Question area */}
          <div>
            {/* Small safety label */}
            <div className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
              <ShieldCheck size={17} />
              Safety check
            </div>

            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              One important question before we continue.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#716b75]">
              This helps LUMI decide whether you need immediate human
              support. It isn't a diagnosis.
            </p>

            <div className="mt-8 rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold leading-7">
                Are you currently in immediate danger or thinking about
                hurting yourself?
              </h2>

              <div className="mt-6 space-y-3">
                {safetyOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onAnswer(option.id)}
                    className="group w-full rounded-2xl border border-[#e8e0e9] bg-[#fcf8f5] px-5 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#cdb4db] hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          {option.title}
                        </p>

                        <p className="mt-1 text-sm leading-5 text-[#8a828d]">
                          {option.description}
                        </p>
                      </div>

                      <span className="text-[#aaa2ad] transition group-hover:translate-x-1 group-hover:text-[#80668d]">
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 max-w-xl text-xs leading-5 text-[#958d97]">
              If you are in immediate danger, please contact local emergency
              services or a trusted person who can stay with you. LUMI is not
              an emergency service.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SafetyCheck