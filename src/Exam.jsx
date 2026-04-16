import { useState, useEffect } from "react";

// ── QUESTION BANK ─────────────────────────────────────────────────────────
// Types: "write" | "fillin" | "truefalse" | "spot" | "order" | "match"
const EXAMS = [
 { id:"science", name:"Science", emoji:"⚗️", col:{c:"#1D9E75",l:"#E1F5EE",d:"#085041"}, questions:[
  { type:"truefalse", topic:"Ecosystems",
    statement:"Energy increases as it moves up a food chain because animals eat more food at each level.",
    answer:false, verdict:"complicated",
    explanation:"False — energy DECREASES at each level. Around 90% is lost as heat, movement and waste at every stage. Only ~10% passes upward, which is why food chains rarely exceed 5 links." },
  { type:"fillin", topic:"Electricity",
    sentence:"In a [BLANK] circuit, all components share the voltage. In a [BLANK] circuit, each component gets the full voltage and they work independently.",
    blanks:["series","parallel"],
    hints:["Think S for Single path","Think P for Plenty of paths"] },
  { type:"spot", topic:"Metals & Acids",
    question:"A student writes: 'When copper is added to hydrochloric acid, it reacts vigorously producing lots of bubbles of hydrogen gas.' What is wrong with this?",
    answer:"Copper is very low in the reactivity series and does not react with hydrochloric acid. There would be no bubbles and no reaction.",
    model:"Copper is below hydrogen in the reactivity series — it is unreactive with dilute acids. No fizzing, no salt produced, nothing happens." },
 ]},
 { id:"maths", name:"Maths", emoji:"📐", col:{c:"#378ADD",l:"#E6F1FB",d:"#0C447C"}, questions:[
  { type:"order", topic:"Solving Equations",
    instruction:"Put these steps in the correct order to solve 3(2x + 1) = 21",
    steps:["Divide both sides by 6: x = 3","Expand the bracket: 6x + 3 = 21","Subtract 3 from both sides: 6x = 18","Check: 3(7)=21 ✓"],
    correct:[1,2,3,0] },
  { type:"fillin", topic:"Sequences",
    sentence:"The nth term of a sequence is found by identifying the common [BLANK], which becomes the coefficient of n. You then adjust the [BLANK] to match the first term.",
    blanks:["difference","constant"],
    hints:["What stays the same between terms?","The number added or subtracted at the end"] },
  { type:"spot", topic:"Percentages",
    question:"A student works out a 30% increase on £80 like this: £80 + 30 = £110. What mistake have they made?",
    answer:"They added 30 as if it were pounds, not a percentage. The correct method is £80 × 1.30 = £104.",
    model:"You can't add the percentage number directly. 30% of £80 = £24, so the answer is £80 + £24 = £104, or £80 × 1.3 = £104." },
 ]},
 { id:"history", name:"History", emoji:"📜", col:{c:"#BA7517",l:"#FAEEDA",d:"#633806"}, questions:[
  { type:"match", topic:"Tudors",
    instruction:"Match each monarch to what they did",
    pairs:[
     { term:"Henry VIII", def:"Created the Church of England and dissolved the monasteries" },
     { term:"Mary I", def:"Burned 284 Protestants — nicknamed Bloody Mary" },
     { term:"Elizabeth I", def:"Defeated the Spanish Armada in 1588" },
     { term:"Edward VI", def:"Stripped churches of decoration — focused on God's word" },
    ]},
  { type:"truefalse", topic:"Civil War",
    statement:"The Roundheads were supporters of King Charles I during the English Civil War.",
    answer:false, verdict:"false",
    explanation:"Wrong — Roundheads were Parliamentarians (Parliament's supporters). The Royalists (King's supporters) were called Cavaliers." },
  { type:"write", topic:"Industrial Revolution",
    question:"Explain two ways that working conditions in Industrial Revolution factories were dangerous or unfair. (4 marks)",
    marks:4, model:"Hours: workers faced 12–14 hour shifts with low wages (~15 shillings/week for men, less for women and children). Safety: machinery was unguarded causing frequent accidents and deaths. Children were employed and subjected to physical punishment. Employers preferred women and children as they were cheaper.",
    keywords:["hours","wages","dangerous","children","punishment","machinery","accidents"] },
 ]},
 { id:"geography", name:"Geography", emoji:"🌍", col:{c:"#639922",l:"#EAF3DE",d:"#3B6D11"}, questions:[
  { type:"match", topic:"Tectonics",
    instruction:"Match each plate boundary to what happens there",
    pairs:[
     { term:"Destructive boundary", def:"Oceanic plate subducts — volcanoes and earthquakes" },
     { term:"Constructive boundary", def:"Plates move apart — magma rises, new land forms" },
     { term:"Conservative boundary", def:"Plates slide past each other — earthquakes only" },
    ]},
  { type:"truefalse", topic:"Migration",
    statement:"A refugee is someone who moves to another country purely to find better paid work.",
    answer:false, verdict:"false",
    explanation:"That describes an economic migrant. A refugee is forced to flee due to persecution, conflict or disaster — they have no safe choice but to leave." },
  { type:"fillin", topic:"Rivers",
    sentence:"Rivers shape the land through three processes: [BLANK] (wearing away rock), [BLANK] (moving material downstream), and [BLANK] (dropping material when the river slows).",
    blanks:["erosion","transportation","deposition"],
    hints:["Wearing away","Moving along","Dropping/settling"] },
 ]},
 { id:"english", name:"English", emoji:"✍️", col:{c:"#7F77DD",l:"#EEEDFE",d:"#3C3489"}, questions:[
  { type:"match", topic:"Methods",
    instruction:"Match each technique to its definition",
    pairs:[
     { term:"Simile", def:"Comparison using 'like' or 'as'" },
     { term:"Metaphor", def:"Says something IS something else directly" },
     { term:"Personification", def:"Gives human qualities to a non-human thing" },
     { term:"Pathetic fallacy", def:"Uses weather/nature to reflect mood" },
    ]},
  { type:"spot", topic:"Word Classes",
    question:"A student writes: 'The adverb in the sentence \"She ran quickly\" is \"ran\" because it describes the action.' What is wrong?",
    answer:"'Ran' is a verb, not an adverb. 'Quickly' is the adverb — it modifies the verb 'ran' by describing HOW she ran.",
    model:"'Ran' is the verb (the action). 'Quickly' is the adverb — adverbs modify verbs and often end in -ly. It tells us HOW she ran." },
  { type:"write", topic:"Writing",
    question:"Write the opening two sentences of a description of an empty school at night. Use a metaphor and vary your sentence length. (3 marks)",
    marks:3, model:"The corridor was a held breath — waiting. Lockers lined the walls like silent sentinels, and somewhere in the dark, a door swung on its hinge.",
    keywords:["metaphor","short sentence","vary","atmosphere","description"] },
 ]},
 { id:"tech", name:"Technology", emoji:"🔧", col:{c:"#D4537E",l:"#FBEAF0",d:"#72243E"}, questions:[
  { type:"truefalse", topic:"Plastics",
    statement:"Thermoset plastics can be melted down and recycled because they soften when heated.",
    answer:false, verdict:"false",
    explanation:"That describes thermoplastics. Thermosets form a permanent 3D molecular network during moulding and CANNOT be reheated, reshaped or recycled." },
  { type:"order", topic:"Vacuum Forming",
    instruction:"Put the vacuum forming stages in the correct order",
    steps:["Vacuum pump removes air — atmospheric pressure pushes plastic onto mould","Electric heater softens the plastic sheet until it sags","Mould is placed inside the vacuum former","Thermoplastic sheet is clamped securely above the mould","Plastic cools and hardens in the shape of the mould"],
    correct:[2,3,1,0,4] },
  { type:"fillin", topic:"Food Technology",
    sentence:"The 4 Cs of food hygiene are: [BLANK], Cooking, [BLANK], and Cross-contamination.",
    blanks:["Cleaning","Chilling"],
    hints:["Washing hands and surfaces","Keeping food cold"] },
 ]},
 { id:"french", name:"French", emoji:"🥐", col:{c:"#D85A30",l:"#FAECE7",d:"#712B13"}, questions:[
  { type:"fillin", topic:"Past Tense",
    sentence:"To form the passé composé with avoir: subject + [BLANK] + [BLANK]. Example: J'[BLANK] mangé = I ate.",
    blanks:["avoir","past participle","ai"],
    hints:["The helper verb","The -é/-i/-u form of the verb","1st person singular of avoir"] },
  { type:"truefalse", topic:"Future Tense",
    statement:"'Je vais manger' means 'I ate' in French.",
    answer:false, verdict:"false",
    explanation:"'Je vais manger' means 'I am going to eat' — it is the immediate future tense (aller + infinitive). 'I ate' would be 'j'ai mangé' (passé composé)." },
  { type:"write", topic:"Writing",
    question:"Write 4 sentences in French about what you like to eat. Include an opinion, a reason, and one future tense sentence. (4 marks)",
    marks:4, model:"J'aime beaucoup les pizzas parce que c'est délicieux. Je n'aime pas les légumes parce que c'est dégoûtant. Normalement, je mange des pâtes le soir. Ce weekend, je vais manger une pizza avec ma famille.",
    keywords:["j'aime","parce que","je vais","opinion","future"] },
 ]},
 { id:"re", name:"RE", emoji:"✝️", col:{c:"#534AB7",l:"#EEEDFE",d:"#26215C"}, questions:[
  { type:"match", topic:"Covenants",
    instruction:"Match each covenant to its sign or key detail",
    pairs:[
     { term:"Covenant with Noah", def:"Sign = the rainbow. God promises never to destroy the earth again." },
     { term:"Covenant with Abraham", def:"Promise of land and countless descendants. Foundation of three world religions." },
     { term:"The Ten Commandments", def:"Given to Moses at Mount Sinai. The covenant renewed with Israel." },
    ]},
  { type:"truefalse", topic:"Pentecost",
    statement:"At Pentecost, the disciples spoke in tongues — meaning they spoke complete nonsense that nobody could understand.",
    answer:false, verdict:"complicated",
    explanation:"The opposite — people from many nations heard the disciples speaking in their OWN native languages and understood them perfectly. This is what made it miraculous and why 3,000 people joined that day." },
  { type:"write", topic:"Creation",
    question:"Explain what 'imago Dei' means and why it matters to Christians. (3 marks)",
    marks:3, model:"Imago Dei means 'in the image of God' — the belief that humans are created to reflect God's rationality, creativity and moral awareness. It gives every human being inherent dignity and worth, regardless of ability or status. It also gives humans the responsibility of stewardship — caring for creation as God would.",
    keywords:["image of god","dignity","stewardship","creativity","worth","reflect"] },
 ]},
 { id:"music", name:"Music", emoji:"🎵", col:{c:"#5DCAA5",l:"#E1F5EE",d:"#085041"}, questions:[
  { type:"match", topic:"Musical Elements",
    instruction:"Match each element to its definition",
    pairs:[
     { term:"Dynamics", def:"How loud or quiet the music is" },
     { term:"Tempo", def:"The speed of the music" },
     { term:"Texture", def:"How many layers of sound there are" },
     { term:"Tonality", def:"Whether the music is major or minor" },
    ]},
  { type:"truefalse", topic:"Blues",
    statement:"The 12-bar blues uses four different chords in a repeating pattern.",
    answer:false, verdict:"false",
    explanation:"The 12-bar blues uses THREE chords — chord I (tonic), chord IV (subdominant) and chord V (dominant). In C major these are C, F and G." },
  { type:"fillin", topic:"Blues",
    sentence:"A key feature of blues music is [BLANK] and response, where a vocal phrase is answered by an instrument. Blues also features [BLANK] — making up music on the spot.",
    blanks:["call","improvisation"],
    hints:["The first part of a musical conversation","Making it up as you go"] },
 ]},
 { id:"pe", name:"PE Theory", emoji:"🏃", col:{c:"#534AB7",l:"#EEEDFE",d:"#26215C"}, questions:[
  { type:"match", topic:"Fitness Tests",
    instruction:"Match each fitness component to its test",
    pairs:[
     { term:"Cardiovascular endurance", def:"Bleep Test / Cooper Run" },
     { term:"Agility", def:"Illinois Agility Test / T-Test" },
     { term:"Flexibility", def:"Sit and Reach Test" },
     { term:"Power", def:"Vertical Jump Test" },
    ]},
  { type:"spot", topic:"Application",
    question:"A student writes: 'Agility is important in football because it helps you play better.' Why will this get low marks?",
    answer:"It's too vague — it doesn't explain HOW agility helps or what specific actions in football require it. A good answer links the component directly to specific movements in the sport.",
    model:"The answer needs to say WHY — e.g. 'Agility is vital in football because players must rapidly change direction to evade tackles, close down opponents and make runs into space — all requiring fast, accurate direction changes.'" },
  { type:"truefalse", topic:"Fitness Components",
    statement:"Muscular strength and muscular endurance are the same thing — both measure how strong your muscles are.",
    answer:false, verdict:"false",
    explanation:"Different things. Muscular STRENGTH = maximum force in a single effort (e.g. one heavy lift). Muscular ENDURANCE = muscles working repeatedly over time without fatiguing (e.g. 100 press-ups)." },
 ]},
];

