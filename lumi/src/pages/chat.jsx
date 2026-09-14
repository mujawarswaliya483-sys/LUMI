import {
  ArrowLeft,
  Flag,
  MoreHorizontal,
  Send,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'

import { useState } from 'react'

import Lumi from '../components/Lumi'


// --------------------------------------------------
// TEMPORARY CHAT DATA
// --------------------------------------------------
//
// These messages are only for frontend testing.
//
// Later:
//
// React
//   ↓
// Socket.IO
//   ↓
// Express backend
//   ↓
// MongoDB
//
// --------------------------------------------------

const initialMessages = [
  {
    id: 1,
    sender: 'companion',
    text: "Hey. I'm here to listen. You don't have to explain everything at once.",
  },

  {
    id: 2,
    sender: 'user',
    text: "I've just been feeling really alone lately.",
  },

  {
    id: 3,
    sender: 'companion',
    text: "That sounds difficult. You can take your time. What has been making the loneliness feel stronger recently?",
  },
]


function Chat({ onBack, onLeave }) {

  // ------------------------------------------------
  // MESSAGES STATE
  // ------------------------------------------------

  const [messages, setMessages] = useState(initialMessages)


  // ------------------------------------------------
  // INPUT STATE
  // ------------------------------------------------

  const [input, setInput] = useState('')


  // ------------------------------------------------
  // MENU STATE
  // ------------------------------------------------

  const [showMenu, setShowMenu] = useState(false)


  // ------------------------------------------------
  // LEAVE CONFIRMATION STATE
  // ------------------------------------------------
  //
  // false → don't show confirmation
  // true  → show confirmation
  //
  const [showLeaveConfirmation, setShowLeaveConfirmation] =
    useState(false)


  // ------------------------------------------------
  // REPORT CONFIRMATION STATE
  // ------------------------------------------------

  const [showReportConfirmation, setShowReportConfirmation] =
    useState(false)


  // ------------------------------------------------
  // SEND MESSAGE
  // ------------------------------------------------

  const handleSend = () => {

    const trimmedMessage = input.trim()


    // Don't send empty messages.
    if (!trimmedMessage) {
      return
    }


    // Temporary message object.
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedMessage,
    }


    // Add message to current conversation.
    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ])


    // Clear input.
    setInput('')
  }


  // ------------------------------------------------
  // ENTER KEY
  // ------------------------------------------------

  const handleKeyDown = (event) => {

    if (event.key === 'Enter' && !event.shiftKey) {

      event.preventDefault()

      handleSend()
    }
  }


  // ------------------------------------------------
  // CONFIRM LEAVE
  // ------------------------------------------------

  const confirmLeave = () => {

    // In the future this is where we could call:
    //
    // POST /api/chat/session/end
    //
    console.log('Conversation ended by user.')

    onLeave()
  }


  // ------------------------------------------------
  // REPORT CONVERSATION
  // ------------------------------------------------

  const handleReport = () => {

    // For now we only simulate reporting.
    //
    // Later:
    //
    // POST /api/report
    //
    console.log('Conversation reported.')

    setShowReportConfirmation(false)
    setShowMenu(false)
  }


  return (
    <main className="relative min-h-screen bg-[#fcf8f5] text-[#29252d]">


      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="border-b border-[#e8e0e9] bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">

          {/* Back */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#716b75] transition hover:bg-[#fcf8f5] hover:text-[#29252d]"
          >
            <ArrowLeft size={18} />
            Back
          </button>


          {/* Companion */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e7f5] text-[#80668d]">
              <UserRound size={19} />
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-semibold">
                LUMI Companion
              </p>

              <p className="text-xs text-[#8a828d]">
                Anonymous connection
              </p>

            </div>

          </div>


          {/* Menu */}
          <div className="relative">

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#716b75] transition hover:bg-[#fcf8f5]"
              aria-label="Conversation options"
            >
              <MoreHorizontal size={20} />
            </button>


            {/* Dropdown */}
            {showMenu && (

              <div className="absolute right-0 top-12 z-30 w-56 rounded-2xl border border-[#e8e0e9] bg-white p-2 shadow-lg">

                {/* Report */}
                <button
                  onClick={() => {
                    setShowReportConfirmation(true)
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#716b75] hover:bg-[#fcf8f5]"
                >
                  <Flag size={17} />
                  Report conversation
                </button>


                {/* Leave */}
                <button
                  onClick={() => {
                    setShowLeaveConfirmation(true)
                    setShowMenu(false)
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#9a6666] hover:bg-[#fff7f7]"
                >
                  <X size={17} />
                  Leave conversation
                </button>

              </div>

            )}

          </div>

        </div>

      </header>


      {/* ==================================================
          SAFETY BANNER
      ================================================== */}

      <div className="border-b border-[#eee7ef] bg-[#f8f4fa]">

        <div className="mx-auto flex max-w-5xl items-start gap-3 px-5 py-3">

          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-[#80668d]"
          />

          <p className="text-xs leading-5 text-[#716b75]">
            This is a peer-support conversation. Your Companion is
            here to listen and share lived experience, not diagnose
            or provide professional treatment. You can leave anytime.
          </p>

        </div>

      </div>


      {/* ==================================================
          CHAT AREA
      ================================================== */}

      <section className="mx-auto flex min-h-[calc(100vh-145px)] max-w-5xl flex-col">


        {/* Messages */}
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-8">

          {messages.map((message) => {

            const isUser = message.sender === 'user'


            return (

              <div
                key={message.id}
                className={`flex ${
                  isUser
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >

                <div
                  className={`max-w-[82%] rounded-3xl px-5 py-3.5 text-sm leading-6 sm:max-w-[65%] ${
                    isUser
                      ? 'rounded-br-md bg-[#29252d] text-white'
                      : 'rounded-bl-md border border-[#e8e0e9] bg-white text-[#4f4854]'
                  }`}
                >
                  {message.text}
                </div>

              </div>

            )

          })}

        </div>


        {/* ==================================================
            INPUT
        ================================================== */}

        <div className="border-t border-[#e8e0e9] bg-[#fcf8f5] px-5 py-4">

          <div className="mx-auto max-w-3xl">

            <div className="flex items-end gap-3 rounded-3xl border border-[#ddd5df] bg-white p-2 shadow-sm">

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Write something..."
                rows={1}
                className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#aaa2ad]"
              />


              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#29252d] text-white transition hover:bg-[#3b3540] disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>

            </div>


            <p className="mt-3 text-center text-[11px] leading-5 text-[#aaa2ad]">
              Please don't share passwords, phone numbers, addresses,
              or other private contact information.
            </p>

          </div>

        </div>

      </section>


      {/* ==================================================
          LEAVE CONFIRMATION MODAL
      ================================================== */}

      {showLeaveConfirmation && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-5 backdrop-blur-[2px]">

          <div className="w-full max-w-md rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-2xl">

            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="text-xl font-semibold">
                  Leave this conversation?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#716b75]">
                  You can leave whenever you want. The conversation
                  will be closed and you won't need to explain why.
                </p>

              </div>


              <button
                onClick={() => setShowLeaveConfirmation(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#716b75] hover:bg-[#fcf8f5]"
              >
                <X size={18} />
              </button>

            </div>


            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <button
                onClick={() => setShowLeaveConfirmation(false)}
                className="rounded-2xl border border-[#e5dfe6] px-5 py-3 text-sm font-medium text-[#716b75] hover:bg-[#faf8fb]"
              >
                Stay
              </button>


              <button
                onClick={confirmLeave}
                className="rounded-2xl bg-[#9a6666] px-5 py-3 text-sm font-medium text-white hover:bg-[#855757]"
              >
                Leave conversation
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ==================================================
          REPORT MODAL
      ================================================== */}

      {showReportConfirmation && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-5 backdrop-blur-[2px]">

          <div className="w-full max-w-md rounded-3xl border border-[#e8e0e9] bg-white p-6 shadow-2xl">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4e8e8] text-[#966565]">
                <Flag size={19} />
              </div>


              <div>

                <h2 className="text-xl font-semibold">
                  Report this conversation?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#716b75]">
                  Your report helps LUMI review potentially unsafe
                  behaviour. Reporting does not reveal your private
                  contact information to the other person.
                </p>

              </div>

            </div>


            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <button
                onClick={() => setShowReportConfirmation(false)}
                className="rounded-2xl border border-[#e5dfe6] px-5 py-3 text-sm font-medium text-[#716b75] hover:bg-[#faf8fb]"
              >
                Cancel
              </button>


              <button
                onClick={handleReport}
                className="rounded-2xl bg-[#9a6666] px-5 py-3 text-sm font-medium text-white hover:bg-[#855757]"
              >
                Submit report
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}

export default Chat