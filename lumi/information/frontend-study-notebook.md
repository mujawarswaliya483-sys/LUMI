# 📚 LUMI — FRONTEND STUDY NOTEBOOK

> **Purpose:** Learn the LUMI frontend deeply enough to explain it, modify it, and rebuild major parts without blindly depending on ChatGPT.
>
> **Important:** This notebook explains the project as a learning exercise. Where the current project code is known, the original structure and names are preserved. The backend is discussed only as a future connection point.

---

# 📖 PAGE 01 — UNDERSTANDING MY PROJECT

## 🎯 Learning objective

By the end of this page, I should be able to explain:

- What LUMI is
- What problem it addresses
- What the three main support routes are
- What the frontend is responsible for
- Why understanding the frontend comes before building the backend

## 🔵 CONCEPT — What is LUMI?

LUMI is an emotional-wellbeing support platform.

The central idea is **adaptive support routing**:

> Instead of giving every user the same response, LUMI first tries to understand what kind of support the person needs in that moment.

The three main routes are:

| Route | Purpose |
|---|---|
| **CONNECT** | Help the user find human understanding |
| **PROCESS** | Help the user structure and understand recurring thoughts |
| **CALM**    | Give the user a short calming intervention |

The important idea is:

```text
Difficult emotional moment
        ↓
      Check-in
        ↓
Understand what support is needed
        ↓
 ┌──────┼────────┐
 ↓      ↓        ↓
CONNECT PROCESS  CALM
```

## 🟣 PROJECT CONNECTION

The frontend already implements all three major routes:

```text
CONNECT  → companion selection → consent → request → chat → outcome
PROCESS  → thought → feeling → need → summary → next step → outcome
CALM     → calming activity → outcome
```

The frontend therefore gives us a working model of the product before a real backend is added.

## 🔵 Technologies used

The project uses:

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- `lucide-react`
- Browser `localStorage`

The current project is frontend-first. Companion data and some application decisions are still local/prototype data.

## 🟢 REMEMBER

A frontend is responsible for what the user sees and interacts with.

A backend will eventually handle things such as:

```text
database
authentication
real companion accounts
server-side matching
persistent chat
server-side safety events
APIs
```

---

# 📖 PAGE 02 — COMPLETE PROJECT FLOW

## 🎯 Learning objective

Understand the application as one connected system instead of memorizing individual files.

## 🔵 COMPLETE FLOW

```mermaid
flowchart TD
    A[User] --> B[Browser]
    B --> C[main.jsx]
    C --> D[App.jsx]
    D --> E[Home]
    E --> F[RoleSelection]
    F --> G[CheckIn]
    G --> H[SafetyCheck]
    H --> I[NeedDiscovery]

    I --> J{What support is needed?}

    J -->|CONNECT| K[Connect]
    J -->|PROCESS| L[ProcessStart]
    J -->|CALM   |    M[Calm]
    J -->|I don't know| N[SupportRecommendation]

    N --> K
    N --> L
    N --> M

    K --> O[ConnectionConsent]
    O --> P[CompanionRequest]
    P --> Q[Chat]
    Q --> R[ConversationEnded]
    R --> S[ConnectOutcome]

    L --> T[ProcessThought]
    T --> U[ProcessFeeling]
    U --> V[ProcessNeed]
    V --> W[ProcessSummary]
    W --> X[ProcessNextStep]
    X --> Y[ProcessOutcome]

    M --> Z[CalmOutcome]

    S --> AA[SessionComplete]
    Y --> AA
    Z --> AA

    AA --> AB[saveSession]
    AB --> AC[localStorage]
```

## 🟣 PROJECT CONNECTION

The most important architectural fact is that `App.jsx` controls the current screen.

Conceptually:

```text
user action
    ↓
callback from page
    ↓
App.jsx updates state
    ↓
screen changes
    ↓
different page renders
```

For example:

```text
NeedDiscovery
      ↓
onSelectNeed("process")
      ↓
App.jsx
      ↓
setSupportRoute("process")
      ↓
setScreen("process-start")
      ↓
ProcessStart appears
```

## 🟡 WHY?

There is no need for every page to know how the entire application works.

A page can simply say:

```js
onContinue(data)
```

and let `App.jsx` decide what happens next.

This keeps navigation logic centralized.

## 🟢 REMEMBER

Think of `App.jsx` as the **traffic controller**.

The individual pages are the places the user visits.

---

# 📖 PAGE 03 — PROJECT FILE / FOLDER MAP

## 🎯 Learning objective

Know where each part of the frontend lives.

```text
lumi/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Lumi.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── RoleSelection.jsx
│   │   ├── CheckIn.jsx
│   │   ├── SafetyCheck.jsx
│   │   ├── SafetySupport.jsx
│   │   ├── NeedDiscovery.jsx
│   │   ├── SupportRecommendation.jsx
│   │   ├── Connect.jsx
│   │   ├── ConnectionConsent.jsx
│   │   ├── CompanionRequest.jsx
│   │   ├── Chat.jsx
│   │   ├── ConversationEnded.jsx
│   │   ├── ConnectOutcome.jsx
│   │   ├── ProcessStart.jsx
│   │   ├── ProcessThought.jsx
│   │   ├── ProcessFeeling.jsx
│   │   ├── ProcessNeed.jsx
│   │   ├── ProcessSummary.jsx
│   │   ├── ProcessNextStep.jsx
│   │   ├── ProcessOutcome.jsx
│   │   ├── Calm.jsx
│   │   ├── CalmOutcome.jsx
│   │   ├── SessionComplete.jsx
│   │   └── PersonalSupportProfile.jsx
│   │
│   ├── utils/
│   │   ├── sessionStorage.js
│   │   └── personalization.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
```

## 🔵 IMPORTANT FILES

| File | Job |
|---|---|
| `main.jsx` | Starts React |
| `App.jsx` | Controls application state and screen flow |
| `index.css` | Global styles and animations |
| `vite.config.js` | Vite + React + Tailwind configuration |
| `Lumi.jsx` | Reusable LUMI character |
| `sessionStorage.js` | Saves/reads session history from localStorage |
| `personalization.js` | Builds personalized support information |
| `CheckIn.jsx` | Collects emotional state and intensity |
| `NeedDiscovery.jsx` | Lets user select support need |
| `SupportRecommendation.jsx` | Suggests a route |
| `Connect.jsx` | Shows prototype companions |
| `Chat.jsx` | Prototype conversation |
| `Process*.jsx` | Structured reflection flow |
| `Calm*.jsx` | Calming flow |
| `PersonalSupportProfile.jsx` | Shows learned support patterns |

## 🔴 COMMON MISTAKE

Do not assume that every `.jsx` file automatically becomes a browser route.

This project does **not** use React Router for the main flow.

`App.jsx` decides which page component to render.

---

# 📖 PAGE 04 — APPLICATION ENTRY POINT: `main.jsx`

## 🎯 Learning objective

Understand how the browser reaches React.

## 🟣 ORIGINAL CODE

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## 🔵 LINE BY LINE

### `import { StrictMode } from 'react'`

Imports React's `StrictMode` feature.

It wraps the application during development and helps reveal certain problematic patterns.

### `import { createRoot } from 'react-dom/client'`

Imports React's modern browser rendering function.

`createRoot()` creates the connection between React and an HTML element in the browser.

### `import './index.css'`

Loads the global CSS file.

This matters because the whole LUMI application needs:

- global font settings
- page defaults
- animations
- Tailwind import
- browser normalization

### `import App from './App.jsx'`

Imports the main React component.

This is the bridge:

```text
main.jsx
   ↓
App.jsx
```

### `document.getElementById('root')`