const INIT = { examHistory:[] };

// ── MATCH QUESTION ────────────────────────────────────────────────────────
function MatchQ({ q, col, onCorrect, onWrong }) {
 const [selected, setSelected] = useState(null);
 const [matched, setMatched] = useState({});
 const [wrong, setWrong] = useState(null);
 const [defs] = useState(() => [...q.pairs].sort(()=>Math.random()-0.5));

 const handleTerm = (i) => { if(matched[i]!==undefined) return; setSelected(i); setWrong(null); };
 const handleDef = (defIdx) => {
  if(selected===null) return;
  const correctDef = q.pairs[selected].def;
  if(defs[defIdx].def===correctDef) {
   const m = {...matched, [selected]:defIdx};
   setMatched(m);
   setSelected(null);
   if(Object.keys(m).length===q.pairs.length) onCorrect();
  } else {
   setWrong(defIdx);
   setTimeout(()=>setWrong(null),800);
   onWrong();
  }
 };
 return(
  <div>
   <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 1rem"}}>{q.instruction} — tap a term, then its definition.</p>
   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
     {q.pairs.map((p,i)=>{
      const isMatched=matched[i]!==undefined;
      const isSel=selected===i;
      return<div key={i} onClick={()=>handleTerm(i)} style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",border:`1.5px solid ${isMatched?col.c:isSel?col.c:"var(--color-border-secondary)"}`,background:isMatched?col.l:isSel?col.l:"var(--color-background-primary)",cursor:isMatched?"default":"pointer",fontSize:13,fontWeight:500,color:isMatched?col.d:isSel?col.d:"var(--color-text-primary)",opacity:isMatched?0.7:1}}>
       {isMatched?"✓ ":""}{p.term}
      </div>;
     })}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
     {defs.map((d,i)=>{
      const isMatched=Object.values(matched).includes(i);
      const isWrong=wrong===i;
      return<div key={i} onClick={()=>handleDef(i)} style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",border:`1.5px solid ${isMatched?"#1D9E75":isWrong?"#E24B4A":"var(--color-border-secondary)"}`,background:isMatched?"#E1F5EE":isWrong?"#FCEBEB":"var(--color-background-primary)",cursor:isMatched?"default":"pointer",fontSize:12,color:isMatched?"#085041":isWrong?"#A32D2D":"var(--color-text-primary)",opacity:isMatched?0.7:1}}>
       {d.def}
      </div>;
     })}
    </div>
   </div>
  </div>
 );
}

