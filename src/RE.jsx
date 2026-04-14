 import { useState, useEffect } from "react";

const COL = { c:"#534AB7", l:"#EEEDFE", d:"#26215C" };

const MODULES = [
 {
  id:"creation",
  name:"Creation & Covenant",
  hook:"If God made everything — who made God?",
  hookBody:`This is one of the oldest questions in philosophy and it still doesn't have a clean answer. But here's one way into it: when you build your own RPG, one of the first things you have to decide is who made the world, why it exists, and what rules govern it. You're literally doing theology — you just call it world-building.

Every RPG world has a creation story underneath it, even if it's never stated. Who built this world? Was it intentional? Is it good or broken? What's the relationship between the creator and the people living in it? These are exactly the questions Genesis is wrestling with.

Christians answer them like this: God made everything deliberately, from nothing, and it was good. Humans are made in God's image — not physically, but in terms of creativity, moral awareness, and the ability to make choices. Sound familiar? That's basically why the characters in your RPG have agency rather than being pre-programmed to do one thing.

RE isn't asking you to believe any of this. It's asking you to understand what billions of people believe — and think critically about it. Approach it like you're analysing the lore of a world someone else built.`,
  debate:{
   question:"Is it arrogant for humans to claim they were made 'in God's image'?",
   sideA:"Yes — it's used to justify humans treating the natural world as something to exploit. If we're special, everything else is less important.",
   sideB:"No — 'imago Dei' actually comes with responsibility. Being made in God's image means we're supposed to REFLECT God's care for creation, not dominate it.",
   verdict:"The interesting thing is that both sides use the same belief to reach opposite conclusions. This is exactly the kind of argument your exam wants you to make."
  },
  learn:[
   { title:"The core beliefs — fast version", content:`**What Christians actually believe about creation:**

God created the universe from nothing — **creatio ex nihilo**. Not from pre-existing material. From absolute nothing. This is a bigger claim than it sounds — it means God is outside of and prior to everything, including time itself.

The world is fundamentally **good**. Genesis says "God saw that it was good" repeatedly. This matters because it means the physical world isn't something to escape — it's something to care for.

**Imago Dei** — humans are made "in the image of God." This doesn't mean physically. It means humans have rationality, creativity, moral awareness, and the capacity for relationship. It's what gives every human being inherent dignity — regardless of ability, status, or anything else.

**Stewardship** — because the world is God's and humans are made in God's image, humans have a responsibility to care for creation. Not own it. Care for it. This is where RE connects directly to environmentalism, climate change, and how we treat animals.

**Covenant with Noah:** After the flood, God promises never to destroy the earth again. Sign = the rainbow. It's a one-sided promise — God commits, regardless of what humans do.

**Covenant with Abraham:** God promises Abraham land, countless descendants, and that he'll be the father of a great nation. Abraham promises faith and obedience. This is the foundation of Judaism, Christianity and Islam — three world religions trace back to this one moment.` },
   { title:"The Genesis debate — literal or symbolic?", content:`**One of the most contested questions in Christianity.**

Genesis describes creation in 6 days. Does this mean:

**Option A — Literal:** God actually created everything in 6 x 24-hour days, roughly 6,000 years ago. Some Christians (Young Earth Creationists) hold this view and reject evolution.

**Option B — Symbolic/Allegorical:** The 6 days are a literary framework, not a scientific account. God used evolution as the mechanism of creation. Most mainstream Christian denominations (Catholic Church included) hold this view.

**Option C — Separate magisteria:** Science and religion answer different questions. Science asks HOW — religion asks WHY and WHAT FOR. They're not in competition.

**For your exam:** You don't need to pick a side. You need to show you understand that Christians interpret Genesis differently — and that the core belief (God as creator, world as good, humans as stewards) doesn't depend on which interpretation you hold.

**The manga connection:** In Nausicaä of the Valley of the Wind, the world was deliberately created/shaped by ancient humans, and the question of whether that creation was good or harmful is central. Who gets to decide what a "good" creation looks like? That's exactly the tension Genesis explores.` },
  ],
  flashcards:[
   { q:"What does 'imago Dei' mean and why does it matter?", a:"'In the image of God' — the belief that all humans reflect God's rationality, creativity and moral awareness. It gives every person inherent dignity and worth, regardless of any other characteristic." },
   { q:"What is 'creatio ex nihilo'?", a:"The belief that God created the universe from absolute nothing — not from pre-existing material. It means God exists outside of and prior to everything, including time." },
   { q:"What is stewardship in a Christian context?", a:"The responsibility to care for God's creation — not exploit or own it. Humans are caretakers, not masters. Connects to modern environmental ethics." },
   { q:"What was the covenant with Noah? What was the sign?", a:"After the flood, God promised never to destroy the earth again. A one-sided promise — God commits regardless of human behaviour. Sign = the rainbow." },
   { q:"What was the covenant with Abraham?", a:"God promised Abraham land, countless descendants, and that he'd be father of a great nation. Abraham promised faith and obedience. Foundation of Judaism, Christianity and Islam." },
   { q:"What is the difference between a literal and symbolic reading of Genesis?", a:"Literal: God created in 6 actual 24-hour days, ~6000 years ago. Symbolic: the 6 days are a literary framework; God used evolution. Most mainstream Christian denominations, including Catholics, hold the symbolic view." },
  ],
  practiceQs:[
   { q:"Explain what Christians believe about the creation of the world. (4 marks)", weak:"Christians believe God made the world in 6 days and it was good.", strong:"Christians believe God created the universe from nothing (creatio ex nihilo) — meaning God exists outside and prior to all things. The created world is fundamentally good, as affirmed repeatedly in Genesis. Humans are created in God's image (imago Dei), giving them unique dignity and the responsibility of stewardship — caring for creation rather than exploiting it. Christians interpret Genesis differently: some literally, others symbolically, but the core beliefs remain consistent.", tip:"4 marks = 4 distinct ideas. Creatio ex nihilo, goodness of creation, imago Dei, stewardship. Don't just say 'God made the world in 6 days' — that's one idea worth one mark." },
  ]
 },
 {
  id:"desert",
  name:"Desert to Garden",
  hook:"Is it ever right to break the law if you believe God told you to?",
  hookBody:`Moses saw a burning bush and heard God tell him to confront the most powerful ruler in the world and demand he release his entire workforce. By any normal measure, this is either the most important moment in human history — or a man having a breakdown in the desert.

Think about it from a game design perspective. If you were building an RPG and wanted to create the ultimate underdog quest, you'd give your hero: no army, no weapons, no status, a speech impediment (Moses actually had one), a criminal record (he'd killed someone), and send him to face the most powerful man alive. That's the Exodus setup. It's genuinely brilliant storytelling.

The "reluctant hero receives a calling they didn't ask for" is one of the oldest narrative structures in human storytelling — it's in Mario (a plumber? really?), it's in every Minecraft world where you're dropped in with nothing and have to figure it out, it's in basically every story ever told. The Exodus is where a lot of that comes from.

RE is asking you to understand why this story matters to billions of people — and what it says about power, justice, and what happens when ordinary people decide to stand up to an unjust system.`,
  debate:{
   question:"Was God cruel to harden Pharaoh's heart and then punish Egypt for it?",
   sideA:"Yes — if God made Pharaoh refuse to let the Israelites go, then punishing Egypt with plagues is unjust. You can't hold people responsible for actions they were manipulated into.",
   sideB:"No — this is a narrative device showing that God's purpose will be fulfilled regardless. The plagues demonstrate God's power to a civilisation that worshipped many gods. The point isn't punishment — it's revelation.",
   verdict:"This debate has gone on for 3,000 years. Theologians still argue about it. The exam wants you to show you can see both sides — not that you have the answer."
  },
  learn:[
   { title:"The Exodus story — every key moment", content:`**The setup:** The Israelites (God's people descended from Abraham) are enslaved in Egypt under Pharaoh. They've been slaves for 400 years.

**The burning bush:** Moses, a Hebrew raised in Pharaoh's palace who fled after killing an Egyptian guard, encounters a bush that burns but isn't consumed. God speaks from it, revealing his name — **YHWH** (often translated as "I am who I am" — a name that defies definition). God calls Moses to lead the Israelites out of Egypt.

**The Ten Plagues:** Moses demands Pharaoh free the Israelites. Pharaoh refuses. God sends ten plagues — water turning to blood, frogs, lice, flies, livestock disease, boils, hail, locusts, darkness, and finally the death of the firstborn.

**The Passover:** God tells Israelites to mark their doors with lamb's blood. The angel of death "passes over" their homes. This is still commemorated by Jewish people today as **Pesach (Passover)** — one of the most important Jewish festivals.

**The Exodus:** Pharaoh releases the Israelites. They flee. Pharaoh changes his mind and sends his army. **The Red Sea** parts (or in some translations — a sea of reeds). The army is destroyed.

**Mount Sinai:** God gives Moses the **Ten Commandments** — the Law (Torah). This is the covenant renewed: "I will be your God, you will be my people."

**40 years in the desert:** The Israelites wander, doubt, complain. God provides **manna** (bread from heaven) and water from rock. The desert tests and shapes them.

**The Promised Land:** Canaan — the land promised to Abraham generations earlier. Moses dies before reaching it.` },
   { title:"Why does this story matter today?", content:`**For Jewish people:** The Exodus is the defining event of Jewish identity. Every year at Passover, Jewish families retell the story — "we were slaves in Egypt." It's not ancient history. It's living memory.

**For Christians:** The Exodus prefigures (foreshadows) Jesus. Moses leads people from physical slavery; Jesus leads people from spiritual slavery (sin). The Passover lamb's blood marks the Israelites for safety; Jesus is called the "Lamb of God" whose sacrifice marks believers.

**For liberation theology:** A movement within Christianity (especially in Latin America) that reads the Exodus as God's political statement — God takes sides with the oppressed. This inspired civil rights movements, anti-apartheid campaigns, and continues to shape social justice Christianity today.

**The gaming parallel:** The Exodus structure is identical to basically every JRPG. Oppressed people → chosen hero receives a calling → series of trials → laws/rules given → long journey → promised destination. Final Fantasy, Xenoblade, Dragon Quest all use this skeleton. It's not a coincidence — this narrative structure is hardwired into storytelling because it maps onto something deeply human: the desire for freedom and a place to belong.` },
  ],
  flashcards:[
   { q:"What is the Exodus?", a:"The journey of the Israelites out of slavery in Egypt, led by Moses. Described in the Book of Exodus. Defining event of Jewish identity." },
   { q:"What happened at Mount Sinai?", a:"God gave Moses the Ten Commandments — the Torah (Law). Established the covenant: 'I will be your God, you will be my people.'" },
   { q:"What is the significance of Passover?", a:"God 'passed over' Israelite homes marked with lamb's blood, killing Egyptian firstborns — the final plague. Still celebrated by Jewish people today as Pesach. Christians see it as foreshadowing Jesus as the 'Lamb of God'." },
   { q:"What does the Exodus story say about God's character?", a:"God is a liberator who acts on behalf of the oppressed. God is faithful to covenant promises even across 400 years. God's power surpasses earthly rulers." },
   { q:"What is 'manna' and what does it represent?", a:"Bread from heaven that God provided daily in the desert. Represents God's provision and the need to trust God one day at a time — you couldn't hoard it." },
   { q:"What is liberation theology?", a:"A movement reading the Exodus as God's political statement — God sides with the oppressed against unjust power. Influenced civil rights and social justice movements worldwide." },
  ],
  practiceQs:[
   { q:"Explain the significance of the Exodus story for Christians today. (4 marks)", weak:"The Exodus shows God helped the Israelites escape Egypt and it's important because Christians still read about it.", strong:"The Exodus demonstrates God's character as a liberator who acts on behalf of the oppressed — a principle Christians apply to social justice today. For Christians, Moses prefigures Jesus: as Moses led people from physical slavery, Jesus is seen as liberating humanity from sin. The Passover connects directly to Jesus as the 'Lamb of God.' Liberation theologians read the Exodus as a mandate for Christians to challenge unjust systems and stand with the marginalised, giving the story direct political relevance.", tip:"Significance = why it matters NOW, not just what happened. Four angles: God's character, prefiguring Jesus, Passover connection, liberation theology. One mark each." },
  ]
 },
 {
  id:"ends",
  name:"To the Ends of the Earth",
  hook:"Should Christians try to convert people of other faiths?",
  hookBody:`This is genuinely one of the most contested questions in modern Christianity — and it's directly what this module is about.

Here's a way to think about it. Imagine you've spent months building an RPG world — the lore, the rules, the story. Then someone else starts playing it completely wrong, missing the whole point, heading toward a bad ending. Do you step in and tell them? Or do you let them play it their way?

That's roughly the tension Christians face with mission. If you genuinely believe you have access to something true and important — do you share it? Or does sharing it disrespect the other person's right to figure things out themselves?

Some Christians say: share it always, because if Jesus is real and salvation matters, staying silent would be like watching someone walk into traffic and saying nothing. Others say: live it quietly, serve people, and let your actions speak — forced or pushy belief is worse than no belief at all.

This module covers how Christianity spread from about 120 frightened people in a room in Jerusalem to over 2 billion people worldwide in 2,000 years. Whatever you think about religion, that's one of the most remarkable things that has ever happened, and it started with a moment called Pentecost.`,
  debate:{
   question:"Is it respectful or disrespectful to try to convert someone to your religion?",
   sideA:"Disrespectful — it implies their existing beliefs are wrong or inferior. In a multicultural world, it can cause division and has historically been tied to colonialism and cultural destruction.",
   sideB:"Respectful — if you genuinely believe something is true and important, sharing it is an act of care, not aggression. You'd want someone to tell you if they thought you were wrong about something important.",
   verdict:"Most modern churches distinguish between 'proclamation' (sharing your faith when asked or welcomed) and 'proselytising' (aggressive conversion attempts). Where the line sits is genuinely debated."
  },
  learn:[
   { title:"Pentecost — the moment everything changed", content:`**The situation:** Jesus has been crucified and resurrected. He appeared to his disciples for 40 days, then ascended to heaven. He told them to wait in Jerusalem for "the gift my Father promised."

50 days after Easter (Pentecost means 50th day), the disciples are gathered in a room. Then:

- A sound like a violent rushing wind fills the house
- What looked like **tongues of fire** appeared and settled on each person
- They were all filled with the **Holy Spirit**
- They began speaking in other languages — people from across the Roman Empire heard them in their own native tongue

**Why does this matter?**
Before Pentecost: a small group of frightened people hiding in a room.
After Pentecost: they go out publicly, Peter gives a speech, 3,000 people join the movement in one day.

The **Holy Spirit** in Christian theology is the third person of the Trinity — God's active presence in the world and in believers. Pentecost is when the Church is born.

**The speaking in tongues** is significant — it directly reverses the Tower of Babel story (Genesis 11), where God confused human language. Now, through the Spirit, understanding is restored. Christianity is for every language and culture, not one people or place.` },
   { title:"St Paul and the spread of Christianity", content:`**The most unlikely missionary in history.**

**Saul of Tarsus** was a devout Jewish Pharisee whose job was to persecute and arrest Christians. He was present and approving at the stoning of the first Christian martyr, Stephen.

Then, on the road to Damascus, he was knocked to the ground by a blinding light and heard a voice: "Saul, Saul, why do you persecute me?" It was Jesus.

He was blinded for three days. A Christian called Ananias was told by God in a vision to go and heal him. Saul was baptised, took the name **Paul**, and became the most important missionary in Christian history.

**What Paul did:**
- Three major missionary journeys across the Roman Empire — modern Turkey, Greece, Rome
- Founded churches in major cities: Corinth, Ephesus, Philippi, Thessalonica
- Wrote 13 letters (epistles) — these make up a huge portion of the New Testament
- Argued that Christianity was for **everyone**, not just Jewish people — this was controversial
- Was eventually executed in Rome under Emperor Nero

**The significance:** Paul's conversion is one of the most dramatic character arcs in religious history. He went from the chief persecutor of Christianity to its chief propagator. His letters shaped Christian theology for 2,000 years.

**The Great Commission (Matthew 28:19-20):** Jesus's final instruction: "Go and make disciples of all nations, baptising them in the name of the Father, Son and Holy Spirit." This is the theological foundation for all Christian missionary work.` },
  ],
  flashcards:[
   { q:"What happened at Pentecost?", a:"The Holy Spirit descended on the disciples (Acts 2) — described as tongues of fire and a rushing wind. They spoke in many languages. 3,000 people joined the movement. Marks the birth of the Christian Church." },
   { q:"Why is Pentecost compared to the Tower of Babel?", a:"Babel (Genesis 11) scattered humanity by confusing language. Pentecost reverses this — the Spirit enables people from all nations to understand. Christianity is universal, not for one people." },
   { q:"Who was Paul (Saul) and why is he significant?", a:"Saul was a Jewish Pharisee who persecuted Christians. After a dramatic conversion on the road to Damascus, he became Paul — Christianity's greatest missionary, founder of churches across the Roman Empire, author of much of the New Testament." },
   { q:"What is the Great Commission?", a:"Jesus's instruction (Matthew 28): 'Go and make disciples of all nations.' The theological foundation for all Christian missionary activity." },
   { q:"What is the Trinity?", a:"The Christian belief that God exists as three persons: Father, Son (Jesus), and Holy Spirit — distinct but one God. The Holy Spirit, given at Pentecost, is God's active presence in the world and in believers." },
   { q:"What does Acts 1:8 say and why does it structure this module?", a:"'You will be my witnesses in Jerusalem, Judea, Samaria, and to the ends of the earth.' It maps the spread of Christianity — from local to global — which is exactly what happened." },
  ],
  practiceQs:[
   { q:"Explain the importance of Pentecost for Christians. (4 marks)", weak:"Pentecost is when the Holy Spirit came and the disciples could speak different languages.", strong:"Pentecost marks the birth of the Christian Church — the moment the disciples received the Holy Spirit and were transformed from a frightened group into bold public witnesses. The speaking in tongues signals Christianity's universal scope, intended for all nations — reversing the division of Babel. Theologically, the Holy Spirit is God's ongoing presence empowering the Church. For Christians today, Pentecost affirms that the Spirit continues to guide and sustain the Church in its mission.", tip:"What happened → why it mattered then → theological meaning → why it matters NOW. Four steps, four marks." },
  ]
 }
];