Finds the HTML element with:

```html
<div id="root"></div>
```

from the application's HTML entry page.

### `.render(...)`

Tells React what should be displayed inside that root element.

The actual component being rendered is:

```jsx
<App />
```

## 🟢 REMEMBER

The application starts roughly like this:

```text
index.html
    ↓
root div
    ↓
main.jsx
    ↓
<App />
    ↓
App.jsx
```

## 🔴 COMMON MISTAKE

If you remove:

```jsx
<App />
```

React has nothing to render.

If you remove the root element from the HTML page, `getElementById('root')` cannot find where React should mount.

---

# 📖 PAGE 05 — `App.jsx`: THE TRAFFIC CONTROLLER

## 🎯 Learning objective

Understand why `App.jsx` is the most important frontend file.

## 🔵 MAIN IDEA

`App.jsx` keeps track of:

- current screen
- user role
- check-in data
- selected support route
- process data
- calm data
- session outcome data
- personalization data
- selected companion

The important mental model is:

```text
App.jsx
   │
   ├── state
   │
   ├── handlers
   │
   └── selected screen
          │
          └── renders one page
```

## 🔵 IMPORTANT STATE

The project uses state such as:

```jsx
const [screen, setScreen] = useState('home')

const [userRole, setUserRole] = useState(null)

const [checkInData, setCheckInData] = useState({
  emotion: '',
  intensityBefore: null
})

const [supportRoute, setSupportRoute] = useState(null)

const [routeSource, setRouteSource] = useState(null)
```

There are additional state objects for PROCESS, CALM, session information and the selected companion.

## 🟡 WHY `screen` EXISTS

Instead of navigating using a URL, this prototype uses a state value:

```text
screen = "home"
screen = "check-in"
screen = "connect"
screen = "process-start"
screen = "calm"
```

Conceptually:

```jsx
if (screen === 'home') {
  return <Home />
}
```

or equivalent conditional rendering used by the actual `App.jsx`.

## 🟢 REMEMBER

Changing:

```js
setScreen('connect')
```

doesn't magically move the browser to another URL.

It changes React state.

That state change causes `App.jsx` to render the CONNECT screen.

---

# 📖 PAGE 06 — COMPONENT COMMUNICATION

## 🎯 Learning objective

Understand how parent and child components communicate.

The project mainly uses **props + callback functions**.

```text
App.jsx
   |
   | onContinue
   ↓
CheckIn.jsx
```

The parent gives the child a function.

The child calls that function when the user does something.

## 🔵 EXAMPLE

`CheckIn` receives:

```jsx
function CheckIn({ onBack, onContinue }) {
```

This means the component expects two props:

- `onBack`
- `onContinue`

When the user finishes the check-in:

```js
onContinue({
  emotion: selectedEmotion,
  intensityBefore: selectedIntensity,
})
```

The child sends information upward.

## 🟣 PROJECT CONNECTION

This creates a very important React pattern:

```text
Parent owns important state
        ↓
Parent passes callback
        ↓
Child collects user input
        ↓
Child calls callback
        ↓
Parent receives data
        ↓
Parent updates state
```

## 🟢 REMEMBER

Data commonly flows:

```text
Parent → Child
```

through props.

Events/data can travel back:

```text
Child → Parent
```

by calling a callback function passed as a prop.

---

# 📖 PAGE 07 — `CheckIn.jsx`

## 🎯 Learning objective

Understand local state, arrays of objects, selection and callbacks.

## 🟣 ORIGINAL IMPORTANT CODE

```jsx
const emotions = [
  { id: 'alone', label: 'I feel alone' },
  { id: 'overthinking', label: "I can't stop thinking" },
  { id: 'missing-someone', label: "I'm missing someone" },
  { id: 'overwhelmed', label: "I'm overwhelmed" },
  { id: 'frustrated', label: "I'm frustrated" },
  { id: 'stressed', label: "I'm stressed" },
  { id: 'low', label: "I feel low" },
  { id: 'dont-want-to-talk', label: "I don't want to talk" },
  { id: 'dont-know', label: "I don't know" },
]
```

## 🔵 Why an array of objects?

Each emotional choice has two pieces of information:

```text
id
label
```

The `id` is useful for program logic.

The `label` is useful for the user interface.

For example:

```text
id    → overthinking
label → I can't stop thinking
```

## 🔵 STATE

```jsx
const [selectedEmotion, setSelectedEmotion] = useState(null)

const [selectedIntensity, setSelectedIntensity] = useState(null)
```

There are two separate pieces of information.

```text
selectedEmotion
        +
selectedIntensity
        ↓
check-in result
```

## 🔵 `handleContinue`

The important logic is:

```jsx
const handleContinue = () => {
  if (selectedEmotion === null || selectedIntensity === null) return

  onContinue({
    emotion: selectedEmotion,
    intensityBefore: selectedIntensity,
  })
}
```

### Step 1

Check whether both required values exist.

### Step 2

If something is missing:

```js
return
```

stops the function.

### Step 3

If both values exist, send an object to the parent.

## 🟡 WHY?

Without the validation:

```text
User clicks Continue
        ↓
emotion might be empty
        ↓
App receives incomplete data
```

The validation prevents that.

## 🟠 TRY YOURSELF

What would happen if this line were removed?

```js
if (selectedEmotion === null || selectedIntensity === null) return
```

Think before checking elsewhere in the code.

---

# 📖 PAGE 08 — STATE NOTEBOOK

## 🎯 Learning objective

Understand where important application state lives.

| State | Location | Initial value | Purpose |
|---|---|---|---|
| `screen` | `App.jsx` | `'home'` | Current application page |
| `userRole` | `App.jsx` | `null` | Selected role |
| `checkInData` | `App.jsx` | emotion + intensity | Current check-in |
| `supportRoute` | `App.jsx` | `null` | CONNECT/PROCESS/CALM |
| `routeSource` | `App.jsx` | `null` | Direct or recommended route |
| `processData` | `App.jsx` | empty values | PROCESS information |
| `calmData` | `App.jsx` | empty values | CALM information |
| `sessionData` | `App.jsx` | empty values | Completed-session data |
| `personalProfile` | `App.jsx` | generated profile | Personalized support information |
| `selectedCompanion` | `App.jsx` | `null` | Companion selected in CONNECT |
| `selectedEmotion` | `CheckIn.jsx` | `null` | Current emotion selection |
| `selectedIntensity` | `CheckIn.jsx` | `null` | Current intensity |
| chat messages | `Chat.jsx` | initial message(s) | Current prototype chat |

## 🔵 STATE MAP

```text
App.jsx
  |
  ├── screen
  ├── userRole
  ├── checkInData
  ├── supportRoute
  ├── routeSource
  ├── processData
  ├── calmData
  ├── sessionData
  ├── personalProfile
  └── selectedCompanion
```

Page components can also have local state when the information only matters inside that component.

## 🟢 REMEMBER

Use state when the value can change and the UI needs to react to that change.

---

# 📖 PAGE 09 — PROPS NOTEBOOK

## 🎯 Learning objective

Understand the most important prop relationships.

### Example 1 — `CheckIn`

```text
App.jsx
   |
   | onBack
   | onContinue
   ↓
CheckIn.jsx
```

`onContinue` lets CheckIn send its result to `App`.

### Example 2 — CONNECT

```text
App.jsx
   |
   | onContinue
   ↓
Connect.jsx
```

`Connect` selects a companion and sends the selected companion upward.

### Example 3 — Connection Consent

```text
App.jsx
   |
   | companionId
   | onBack
   | onContinue
   ↓
ConnectionConsent.jsx
```

The `companionId` tells the next page which companion is being reviewed.