// ── FILL IN BLANKS ────────────────────────────────────────────────────────
function FillinQ({ q, col, onCorrect, onWrong }) {
 const [vals, setVals] = useState(q.blanks.map(()=>""));
 const [checked, setChecked] = useState(false);
 const [results, setResults] = useState([]);
 const [nudge, setNudge] = useState(false);

 const check = () => {
  if(vals.some(v=>!v.trim())){ setNudge(true); return; }
  const r = vals.map((v,i)=>v.trim().toLowerCase()===q.blanks[i].toLowerCase());
  setResults(r);
  setChecked(true);
  if(r.every(Boolean)) onCorrect(); else onWrong();
 };

 const parts = q.sentence.split(/\[BLANK\]/);
 let blankIdx = 0;
 return(
  <div>
   <div style={{fontSize:15,lineHeight:2,marginBottom:"1rem",flexWrap:"wrap",display:"flex",alignItems:"center",gap:4}}>
    {parts.map((part,i)=>(
     <span key={i} style={{display:"inline"}}>
      <span>{part}</span>
      {i<parts.length-1&&(()=>{
       const bi=blankIdx++;
       const correct=checked&&results[bi];
       const wrong=checked&&!results[bi];
       return<input key={bi} value={vals[bi]} onChange={e=>{if(!checked){const v=[...vals];v[bi]=e.target.value;setVals(v);}}} placeholder={q.hints[bi]} style={{width:120,padding:"2px 8px",borderRadius:4,border:`1.5px solid ${correct?"#1D9E75":wrong?"#E24B4A":"var(--color-border-secondary)"}`,background:correct?"#E1F5EE":wrong?"#FCEBEB":"var(--color-background-primary)",fontSize:14,textAlign:"center",fontFamily:"inherit"}}/>;
      })()}
     </span>
    ))}
   </div>
   {nudge&&<p style={{fontSize:13,color:"#BA7517",margin:"0 0 0.75rem"}}>Fill in all the blanks first!</p>}
   {checked&&!results.every(Boolean)&&(
    <div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"#FAEEDA",border:"0.5px solid #FAC775",marginBottom:"0.75rem"}}>
     <p style={{fontSize:12,fontWeight:500,color:"#633806",margin:"0 0 4px"}}>The correct answers:</p>
     {q.blanks.map((b,i)=>!results[i]&&<p key={i} style={{fontSize:13,color:"#412402",margin:"2px 0"}}>Blank {i+1}: <strong>{b}</strong></p>)}
    </div>
   )}
   {!checked&&<button onClick={check} style={{padding:"10px 24px",fontSize:14,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Check answers</button>}
  </div>
 );
}

