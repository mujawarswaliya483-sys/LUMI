import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Heart,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import Lumi from '../components/Lumi'

function CompanionRequest({
  companionId,
  onBack,
  onContinue,
}) {
  const activeCompanionId = companionId || 'companion-a'

  const handleContinue = () => {
    console.log(
      'Connection request confirmed:',
      activeCompanionId
    )

    onContinue(activeCompanionId)
  }

  return (
    <div className="min-h-screen bg-[#fcf8f5] px-5 py-8 text-[#29252d]">
      <div className="mx-auto max-w-3xl">

        {/* Top navigation */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#6f6575] transition hover:bg-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="text-sm font-medium text-[#8a7d91]">
            CONNECTION REQUEST
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
              <CheckCircle2
                size={25}
                className="text-[#80678b]"
              />
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight">
              Your request is ready
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#756d78]">
              The companion will only see that someone looking for
              support would like to connect. You can decide what
              you want to share once the connection begins.
            </p>
          </div>

          {/* Companion preview */}
          <div className="mt-8 rounded-3xl border border-[#e8dfe9] bg-[#faf7fb] p-5">

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee3f2]">
                <UserRound
                  size={22}
                  className="text-[#80678b]"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#96879c]">
                  Your selected companion
                </p>

                <h2 className="mt-1 font-medium">
                  LUMI Companion
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-2">
                  <Heart
                    size={16}
                    className="text-[#80678b]"
                  />

                  <span className="text-sm font-medium">
                    Shared experience
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#817783]">
                  The companion has opted into supporting someone
                  with a potentially similar experience.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-2">
                  <Clock3
                    size={16}
                    className="text-[#80678b]"
                  />

                  <span className="text-sm font-medium">
                    Available now
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#817783]">
                  The companion is currently marked as available
                  for a connection.
                </p>
              </div>

            </div>
          </div>

          {/* What happens next */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[#554b59]">
              What happens next?
            </h3>

            <div className="mt-4 space-y-3">

              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eee3f2] text-xs font-semibold text-[#80678b]">
                  1
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Send the connection request
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#817783]">
                    Your request is sent without exposing unnecessary
                    personal information.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eee3f2] text-xs font-semibold text-[#80678b]">
                  2
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Wait for mutual acceptance
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#817783]">
                    The conversation does not begin unless the
                    connection is accepted.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eee3f2] text-xs font-semibold text-[#80678b]">
                  3
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Start a supported conversation
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#817783]">
                    If accepted, you can talk while keeping control
                    over what you choose to share.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Safety reminder */}
          <div className="mt-7 rounded-2xl border border-[#e8dfe9] bg-white p-4">
            <div className="flex gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#80678b]"
              />

              <div>
                <p className="text-sm font-medium text-[#554b59]">
                  Keep personal information private
                </p>

                <p className="mt-1 text-xs leading-5 text-[#817783]">
                  Avoid sharing passwords, financial information,
                  exact location, or other sensitive personal
                  information in a support conversation.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={onBack}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#e3d9e5] bg-white px-5 py-3.5 text-sm font-medium text-[#625867] transition hover:bg-[#faf7fb]"
            >
              <ArrowLeft size={17} />
              Go back
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#4f4654] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#403843]"
            >
              Send connection request
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

        {/* Small footer */}
        <p className="mt-5 text-center text-xs text-[#958a98]">
          You can leave a connection at any time.
        </p>
      </div>
    </div>
  )
}

export default CompanionRequest