### Example 4 — Chat

```text
App.jsx
   |
   | companionId
   | onBack
   | onContinue
   ↓
Chat.jsx
```

The chat needs to know which prototype companion the session concerns.

## 🟡 WHY?

Passing the same selected companion through every screen is necessary because the application moves through several CONNECT pages.

```text
Connect
  ↓
ConnectionConsent
  ↓
CompanionRequest
  ↓
Chat
```

The selected companion must remain available during that flow.

---

# 📖 PAGE 10 — FUNCTION NOTEBOOK

## 🎯 Learning objective

Understand functions as actions in the application.

A useful mental model is:

```text
Function
   ↓
called by an event
   ↓
reads data
   ↓
does some processing
   ↓
updates state / calls callback
   ↓
UI changes
```

## 🔵 `handleContinue` in `CheckIn`

```text
User selects emotion
        ↓
selectedEmotion changes
        ↓
User selects intensity
        ↓
selectedIntensity changes
        ↓
User clicks Continue
        ↓
handleContinue()
        ↓
validation
        ↓
onContinue(data)
        ↓
App.jsx receives data
```

## 🔵 `completeSession`

The central idea of the session completion function is:

```text
session information
      ↓
saveSession(...)
      ↓
localStorage
      ↓
rebuild personalization profile
      ↓
show SessionComplete
```

The saved session contains values such as:

```js
{
  emotion,
  route,
  routeSource,
  intensityBefore,
  intensityAfter,
  whatHelped
}
```

## 🟣 PROJECT CONNECTION

This is the point where the application changes from a temporary interaction into persistent browser data.

---

# 📖 PAGE 11 — USER ACTION: CHECK-IN

## 🎯 Learning objective

Trace one real user action completely.

```text
User opens CheckIn
       ↓
Chooses emotion
       ↓
selectedEmotion state changes
       ↓
Chooses intensity
       ↓
selectedIntensity state changes
       ↓
Clicks Continue
       ↓
handleContinue()
       ↓
Validation
       ↓
onContinue({
  emotion,
  intensityBefore
})
       ↓
App.jsx
       ↓
checkInData updated
       ↓
next screen rendered
```

## 🔵 WHAT CAUSES THE UI UPDATE?

React state.

For example:

```js
setSelectedEmotion(...)
```

does not directly modify the visible HTML.

Instead, it tells React:

> “The component's state has changed.”

React renders the component again using the new state.

---

# 📖 PAGE 12 — USER ACTION: CHOOSING A SUPPORT NEED

## 🎯 Learning objective

Understand how `NeedDiscovery` controls the next route.

The available needs are:

```text
CONNECT
"I want to be heard"

PROCESS
"I want to make sense of it"

CALM
"I just want to feel a little better"

UNKNOWN
"I don't know yet"
```

## 🔵 FLOW

```text
NeedDiscovery
      ↓
user selects option
      ↓
onSelectNeed(need.id)
      ↓
App.jsx receives id
      ↓
decision
      ↓
CONNECT / PROCESS / CALM
```

`unknown` goes to:

```text
SupportRecommendation
```

rather than directly choosing a route.

## 🟡 WHY?

If the user already knows what they want, LUMI can respect that choice.

If they don't know, LUMI can provide a recommendation.

That is the difference between:

```text
user intention
```

and:

```text
adaptive recommendation
```

---

# 📖 PAGE 13 — USER ACTION: SUPPORT RECOMMENDATION

## 🎯 Learning objective

Understand how LUMI creates prototype recommendations.

`SupportRecommendation.jsx` uses information such as:

- current emotion
- current intensity
- previous support outcomes
- effective routes
- helpful support types

Conceptually:

```text
Current check-in
       +
Previous sessions
       ↓
Recommendation logic
       ↓
CONNECT / PROCESS / CALM
```

## 🔵 EXAMPLE LOGIC

Some prototype rules are based on emotion:

```text
alone / missing someone
        ↓
CONNECT
```

```text
overthinking / frustrated
        ↓
PROCESS
```

```text
overwhelmed / stressed / low
        ↓
CALM
```

Intensity also contributes to recommendation logic.

## 🟣 PERSONALIZATION

A previous helpful result can influence a future suggestion.

For example:

```text
Previous session:
PROCESS
What helped:
Sorting thoughts

        ↓

Future recommendation:
PROCESS becomes more relevant
```

## 🔴 COMMON MISTAKE

This is not a medical prediction system.

The personalization is based on the user's previous self-reported experience.

---

# 📖 PAGE 14 — CONNECT FLOW

## 🎯 Learning objective

Understand the complete CONNECT sequence.

```text
Connect.jsx
   ↓
select companion
   ↓
ConnectionConsent.jsx
   ↓
review consent
   ↓
CompanionRequest.jsx
   ↓
send request
   ↓
Chat.jsx
   ↓
end conversation
   ↓
ConversationEnded.jsx
   ↓
ConnectOutcome.jsx
   ↓
SessionComplete.jsx
```

## 🔵 Companion data

The prototype currently contains local companion objects similar to:

```js
{
  id: 'companion-a',
  name: 'LUMI Companion',
  experience: 'Has experienced loneliness',
  style: 'Prefers listening',
  availability: 'Available now',
}
```

Another companion represents relationship-loss experience.

## 🟡 WHY?

The current frontend needs data to demonstrate matching and connection.

However, these are prototype/static companions.

A future backend would retrieve real eligible companions.

---

# 📖 PAGE 15 — CONNECT: COMPANION SELECTION

## 🎯 Learning objective

Understand local component state and selection.

`Connect.jsx` keeps track of the selected companion.

Conceptually:

```text
companions array
      ↓
map()
      ↓
cards
      ↓
user clicks card
      ↓
selectedCompanion state
      ↓
Review connection enabled
```

## 🔵 IMPORTANT JAVASCRIPT CONCEPT

`map()` transforms each item in an array into UI.

```jsx
companions.map((companion) => ...)
```

Think:

```text
Array
 ↓
item 1 → UI
item 2 → UI
item 3 → UI
```

## 🟠 TRY YOURSELF

If there were five companion objects instead of two, how many companion cards should the UI produce?

Answer: five, because `map()` processes every item.

---

# 📖 PAGE 16 — CONNECT: CONSENT AND REQUEST

## 🎯 Learning objective

Understand why the selected companion travels between pages.

```text
Connect
   ↓
selectedCompanion
   ↓
onContinue(selectedCompanion)
   ↓
App.jsx
   ↓
selectedCompanion state
   ↓
ConnectionConsent
```

Then:

```text
ConnectionConsent
   ↓
onContinue(companionId)
   ↓
CompanionRequest
```

## 🔴 COMMON MISTAKE

A previous prototype problem occurred when:

```jsx
companionId
```

was not passed correctly.

The button depended on that value.

This is a good example of why props matter.

```text
missing prop
    ↓
undefined value
    ↓
button may remain disabled
    ↓
flow appears broken
```

## 🟢 REMEMBER

When debugging a multi-page React flow, inspect:

```text
Where is the data created?
        ↓
Where is it stored?
        ↓
Which prop carries it?
        ↓
Does the child actually receive it?
```

---

# 📖 PAGE 17 — CHAT FLOW

## 🎯 Learning objective

Understand the current prototype chat.

The chat component maintains message state.

Conceptually:

```text
messages
   ↓
render messages
   ↓
user types
   ↓
input state changes
   ↓
Send
   ↓
handleSend()
   ↓
new user message
   ↓
messages state updates
   ↓
React re-renders
```

The prototype also generates a delayed companion response.

## 🟡 WHY?

The delay demonstrates the experience of a response arriving asynchronously.