const INIT = { completedActivities:{}, totalFlips:0, earnedBadges:[], totalXP:0 };

export default function App() {
 const [stats, setStats] = useState(() => {
  try { const s = localStorage.getItem('harvey-re'); return s ? JSON.parse(s) : INIT; }
  catch { return INIT; }
 });
 const [view, setView] = useState("home");
 const [selMod, setSelMod] = useState(null);
 const [selLearn, setSelLearn] = useState(null);
 const [cardIdx, setCardIdx] = useState(0);
 const [flipped, setFlipped] = useState(false);
 const [pqStep, setPqStep] = useState(0);
 const [debateRevealed, setDebateRevealed] = useState(false);
 const [toast, setToast] = useState(null);

 useEffect(() => {
  try { localStorage.setItem('harvey-re', JSON.stringify(stats)); } catch {}
 }, [stats]);

 const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2200); };

 const markDone = (key, xp, label) => {
  if (stats.completedActivities[key]) return;
  setStats(prev => ({ ...prev, totalXP: prev.totalXP+xp, completedActivities:{...prev.completedActivities,[key]:true} }));
  showToast(`+${xp} XP — ${label}`);
 };

 const go = (v, m=null, l=null) => { setView(v); setSelMod(m); setSelLearn(l); setCardIdx(0); setFlipped(false); setPqStep(0); setDebateRevealed(false); };

 const mod = selMod ? MODULES.find(m=>m.id===selMod) : null;

 const allKeys = (m) => [
  `${m.id}::hook`, `${m.id}::debate`,
  ...m.learn.map((_,i)=>`${m.id}::learn${i}`),
  ...m.flashcards.map((_,i)=>`${m.id}::fc${i}`),
  `${m.id}::pq`,
 ];

 const totalXP = MODULES.flatMap(m=>allKeys(m)).filter(k=>stats.completedActivities[k]).length * 15;

 // FLASHCARD VIEW
 if (view==="flashcard" && mod) {
  const card = mod.flashcards[cardIdx];
  const key = `${mod.id}::fc${cardIdx}`;
  const done = !!stats.completedActivities[key];
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("module",mod.id)} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Back</button>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.75rem"}}>
     <h2 style={{fontSize:16,fontWeight:500,margin:0}}>Flashcards — {mod.name}</h2>
     <span style={{fontSize:13,color:"var(--color-text-secondary)"}}>{cardIdx+1}/{mod.flashcards.length}</span>
    </div>
    <div onClick={()=>{ if(!flipped){ setFlipped(true); if(!done) markDone(key,15,"Flashcard"); }}}
     style={{minHeight:200,borderRadius:"var(--border-radius-lg)",border:`1.5px solid ${flipped?COL.c:"var(--color-border-secondary)"}`,background:flipped?COL.l:"var(--color-background-primary)",padding:"1.5rem",cursor:flipped?"default":"pointer",marginBottom:"1rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
     <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 0.5rem"}}>{flipped?"Answer":"Question — tap to reveal"}</p>
     <p style={{fontSize:15,color:flipped?COL.d:"var(--color-text-primary)",margin:0,lineHeight:1.7}}>{flipped?card.a:card.q}</p>
    </div>
    <div style={{display:"flex",gap:8}}>
     <button onClick={()=>{setCardIdx(i=>Math.max(0,i-1));setFlipped(false);}} disabled={cardIdx===0} style={{flex:1,padding:"10px",fontSize:13,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",opacity:cardIdx===0?0.4:1}}>← Prev</button>
     {flipped&&cardIdx<mod.flashcards.length-1&&<button onClick={()=>{setCardIdx(i=>i+1);setFlipped(false);}} style={{flex:2,padding:"10px",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${COL.c}`,background:COL.l,color:COL.d,cursor:"pointer"}}>Next →</button>}
     {flipped&&cardIdx===mod.flashcards.length-1&&<button onClick={()=>go("module",mod.id)} style={{flex:2,padding:"10px",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${COL.c}`,background:COL.l,color:COL.d,cursor:"pointer"}}>Done ✓</button>}
    </div>
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:COL.c,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast}</div>}
   </div>
  );
 }

 // PRACTICE Q VIEW
 if (view==="practiceq" && mod) {
  const pq = mod.practiceQs[0];
  const key = `${mod.id}::pq`;
  const done = !!stats.completedActivities[key];
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("module",mod.id)} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Back</button>
    <div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",marginBottom:"1rem"}}>
     <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 4px"}}>Exam question</p>
     <p style={{fontSize:15,fontWeight:500,margin:0}}>{pq.q}</p>
    </div>
    <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 1rem"}}>Have a go mentally, then reveal the progression.</p>
    {pqStep<1&&<button onClick={()=>setPqStep(1)} style={{width:"100%",padding:"10px",fontSize:14,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",marginBottom:8}}>Show weak answer ↓</button>}
    {pqStep>=1&&<div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"#FCEBEB",border:"0.5px solid #F09595",marginBottom:8}}>
     <p style={{fontSize:12,color:"#A32D2D",fontWeight:500,margin:"0 0 4px"}}>Weak answer</p>
     <p style={{fontSize:14,margin:0,color:"#501313"}}>{pq.weak}</p>
    </div>}
    {pqStep>=1&&pqStep<2&&<button onClick={()=>setPqStep(2)} style={{width:"100%",padding:"10px",fontSize:14,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",marginBottom:8}}>Show strong answer ↓</button>}
    {pqStep>=2&&<div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"#EAF3DE",border:"0.5px solid #C0DD97",marginBottom:8}}>
     <p style={{fontSize:12,color:"#3B6D11",fontWeight:500,margin:"0 0 4px"}}>Strong answer</p>
     <p style={{fontSize:14,margin:0,color:"#173404",lineHeight:1.7}}>{pq.strong}</p>
    </div>}
    {pqStep>=2&&pqStep<3&&<button onClick={()=>setPqStep(3)} style={{width:"100%",padding:"10px",fontSize:14,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",marginBottom:8}}>Show technique tip ↓</button>}
    {pqStep>=3&&<div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"#E6F1FB",border:"0.5px solid #B5D4F4",marginBottom:"1rem"}}>
     <p style={{fontSize:12,color:"#185FA5",fontWeight:500,margin:"0 0 4px"}}>Why this works</p>
     <p style={{fontSize:14,margin:0,color:"#042C53"}}>{pq.tip}</p>
    </div>}
    {pqStep>=3&&!done&&<button onClick={()=>{markDone(key,30,"Practice Q");go("module",mod.id);}} style={{width:"100%",padding:"12px",fontSize:14,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${COL.c}`,background:COL.l,color:COL.d,cursor:"pointer"}}>Claim +30 XP ✓</button>}
    {done&&<p style={{textAlign:"center",fontSize:13,color:"var(--color-text-secondary)"}}>Already completed ✓</p>}
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:COL.c,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast}</div>}
   </div>
  );
 }

 // LEARN VIEW
 if (view==="learn" && mod && selLearn!==null) {
  const item = mod.learn[selLearn];
  const key = `${mod.id}::learn${selLearn}`;
  const done = !!stats.completedActivities[key];
  const fmt = (text) => text.split("\n").map((line,i)=>{
   const html = line.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");
   if(line.trim()==="") return <div key={i} style={{height:6}}/>;
   return <p key={i} style={{margin:"3px 0",fontSize:14,lineHeight:1.7}} dangerouslySetInnerHTML={{__html:html}}/>;
  });
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("module",mod.id)} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Back</button>
    <h2 style={{fontSize:17,fontWeight:500,margin:"0 0 1rem"}}>{item.title}</h2>
    <div style={{lineHeight:1.7,marginBottom:"1.5rem"}}>{fmt(item.content)}</div>
    {!done
     ? <button onClick={()=>{markDone(key,15,"Read");go("module",mod.id);}} style={{width:"100%",padding:"12px",fontSize:14,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${COL.c}`,background:COL.l,color:COL.d,cursor:"pointer"}}>Done — claim +15 XP ✓</button>
     : <p style={{textAlign:"center",fontSize:13,color:COL.d,fontWeight:500}}>✓ Completed</p>}
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:COL.c,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast}</div>}
   </div>
  );
 }

 // MODULE VIEW
 if (view==="module" && mod) {
  const hookKey = `${mod.id}::hook`;
  const debateKey = `${mod.id}::debate`;
  const hookDone = !!stats.completedActivities[hookKey];
  const debateDone = !!stats.completedActivities[debateKey];
  const keys = allKeys(mod);
  const done = keys.filter(k=>stats.completedActivities[k]).length;
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("home")} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Home</button>
    <h2 style={{fontSize:18,fontWeight:500,margin:"0 0 0.25rem"}}>{mod.name}</h2>
    <div style={{height:5,background:"var(--color-background-secondary)",borderRadius:3,margin:"0.75rem 0",overflow:"hidden"}}>
     <div style={{height:"100%",width:`${keys.length?Math.round((done/keys.length)*100):0}%`,background:COL.c,borderRadius:3,transition:"width 0.4s"}}/>
    </div>
    <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 1.25rem"}}>{done}/{keys.length} completed</p>

    {/* HOOK */}
    <div style={{borderRadius:"var(--border-radius-lg)",border:`1.5px solid ${COL.c}`,background:COL.l,padding:"1rem 1.25rem",marginBottom:"1rem"}}>
     <p style={{fontSize:11,fontWeight:500,color:COL.d,margin:"0 0 6px",textTransform:"uppercase",letterSpacing:1}}>Why this actually matters</p>
     <p style={{fontSize:16,fontWeight:500,color:COL.d,margin:"0 0 0.75rem"}}>{mod.hook}</p>
     {!hookDone && (
      <div>
       <p style={{fontSize:14,color:COL.d,margin:"0 0 0.75rem",lineHeight:1.7}}>{mod.hookBody}</p>
       <button onClick={()=>markDone(hookKey,10,"Hook")} style={{padding:"7px 16px",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1px solid ${COL.c}`,background:"white",color:COL.d,cursor:"pointer"}}>Got it +10 XP</button>
      </div>
     )}
     {hookDone && <p style={{fontSize:13,color:COL.d,margin:0,lineHeight:1.7}}>{mod.hookBody}</p>}
    </div>

    {/* DEBATE */}
    <div style={{borderRadius:"var(--border-radius-lg)",border:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",padding:"1rem 1.25rem",marginBottom:"1rem"}}>
     <p style={{fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",margin:"0 0 6px",textTransform:"uppercase",letterSpacing:1}}>The debate</p>
     <p style={{fontSize:15,fontWeight:500,margin:"0 0 0.75rem"}}>{mod.debate.question}</p>
     {!debateRevealed && <button onClick={()=>setDebateRevealed(true)} style={{padding:"7px 14px",fontSize:13,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",cursor:"pointer"}}>See both sides ↓</button>}
     {debateRevealed && (
      <div>
       <div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"#FCEBEB",border:"0.5px solid #F09595",marginBottom:8}}>
        <p style={{fontSize:12,fontWeight:500,color:"#A32D2D",margin:"0 0 4px"}}>Against</p>
        <p style={{fontSize:14,color:"#501313",margin:0,lineHeight:1.6}}>{mod.debate.sideA}</p>
       </div>
       <div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"#EAF3DE",border:"0.5px solid #C0DD97",marginBottom:8}}>
        <p style={{fontSize:12,fontWeight:500,color:"#3B6D11",margin:"0 0 4px"}}>For</p>
        <p style={{fontSize:14,color:"#173404",margin:0,lineHeight:1.6}}>{mod.debate.sideB}</p>
       </div>
       <div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"#E6F1FB",border:"0.5px solid #B5D4F4",marginBottom:8}}>
        <p style={{fontSize:12,fontWeight:500,color:"#185FA5",margin:"0 0 4px"}}>The point</p>
        <p style={{fontSize:14,color:"#042C53",margin:0,lineHeight:1.6}}>{mod.debate.verdict}</p>
       </div>
       {!debateDone&&<button onClick={()=>markDone(debateKey,20,"Debate")} style={{padding:"7px 16px",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1px solid ${COL.c}`,background:COL.l,color:COL.d,cursor:"pointer"}}>Argued both sides +20 XP</button>}
       {debateDone&&<p style={{fontSize:13,color:COL.d,fontWeight:500}}>✓ Completed</p>}
      </div>
     )}
    </div>

    {/* LEARN */}
    <p style={{fontSize:13,fontWeight:500,color:"var(--color-text-secondary)",margin:"0 0 0.5rem"}}>READ & LEARN</p>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:"1rem"}}>
     {mod.learn.map((item,i)=>{
      const k=`${mod.id}::learn${i}`;
      const d=!!stats.completedActivities[k];
      return(
       <div key={i} onClick={()=>go("learn",mod.id,i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:"var(--border-radius-md)",border:`0.5px solid ${d?COL.c:"var(--color-border-tertiary)"}`,background:d?COL.l:"var(--color-background-primary)",cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
         <span style={{fontSize:14}}>📖</span>
         <span style={{fontSize:14,fontWeight:500,color:d?COL.d:"var(--color-text-primary)"}}>{item.title}</span>
        </div>
        <span style={{fontSize:12,color:d?COL.d:"var(--color-text-secondary)"}}>{d?"✓":"+15 XP"} ›</span>
       </div>
      );
     })}
    </div>

    {/* TEST */}
    <p style={{fontSize:13,fontWeight:500,color:"var(--color-text-secondary)",margin:"0 0 0.5rem"}}>TEST YOURSELF</p>
    <div style={{display:"flex",gap:8}}>
     <button onClick={()=>go("flashcard",mod.id)} style={{flex:1,padding:"12px 8px",fontSize:13,borderRadius:"var(--border-radius-md)",border:`0.5px solid ${COL.c}`,background:COL.l,color:COL.d,cursor:"pointer",textAlign:"center"}}>
      🃏 Flashcards<br/><span style={{fontSize:11,opacity:0.8}}>{mod.flashcards.length} cards</span>
     </button>
     <button onClick={()=>go("practiceq",mod.id)} style={{flex:1,padding:"12px 8px",fontSize:13,borderRadius:"var(--border-radius-md)",border:`0.5px solid ${COL.c}`,background:COL.l,color:COL.d,cursor:"pointer",textAlign:"center"}}>
      📝 Exam Q<br/><span style={{fontSize:11,opacity:0.8}}>Weak→Strong</span>
     </button>
    </div>
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:COL.c,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast}</div>}
   </div>
  );
 }

 // HOME
 return (
  <div style={{padding:"1rem 0"}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"}}>
    <div>
     <h1 style={{fontSize:20,fontWeight:500,margin:0}}>RE Revision</h1>
     <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"2px 0 0"}}>The big questions — actually worth arguing about</p>
    </div>
    <div style={{textAlign:"right"}}>
     <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>XP earned</p>
     <p style={{margin:0,fontSize:22,fontWeight:500}}>{stats.totalXP}</p>
    </div>
   </div>
   <div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:COL.l,border:`0.5px solid ${COL.c}`,marginBottom:"1.5rem"}}>
    <p style={{fontSize:13,color:COL.d,margin:0,lineHeight:1.6}}>RE isn't asking you to believe any of this. It's asking you to understand what people believe, argue with it critically, and explain both sides. That's actually a useful skill — and some of these questions are genuinely interesting once you engage with them.</p>
   </div>
   <div style={{display:"flex",flexDirection:"column",gap:8}}>
    {MODULES.map(m=>{
     const ks=allKeys(m);
     const d=ks.filter(k=>stats.completedActivities[k]).length;
     return(
      <div key={m.id} onClick={()=>go("module",m.id)} style={{padding:"14px",borderRadius:"var(--border-radius-lg)",border:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",cursor:"pointer"}}>
       <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <div>
         <p style={{margin:"0 0 4px",fontSize:15,fontWeight:500}}>{m.name}</p>
         <p style={{margin:0,fontSize:13,color:COL.d,fontStyle:"italic"}}>"{m.hook}"</p>
        </div>
        <span style={{fontSize:12,color:"var(--color-text-secondary)",flexShrink:0,marginLeft:8}}>{d}/{ks.length} ›</span>
       </div>
       <div style={{height:4,background:"var(--color-background-secondary)",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${ks.length?Math.round((d/ks.length)*100):0}%`,background:COL.c,borderRadius:2}}/>
       </div>
      </div>
     );
    })}
   </div>
   {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:COL.c,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast}</div>}
  </div>
 );
}