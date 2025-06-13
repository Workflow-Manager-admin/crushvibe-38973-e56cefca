import React, { useState } from "react";
import "./App.css";
import FloatingHearts from "./components/HeartAnimation";
import Inputs from "./components/Inputs";
import ActionButton from "./components/ActionButton";
import ResultsBox from "./components/ResultsBox";
import DMGeneratorButton from "./components/DMGeneratorButton";
import ResetButton from "./components/ResetButton";

const ROMANTIC_MESSAGES = [
  "They like you... and your dog pics 🐶",
  "This is giving mutual situationship 💅",
  "They play cool but their heart races 🥹",
  "It’s a NO from the universe, bbg 💔",
  "They saved your reel... TWICE. It’s fate 😳",
  "Stop playing, you’re the crush 😏",
  "You should shoot your shot. Right now. 💘",
  "They think about you at 3am 👀✨"
];

const FLIRTY_DM_LINES = [
  "Are you Netflix? Because I could stare at you all night.",
  "You're the reason my phone lights up and my heart speeds up 😘",
  "I was going to play it cool, but damn... you’re distracting me.",
  "Stop being cute. I'm trying to be normal here.",
  "You’ve been living rent-free in my head all week 🧠💘",
  "Sooo… when are you taking me out? Asking for a friend 😏",
  "If I had a crush on anyone else, I’d be lying.",
  "You make blushing a full-time job 😳",
  "Wanna be the reason I cancel all my plans this weekend? 👀",
  "You like me. Just admit it already.",
  "If flirting was a crime, I’d be guilty. With you as my partner-in-crime 🔥",
  "I wish I was your phone so you'd touch me all the time 😩📱",
  "Tell me your favorite movie so I can pretend to like it too 😇",
  "Lowkey? Highkey? I want to kiss you. Constantly.",
  "I swear your smile should be illegal. Too powerful.",
  "If you don’t message me first, I might cry… cutely.",
  "Hey, stop looking so good. I’m trying to focus here.",
  "If we were in a group project, I’d do all the work… just to sit next to you.",
  "You up? Just thinking about you… and maybe marrying you 😅",
  "Plot twist: I’ve had a crush on you since forever. 😳"
];

const MOODBOARD_QUOTES = [
  {
    moods: ["💖", "💭", "🌸"],
    quote: "Spread sweetness like hearts in the sky."
  },
  {
    moods: ["🦋", "🌈", "💙"],
    quote: "Let your vibe change the room."
  },
  {
    moods: ["💌", "✨", "🍬"],
    quote: "A little flirty, a lot of magic 💫"
  },
  {
    moods: ["🍓", "🎀", "🤍"],
    quote: "Cute energy > everything else!"
  },
  {
    moods: ["🌷", "💫", "🌸"],
    quote: "Kindness: always in style."
  }
];

const HOROSCOPE_MESSAGES = {
  Aries: "Big baddie energy. Don’t overthink—make the first move 🔥",
  Taurus: "Slow and steady... but don’t wait too long to DM! 🍫",
  Gemini: "Flirt mode: ON. Send that meme, twin 😏",
  Cancer: "Cuddles and feelings: incoming! Safe to open up 💌",
  Leo: "Drama is fun… as long as you win their heart 😎",
  Virgo: "Proofread the DM, then send it! Plan is working 📝",
  Libra: "It’s giving romance movie, with you in the lead 💕",
  Scorpio: "Mysterious = irresistible. Their curiosity is piqued 🦂",
  Sagittarius: "Adventure time! Try a spontaneous date 💫",
  Capricorn: "Your ambition? Kinda hot. Crush is noticing 🚀",
  Aquarius: "Quirky is cute, rebel is hotter. Be yourself! 💧",
  Pisces: "Expect a daydreamy mood. Vulnerability = attractive 🌊"
};
const HOROSCOPE_SIGNS = Object.keys(HOROSCOPE_MESSAGES);

function MoodBoardBox() {
  const [idx, setIdx] = React.useState(0);
  // Rotate mood/quote every 3.5s
  React.useEffect(() => {
    const interval = setInterval(() => setIdx(i => (i + 1) % MOODBOARD_QUOTES.length), 3500);
    return () => clearInterval(interval);
  }, []);
  const { moods, quote } = MOODBOARD_QUOTES[idx];
  return (
    <div className="feature-box moodboard">
      <div className="feature-title">MoodBoard of the Day</div>
      <div className="mini-moodboard">
        <span className="emoji-rotate">
          {moods.map((m, i) => <span key={i} style={{ fontSize: "1.45em", margin: "0 0.15em" }}>{m}</span>)}
        </span>
      </div>
      <div className="feature-quote">{quote}</div>
    </div>
  );
}

