import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Heart,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import Lumi from '../components/Lumi'

function Connect({ onBack, onContinue }) {
  const [selectedCompanion, setSelectedCompanion] = useState(null)

  const companions = [
    {
      id: 'companion-a',
      name: 'LUMI Companion',
      experience: 'Has experienced loneliness',
      style: 'Prefers listening',
      availability: 'Available now',
    },
    {
      id: 'companion-b',
      name: 'LUMI Companion',
      experience: 'Has experienced relationship loss',
      style: 'Listens and shares experience',
      availability: 'Available now',
    },
  ]

  const handleContinue = () => {
    if (!selectedCompanion) return

    onContinue(selectedCompanion)
  }

  return (
    <div className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">
      <div className="mx-auto max-w-5xl">

        {/* Top navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#6f6575] transition hover:bg-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-sm font-medium text-[#8a7d91]">
            CONNECT
          </div>
        </div>

        {/* Main content */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left side */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            <Lumi />

            <div className="mt-2 max-w-md">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dfd0e5] bg-white px-4 py-2 text-xs font-medium text-[#75657e]">
                <Heart size={14} />
                Human understanding
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                You don't have to explain everything alone.
              </h1>

              <p className="mt-4 text-base leading-7 text-[#756d78]">
                LUMI can help you connect with someone who has chosen
                to support people going through similar experiences.
              </p>
            </div>

            {/* Safety note */}
            <div className="mt-7 flex max-w-md gap-3 rounded-2xl border border-[#e8dfe9] bg-white/80 p-4 text-left">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#8b7195]"
              />

              <div>
                <p className="text-sm font-medium text-[#4f4654]">
                  A safer kind of connection
                </p>

                <p className="mt-1 text-xs leading-5 text-[#817783]">
                  LUMI Companions are here to listen and share
                  experiences. They are not therapists and cannot
                  provide medical or crisis care.
                </p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div>

            <div className="mb-5">
              <p className="text-sm font-medium text-[#8a7d91]">
                STEP 1
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Someone who may understand
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#756d78]">
                Choose a companion based on shared experience and
                support style. You stay in control of whether the
                connection continues.
              </p>
            </div>

            {/* Companion cards */}
            <div className="space-y-4">
              {companions.map((companion) => {
                const isSelected =
                  selectedCompanion === companion.id

                return (
                  <button
                    key={companion.id}
                    onClick={() =>
                      setSelectedCompanion(companion.id)
                    }
                    className={`w-full rounded-3xl border p-5 text-left transition ${
                      isSelected
                        ? 'border-[#9d83a8] bg-[#f7f0f9] shadow-[0_12px_30px_rgba(100,75,115,0.08)]'
                        : 'border-[#e9e0e9] bg-white hover:border-[#cdbbd3] hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">

                      {/* Avatar */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eee3f2]">
                        <UserRound
                          size={22}
                          className="text-[#80678b]"
                        />
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-medium">
                            {companion.name}
                          </h3>

                          {isSelected && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8d7398] text-white">
                              <Check size={14} />
                            </div>
                          )}
                        </div>

                        <div className="mt-3 space-y-2">

                          <div className="flex items-center gap-2 text-sm text-[#716774]">
                            <Heart size={15} />
                            {companion.experience}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#716774]">
                            <Sparkles size={15} />
                            {companion.style}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#716774]">
                            <Clock size={15} />
                            {companion.availability}
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Why this match */}
                    {isSelected && (
                      <div className="mt-4 rounded-2xl bg-white/80 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8b7892]">
                          Why LUMI suggested this
                        </p>

                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-[#655b68]">
                            <Check size={15} />
                            Shared experience
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#655b68]">
                            <Check size={15} />
                            Compatible support style
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#655b68]">
                            <Check size={15} />
                            Available now
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Consent explanation */}
            <div className="mt-5 rounded-2xl border border-[#eee6ef] bg-[#faf7fb] p-4">
              <p className="text-sm font-medium text-[#5d5261]">
                You stay in control.
              </p>

              <p className="mt-1 text-xs leading-5 text-[#817783]">
                Selecting a companion does not start a conversation
                immediately. The next step lets you review the
                connection before continuing.
              </p>
            </div>

            {/* Continue */}
            <button
              onClick={handleContinue}
              disabled={!selectedCompanion}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-medium transition ${
                selectedCompanion
                  ? 'bg-[#4f4654] text-white hover:bg-[#403843]'
                  : 'cursor-not-allowed bg-[#e7e1e7] text-[#aaa1ad]'
              }`}
            >
              Review connection
              <ArrowRight size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Connect