// ── TRUE / FALSE / COMPLICATED ────────────────────────────────────────────
function TrueFalseQ({ q, col, onCorrect, onWrong }) {
 const [chosen, setChosen] = useState(null);
 const [revealed, setRevealed] = useState(false);

 const handle = (val) => {
  if(revealed) return;
  setChosen(val);
  setRevealed(true);
  const correct = (val==="true"&&q.answer===true)||(val==="false"&&q.answer===false)||(val==="complicated"&&q.verdict==="complicated");
  if(correct) onCorrect(); else onWrong();
 };

 const correctAnswer = q.verdict==="complicated" ? "complicated" : q.answer ? "true" : "false";
 const btnStyle = (val) => ({
  flex:1, padding:"12px 8px", fontSize:14, fontWeight:500,
  borderRadius:"var(--border-radius-md)", cursor:revealed?"default":"pointer",
  border:`1.5px solid ${revealed&&val===correctAnswer?"#1D9E75":revealed&&chosen===val&&val!==correctAnswer?"#E24B4A":"var(--color-border-secondary)"}`,
  background:revealed&&val===correctAnswer?"#E1F5EE":revealed&&chosen===val&&val!==correctAnswer?"#FCEBEB":"var(--color-background-primary)",
  color:revealed&&val===correctAnswer?"#085041":revealed&&chosen===val&&val!==correctAnswer?"#A32D2D":"var(--color-text-primary)",
 });

 return(
  <div>
   <div style={{display:"flex",gap:8,marginBottom:"1rem"}}>
    <button onClick={()=>handle("true")} style={btnStyle("true")}>True</button>
    <button onClick={()=>handle("false")} style={btnStyle("false")}>False</button>
    {q.verdict==="complicated"&&<button onClick={()=>handle("complicated")} style={btnStyle("complicated")}>It's complicated</button>}
   </div>
   {revealed&&<div style={{padding:"12px",borderRadius:"var(--border-radius-md)",background:chosen===correctAnswer?"#E1F5EE":"#FCEBEB",border:`0.5px solid ${chosen===correctAnswer?"#9FE1CB":"#F7C1C1"}`}}>
    <p style={{fontSize:12,fontWeight:500,color:chosen===correctAnswer?"#085041":"#A32D2D",margin:"0 0 4px"}}>{chosen===correctAnswer?"Correct!":"Not quite —"}</p>
    <p style={{fontSize:14,color:chosen===correctAnswer?"#173404":"#501313",margin:0,lineHeight:1.6}}>{q.explanation}</p>
   </div>}
  </div>
 );
}

// ── SPOT THE MISTAKE ──────────────────────────────────────────────────────
function SpotQ({ q, col, onCorrect, onWrong }) {
 const [ans, setAns] = useState("");
 const [revealed, setRevealed] = useState(false);
 const [nudge, setNudge] = useState(0);

 const submit = () => {
  if(ans.trim().split(/\s+/).length < 20) {
   if(nudge===0){ setNudge(1); return; }
   if(nudge===1){ setNudge(2); return; }
  }
  setRevealed(true);
  onWrong(); // always goes to self-rate
 };

 return(
  <div>
   <div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"#FCEBEB",border:"0.5px solid #F7C1C1",marginBottom:"1rem"}}>
    <p style={{fontSize:12,fontWeight:500,color:"#A32D2D",margin:"0 0 4px"}}>Spot the mistake</p>
    <p style={{fontSize:14,color:"#501313",margin:0,lineHeight:1.6}}>{q.question}</p>
   </div>
   <textarea value={ans} onChange={e=>setAns(e.target.value)} placeholder="What's wrong with it? Explain..." disabled={revealed}
    style={{width:"100%",minHeight:100,padding:"10px 12px",fontSize:14,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
   {nudge===1&&<p style={{fontSize:13,color:"#BA7517",margin:"4px 0 8px"}}>Try to say a bit more — what exactly is wrong and why?</p>}
   {nudge===2&&<p style={{fontSize:13,color:"#185FA5",margin:"4px 0 8px"}}>Hint: identify WHAT the error is, then explain the correct version.</p>}
   {!revealed&&<button onClick={submit} style={{marginTop:8,padding:"10px 24px",fontSize:14,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Submit</button>}
   {revealed&&<div style={{marginTop:"0.75rem",padding:"12px",borderRadius:"var(--border-radius-md)",background:"#EAF3DE",border:"0.5px solid #C0DD97"}}>
    <p style={{fontSize:12,fontWeight:500,color:"#3B6D11",margin:"0 0 4px"}}>Model answer</p>
    <p style={{fontSize:14,color:"#173404",margin:0,lineHeight:1.6}}>{q.model}</p>
   </div>}
  </div>
 );
}

// ── ORDER THE STEPS ───────────────────────────────────────────────────────
function OrderQ({ q, col, onCorrect, onWrong }) {
 const [order, setOrder] = useState(()=>[...q.steps].map((_,i)=>i).sort(()=>Math.random()-0.5));
 const [checked, setChecked] = useState(false);
 const [dragging, setDragging] = useState(null);

 const move = (from, to) => {
  const o=[...order];
  const [item]=o.splice(from,1);
  o.splice(to,0,item);
  setOrder(o);
 };

 const check = () => {
  setChecked(true);
  const correct = order.every((stepIdx,pos)=>q.correct[pos]===stepIdx);
  if(correct) onCorrect(); else onWrong();
 };

 const correctOrder = q.correct.map(i=>q.steps[i]);
 const isCorrect = checked && order.every((stepIdx,pos)=>q.correct[pos]===stepIdx);

 return(
  <div>
   <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 0.75rem"}}>{q.instruction} — tap ↑↓ to reorder.</p>
   <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:"1rem"}}>
    {order.map((stepIdx,pos)=>{
     const correctPos=q.correct.indexOf(stepIdx);
     const posCorrect=checked&&q.correct[pos]===stepIdx;
     const posWrong=checked&&q.correct[pos]!==stepIdx;
     return(
      <div key={stepIdx} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:"var(--border-radius-md)",border:`1.5px solid ${posCorrect?"#1D9E75":posWrong?"#E24B4A":"var(--color-border-secondary)"}`,background:posCorrect?"#E1F5EE":posWrong?"#FCEBEB":"var(--color-background-primary)"}}>
       <div style={{display:"flex",flexDirection:"column",gap:2}}>
        <button onClick={()=>pos>0&&move(pos,pos-1)} disabled={pos===0||checked} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,padding:"0 4px",color:"var(--color-text-secondary)"}}>↑</button>
        <button onClick={()=>pos<order.length-1&&move(pos,pos+1)} disabled={pos===order.length-1||checked} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,padding:"0 4px",color:"var(--color-text-secondary)"}}>↓</button>
       </div>
       <span style={{fontSize:13,flex:1,color:posCorrect?"#085041":posWrong?"#A32D2D":"var(--color-text-primary)"}}>{q.steps[stepIdx]}</span>
       {posCorrect&&<span style={{fontSize:12,color:"#1D9E75"}}>✓</span>}
       {posWrong&&<span style={{fontSize:11,color:"#E24B4A"}}>→ {pos+1}</span>}
      </div>
     );
    })}
   </div>
   {!checked&&<button onClick={check} style={{padding:"10px 24px",fontSize:14,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Check order</button>}
   {checked&&!isCorrect&&(
    <div style={{padding:"12px",borderRadius:"var(--border-radius-md)",background:"#FAEEDA",border:"0.5px solid #FAC775",marginTop:"0.75rem"}}>
     <p style={{fontSize:12,fontWeight:500,color:"#633806",margin:"0 0 6px"}}>Correct order:</p>
     {correctOrder.map((s,i)=><p key={i} style={{fontSize:13,color:"#412402",margin:"2px 0"}}>{i+1}. {s}</p>)}
    </div>
   )}
  </div>
 );
}