It is still a frontend simulation.

It is not a real multi-user messaging system.

## 🟣 FUTURE BACKEND

The eventual real version could use:

```text
React Chat
    ↓
Socket.IO
    ↓
Express / server
    ↓
database
```

But that is **not part of the current frontend implementation**.

---

# 📖 PAGE 18 — PROCESS FLOW

## 🎯 Learning objective

Understand the structured reflection route.

```text
ProcessStart
     ↓
ProcessThought
     ↓
ProcessFeeling
     ↓
ProcessNeed
     ↓
ProcessSummary
     ↓
ProcessNextStep
     ↓
ProcessOutcome
     ↓
SessionComplete
```

## 🔵 DATA FLOW

The user provides:

```text
thought
   ↓
feeling
   ↓
need
   ↓
next step
   ↓
intensity after
   ↓
what helped
```

## 🟣 PROJECT CONNECTION

This is different from CONNECT.

CONNECT is primarily about:

```text
human connection
```

PROCESS is about:

```text
structured reflection
```

The frontend deliberately breaks the reflection into multiple small steps.

## 🟢 REMEMBER

Breaking a complex task into multiple screens can make the user's decision easier.

---

# 📖 PAGE 19 — PROCESS: THOUGHT

## 🎯 Learning objective

Understand controlled user input.

`ProcessThought.jsx` contains a text input area with a character limit.

The important flow is:

```text
User types
   ↓
input state changes
   ↓
textarea displays current value
   ↓
Continue
   ↓
trim input
   ↓
onContinue(trimmedThought)
```

## 🔵 `trim()`

The code uses:

```js
trimmedThought
```

after trimming whitespace.

For example:

```text
"   I keep thinking about it   "
```

becomes:

```text
"I keep thinking about it"
```

## 🟡 WHY?

It prevents meaningless leading/trailing spaces from becoming part of the stored thought.

---

# 📖 PAGE 20 — PROCESS: FEELING

## 🎯 Learning objective

Understand rendering choices from arrays.

The feeling options include:

```text
Sad
Lonely
Anxious
Angry
Guilty
Rejected
Confused
Overwhelmed
Disappointed
Numb
I don't know
```

These are represented as data and displayed as selectable choices.

The important pattern is:

```text
array
 ↓
map()
 ↓
button/card for each option
 ↓
click
 ↓
selected feeling state
```

## 🟠 TRY YOURSELF

Add another feeling to the array.

You should not need to manually create another button if the UI is generated with `map()`.

That is one advantage of data-driven UI.

---

# 📖 PAGE 21 — PROCESS: NEED

## 🎯 Learning objective

Understand objects containing UI metadata.

The need options contain values such as:

```js
{
  id: 'understanding',
  title: 'I need to feel understood',
  description: '...',
  icon: MessageCircle,
}
```

Notice that the object contains both:

```text
application data
```

and:

```text
presentation data
```

The `id` is useful to the application.

The title/description are shown to the user.

The icon controls the visual representation.

## 🟡 WHY?

Instead of writing separate hardcoded UI for every need, the component can render the same structure from data.

---

# 📖 PAGE 22 — PROCESS: SUMMARY

## 🎯 Learning objective

Understand how previously collected values are combined.

`ProcessSummary.jsx` receives values such as:

```text
thought
feeling
need
```

It then presents:

```text
What keeps coming back
        ↓
What you feel
        ↓
What you may need
        ↓
Possible perspective
        ↓
Next step
```

## 🟣 IMPORTANT

The summary is deterministic prototype logic.

It should not be treated as diagnosis.

The purpose is to help the user organize the information they already provided.

---

# 📖 PAGE 23 — PROCESS: NEXT STEP

## 🎯 Learning objective

Understand branching after reflection.

Available next steps include:

```text
Put the thought into words
Talk to someone
Give myself a calmer moment
Leave it for now
```

Each option has an `id`.

The selected ID can be passed to the next stage.

## 🔵 FLOW

```text
ProcessSummary
       ↓
ProcessNextStep
       ↓
user chooses action
       ↓
selected next-step id
       ↓
ProcessOutcome
```

## 🟢 REMEMBER

Not every click needs a completely different component.

Sometimes a component can collect a choice and pass the result to the next screen.

---

# 📖 PAGE 24 — PROCESS OUTCOME

## 🎯 Learning objective

Understand before/after self-reporting.

The user can provide:

```text
intensityAfter
whatHelped
```

The session already has:

```text
intensityBefore
```

Therefore the application can compare:

```text
Before → After
```

## 🔵 IMPORTANT

This is a **self-reported experience**, not a medical measurement.

For example:

```text
Before: 8
After: 5
```

means the user reported lower intensity.

It does not prove that LUMI clinically treated anything.

---

# 📖 PAGE 25 — CALM FLOW

## 🎯 Learning objective

Understand the shortest support route.

```text
Calm.jsx
   ↓
60-second grounding activity
   ↓
Check in with myself
   ↓
CalmOutcome.jsx
   ↓
intensityAfter
whatHelped
   ↓
SessionComplete
```

## 🟡 WHY?

The user may not want to explain the problem.

CALM provides a path where:

```text
No long explanation
        ↓
Short intervention
        ↓
Outcome check
```

## 🟢 REMEMBER

Good UX sometimes means asking **less**, not more.

---

# 📖 PAGE 26 — SESSION COMPLETION

## 🎯 Learning objective

Understand how a support session becomes stored data.

The completion process is conceptually:

```text
route
emotion
intensityBefore
intensityAfter
whatHelped
        ↓
completeSession()
        ↓
saveSession()
        ↓
localStorage
        ↓
buildPersonalSupportProfile()
        ↓
updated profile
```

The session object contains values such as:

```js
{
  emotion: checkInData.emotion,
  route: supportRoute,
  routeSource,
  intensityBefore: checkInData.intensityBefore,
  intensityAfter,
  whatHelped,
}
```

## 🟣 PROJECT CONNECTION

This is the bridge between:

```text
current session
```

and:

```text
future personalization
```

---

# 📖 PAGE 27 — `sessionStorage.js`

## 🎯 Learning objective

Understand browser persistence.

## 🟣 ORIGINAL IMPORTANT CODE

```js
const STORAGE_KEY = 'lumi_session_history'
```

This defines the browser storage key.

### `getSessions()`

Conceptually:

```text
localStorage
    ↓
getItem(STORAGE_KEY)
    ↓
string
    ↓
JSON.parse()
    ↓
JavaScript array
```

If there is no saved data:

```js
return []
```

If parsing fails, the function catches the error and returns an empty array.

## 🔵 `saveSession(session)`

The function:

1. gets existing sessions
2. creates an updated array
3. adds a unique ID
4. adds creation time
5. converts the array to JSON
6. saves it to localStorage
7. returns updated sessions

## 🟡 WHY `JSON.stringify()`?

`localStorage` stores strings.

JavaScript objects/arrays must therefore be converted into a string.

```text
JavaScript object
       ↓
JSON.stringify()
       ↓
string
       ↓
localStorage
```

Reading reverses the process:

```text
string
 ↓
JSON.parse()
 ↓
JavaScript object
```

## 🔴 COMMON MISTAKE

Do not assume `localStorage` directly stores JavaScript objects.

It stores strings.

---

# 📖 PAGE 28 — PERSONALIZATION

## 🎯 Learning objective

Understand how previous sessions become useful information.

`personalization.js` builds a profile containing information such as:

- total sessions
- common emotions
- helpful support
- common routes
- recommended routes used
- effective routes
- average intensity before
- average intensity after
- average change

## 🔵 BIG IDEA

