import { useState } from 'react'
import {
  ArrowLeft,
  Flag,
  Heart,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import Lumi from '../components/Lumi'

function Chat({
  companionId,
  onBack,
  onContinue,
}) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'companion',
      text: "Hey. I'm here to listen. You can start wherever feels comfortable.",
    },
  ])

  const handleSend = () => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) return

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedMessage,
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      newMessage,
    ])

    setMessage('')

    // Prototype response.
    // Later this will be replaced by the real chat backend.
    setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now() + 1,
          sender: 'companion',
          text: "Thank you for sharing that. You don't have to figure everything out at once.",
        },
      ])
    }, 700)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const handleEndConversation = () => {
    onContinue({
      companionId,
      messages,
    })
  }

  return (
    <div className="min-h-screen bg-[#fcf8f5] px-4 py-6 text-[#29252d] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl flex-col">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[#6f6575] transition hover:bg-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-[#8a7d91]">
            <div className="h-2 w-2 rounded-full bg-[#9bb59f]" />
            PRIVATE SUPPORT CHAT
          </div>
        </div>

        {/* Chat container */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-[#e8dfe9] bg-white shadow-[0_20px_50px_rgba(90,65,100,0.06)]">

          {/* Chat header */}
          <div className="border-b border-[#eee6ef] px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eee3f2]">
                <UserRound
                  size={21}
                  className="text-[#80678b]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="font-semibold">
                  LUMI Companion
                </h1>

                <p className="mt-0.5 text-xs text-[#8a7d91]">
                  Here to listen and share experience
                </p>
              </div>

              <button
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#918592] transition hover:bg-[#faf7fb]"
                title="Report conversation"
              >
                <Flag size={17} />
              </button>
            </div>
          </div>

          {/* Safety reminder */}
          <div className="border-b border-[#eee6ef] bg-[#faf7fb] px-5 py-3 sm:px-7">
            <div className="flex items-center gap-2 text-xs leading-5 text-[#756d78]">
              <ShieldCheck
                size={15}
                className="shrink-0 text-[#80678b]"
              />

              <span>
                Share only what feels comfortable. You can leave this
                conversation whenever you want.
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-7">

            <div className="mb-5 flex justify-center">
              <div className="rounded-full bg-[#f5eff6] px-4 py-2 text-[11px] text-[#8a7d91]">
                You are connected with a LUMI Companion
              </div>
            </div>

            <div className="space-y-4">

              {messages.map((item) => {
                const isUser = item.sender === 'user'

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isUser
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    {!isUser && (
                      <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eee3f2]">
                        <Heart
                          size={15}
                          className="text-[#80678b]"
                        />
                      </div>
                    )}

                    <div
                      className={`max-w-[78%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                        isUser
                          ? 'rounded-br-md bg-[#4f4654] text-white'
                          : 'rounded-bl-md bg-[#f4eef6] text-[#514955]'
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                )
              })}

            </div>
          </div>

          {/* Lumi reminder */}
          <div className="border-t border-[#eee6ef] px-5 py-3 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="scale-[0.45] origin-left -my-8 -mr-20">
                <Lumi />
              </div>

              <p className="text-xs leading-5 text-[#817783]">
                You don't need to solve everything in this conversation.
              </p>
            </div>
          </div>

          {/* Message input */}
          <div className="border-t border-[#eee6ef] p-4 sm:p-5">

            <div className="flex items-end gap-3">

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Share what feels comfortable..."
                className="max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl border border-[#e4dbe6] bg-[#faf8fb] px-4 py-3 text-sm text-[#403843] outline-none transition placeholder:text-[#aaa1ad] focus:border-[#bba8c2] focus:ring-2 focus:ring-[#eee3f2]"
              />

              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                  message.trim()
                    ? 'bg-[#4f4654] text-white hover:bg-[#403843]'
                    : 'cursor-not-allowed bg-[#e7e1e7] text-[#aaa1ad]'
                }`}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>

            </div>

            {/* End conversation */}
            <button
              onClick={handleEndConversation}
              className="mx-auto mt-4 block text-xs font-medium text-[#8b7d8f] underline-offset-4 transition hover:text-[#5d5261] hover:underline"
            >
              End conversation
            </button>

          </div>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-[11px] leading-5 text-[#958a98]">
          LUMI Companions provide peer support, not professional or
          emergency care.
        </p>

      </div>
    </div>
  )
}

export default Chat