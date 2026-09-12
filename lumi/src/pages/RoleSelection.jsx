import { ArrowLeft, Heart, Users } from 'lucide-react'


// This component displays the screen where the user
// chooses how they want to use LUMI.
//
// Props:
// - onSelectRole → tells App.jsx which role was selected.
// - onBack → tells App.jsx to return to Home.
function RoleSelection({ onSelectRole, onBack }) {

  return (
    <main className="min-h-screen bg-[#fcf8f5] px-5 py-6 text-[#29252d]">


      {/* ==========================================
          HEADER
          ========================================== */}

      <header className="mx-auto flex max-w-5xl items-center justify-between">

        {/* Back button */}

        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#716b75] transition hover:bg-white hover:text-[#29252d]"
        >

          <ArrowLeft size={18} />

          Back

        </button>


        {/* Logo */}

        <div className="text-lg font-semibold tracking-tight">
          lumi
        </div>


        {/* Empty space keeps the logo visually centered */}

        <div className="w-16" />

      </header>


      {/* ==========================================
          MAIN CONTENT
          ========================================== */}

      <section className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">

        <div className="w-full">


          {/* Small label */}

          <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-[#8b6d99]">
            Welcome to LUMI
          </p>


          {/* Heading */}

          <h1 className="mt-3 text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            How would you like to use LUMI?
          </h1>


          {/* Explanation */}

          <p className="mx-auto mt-4 max-w-xl text-center leading-7 text-[#716b75]">

            You can use LUMI when you need support, or choose to be there
            for someone who has been through something similar.

          </p>


          {/* ======================================
              TWO OPTIONS
              ====================================== */}

          <div className="mt-10 grid gap-5 md:grid-cols-2">


            {/* ====================================
                SUPPORT SEEKER
                ==================================== */}

            <button
              // When clicked, send "support-seeker"
              // back to App.jsx.
              //
              // App.jsx currently stores this value.
              // Later it will take the user to Check-In.
              onClick={() => onSelectRole('support-seeker')}

              className="group rounded-3xl border border-[#e8e0e9] bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#cdb4db] hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1e7f5] text-[#80668d]">

                <Heart size={22} />

              </div>


              <h2 className="mt-6 text-xl font-semibold">
                I need support
              </h2>


              <p className="mt-3 text-sm leading-6 text-[#716b75]">

                I'm going through a difficult moment and want help figuring
                out what kind of support I need.

              </p>


              <div className="mt-6 text-sm font-medium text-[#80668d]">
                Get support →
              </div>

            </button>


            {/* ====================================
                COMPANION
                ==================================== */}

            <button
              // Send "companion" to App.jsx.
              //
              // Later this will open Companion onboarding.
              onClick={() => onSelectRole('companion')}

              className="group rounded-3xl border border-[#e8e0e9] bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#c5d9d0] hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f1ed] text-[#54786b]">

                <Users size={22} />

              </div>


              <h2 className="mt-6 text-xl font-semibold">
                Become a LUMI Companion
              </h2>


              <p className="mt-3 text-sm leading-6 text-[#716b75]">

                I've been through something difficult and I'd like to support
                someone experiencing something similar.

              </p>


              <div className="mt-6 text-sm font-medium text-[#54786b]">
                Learn about becoming a Companion →
              </div>

            </button>

          </div>


          {/* ==========================================
              IMPORTANT NOTE
              ========================================== */}

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-[#958d97]">

            You don't have to choose forever. Your LUMI account can support
            both roles, and you can change your preferences later.

          </p>

        </div>

      </section>

    </main>
  )
}


export default RoleSelection