```text
Session history
       ↓
buildPersonalSupportProfile()
       ↓
patterns
       ↓
getPersonalizedSuggestion()
       ↓
future recommendation
```

## 🟡 WHY?

Without this layer:

```text
Session 1
Session 2
Session 3
```

would simply be isolated records.

Personalization tries to turn them into:

```text
"What seems to help this user?"
```

## 🟣 IMPORTANT

The current implementation is a browser-side prototype.

It is not a production machine-learning system.

---

# 📖 PAGE 29 — PERSONALIZED SUPPORT PROFILE

## 🎯 Learning objective

Understand the UI that exposes learned patterns.

`PersonalSupportProfile.jsx` uses:

```js
getPersonalizedSuggestion()
```

and:

```js
buildPersonalSupportProfile()
```

to display previous-session information.

The profile can show:

```text
What LUMI has learned
        ↓
common patterns
        ↓
helpful support
        ↓
effective routes
        ↓
recommendations
```

## 🔴 IMPORTANT

The UI explicitly frames the information as being based on previous choices and self-reported experience.

It should not be interpreted as a medical prediction.

---

# 📖 PAGE 30 — JAVASCRIPT: `const` AND `let`

## 🎯 Learning objective

Understand variables used throughout LUMI.

### `const`

Used when the variable binding should not be reassigned.

Example:

```js
const emotions = [...]
```

### `let`

Used when a variable needs reassignment.

The project also uses temporary variables such as:

```js
let suggestedRoute
```

when the value is built conditionally.

## 🟠 PRACTICE

Why would an array such as `emotions` normally use `const`?

Because the variable does not need to be reassigned.

---

# 📖 PAGE 31 — JAVASCRIPT: ARRAYS AND OBJECTS

## 🎯 Learning objective

Understand the main data structures used by LUMI.

### Array

```js
[
  option1,
  option2,
  option3
]
```

Useful for collections.

### Object

```js
{
  id: 'connect',
  title: 'I want to be heard'
}
```

Useful for describing one structured item.

LUMI frequently combines them:

```text
Array
 ↓
Objects
 ↓
map()
 ↓
UI
```

---

# 📖 PAGE 32 — JAVASCRIPT: `map()`

## 🎯 Learning objective

Understand data-driven rendering.

Suppose:

```js
const emotions = [
  { id: 'alone', label: 'I feel alone' },
  { id: 'stressed', label: "I'm stressed" }
]
```

A component can map over the array.

Conceptually:

```text
emotion 1 → button
emotion 2 → button
```

Instead of writing:

```text
button 1 manually
button 2 manually
button 3 manually
...
```

## 🟢 REMEMBER

`map()` does not mean "React function."

It is a normal JavaScript array method that React code frequently uses to create repeated UI.

---

# 📖 PAGE 33 — JAVASCRIPT: DESTRUCTURING

## 🎯 Learning objective

Understand patterns such as:

```jsx
function CheckIn({ onBack, onContinue }) {
```

This is object destructuring.

Instead of:

```js
function CheckIn(props) {
  props.onBack
  props.onContinue
}
```

the code extracts the properties directly.

Similarly:

```js
const { emotion, intensityBefore } = data
```

would extract properties from an object.

## 🟡 WHY?

It makes component code shorter and easier to read.

---

# 📖 PAGE 34 — JAVASCRIPT: SPREAD OPERATOR

## 🎯 Learning objective

Understand immutable updates.

A common React pattern is:

```js
{
  ...oldObject,
  changedValue: newValue
}
```

The `...` spread operator copies existing properties into a new object.

This matters because React state should generally be updated by creating a new value rather than directly mutating the existing object.

## 🔴 COMMON MISTAKE

Avoid treating React state objects like ordinary mutable objects:

```js
state.value = newValue
```

The proper state setter should be used.

---

# 📖 PAGE 35 — JAVASCRIPT: TEMPLATE LITERALS AND CONDITIONS

## 🎯 Learning objective

Understand dynamic text and decisions.

Template literals use:

```js
`Hello ${name}`
```

They are useful when UI text depends on a value.

Conditions appear throughout LUMI.

For example:

```js
if (!companionId) return
```

means:

```text
If companionId does not exist
        ↓
stop the function
```

Ternary expressions are also useful in JSX:

```js
condition ? valueA : valueB
```

---

# 📖 PAGE 36 — REACT: COMPONENTS

## 🎯 Learning objective

Understand the fundamental building block of the project.

A React component is a function that returns UI.

Example:

```jsx
function Lumi() {
  return (
    <div>
      ...
    </div>
  )
}
```

LUMI has many components because each part of the user experience has its own responsibility.

```text
App
├── Home
├── CheckIn
├── NeedDiscovery
├── Connect
├── Process...
└── Calm...
```

## 🟢 REMEMBER

A component is not just "a page."

A component can be:

- a complete page
- a character
- a card
- a reusable visual element

`Lumi.jsx` is an example of a reusable visual component.

---

# 📖 PAGE 37 — REACT: JSX

## 🎯 Learning objective

Understand JSX.

JSX lets JavaScript code describe UI in a syntax resembling HTML.

Example:

```jsx
<section>
  <h1>Hello</h1>
</section>
```

But JSX is processed into JavaScript instructions React can use to create the UI.

## 🟡 WHY?

JSX makes UI structure easier to read.

The LUMI frontend combines:

```text
JavaScript logic
+
JSX UI
```

inside components.

---

# 📖 PAGE 38 — REACT: `useState`

## 🎯 Learning objective

Understand the hook used heavily throughout LUMI.

Example:

```jsx
const [selectedEmotion, setSelectedEmotion] = useState(null)
```

There are two parts:

```text
selectedEmotion
       ↓
current value

setSelectedEmotion
       ↓
function that changes the value
```

And:

```js
useState(null)
```

sets the initial value to `null`.

## 🔵 EXECUTION

```text
Initial render
    ↓
selectedEmotion = null
    ↓
user chooses emotion
    ↓
setSelectedEmotion("alone")
    ↓
React schedules update
    ↓
component renders again
    ↓
selectedEmotion = "alone"
```

## 🟢 REMEMBER

Calling the setter is what tells React that state changed.

---

# 📖 PAGE 39 — REACT: EVENTS

## 🎯 Learning objective

Understand `onClick`, input events and callbacks.

A button can have:

```jsx
onClick={handleContinue}
```

This means:

```text
Do not call handleContinue now.
Give React the function.
React calls it when the click happens.
```

This distinction is important.

### Correct:

```jsx
onClick={handleContinue}
```

### Different:

```jsx
onClick={handleContinue()}
```

The second version calls the function while rendering.

## 🔴 COMMON MISTAKE

Do not confuse:

```text
passing a function
```

with:

```text
calling a function
```

---

# 📖 PAGE 40 — REACT: CONDITIONAL RENDERING

## 🎯 Learning objective

Understand how the application decides what to display.

The core project pattern is:

```text
screen value
     ↓
which component?
     ↓
render that component
```

For example:

```text
screen = "home"
       ↓
Home

screen = "connect"
       ↓
Connect

screen = "process-start"
       ↓
ProcessStart
```

This is conditional rendering controlled by application state.

## 🟣 PROJECT CONNECTION

This is why `screen` is so important in `App.jsx`.

---

# 📖 PAGE 41 — REACT: LIST RENDERING AND KEYS

## 🎯 Learning objective

Understand repeated UI.

Companion cards, emotion options and need options are examples of collections that can be rendered from arrays.

React list rendering normally uses a `key`.

Conceptually:

```jsx
items.map((item) => (
  <button key={item.id}>
    ...
  </button>
))
```

## 🟡 WHY `key`?

