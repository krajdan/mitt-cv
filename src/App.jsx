import { useState, useEffect, useRef } from "react";
import './App.css';

const MY_INFO = {
  name: "Dennis Johansson",
  title: "Verksamhetsutvecklare inom digital utveckling",
  tagline: "Jag kravställer och testar produkter for Sveriges största försäkringsbolag.",
  about: "43-årig erfaren verksamhetsutvecklare med 15+ års erfarenhet av försakringsbranschen. Jag har en unik kombination av teknisk kompetens och djup verksamhetsförstaelse, vilket gör att jag kan bygga broar mellan IT och affarsverksamhet. Jag brinner for att skapa effektiva, användarvänliga lösningar som driver innovation och förbattrar kundupplevelsen.",
  location: "Orebro, Sverige",
  email: "dmk.johansson@gmail.com",
  linkedin: "linkedin.com/in/dennis-johansson-72702785",
  github: "github.com/krajdan",

  personal: {
    age: 43,
    languages: ["Svenska (modersmal)", "Engelska (flytande)"],
    personality: "Erfaren, driven och lagspelare. Trivs bäst nar jag löser komplexa problem med kreativa lösningar.",
    funFact: "Jag spelar elgitarr och alskar musik. Några favoriter ar Weezer, Iron Maiden, Rage Against the Machine.",
    civilStatus: "Singel",
    interests: "Dennis ar svag for en middag med ett glas rött vin och en god köttbit.",
  },

  hobbies: [
    "Dator och TV-spel",
    "AI",
    "Film och tv-serier",
    "Musik och spelar elgitarr",
  ],

  skills: [
    { category: "Programmeringssprak", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind"] },
    { category: "Backend", items: ["Node.js", "Python"] },
    { category: "Verktyg", items: ["Git", "Jira", "Smart Bear Ready API"] },
    { category: "Ovrigt", items: ["Agil utveckling", "Testdriven utveckling"] },
    { category: "AI-kompetenser", items: ["GPT-4o", "Claude", "Gemini Pro", "OpenAI API", "Copilot", "Prompt engineering"] },
  ],

  experience: [
    {
      role: "Verksamhetsutvecklare",
      company: "Folksam",
      period: "2023 - nu",
      desc: "Involverad i ett stort systemskifte dar man byter ut gamla system mot moderna losningar. Arbetar i granslandet mellan IT och verksamhet for att säkerstalla att tekniska läsningar möter verksamhetens behov.",
    },
    {
      role: "Skadereglerare och QA systemtestning",
      company: "Folksam",
      period: "2022 - 2023",
      desc: "Lärde mig grunderna i att skriva bra och effektiva testfall, och att arbeta i en snabb och iterativ utvecklingsmiljö.",
    },
    {
      role: "Skadereglerare och superuser",
      company: "Folksam",
      period: "2011 - 2021",
      desc: "Skadereglering av sakförsakringar, med fokus pa att ge snabb och empatisk service. Som superuser ansvarade jag for att utbilda kollegor i nya system och processer.",
    },
    {
      role: "Utvecklare appar och hemsidor pa fritiden",
      company: "Privat",
      period: "2026 - nu",
      desc: "Utveckling av appar, AI-agenter och hemsidor med fokus pa modern AI-teknik och användarvanlighet. Pa kort tid med hjalp av Gemini och Claude lart mig React, OpenAI API och andra verktyg.",
    },
  ],

  projects: [
    {
      name: "E-faktura med PEPPOL-lösning",
      desc: "Test och implementering av fakturalösningar for att möjliggöra e-fakturautbyte mellan leverantorer och kunder.",
      tags: ["PEPPOL"],
    },
    {
      name: "Testfallsdesign och kvalitetssakring",
      desc: "Testfallsdesign och kvalitetssakring av kravspecifikationer for boendeforsäkring och personforsäkring.",
      tags: ["Jira", "Smart Bear Ready API", "Testdriven utveckling"],
    },
    {
      name: "AI-assistent for CV och portfolio",
      desc: "Denna AI-assistent, byggd med React och OpenAI, ger snabba och professionella svar pa fragor om min bakgrund, erfarenhet och projekt.",
      tags: ["React", "OpenAI", "GPT-4o"],
    },
    {
      name: "Butiksidor för till exempel frisörer , florister och restauranger",
      desc: "Diverse butikssidor för olika typer av affärsverksamheter.",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      name: "Egna privata AI-projekt",
      desc: "AI-driven projekthanteringsapp med automatisk prioritering och smarta notiser.",
      tags: ["React Native", "OpenAI", "JavaScript", "html", "css"],
    },
    {
      name : "AI-agent",
      desc: "En AI-assistent som hjälper till med till exempel inläsning av kvitton.",
      tags: ["AI", "Skadehantering"],
    },
    {
      name: "Egen AI-kompetensutveckling",
      desc: "Fortsatt inlärning och utveckling av AI-kompetenser, inklusive prompt engineering och modellanvändning.",
      tags: ["Google AI courses for Gemini"],
    }
  ],
  learning: [
    {
      name: "Google AI course for Gemini",
      desc: "Fortsatt inlärning och utveckling av AI-kompetenser, inklusive prompt engineering och modellanvändning.",
      tags: ["Google AI"],
    }
  ]
};

function buildSystemPrompt(info) {
  var skills = info.skills.map(function(s) { return "- " + s.category + ": " + s.items.join(", "); }).join("\n");
  var exp = info.experience.map(function(e) { return "- " + e.role + " pa " + e.company + " (" + e.period + "): " + e.desc; }).join("\n");
  var proj = info.projects.map(function(p) { return "- " + p.name + ": " + p.desc + " [" + p.tags.join(", ") + "]"; }).join("\n");
  var hobbies = info.hobbies.join(", ");

  return "Du är en AI-assistent för " + info.name + ", " + info.title + " baserad i " + info.location + ".\n"
    + "Svara på frågor om " + info.name + "s bakgrund, erfarenhet, projekt och personlighet. Var kortfattad, varm och professionell.\n"
    + "Svara alltid på samma språk som frågan ställs på.\n\n"
    + "OM " + info.name + ":\n" + info.about + "\n\n"
    + "PERSONLIGT:\n"
    + "- Alder: " + info.personal.age + " år\n"
    + "- Sprak: " + info.personal.languages.join(", ") + "\n"
    + "- Civilstatus: " + info.personal.civilStatus + "\n"
    + "- Personlighet: " + info.personal.personality + "\n"
    + "- Intressen: " + info.personal.interests + "\n"
    + "- Hobbies: " + hobbies + "\n"
    + "- Kul fakta: " + info.personal.funFact + "\n\n"
    + "KOMPETENSER:\n" + skills + "\n\n"
    + "ERFARENHET:\n" + exp + "\n\n"
    + "PROJEKT:\n" + proj + "\n\n"
    + "VANLIGA FRÅGOR OCH SVAR:\n"
+ "- Är du öppen för nya möjligheter? Ja det är jag!\n"
+ "- Vad söker du i din nästa roll? Frihet och att få vara 100% innovativ utan spärrar.\n"
+ "- Kan du jobba remote? Absolut, jag gör det redan flera dagar i veckan med kollegor runt om i hela Sverige.\n"
+ "- Vad är du bäst på? Att jobba fritt utan att vara låst till mallar och massa möten som inte leder någonstans.\n"
+ "- Hur håller du dig uppdaterad inom AI och teknik? Onlinekurser och framförallt genom att testa så många verktyg som möjligt och pusha gränser för vad jag kan bygga.\n"
+ "- Har du erfarenhet av agil utveckling? Ja det har jag.\n"
+ "- Vad motiverar dig? Att få komma med kreativa egna idéer och testa dom fullt ut.\n"
+ "- Hur är du som kollega? Väldigt hjälpsam, stöttande och driven.\n"
+ "- Vad är du stolt över i din karriär? När jag tog steget och fick börja med test och därefter verksamhetsutveckling.\n\n"
    + "KONTAKT: " + info.email;
}

var A  = "#c9a84c";
var BG = "#0b0b0b";
var SU = "#141414";
var BR = "#222222";
var TX = "#f0ede8";
var MT = "#666666";

function Tag(props) {
  return (
    <span style={{
      fontSize: 11, padding: "3px 10px", borderRadius: 2, letterSpacing: ".05em",
      background: props.accent ? "#c9a84c18" : "transparent",
      color: props.accent ? A : MT,
      border: "1px solid " + (props.accent ? "#c9a84c44" : BR),
    }}>{props.label}</span>
  );
}

export default function App() {
  var openState = useState(false);
  var open = openState[0];
  var setOpen = openState[1];

  var msgsState = useState([{ role: "assistant", content: "Hej! Jag är " + MY_INFO.name + "s AI-assistent. Fråga mig vad som helst – om jobbet, projekten eller Dennis som person!" }]);
  var msgs = msgsState[0];
  var setMsgs = msgsState[1];

  var inputState = useState("");
  var input = inputState[0];
  var setInput = inputState[1];

  var busyState = useState(false);
  var busy = busyState[0];
  var setBusy = busyState[1];

  var endRef = useRef(null);

  useEffect(function() {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send() {
    if (!input.trim() || busy) return;
    var userMsg = { role: "user", content: input.trim() };
    var next = msgs.concat([userMsg]);
    setMsgs(next);
    setInput("");
    setBusy(true);

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + import.meta.env.VITE_OPENAI_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "system", content: buildSystemPrompt(MY_INFO) }].concat(
          next.map(function(m) { return { role: m.role, content: m.content }; })
        ),
      }),
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      setMsgs(next.concat([{ role: "assistant", content: data.choices[0].message.content }]));
    })
    .catch(function() {
      setMsgs(next.concat([{ role: "assistant", content: "Nagot gick fel. Forsok igen!" }]));
    })
    .finally(function() {
      setBusy(false);
    });
  }

  function scrollTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  var yr = new Date().getFullYear();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TX }}>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 48px", borderBottom: "1px solid " + BR,
        background: "#0b0b0be8", backdropFilter: "blur(14px)",
      }}>
        <span className="display" style={{ fontSize: 18, letterSpacing: ".06em" }}>
          {MY_INFO.name.split(" ")[0]}
        </span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["om","Om"],["erfarenhet","Erfarenhet"],["projekt","Projekt"],["kontakt","Kontakt"]].map(function(item) {
            return (
              <span key={item[0]} className="nav-link"
                onClick={function() { scrollTo(item[0]); }}
                style={{ fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: MT, cursor: "pointer" }}>
                {item[1]}
              </span>
            );
          })}
          <button onClick={function() { setOpen(true); }} style={{
            background: A, color: "#000", border: "none", borderRadius: 2,
            padding: "8px 18px", fontSize: 11, fontWeight: 500, letterSpacing: ".08em",
            textTransform: "uppercase", cursor: "pointer",
          }}>Chatta med mig</button>
        </div>
      </nav>

      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 64px" }}>
        <p className="fu d1" style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: A, marginBottom: 28 }}>
          CV / {yr}
        </p>
        <h1 className="display fu d2" style={{ fontSize: "clamp(70px, 13vw, 200px)", lineHeight: .88, letterSpacing: "-.02em", marginBottom: 36, color: "#f0ede8" }}>
          {MY_INFO.name.split(" ").map(function(w, i) {
            return <span key={i} style={{ display: "block" }}>{w}</span>;
          })}
        </h1>
        <div style={{ width: "100%", height: 1, background: BR, marginBottom: 28 }} />
        <div className="fu d4" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 300, color: MT, letterSpacing: ".05em" }}>{MY_INFO.title} — {MY_INFO.location}</p>
          <p style={{ maxWidth: 380, fontSize: 15, fontWeight: 300, lineHeight: 1.7, textAlign: "right", color: TX }}>{MY_INFO.tagline}</p>
        </div>
      </section>

      <section id="om" style={{ padding: "96px 48px", borderTop: "1px solid " + BR }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 48 }}>
            <span style={{ fontSize: 11, color: A, letterSpacing: ".15em" }}>01</span>
            <h2 className="display italic" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Om mig</h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: MT, fontWeight: 300, maxWidth: 640, marginBottom: 48 }}>{MY_INFO.about}</p>

          <div style={{ marginBottom: 64, maxWidth: 640 }}>
            <p style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: A, marginBottom: 16 }}>Personligt</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {MY_INFO.skills.map(function(g) {
              return (
                <div key={g.category} style={{ borderTop: "1px solid " + BR, paddingTop: 24 }}>
                  <p style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: A, marginBottom: 16 }}>{g.category}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {g.items.map(function(sk) {
                      return (
                        <span key={sk} className="skill-tag" style={{
                          fontSize: 13, padding: "6px 13px", border: "1px solid " + BR,
                          borderRadius: 2, color: MT, cursor: "default", transition: "all .2s",
                        }}>{sk}</span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="erfarenhet" style={{ padding: "96px 48px", borderTop: "1px solid " + BR }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 64 }}>
            <span style={{ fontSize: 11, color: A, letterSpacing: ".15em" }}>02</span>
            <h2 className="display italic" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Erfarenhet</h2>
          </div>
          {MY_INFO.experience.map(function(e) {
            return (
              <div key={e.role} className="exp-row" style={{
                display: "grid", gridTemplateColumns: "150px 1fr", gap: 40,
                padding: "36px 0", borderTop: "1px solid " + BR,
              }}>
                <p style={{ fontSize: 12, color: MT, paddingTop: 3 }}>{e.period}</p>
                <div>
                  <p style={{ fontSize: 19, fontWeight: 400, color: TX, marginBottom: 6 }}>{e.role}</p>
                  <p className="exp-co" style={{ fontSize: 12, color: A, marginBottom: 10, letterSpacing: ".06em", textTransform: "uppercase", transition: "color .2s" }}>{e.company}</p>
                  <p style={{ fontSize: 14, color: MT, lineHeight: 1.75, fontWeight: 300 }}>{e.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="projekt" style={{ borderTop: "1px solid " + BR }}>
        <div style={{ padding: "96px 48px 48px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 56 }}>
            <span style={{ fontSize: 11, color: A, letterSpacing: ".15em" }}>03</span>
            <h2 className="display italic" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>Projekt</h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2, borderTop: "1px solid " + BR }}>
          {MY_INFO.projects.map(function(p) {
            return (
              <div key={p.name} className="proj-card" style={{ border: "1px solid " + BR, padding: 40 }}>
                <p className="display" style={{ fontSize: 26, marginBottom: 14, color: TX }}>{p.name}</p>
                <p style={{ fontSize: 14, color: MT, lineHeight: 1.75, fontWeight: 300, marginBottom: 24 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(function(t) { return <Tag key={t} label={t} accent={true} />; })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="kontakt" style={{ padding: "96px 48px", borderTop: "1px solid " + BR }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 48 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: A, marginBottom: 20 }}>Kontakt</p>
            <h2 className="display" style={{ fontSize: "clamp(52px, 9vw, 110px)", lineHeight: .9, color: "#f0ede8" }}>
              Låt oss<br />
              <span className="italic" style={{ color: A }}>prata.</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
            <a href={"mailto:" + MY_INFO.email} style={{ fontSize: 16, color: TX, textDecoration: "none" }}>{MY_INFO.email}</a>
            <a href={"https://" + MY_INFO.linkedin} target="_blank" rel="noreferrer"
              style={{ fontSize: 13, color: MT, textDecoration: "none" }}>{MY_INFO.linkedin}</a>
            <a href={"https://" + MY_INFO.github} target="_blank" rel="noreferrer"
              style={{ fontSize: 13, color: MT, textDecoration: "none" }}>{MY_INFO.github}</a>
          </div>
        </div>
      </section>

      <div style={{ padding: "28px 48px", borderTop: "1px solid " + BR, display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: 12, color: MT }}>{MY_INFO.name} &copy; {yr}</p>
        <p style={{ fontSize: 12, color: MT }}>Byggd med React och OpenAI</p>
      </div>

      {!open && (
        <button className="chat-bubble" onClick={function() { setOpen(true); }} style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 200,
          width: 58, height: 58, borderRadius: "50%", background: A,
          border: "none", cursor: "pointer", fontSize: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 28px #c9a84c44",
        }}>
          <span style={{ position: "relative", zIndex: 1 }}>&#128172;</span>
          <span className="ring" />
        </button>
      )}

      {open && (
        <div className="chat-panel" style={{
          position: "fixed", bottom: 0, right: 0, zIndex: 300,
          width: 380, height: "85vh", background: SU,
          borderLeft: "1px solid " + BR, borderTop: "1px solid " + BR,
          display: "flex", flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,.6)",
        }}>
          <div style={{
            padding: "18px 20px", borderBottom: "1px solid " + BR,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "#c9a84c22", border: "1px solid #c9a84c44",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>&#129302;</div>
              <div>
                <p className="display" style={{ fontSize: 17, color: TX }}>{MY_INFO.name}</p>
                <p style={{ fontSize: 10, color: A, letterSpacing: ".1em", textTransform: "uppercase" }}>AI-Assistent</p>
              </div>
            </div>
            <button onClick={function() { setOpen(false); }} style={{
              background: "none", border: "none", color: MT, cursor: "pointer", fontSize: 18,
            }}>X</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map(function(m, i) {
              return (
                <div key={i} style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? A : BR,
                  color: m.role === "user" ? "#000" : TX,
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                  fontSize: 13, maxWidth: "82%", lineHeight: 1.6,
                  fontWeight: m.role === "user" ? 500 : 300,
                }}>{m.content}</div>
              );
            })}
            {busy && (
              <div style={{
                alignSelf: "flex-start", background: BR, padding: "12px 16px",
                borderRadius: "14px 14px 14px 3px", display: "flex", gap: 6, alignItems: "center",
              }}>
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length === 1 && (
            <div style={{ padding: "0 16px 12px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Vad har du jobbat med?","Vad gor du pa fritiden?", "Hur kontaktar jag dig?"].map(function(q) {
                return (
                  <button key={q} onClick={function() { setInput(q); }} style={{
                    background: "none", border: "1px solid " + BR, borderRadius: 20,
                    padding: "5px 12px", fontSize: 11, color: MT, cursor: "pointer",
                  }}>{q}</button>
                );
              })}
            </div>
          )}

          <div style={{ padding: "12px 16px", borderTop: "1px solid " + BR, display: "flex", gap: 8 }}>
            <input className="inp" value={input}
              onChange={function(e) { setInput(e.target.value); }}
              onKeyDown={function(e) { if (e.key === "Enter") send(); }}
              placeholder="Ställ en fråga..."
              style={{
                flex: 1, background: BG, border: "1px solid " + BR, borderRadius: 6,
                padding: "10px 14px", color: TX, fontSize: 13, outline: "none",
                transition: "border-color .2s",
              }}
            />
            <button className="send-btn" onClick={send} disabled={busy} style={{
              background: A, color: "#000", border: "none", borderRadius: 6,
              padding: "10px 18px", cursor: "pointer", fontSize: 16, fontWeight: 600,
              transition: "background .2s",
            }}>&#8594;</button>
          </div>
        </div>
      )}
    </div>
  );
}