function HoroscopeBox() {
  const [selected, setSelected] = React.useState(HOROSCOPE_SIGNS[0]);
  return (
    <div className="feature-box horoscope">
      <div className="feature-title">Love Horoscope</div>
      <select
        className="zodiac-picker"
        value={selected}
        aria-label="Pick zodiac sign"
        onChange={e => setSelected(e.target.value)}
      >
        {HOROSCOPE_SIGNS.map(s => (
          <option key={s} value={s}>{s} {horoscopeEmoji(s)}</option>
        ))}
      </select>
      <div className="feature-quote">
        {HOROSCOPE_MESSAGES[selected]}
      </div>
    </div>
  );
}
function horoscopeEmoji(sign) {
  switch (sign) {
    case "Aries": return "♈️";
    case "Taurus": return "♉️";
    case "Gemini": return "♊️";
    case "Cancer": return "♋️";
    case "Leo": return "♌️";
    case "Virgo": return "♍️";
    case "Libra": return "♎️";
    case "Scorpio": return "♏️";
    case "Sagittarius": return "♐️";
    case "Capricorn": return "♑️";
    case "Aquarius": return "♒️";
    case "Pisces": return "♓️";
    default: return "";
  }
}

function SpinHeartBox() {
  const [spinning, setSpinning] = React.useState(false);
  const [dare, setDare] = React.useState("");
  const DARES = [
    "Confess with a meme to your crush 👀",
    "Send them a heart emoji, NO words 💖",
    "Text: 'Wanna vibe tonight?'",
    "Say: 'I had a dream about you...' 😘",
    "Ask their zodiac sign & send a GIF!",
    "Reply with only emojis for the next 5 min 🥰",
    "Send a wholesome compliment 💬",
    "Reveal your favorite thing about them!",
    "Screenshot your latest DM (no cheating!)",
    "React to their last post with 🔥"
  ];
  function handleSpin() {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setDare(DARES[Math.floor(Math.random() * DARES.length)]);
    }, 1250);
  }
  return (
    <div className="feature-box spinheart">
      <div className="feature-title">Mini Game: Spin the Heart</div>
      <div className="spinheart-center">
        <button
          className={`spinning-heart-btn${spinning ? " spinning" : ""}`}
          aria-label="Spin heart for a dare"
          onClick={handleSpin}
          disabled={spinning}
          style={{}}
        >
          <span className="spinning-heart-emoji" role="img" aria-label="spinning heart">💗</span>
        </button>
        <div className="feature-quote spin-dare" aria-live="polite">
          {dare}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [resultMsg, setResultMsg] = useState('');
  const [dmLine, setDmLine] = useState('');
  const [yourName, setYourName] = useState('');
  const [crushName, setCrushName] = useState('');

  function handleScanVibeClick(e) {
    if (e) e.preventDefault();
    const idx = Math.floor(Math.random() * ROMANTIC_MESSAGES.length);
    setResultMsg(ROMANTIC_MESSAGES[idx]);
    setDmLine('');
    setTimeout(() => {
      const box = document.getElementById("resultLiveBox");
      if (box) box.focus();
    }, 25);
  }

  function handleFlirtyDMClick(e) {
    if (e) e.preventDefault();
    const idx = Math.floor(Math.random() * FLIRTY_DM_LINES.length);
    setDmLine(FLIRTY_DM_LINES[idx]);
    setTimeout(() => {
      const box = document.getElementById("resultLiveBox");
      if (box) box.focus();
    }, 18);
  }

  function handleReset(e) {
    if (e) e.preventDefault();
    setYourName('');
    setCrushName('');
    setResultMsg('');
    setDmLine('');
    setTimeout(() => {
      const input = document.getElementById("yourName");
      if (input) input.focus();
    }, 14);
  }

  // Main dual-column responsive app layout
  return (
    <div
      className="app"
      style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
    >
      <FloatingHearts />
      <div className="main-app-layout" tabIndex={-1}>
        {/* Main Content Left */}
        <main className="centered-main-container" role="main">
          <section className="hero" style={{ marginTop: 0, paddingTop: 0 }}>
            <h1 className="crush-title compact">
              Crush-O-Meter <span role="img" aria-label="love emoji">💘</span>
            </h1>
            <form
              className="crush-input-form"
              autoComplete="off"
              aria-label="Crush-O-Meter Names"
              role="form"
              onSubmit={e => e.preventDefault()}
            >
              <Inputs
                yourName={yourName}
                crushName={crushName}
                setYourName={setYourName}
                setCrushName={setCrushName}
              />
              <ActionButton
                onClick={handleScanVibeClick}
                onKeyDown={e => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleScanVibeClick(e);
                  }
                }}
              />
              <ResultsBox
                resultMsg={resultMsg}
                dmLine={dmLine}
              />
              <DMGeneratorButton
                onClick={handleFlirtyDMClick}
                onKeyDown={e => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleFlirtyDMClick(e);
                  }
                }}
              />
              <ResetButton
                onClick={handleReset}
              />
            </form>
            <div className="subtitle" style={{ marginTop: 6, marginBottom: 3 }}>
              Built for fun, with big <span role="img" aria-label="sparkling heart">💖</span>
            </div>
            <h1 className="title" style={{ display: "none" }}>crushvibe_frontend</h1>
            <div className="description" style={{ marginBottom: 0 }}>
              Start building your application.
            </div>
          </section>
        </main>
        {/* Feature Boxes Right */}
        <aside className="features-sidebar" role="complementary" aria-label="Feature Extras">
          <MoodBoardBox />
          <HoroscopeBox />
          <SpinHeartBox />
        </aside>
      </div>
    </div>
  );
}

export default App;