React uses keys to distinguish list items between renders.

A stable ID is preferable.

## 🔴 COMMON MISTAKE

Do not casually remove list keys.

Without useful keys, React can have difficulty efficiently tracking which item changed.

---

# 📖 PAGE 42 — REACT: CONTROLLED INPUTS

## 🎯 Learning objective

Understand text fields such as the PROCESS thought input and chat input.

A controlled input follows:

```text
React state
   ↓
input value

user types
   ↓
onChange
   ↓
setState
   ↓
React renders new value
```

The input is therefore controlled by React state.

## 🟢 REMEMBER

Controlled input means:

> React state is the source of truth for the input value.

---

# 📖 PAGE 43 — `Lumi.jsx`

## 🎯 Learning objective

Understand the reusable visual character.

The component creates:

```text
outer glow
halo
Lumi body
eyes
mouth
arms
sparkles
```

It uses Tailwind utility classes plus custom animations defined in `index.css`.

## 🔵 IMPORTANT CONNECTION

```text
Lumi.jsx
   ↓
className
   ↓
Tailwind utilities
   +
custom animation names
   ↓
index.css
   ↓
visual animation
```

For example:

```text
animate-[pulseSoft_4s_ease-in-out_infinite]
```

connects JSX to the custom `pulseSoft` animation defined in `index.css`.

---

# 📖 PAGE 44 — CSS ARCHITECTURE

## 🎯 Learning objective

Understand how the project's styling works.

The project uses:

```text
Tailwind CSS v4
+
global CSS in index.css
```

`index.css` includes:

```css
@import "tailwindcss";
```

This makes Tailwind available.

It also contains global browser/application styles.

## 🔵 GLOBAL STYLE

The `:root` rule defines application-wide values such as:

- font family
- text color
- background
- rendering settings

## 🟣 PROJECT CONNECTION

Most page-specific styling is written directly in JSX through Tailwind classes:

```jsx
className="..."
```

while reusable global animations live in `index.css`.

---

# 📖 PAGE 45 — FLEXBOX

## 🎯 Learning objective

Recognize Flexbox in LUMI classes.

Typical Tailwind patterns include:

```text
flex
items-center
justify-center
gap-...
flex-col
```

Conceptually:

```text
flex
 ↓
children placed using Flexbox

justify-center
 ↓
main-axis alignment

items-center
 ↓
cross-axis alignment
```

## 🟠 TRY YOURSELF

Change:

```text
justify-center
```

to:

```text
justify-start
```

and observe how the content moves.

---

# 📖 PAGE 46 — SPACING, TYPOGRAPHY AND COLORS

## 🎯 Learning objective

Understand Tailwind utility classes.

Examples:

```text
p-4
px-5
py-3
gap-4
mt-...
mb-...
```

control spacing.

Typography classes control:

```text
text-sm
text-lg
font-medium
font-semibold
```

Colors are represented by utility classes and custom values.

The project uses a soft visual palette to make the interface feel calm rather than clinical.

---

# 📖 PAGE 47 — RESPONSIVE DESIGN

## 🎯 Learning objective

Understand responsive Tailwind prefixes.

The project uses responsive classes such as:

```text
sm:...
```

Conceptually:

```text
default styles
      ↓
small-screen breakpoint
      ↓
sm:...
```

For example:

```text
h-64
sm:h-72
```

means the element uses one size by default and a larger size from the small breakpoint upward.

## 🟢 REMEMBER

Tailwind responsive classes are generally **mobile-first**.

---

# 📖 PAGE 48 — HOVER STATES

## 🎯 Learning objective

Understand interaction styling.

A class such as:

```text
hover:bg-...
```

means the style changes when the pointer is over the element.

This improves feedback.

The important distinction is:

```text
hover
```

is visual styling.

It does not itself change React state.

---

# 📖 PAGE 49 — ANIMATIONS

## 🎯 Learning objective

Understand the custom animations.

The project defines animations such as:

```css
@keyframes float
@keyframes pulseSoft
@keyframes halo
@keyframes sparkle
```

The animation describes how CSS properties change over time.

For example, `pulseSoft` changes scale and opacity.

The component then uses the animation through a Tailwind animation class.

## 🟣 PROJECT CONNECTION

```text
index.css
  ↓
@keyframes pulseSoft
  ↓
Lumi.jsx
  ↓
animate-[pulseSoft...]
  ↓
Lumi glows/pulses
```

---

# 📖 PAGE 50 — WHY REACT STATE INSTEAD OF NORMAL VARIABLES?

## 🎯 Learning objective

Understand a fundamental React decision.

Suppose you did:

```js
let selectedEmotion = null
```

and later:

```js
selectedEmotion = 'alone'
```

React would not automatically know that the UI needs to update.

With:

```js
const [selectedEmotion, setSelectedEmotion] = useState(null)
```

and:

```js
setSelectedEmotion('alone')
```

React is notified of the state change.

## 🟡 WHY?

The UI depends on the value.

Therefore the value belongs in React state.

---

# 📖 PAGE 51 — WHAT IF I CHANGE THIS?

## 🎯 Learning objective

Learn by experimentation.

### Experiment 1

Change:

```js
useState(null)
```

to:

```js
useState('alone')
```

The component begins with an emotion already selected.

### Experiment 2

Remove:

```js
setSelectedEmotion(...)
```

The selected value will no longer update correctly.

### Experiment 3

Remove:

```js
setSelectedIntensity(...)
```

Intensity selection will stop being stored.

### Experiment 4

Change the label in the emotions array.

The displayed text changes without changing the application's internal ID.

## 🟠 TRY YOURSELF

Perform these changes one at a time and undo each one after observing the result.

---

# 📖 PAGE 52 — WHAT IF I REMOVE A COMPONENT?

## 🎯 Learning objective

Understand component dependencies.

Example:

```text
App.jsx
  ↓
CheckIn.jsx
```

If `CheckIn.jsx` is removed while `App.jsx` still imports it:

```text
import CheckIn from './pages/CheckIn'
```

the build will fail because the module cannot be found.

If the import is removed but the application still expects to render CheckIn, the flow also breaks.

## 🟢 REMEMBER

A component exists because something depends on it.

---

# 📖 PAGE 53 — FRONTEND VS FUTURE BACKEND

## 🎯 Learning objective

Know exactly what the current frontend does and what it does not do.

## 🟢 CURRENT FRONTEND

```text
User
 ↓
React
 ↓
local state
 ↓
UI
 ↓
localStorage
```

Current prototype/static areas include:

- companion list
- prototype chat response
- screen navigation
- local session history
- personalization calculations
- support recommendation logic

## 🔵 FUTURE FULL-STACK VERSION

```text
User
 ↓
React
 ↓
API request
 ↓
Express backend
 ↓
Database
 ↓
Backend logic
 ↓
API response
 ↓
React state
 ↓
UI
```

## 🟣 FUTURE BACKEND RESPONSIBILITIES

Eventually, the backend could handle:

```text
User accounts
Companion profiles
Companion eligibility
Availability
Matching
Connection requests
Chat persistence
Reports
Safety events
Session history
Personalization data
```

## 🔴 IMPORTANT

Do not confuse the prototype with a production system.

The current frontend demonstrates the product flow.

---

# 📖 PAGE 54 — FRONTEND → BACKEND CONNECTION MAP

## 🎯 Learning objective

Know where future APIs will fit.

### Sessions

```text
Current:

completeSession()
   ↓
saveSession()
   ↓
localStorage


Future:

completeSession()
   ↓
POST /api/sessions
   ↓
Express
   ↓
MongoDB
```

### Companions