// ── WRITE QUESTION ────────────────────────────────────────────────────────
function WriteQ({ q, col, onDone }) {
 const [ans, setAns] = useState("");
 const [revealed, setRevealed] = useState(false);
 const [rating, setRating] = useState(null);
 const [nudge, setNudge] = useState(0);
 const wc = ans.trim().split(/\s+/).filter(Boolean).length;
 const minW = q.marks * 8;

 const getScaffold = (marks) => {
  if(marks<=2) return "Try: State your point → give one specific detail or example.";
  if(marks<=3) return "Try: Make your point → back it up with evidence → explain why it matters.";
  return "Try: Make your point → evidence/example → explain the impact → link back to the question.";
 };

 const submit = () => {
  if(wc < minW) {
   if(nudge===0){ setNudge(1); return; }
   if(nudge===1){ setNudge(2); return; }
  }
  setRevealed(true);
 };

 const RATINGS=[
  {id:"nailed",label:"Nailed it",col:"#1D9E75",bg:"#E1F5EE",xp:10},
  {id:"mostly",label:"Mostly got it",col:"#BA7517",bg:"#FAEEDA",xp:5},
  {id:"missed",label:"Missed it",col:"#E24B4A",bg:"#FCEBEB",xp:0},
 ];

 return(
  <div>
   <textarea value={ans} onChange={e=>setAns(e.target.value)} placeholder="Write your answer here..." disabled={revealed}
    style={{width:"100%",minHeight:120,padding:"10px 12px",fontSize:14,lineHeight:1.7,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
   <p style={{fontSize:12,color:wc>=minW?"#1D9E75":"var(--color-text-secondary)",margin:"4px 0 8px"}}>{wc} words {wc>=minW?"✓":""}</p>
   {nudge===1&&<p style={{fontSize:13,color:"#BA7517",margin:"0 0 8px"}}>This question is worth {q.marks} marks — try to say a bit more.</p>}
   {nudge===2&&<div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"#E6F1FB",border:"0.5px solid #B5D4F4",marginBottom:8}}>
    <p style={{fontSize:12,fontWeight:500,color:"#185FA5",margin:"0 0 4px"}}>Try this structure:</p>
    <p style={{fontSize:13,color:"#042C53",margin:0}}>{getScaffold(q.marks)}</p>
   </div>}
   {!revealed&&<button onClick={submit} style={{padding:"10px 24px",fontSize:14,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Submit answer</button>}
   {revealed&&!rating&&(
    <div>
     <div style={{padding:"12px",borderRadius:"var(--border-radius-md)",background:"#EAF3DE",border:"0.5px solid #C0DD97",marginBottom:"0.75rem"}}>
      <p style={{fontSize:12,fontWeight:500,color:"#3B6D11",margin:"0 0 4px"}}>Model answer</p>
      <p style={{fontSize:14,color:"#173404",margin:"0 0 8px",lineHeight:1.7}}>{q.model}</p>
      <p style={{fontSize:11,color:"#3B6D11",fontWeight:500}}>Key words to hit: {q.keywords.join(" · ")}</p>
     </div>
     <p style={{fontSize:13,fontWeight:500,margin:"0 0 0.5rem"}}>How did you do?</p>
     <div style={{display:"flex",gap:8}}>
      {RATINGS.map(r=><button key={r.id} onClick={()=>{setRating(r.id);onDone(r.xp);}} style={{flex:1,padding:"10px 6px",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${r.col}`,background:r.bg,color:r.col,cursor:"pointer"}}>{r.label}</button>)}
     </div>
    </div>
   )}
   {rating&&<p style={{fontSize:13,color:"var(--color-text-secondary)",marginTop:8}}>Rated: {rating} ✓</p>}
  </div>
 );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
 const [stats, setStats] = useState(()=>{ try{const s=localStorage.getItem('harvey-exams');return s?JSON.parse(s):INIT;}catch{return INIT;} });
 const [view, setView] = useState("home");
 const [selExam, setSelExam] = useState(null);
 const [qIdx, setQIdx] = useState(0);
 const [xpEarned, setXpEarned] = useState(0);
 const [qDone, setQDone] = useState(false);
 const [wrongCount, setWrongCount] = useState(0);
 const [toast, setToast] = useState(null);

 useEffect(()=>{ try{localStorage.setItem('harvey-exams',JSON.stringify(stats));}catch{} },[stats]);

 const showToast=(msg,col="#1D9E75")=>{setToast({msg,col});setTimeout(()=>setToast(null),2000);};

 const exam = selExam ? EXAMS.find(e=>e.id===selExam) : null;
 const col = exam?.col;
 const q = exam ? exam.questions[qIdx] : null;

 const startExam = (id) => { setSelExam(id); setQIdx(0); setXpEarned(0); setWrongCount(0); setQDone(false); setView("exam"); };

 const handleCorrect = () => { showToast("+10 XP — correct!"); setXpEarned(x=>x+10); setQDone(true); };
 const handleWrong = () => { setWrongCount(w=>w+1); setQDone(true); };
 const handleWriteDone = (xp) => { setXpEarned(x=>x+xp); setQDone(true); };

 const next = () => {
  if(qIdx < exam.questions.length-1) { setQIdx(i=>i+1); setQDone(false); }
  else {
   const result = { examId:exam.id, examName:exam.name, date:new Date().toLocaleDateString('en-GB'), xpEarned, maxXP:exam.questions.length*10 };
   setStats(prev=>({...prev, examHistory:[result,...prev.examHistory.slice(0,19)]}));
   setView("results");
  }
 };

 const go = (v) => setView(v);

 // RESULTS
 if(view==="results"&&exam) {
  const pct = Math.round((xpEarned/(exam.questions.length*10))*100);
  return(
   <div style={{padding:"1rem 0"}}>
    <h2 style={{fontSize:18,fontWeight:500,margin:"0 0 1.25rem"}}>{exam.emoji} {exam.name} — Done!</h2>
    <div style={{textAlign:"center",padding:"2rem",borderRadius:"var(--border-radius-lg)",background:col.l,border:`1.5px solid ${col.c}`,marginBottom:"1.25rem"}}>
     <p style={{fontSize:52,fontWeight:500,margin:0,color:col.d}}>{pct}%</p>
     <p style={{fontSize:14,color:col.d,margin:"4px 0 0"}}>{xpEarned} / {exam.questions.length*10} XP</p>
    </div>
    <div style={{display:"flex",gap:8,marginBottom:"1.25rem"}}>
     <button onClick={()=>startExam(exam.id)} style={{flex:1,padding:"12px",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Try again</button>
     <button onClick={()=>go("home")} style={{flex:1,padding:"12px",fontSize:13,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer"}}>All subjects</button>
    </div>
   </div>
  );
 }

 // EXAM
 if(view==="exam"&&exam&&q) {
  const TYPE_LABEL={write:"Written answer",fillin:"Fill in the blanks",truefalse:"True or false?",spot:"Spot the mistake",order:"Put in order",match:"Match up"};
  return(
   <div style={{padding:"1rem 0"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
     <button onClick={()=>go("home")} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0}}>✕ Exit</button>
     <span style={{fontSize:13,color:"var(--color-text-secondary)"}}>{qIdx+1} / {exam.questions.length}</span>
    </div>
    <div style={{height:4,background:"var(--color-background-secondary)",borderRadius:2,marginBottom:"1.25rem",overflow:"hidden"}}>
     <div style={{height:"100%",width:`${(qIdx/exam.questions.length)*100}%`,background:col.c,borderRadius:2,transition:"width 0.3s"}}/>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:"0.75rem"}}>
     <span style={{fontSize:11,padding:"2px 8px",borderRadius:3,background:col.l,color:col.d,fontWeight:500}}>{TYPE_LABEL[q.type]}</span>
     <span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{q.topic}</span>
    </div>
   {q.type!=="match"&&q.type!=="order"&&q.type!=="fillin"&&<p style={{fontSize:15,fontWeight:500,lineHeight:1.6,margin:"0 0 1rem"}}>{q.statement||q.question||q.q}</p>}
    {q.type==="match"&&<MatchQ q={q} col={col} onCorrect={handleCorrect} onWrong={handleWrong}/>}
    {q.type==="fillin"&&<FillinQ q={q} col={col} onCorrect={handleCorrect} onWrong={handleWrong}/>}
    {q.type==="truefalse"&&<TrueFalseQ q={q} col={col} onCorrect={handleCorrect} onWrong={handleWrong}/>}
    {q.type==="spot"&&<SpotQ q={q} col={col} onCorrect={handleCorrect} onWrong={handleWrong}/>}
    {q.type==="order"&&<OrderQ q={q} col={col} onCorrect={handleCorrect} onWrong={handleWrong}/>}
    {q.type==="write"&&<WriteQ q={q} col={col} onDone={handleWriteDone}/>}
    {qDone&&<button onClick={next} style={{width:"100%",padding:"13px",fontSize:15,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer",marginTop:"1rem"}}>{qIdx<exam.questions.length-1?"Next →":"See results →"}</button>}
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:toast.col,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast.msg}</div>}
   </div>
  );
 }

 // HOME
 const totalExams = stats.examHistory.length;
 const avgPct = totalExams ? Math.round(stats.examHistory.reduce((s,e)=>s+(e.xpEarned/e.maxXP)*100,0)/totalExams) : null;

 return(
  <div style={{padding:"1rem 0"}}>
   <h1 style={{fontSize:20,fontWeight:500,margin:"0 0 0.25rem"}}>Mini Exam Mode</h1>
   <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 1.25rem"}}>3 questions · match ups · fill in the blanks · spot the mistake · written answers</p>
   {totalExams>0&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:"1.25rem"}}>
    <div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)"}}>
     <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>Exams taken</p>
     <p style={{margin:0,fontSize:20,fontWeight:500}}>{totalExams}</p>
    </div>
    <div style={{padding:"10px 12px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)"}}>
     <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>Average score</p>
     <p style={{margin:0,fontSize:20,fontWeight:500}}>{avgPct}%</p>
    </div>
   </div>}
   {totalExams>0&&<div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",marginBottom:"1.25rem"}}>
    <p style={{fontSize:12,fontWeight:500,color:"var(--color-text-secondary)",margin:"0 0 6px"}}>Recent</p>
    {stats.examHistory.slice(0,3).map((e,i)=>(
     <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:i<2?"0.5px solid var(--color-border-tertiary)":"none"}}>
      <span style={{fontSize:13}}>{e.examName}</span>
      <span style={{fontSize:13,fontWeight:500,color:e.xpEarned/e.maxXP>=0.7?"#1D9E75":e.xpEarned/e.maxXP>=0.4?"#BA7517":"#E24B4A"}}>{Math.round((e.xpEarned/e.maxXP)*100)}% · {e.date}</span>
     </div>
    ))}
   </div>}
   <div style={{display:"flex",flexDirection:"column",gap:8}}>
    {EXAMS.map(e=>{
     const prev=stats.examHistory.find(h=>h.examId===e.id);
     return(
      <div key={e.id} onClick={()=>startExam(e.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:"var(--border-radius-lg)",border:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",cursor:"pointer"}}>
       <span style={{fontSize:22,flexShrink:0}}>{e.emoji}</span>
       <div style={{flex:1}}>
        <p style={{margin:0,fontSize:14,fontWeight:500}}>{e.name}</p>
        <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>{e.questions.length} questions · mixed activity types</p>
       </div>
       {prev&&<span style={{fontSize:13,fontWeight:500,flexShrink:0,color:prev.xpEarned/prev.maxXP>=0.7?"#1D9E75":prev.xpEarned/prev.maxXP>=0.4?"#BA7517":"#E24B4A"}}>{Math.round((prev.xpEarned/prev.maxXP)*100)}%</span>}
       <span style={{color:"var(--color-text-secondary)"}}>›</span>
      </div>
     );
    })}
   </div>
  </div>
 );
}