```text
Current:

Connect.jsx
   ↓
hardcoded companions


Future:

Connect.jsx
   ↓
GET /api/companions
   ↓
Express
   ↓
MongoDB
```

### Chat

```text
Current:

Chat.jsx
   ↓
local messages
   ↓
prototype response


Future:

Chat.jsx
   ↓
Socket.IO
   ↓
server
   ↓
real companion
```

### Personalization

```text
Current:

local session history
   ↓
personalization.js


Future:

database session history
   ↓
backend personalization service
   ↓
API
   ↓
React
```

---

# 📖 PAGE 55 — IMPORTANT: WHAT IS NOT IN THE CURRENT FRONTEND?

## 🎯 Learning objective

Identify gaps instead of assuming features exist.

The current frontend does not yet provide a production backend for:

- real authentication
- real companion accounts
- server-side companion matching
- persistent multi-user chat
- secure server-side session storage
- production safety event processing
- database-backed personalization
- production reporting/blocking
- server-side access control

These are future engineering tasks.

## 🟢 REMEMBER

A working UI does not automatically mean a production system exists behind it.

---

# 📖 PAGE 56 — COMPLETE PROJECT FLOW

## 🎯 Learning objective

Try to mentally run the entire application.

```text
USER
 ↓
Browser
 ↓
index.html
 ↓
main.jsx
 ↓
React createRoot()
 ↓
App.jsx
 ↓
Home
 ↓
RoleSelection
 ↓
CheckIn
 ↓
SafetyCheck
 ↓
NeedDiscovery
 ↓
 ┌───────────────┬────────────────┬──────────────┐
 ↓               ↓                ↓
CONNECT         PROCESS          CALM
 ↓               ↓                ↓
connection      thought          calming
 ↓              feeling          activity
consent          need
 ↓               ↓
request         summary
 ↓               ↓
chat            next step
 ↓               ↓
outcome         outcome
 └───────────────┴────────────────┘
                ↓
        SessionComplete
                ↓
          saveSession()
                ↓
           localStorage
                ↓
     PersonalSupportProfile
```

## 🟢 THE CORE LOOP

```text
USER ACTION
    ↓
EVENT HANDLER
    ↓
STATE / CALLBACK
    ↓
APP FLOW
    ↓
RENDER
    ↓
UI CHANGES
```

If I understand this loop, I understand the heart of the frontend.

---

# 📖 PAGE 57 — COMPLETE PROJECT CHEAT SHEET

## 🎯 LUMI purpose

Adaptive emotional-wellbeing support routing.

## 🎯 Main routes

```text
CONNECT
PROCESS
CALM
```

## 🎯 Entry

```text
main.jsx
```

## 🎯 Root

```text
App.jsx
```

## 🎯 Main state

```text
screen
userRole
checkInData
supportRoute
routeSource
processData
calmData
sessionData
personalProfile
selectedCompanion
```

## 🎯 Persistence

```text
sessionStorage.js
```

## 🎯 Personalization

```text
personalization.js
```

## 🎯 Reusable character

```text
components/Lumi.jsx
```

## 🎯 Styling

```text
Tailwind CSS
+
src/index.css
```

## 🎯 Rendering pattern

```text
state
 ↓
JSX
 ↓
UI
```

## 🎯 Interaction pattern

```text
event
 ↓
function
 ↓
state update
 ↓
re-render
```

---

# 📖 PAGE 58 — IMPORTANT COMPONENTS

| Component | Main responsibility |
|---|---|
| `Home` | Entry experience |
| `RoleSelection` | Role choice |
| `CheckIn` | Emotion + intensity |
| `SafetyCheck` | Safety gate |
| `SafetySupport` | Support after concerning safety response |
| `NeedDiscovery` | Identify desired support |
| `SupportRecommendation` | Recommend route |
| `Connect` | Companion selection |
| `ConnectionConsent` | Consent/review |
| `CompanionRequest` | Request confirmation |
| `Chat` | Prototype conversation |
| `ConversationEnded` | Transition after chat |
| `ConnectOutcome` | Connect outcome |
| `ProcessStart` | Start structured reflection |
| `ProcessThought` | Collect thought |
| `ProcessFeeling` | Collect feeling |
| `ProcessNeed` | Collect need |
| `ProcessSummary` | Show reflection |
| `ProcessNextStep` | Select next action |
| `ProcessOutcome` | Outcome |
| `Calm` | Calming activity |
| `CalmOutcome` | Calm outcome |
| `SessionComplete` | Finish session |
| `PersonalSupportProfile` | Show personalization |

---

# 📖 PAGE 59 — IMPORTANT FUNCTIONS

Important application functions include:

```text
handleContinue()
```

Used by pages to validate/submit current choices.

```text
completeSession()
```

Finalizes a support session and saves the result.

```text
saveSession()
```

Persists a session.

```text
getSessions()
```

Reads stored sessions.

```text
buildPersonalSupportProfile()
```

Builds a profile from session history.

```text
getPersonalizedSuggestion()
```

Uses profile information to produce a recommendation.

```text
handleSend()
```

Adds a chat message in the prototype chat.

---

# 📖 PAGE 60 — IMPORTANT PROPS

Important prop patterns include:

```text
onBack
```

Lets the child request backward navigation.

```text
onContinue
```

Lets the child send data/event information back to the parent.

```text
companionId
```

Identifies the selected companion through the CONNECT flow.

```text
intensityBefore
```

Allows outcome screens to compare before/after self-reported intensity.

```text
thought
feeling
need
```

Carry PROCESS information between screens.

---

# 📖 PAGE 61 — THINGS I MUST REMEMBER

## 🟢 1

`App.jsx` controls the main frontend flow.

## 🟢 2

`useState` stores changing values that affect the UI.

## 🟢 3

Props move information/configuration from parent to child.

## 🟢 4

Callback props let children communicate events/data upward.

## 🟢 5

Changing React state causes React to render using the new state.

## 🟢 6

`map()` is JavaScript used to generate repeated UI.

## 🟢 7

`localStorage` stores strings, so objects are converted with JSON.

## 🟢 8

Current companion/chat data is prototype data.

## 🟢 9

The current frontend is not the backend.

## 🟢 10

Before building backend features, understand:

```text
what data exists
where it currently lives
who uses it
when it changes
what UI depends on it
```

---

# 📖 PAGE 62 — CAN I EXPLAIN MY PROJECT?

## 🧠 TEST YOURSELF

Do not look at the answer key yet.

### 1.
Where does the React application start?

### 2.
What does `main.jsx` do?

### 3.
What is the role of `App.jsx`?

### 4.
Why does LUMI use state?

### 5.
What does the `screen` state represent?

### 6.
How does `CheckIn.jsx` send data back to `App.jsx`?

### 7.
What is the purpose of `onContinue`?

### 8.
Why does `Connect.jsx` need a selected companion?

### 9.
Why does `companionId` need to travel through the CONNECT flow?

### 10.
What happens when `setSelectedEmotion()` runs?

### 11.
Why is `map()` useful in the project?

### 12.
What is a controlled input?

### 13.
What is stored in a completed session?

### 14.
How does `saveSession()` persist data?

### 15.
Why are `JSON.stringify()` and `JSON.parse()` used?

### 16.
What does `buildPersonalSupportProfile()` do?

### 17.
What is currently static in the CONNECT flow?

### 18.
Why is the current chat not a real multi-user chat system?

### 19.
Where would a future sessions API connect?

### 20.
Where would a future companion API connect?

### 21.
Where would Socket.IO eventually connect?

### 22.
What happens after a state setter changes state?

### 23.
Explain:

```text
click → function → state → re-render → UI
```

in your own words.

### 24.
If you removed `CheckIn.jsx`, what would break?

### 25.
If `companionId` became `undefined`, what kind of bug could occur?

---

# 📖 PAGE 63 — ANSWER KEY

## 1. Where does the application start?

`main.jsx` is the React entry point. It creates the React root and renders `<App />`.

## 2. What does `main.jsx` do?

It connects React to the browser's root DOM element and renders the root component.

## 3. What is the role of `App.jsx`?

It acts as the main application controller, holding important state and deciding which screen component should appear.

## 4. Why does LUMI use state?

Because user choices and application information change during the session and the UI needs to update when those values change.

## 5. What does `screen` represent?

The current frontend screen/step in the application's flow.

## 6. How does `CheckIn.jsx` send data back?

It calls the `onContinue` callback passed to it by the parent.

## 7. What is `onContinue`?

A callback prop. The child calls it to tell the parent that the current step is complete and optionally provide data.

## 8. Why does `Connect.jsx` need a selected companion?

The next CONNECT screens need to know which companion the user selected.

## 9. Why does `companionId` travel through CONNECT?

Because the flow spans multiple components and the selected companion remains relevant through consent, request and chat.

## 10. What happens when `setSelectedEmotion()` runs?

React receives a state update and schedules the component to render with the new selected emotion.

## 11. Why is `map()` useful?

It lets the application create repeated UI from arrays of data.

## 12. What is a controlled input?

An input whose displayed value is controlled by React state.

## 13. What is stored in a completed session?

Values such as emotion, route, route source, intensity before, intensity after and what helped.

## 14. How does `saveSession()` persist data?

It reads existing sessions, adds the new session, converts the resulting array to JSON and writes it to localStorage.

## 15. Why are JSON functions used?

Because localStorage stores strings rather than JavaScript objects/arrays.

## 16. What does `buildPersonalSupportProfile()` do?

It analyzes stored session history to produce useful personal support patterns.

## 17. What is currently static?

The prototype companion data is local/static rather than retrieved from a backend database.

## 18. Why isn't the current chat a real multi-user chat?

The current chat is a frontend prototype with local message state and a simulated response.

## 19. Where would a future sessions API connect?

Around the current `saveSession()` / session completion point.

## 20. Where would a future companion API connect?

`Connect.jsx` would request available companions from the backend instead of using hardcoded data.

## 21. Where would Socket.IO connect?

Around the current prototype chat message flow.

## 22. What happens after a state setter changes state?

React re-renders the relevant component using the updated state.

## 23. Explain click → function → state → re-render → UI.

The user triggers an event, the event handler executes, the handler updates state, React renders with the new state, and the user sees the updated interface.

## 24. What happens if CheckIn is removed?

Any import/reference expecting `CheckIn.jsx` will fail or the check-in part of the application flow will break.

## 25. What happens if companionId is undefined?

A later component may not know which companion was selected. Buttons or logic depending on the ID may fail or become unavailable.

---

# 📖 PAGE 64 — FINAL SELF-CHECK

Before beginning backend development, I should be able to explain these without ChatGPT:

```text
□ Where React starts
□ What main.jsx does
□ What App.jsx does
□ What a component is
□ What JSX is
□ What props are
□ What state is
□ What useState does
□ What an event handler is
□ What map() does
□ What controlled input means
□ How callbacks move data upward
□ How App.jsx controls the flow
□ How CONNECT works
□ How PROCESS works
□ How CALM works
□ How a session is completed
□ How localStorage works
□ How personalization is calculated
□ Which data is static
□ Which parts need a backend
□ Why Socket.IO would be useful later
```

---

# 📖 PAGE 65 — THE ONE DIAGRAM TO REMEMBER

```text
                         USER
                           ↓
                        BROWSER
                           ↓
                       main.jsx
                           ↓
                        App.jsx
                           ↓
                    ┌──────┴──────┐
                    ↓             ↓
                  STATE          PAGE
                    ↑             ↓
                    │          COMPONENT
                    │             ↓
                    │           EVENT
                    │             ↓
                    │          FUNCTION
                    │             ↓
                    └────── STATE UPDATE
                                  ↓
                             RE-RENDER
                                  ↓
                                UI
```

And for LUMI's product flow:

```text
                    EMOTIONAL MOMENT
                           ↓
                        CHECK-IN
                           ↓
                      SAFETY CHECK
                           ↓
                    NEED DISCOVERY
                           ↓
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
          CONNECT        PROCESS        CALM
             ↓             ↓             ↓
          SUPPORT       REFLECTION    CALMING
             └─────────────┼─────────────┘
                           ↓
                       OUTCOME
                           ↓
                    SAVE SESSION
                           ↓
                    PERSONALIZATION
```

---

# 📖 PAGE 66 — READY FOR THE BACKEND?

## 🟢 You are ready to start backend learning when you can explain:

> “The frontend currently stores and passes information locally. `App.jsx` coordinates the flow, individual pages collect user input, callbacks move information back to the parent, React state controls what is displayed, `sessionStorage.js` persists session history in localStorage, and `personalization.js` derives patterns from that history.”

Then you should be able to explain the future transition:

```text
CURRENT

React
 ↓
local state
 ↓
localStorage


FUTURE

React
 ↓
HTTP / WebSocket
 ↓
Express
 ↓
MongoDB
```

## 🟣 FINAL PROJECT CONNECTION

The backend should not be built blindly.

First understand:

```text
What data does the frontend already collect?
What data must persist?
Which data belongs to a user?
Which data belongs to a session?
Which data belongs to a companion?
Which operations need server authority?
```

That understanding will make backend design much easier.

---

# 📖 PAGE 67 — FINAL REVISION CARD

## LUMI IN 30 SECONDS

**LUMI** is an emotional-wellbeing support platform built around adaptive support routing.

A user:

```text
checks in
 ↓
passes safety gate
 ↓
identifies what support they want
 ↓
CONNECT / PROCESS / CALM
 ↓
checks outcome
 ↓
session is saved
 ↓
previous experience can influence future support suggestions
```

Technically:

```text
Vite
+
React
+
JavaScript
+
Tailwind CSS
+
localStorage
```

The application's main controller is:

```text
App.jsx
```

The React entry point is:

```text
main.jsx
```

The reusable character is:

```text
Lumi.jsx
```

Persistence:

```text
sessionStorage.js
```

Personalization:

```text
personalization.js
```

The current frontend is a working prototype. Real backend functionality will eventually replace or extend the local/static parts.

---

# 📖 PAGE 68 — MY NEXT LEARNING RULE

## 🟠 TRY THIS BEFORE ASKING FOR CODE

When I see a piece of React code I don't understand, I should first ask myself:

### 1. What data exists?

```text
variable/state
```

### 2. Where did it come from?

```text
props / state / function / array
```

### 3. Who uses it?

```text
component / function / UI
```

### 4. What changes it?

```text
event / setter / callback
```

### 5. What happens after it changes?

```text
re-render
```

### 6. What does the user see?

```text
updated UI
```

This six-question method is more valuable than memorizing syntax.

---

# 🎓 END OF FRONTEND STUDY NOTEBOOK

## Final goal

I should now be working toward being able to:

- Open a LUMI frontend file.
- Identify its responsibility.
- Understand its important variables.
- Explain its props.
- Explain its state.
- Follow its functions.
- Trace a user action.
- Explain why the code exists.
- Modify the code deliberately.
- Debug simple frontend problems.
- Explain how the frontend will eventually communicate with the backend.

> **Do not memorize this notebook. Rebuild the mental model.**

The target is not:

> “I remember the code ChatGPT gave me.”

The target is:

> **“I understand why this code exists, what happens when it runs, and I can change it myself.”**
