 import { useState, useEffect, useRef } from "react";

// ── COLOUR HELPERS ──────────────────────────────────────────────────────────
const COLS = {
  science:  { c:"#1D9E75", l:"#E1F5EE", d:"#085041" },
  maths:    { c:"#378ADD", l:"#E6F1FB", d:"#0C447C" },
  history:  { c:"#BA7517", l:"#FAEEDA", d:"#633806" },
  geography:{ c:"#639922", l:"#EAF3DE", d:"#3B6D11" },
  tech:     { c:"#D4537E", l:"#FBEAF0", d:"#72243E" },
  english:  { c:"#7F77DD", l:"#EEEDFE", d:"#3C3489" },
  french:   { c:"#D85A30", l:"#FAECE7", d:"#712B13" },
  spanish:  { c:"#993556", l:"#FBEAF0", d:"#4B1528" },
  music:    { c:"#5DCAA5", l:"#E1F5EE", d:"#085041" },
  re:       { c:"#888780", l:"#F1EFE8", d:"#444441" },
  pe:       { c:"#534AB7", l:"#EEEDFE", d:"#26215C" },
};

// ── ALL SUBJECTS & UNITS ────────────────────────────────────────────────────
const SUBJECTS = [
 { id:"science", name:"Science", emoji:"⚗️", examTip:"Count the marks — write that many distinct points. 'Explain' = say WHY, not just what happens.", units:[
  { id:"ecosystems", name:"Ecosystem Processes", learn:[
    { type:"read", title:"Energy flow in ecosystems", xp:15, content:`**Every living thing needs energy. In an ecosystem it flows one way — sun → plant → animal.**

🌿 **Producers** (plants) convert sunlight into chemical energy via photosynthesis.
🐛 **Primary consumers** eat plants and gain some of that energy.
🦊 **Secondary consumers** eat primary consumers.
🦅 **Tertiary consumers** sit at the top.

**Why does energy get lost at each level?**
Only ~10% passes up each trophic level. The rest is lost as heat, movement and waste. This is why food chains rarely exceed 5 links.

**Key vocab to use:** producer, consumer, trophic level, energy transfer, photosynthesis, decomposer, predator, prey.` },
    { type:"activity", title:"Draw a food chain & explain it", xp:25, content:`**Draw a food chain with at least 4 organisms.** Label each level. Arrows must point FROM what is eaten TO what eats it (many students get this backwards).

Then write ONE sentence: *Why does energy decrease at each level?*

Finally — predict: what happens if the top predator is removed? Write 3 linked consequences using "therefore" to connect them.` },
  ], flashcards:[
    { q:"What is a producer? Give an example.", a:"An organism that makes its own food via photosynthesis. E.g. grass, oak tree, algae." },
    { q:"Why does energy decrease at each trophic level?", a:"Energy is lost as heat, movement and waste at each stage — only ~10% passes to the next level." },
    { q:"What would happen if all plants in an ecosystem died?", a:"All consumers would eventually die — the energy source is removed. Herbivores starve first, then carnivores." },
  ], practiceQs:[
    { q:"Explain why there are fewer tertiary consumers than primary consumers. (3 marks)", weak:"Because there is less energy for them.", strong:"Energy is lost at each trophic level — only ~10% passes upward, the rest lost as heat and movement. By the time energy reaches tertiary consumers very little remains, so fewer individuals can be sustained. Therefore population size decreases at each level up the chain.", tip:"3 marks = 3 linked steps. Use 'therefore' to signal each step is complete." },
  ]},
  { id:"electricity", name:"Electricity & Magnetism", learn:[
    { type:"read", title:"Circuits: the core ideas", xp:15, content:`**Think of electricity like water in pipes.**

🔋 **Battery/cell** = the pump (provides voltage, measured in volts V)
🌊 **Current** = the water flowing (measured in amps A)
🚧 **Resistance** = narrow pipe slowing flow (measured in ohms Ω)

**Series circuit:** one path, components share voltage, all fail if one breaks, current same everywhere.
**Parallel circuit:** multiple paths, each component gets full voltage, others work if one fails, current splits.

**Electromagnetism:** current through a wire creates a magnetic field. Used in motors, speakers, MRI scanners.` },
    { type:"watch", title:"Series vs parallel circuits (BBC)", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/zgy39j6/articles/zxqpmfr", linkText:"BBC Bitesize: Electric circuits" },
  ], flashcards:[
    { q:"What is the difference between a series and parallel circuit?", a:"Series: one path, components share voltage, all fail together. Parallel: multiple paths, each gets full voltage, others work if one fails." },
    { q:"What is an electromagnet?", a:"A temporary magnet made by passing electric current through a coiled wire. Can be switched on/off." },
    { q:"What is current? What unit?", a:"The flow of electric charge. Measured in amps (A)." },
  ], practiceQs:[
    { q:"Explain why houses are wired in parallel, not series. (3 marks)", weak:"Because if one thing breaks the others still work.", strong:"In a parallel circuit each appliance has its own path to the power supply and receives full voltage. If one appliance fails, others are unaffected. In a series circuit a single failure breaks the whole circuit, making it impractical for a home with many independent devices.", tip:"State the advantage → explain the mechanism → contrast with series. Three distinct ideas." },
  ]},
  { id:"metals", name:"Metals & Acids", learn:[
    { type:"read", title:"Acids + metals — the rules", xp:15, content:`**Golden rule:** Acid + Metal → Salt + Hydrogen gas

**Salt names:**
- Hydrochloric acid → chloride salt
- Sulfuric acid → sulfate salt
- Nitric acid → nitrate salt

**Test for hydrogen:** lit splint → squeaky pop.
**Test for CO₂:** bubble through limewater → turns cloudy.

**Reactivity series (most → least):** K, Na, Ca, Mg, Al, Zn, Fe, Cu
More reactive = faster, more vigorous reaction. Copper barely reacts with acids.

**Acid + Metal oxide → Salt + Water**
**Acid + Carbonate → Salt + Water + CO₂**` },
  ], flashcards:[
    { q:"What is produced when acid reacts with a metal?", a:"Salt + hydrogen gas. E.g. Zn + HCl → zinc chloride + hydrogen." },
    { q:"How do you test for hydrogen gas?", a:"Hold a lit splint near the gas — it makes a squeaky pop." },
    { q:"Which is more reactive: magnesium or copper?", a:"Magnesium — much higher in the reactivity series, reacts vigorously with acids. Copper barely reacts." },
  ], practiceQs:[
    { q:"A student adds magnesium to hydrochloric acid. Describe observations and write a word equation. (4 marks)", weak:"Bubbles form and the magnesium disappears.", strong:"The magnesium ribbon dissolves rapidly, producing vigorous fizzing as hydrogen gas is released. The solution may warm slightly. Word equation: magnesium + hydrochloric acid → magnesium chloride + hydrogen.", tip:"Observe = what you SEE/HEAR/FEEL. Then the equation is a separate mark. Don't merge them." },
  ]},
  { id:"earth", name:"The Earth", learn:[
    { type:"read", title:"Inside the Earth & the rock cycle", xp:15, content:`**Structure of the Earth (outside → in):**
Crust → Mantle (semi-molten rock) → Outer core (liquid iron/nickel) → Inner core (solid iron/nickel)

**The rock cycle — three types:**
🔴 **Igneous:** magma cools and solidifies (e.g. granite, basalt). Intrusive (underground, slow cooling, large crystals) vs extrusive (surface, fast cooling, small crystals).
🟤 **Sedimentary:** sediments compacted over millions of years (e.g. sandstone, limestone). Often contain fossils.
🟣 **Metamorphic:** existing rock changed by heat and pressure (e.g. marble from limestone, slate from mudstone).

**How to remember:** I SedIMentary Metamorphic — each can turn into the others through weathering, melting, heat & pressure.` },
    { type:"watch", title:"The rock cycle (BBC Bitesize)", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/z9bbkqt/articles/zjhrxyc", linkText:"BBC Bitesize: The rock cycle" },
  ], flashcards:[
    { q:"Name the four layers of the Earth in order from outside to inside.", a:"Crust → Mantle → Outer core → Inner core." },
    { q:"What is the difference between igneous and sedimentary rock?", a:"Igneous forms from cooled magma/lava. Sedimentary forms from compacted sediments over millions of years." },
    { q:"How does metamorphic rock form?", a:"Existing rock is changed by intense heat and pressure — e.g. limestone becomes marble, mudstone becomes slate." },
  ], practiceQs:[
    { q:"Describe how sedimentary rock forms. (3 marks)", weak:"Rocks get compacted together.", strong:"Weathering and erosion break existing rocks into small fragments called sediments. These are transported by wind or water and deposited in layers. Over millions of years the layers are compacted and cemented together by minerals to form sedimentary rock.", tip:"Process questions: name the start → describe each stage → describe the end product." },
  ]},
  { id:"energy", name:"Energy", learn:[
    { type:"read", title:"Energy stores and transfers", xp:15, content:`**The law of conservation of energy:** Energy cannot be created or destroyed — only transferred from one form to another.

**Energy stores:**
⚡ Chemical (food, fuel, batteries)
🌡️ Thermal (hot objects)
🔄 Kinetic (moving objects)
🌊 Gravitational potential (objects at height)
🔌 Elastic potential (stretched/compressed springs)
☢️ Nuclear (atomic nuclei)

**Energy transfers happen by:**
- Heating (conduction, convection, radiation)
- Work done (mechanical, electrical)
- Waves (light, sound)

**Useful vs wasted energy:** A light bulb transfers electrical energy → light energy (useful) + thermal energy (wasted).
**Efficiency = (useful output ÷ total input) × 100%**

**Renewable:** solar, wind, hydro, geothermal, tidal, biomass — won't run out.
**Non-renewable:** coal, oil, gas (fossil fuels), nuclear — finite supply.` },
  ], flashcards:[
    { q:"State the law of conservation of energy.", a:"Energy cannot be created or destroyed — only transferred from one store to another." },
    { q:"What is the equation for efficiency?", a:"Efficiency (%) = (useful energy output ÷ total energy input) × 100." },
    { q:"Name three renewable energy sources.", a:"Any three of: solar, wind, hydroelectric, tidal, geothermal, biomass." },
    { q:"What is the difference between conduction and convection?", a:"Conduction: heat transfer through direct contact in solids. Convection: heat transfer through fluid movement (liquids/gases)." },
  ], practiceQs:[
    { q:"A lamp uses 200J of electrical energy and produces 50J of light. Calculate efficiency and suggest how wasted energy is transferred. (3 marks)", weak:"Efficiency = 50/200 = 25%.", strong:"Efficiency = (50 ÷ 200) × 100 = 25%. The remaining 150J is wasted energy, transferred to the surroundings as thermal energy (heat) through the lamp's surface.", tip:"Show the formula, substitute numbers, state the answer with units, then describe the wasted energy transfer — that's where the third mark lives." },
  ]},
 ]},

 { id:"maths", name:"Maths", emoji:"📐", examTip:"Show ALL working — method marks exist even if the answer is wrong. Write steps as if explaining to someone without a calculator.", units:[
  { id:"angles", name:"1 — Angles", learn:[
    { type:"read", title:"Angle rules you must know", xp:15, content:`**Basic rules:**
- Angles on a straight line = 180°
- Angles around a point = 360°
- Vertically opposite angles are equal
- Angles in a triangle = 180°
- Angles in a quadrilateral = 360°

**Parallel line rules:**
- Alternate angles = equal (Z-shape) ✓
- Corresponding angles = equal (F-shape) ✓
- Co-interior angles = add to 180° (C-shape) ✓

**Polygons:** Sum of interior angles = (n − 2) × 180°

⚠️ **Exam trap:** Always give a reason. "x = 65° (alternate angles are equal)" — that reason is often its own mark.` },
  ], flashcards:[
    { q:"What do co-interior angles add up to?", a:"180°. They form a C-shape between two parallel lines." },
    { q:"Formula for sum of interior angles of a polygon?", a:"(n − 2) × 180°, where n = number of sides." },
    { q:"Alternate angles — equal or supplementary?", a:"Equal. They form a Z-shape." },
  ], practiceQs:[
    { q:"A triangle has angles 2x, 3x and 40°. Find x. (3 marks)", weak:"x = 28", strong:"Angles in a triangle sum to 180°. So: 2x + 3x + 40 = 180 → 5x = 140 → x = 28. Check: 56 + 84 + 40 = 180° ✓", tip:"Write the angle rule as your first line. Then equation. Then check. Three visible steps." },
  ]},
  { id:"fractions", name:"2 — Fractions", learn:[
    { type:"read", title:"Fractions: adding, multiplying, dividing", xp:15, content:`**Adding/subtracting:** Find a common denominator first.
½ + ⅓ = 3/6 + 2/6 = 5/6

**Multiplying:** Multiply numerators together, denominators together. Simplify.
⅔ × ¾ = 6/12 = ½

**Dividing:** Keep the first fraction, Change ÷ to ×, Flip the second (KCF).
⅔ ÷ ¼ = ⅔ × 4/1 = 8/3 = 2⅔

**Mixed numbers → improper fractions:**
2¾ = (2×4 + 3)/4 = 11/4

**Always simplify your final answer.** Find the HCF of numerator and denominator.` },
  ], flashcards:[
    { q:"How do you divide two fractions?", a:"Keep the first, Change ÷ to ×, Flip the second (KCF). E.g. ⅔ ÷ ¼ = ⅔ × 4 = 8/3." },
    { q:"How do you add fractions with different denominators?", a:"Find a common denominator, convert both fractions, then add numerators. E.g. ½ + ⅓ = 3/6 + 2/6 = 5/6." },
    { q:"Convert 3¼ to an improper fraction.", a:"(3×4 + 1)/4 = 13/4." },
  ], practiceQs:[
    { q:"Calculate 2⅓ + 1¾. Give your answer as a mixed number. (3 marks)", weak:"4 1/12", strong:"Convert: 2⅓ = 7/3 = 28/12 and 1¾ = 7/4 = 21/12. Add: 49/12 = 4 1/12.", tip:"Convert to improper fractions first, find common denominator, add, convert back. Show each step." },
  ]},
  { id:"substitution", name:"3 — Substitution", learn:[
    { type:"read", title:"Substitution — replacing letters with numbers", xp:15, content:`**Substitution** means replacing letters with given values.

If a = 3, b = 2, c = −1:

- 4a = 4 × 3 = **12**
- a² + b = 9 + 2 = **11**
- 2a − 3b = 6 − 6 = **0**
- ab + c = 6 + (−1) = **5**

⚠️ **Watch out for:**
- Negative values: substituting c = −1 means 3c = 3 × (−1) = −3, not 3 − 1
- Squared negatives: if x = −3, then x² = (−3)² = 9 (positive!)
- BIDMAS order: always handle brackets and powers before × and ÷` },
  ], flashcards:[
    { q:"If x = −2, what is x²?", a:"(−2)² = 4. Squaring a negative always gives a positive." },
    { q:"If a = 4 and b = 3, find 2a − b².", a:"2(4) − (3)² = 8 − 9 = −1." },
    { q:"What does substitution mean in algebra?", a:"Replacing a letter with its given numerical value and evaluating the expression." },
  ], practiceQs:[
    { q:"Given p = 5 and q = −2, find 3p² − 2q. (3 marks)", weak:"75 + 4 = 79", strong:"3p² = 3 × (5)² = 3 × 25 = 75. −2q = −2 × (−2) = +4. Total = 75 + 4 = 79.", tip:"Show each term separately before combining. Bracket negative substitutions to avoid sign errors." },
  ]},
  { id:"sequences", name:"4 — Sequences", learn:[
    { type:"read", title:"nth term — how it actually works", xp:15, content:`**Arithmetic sequence:** constant difference between terms.

**Finding the nth term of 3, 7, 11, 15:**
1. Difference = 4 → nth term = 4n + ?
2. When n=1: 4(1)=4, but first term is 3 → subtract 1
3. nth term = **4n − 1**
4. Check: 4(2)−1=7 ✓

**Is 100 in this sequence?**
4n − 1 = 100 → 4n = 101 → n = 25.25 → NOT a whole number → NOT in the sequence.

That full method is worth full marks in the exam.` },
  ], flashcards:[
    { q:"What is an arithmetic sequence?", a:"A sequence with a constant difference between consecutive terms." },
    { q:"The nth term is 5n − 2. What is the 10th term?", a:"5(10) − 2 = 48." },
    { q:"How do you check your nth term formula?", a:"Substitute n=1 and n=2 and check they match the first two terms." },
  ], practiceQs:[
    { q:"Find the nth term of 2, 9, 16, 23, 30. (2 marks)", weak:"7n − 5", strong:"Difference = 7 → 7n. When n=1: 7−5=2 ✓. nth term = 7n − 5. Check n=2: 14−5=9 ✓.", tip:"Always write the check. It proves the formula and can rescue a mark if the formula is slightly wrong." },
  ]},
  { id:"indexlaws", name:"5 — Index Laws", learn:[
    { type:"read", title:"Index laws — the full set", xp:15, content:`**When the BASE is the same:**

Multiply → ADD powers: a³ × a⁴ = a⁷
Divide → SUBTRACT powers: a⁶ ÷ a² = a⁴
Power of a power → MULTIPLY: (a³)² = a⁶

**Special cases:**
- Any number to the power 0 = 1 (e.g. 5⁰ = 1)
- Negative power = reciprocal: a⁻² = 1/a²
- Fractional power = root: a^(1/2) = √a, a^(1/3) = ∛a

⚠️ **Common mistake:** 2³ × 3³ ≠ 6⁹. Index laws only work when the BASE is the same.` },
  ], flashcards:[
    { q:"Simplify a⁵ × a³.", a:"a⁸ — add the powers when multiplying with the same base." },
    { q:"What does a⁰ equal?", a:"1. Any non-zero number raised to the power 0 equals 1." },
    { q:"What does a negative power mean?", a:"Reciprocal: a⁻² = 1/a². E.g. 2⁻³ = 1/8." },
  ], practiceQs:[
    { q:"Simplify (3a²b)³. (2 marks)", weak:"3a⁶b³", strong:"3³ × a^(2×3) × b^(1×3) = 27a⁶b³.", tip:"Raise EVERY factor inside the bracket to the power — including the number. 3³ = 27, not 3." },
  ]},
  { id:"data", name:"6 — Representing Data", learn:[
    { type:"read", title:"Charts, averages and spread", xp:15, content:`**Mean:** add all values ÷ number of values
**Median:** middle value when ordered. If even count, average the two middle values.
**Mode:** most frequent value
**Range:** largest − smallest (measures spread, not average)

**Charts:**
📊 Bar chart — for discrete/categorical data
📈 Line graph — for continuous data over time
🥧 Pie chart — shows proportions (angles must sum to 360°)
🔲 Frequency diagram — for grouped continuous data (no gaps between bars)
📦 Stem & leaf — shows raw data in order. Back-to-back compares two sets.

**Scatter graphs:** show correlation between two variables.
- Positive correlation: both increase together
- Negative correlation: one increases as other decreases
- Line of best fit: drawn through the middle of the points` },
  ], flashcards:[
    { q:"What is the difference between mean, median and mode?", a:"Mean: sum ÷ count. Median: middle value when ordered. Mode: most frequent value." },
    { q:"What does range measure?", a:"Spread of data. Range = largest − smallest. Not an average." },
    { q:"What does positive correlation on a scatter graph mean?", a:"As one variable increases, the other also increases." },
  ], practiceQs:[
    { q:"Five students scored: 7, 3, 9, 7, 4. Find the mean, median and range. (3 marks)", weak:"Mean=6, median=7, range=6", strong:"Ordered: 3,4,7,7,9. Mean=(3+4+7+7+9)÷5=30÷5=6. Median=7 (middle value). Range=9−3=6.", tip:"Always ORDER values before finding median. Show each calculation on a separate line." },
  ]},
  { id:"percentages", name:"7 — Percentages", learn:[
    { type:"read", title:"Percentages — every type", xp:15, content:`**Find X% of a number:** multiply by X/100
  15% of 240 = 0.15 × 240 = 36

**Percentage increase/decrease:**
  Multiply by (100 + %) ÷ 100 (increase) or (100 − %) ÷ 100 (decrease)
  E.g. increase £80 by 20%: 80 × 1.2 = £96

**Find original after % change (reverse %):**
  After 20% increase a price is £96. Original = 96 ÷ 1.2 = £80

**Percentage change:**
  % change = (change ÷ original) × 100

**Simple vs compound interest:**
  Simple: same amount each year (principal × rate × time)
  Compound: interest added to total each year (principal × (1 + r)^n)` },
  ], flashcards:[
    { q:"How do you increase a value by 35% using a multiplier?", a:"Multiply by 1.35. E.g. £200 × 1.35 = £270." },
    { q:"After a 20% decrease a price is £64. What was the original?", a:"64 ÷ 0.8 = £80." },
    { q:"Formula for percentage change?", a:"(change ÷ original) × 100." },
  ], practiceQs:[
    { q:"A jacket costs £85. It is reduced by 30% in a sale. Find the sale price. (2 marks)", weak:"£55", strong:"Sale price = 85 × 0.70 = £59.50.", tip:"Decrease = multiply by (1 − 0.30). Don't subtract 30 from 85 — that only works if the original is 100." },
  ]},
  { id:"brackets", name:"8 — Brackets", learn:[
    { type:"read", title:"Expanding single and double brackets", xp:15, content:`**Single bracket:** multiply the term outside by EVERY term inside.
3(2x + 5) = 6x + 15

**Negative outside:**
−2(3x − 4) = −6x + 8 (both signs flip)

**Double brackets (FOIL):**
(x + 3)(x + 5) = x² + 5x + 3x + 15 = x² + 8x + 15
F = First, O = Outer, I = Inner, L = Last

**Difference of two squares:**
(x + 4)(x − 4) = x² − 16 (middle terms cancel)

**Factorising:** reverse of expanding. Find the HCF and put it outside.
6x² + 9x = 3x(2x + 3)` },
  ], flashcards:[
    { q:"Expand 4(3x − 2).", a:"12x − 8." },
    { q:"Expand (x + 5)(x − 3).", a:"x² − 3x + 5x − 15 = x² + 2x − 15." },
    { q:"Factorise 8x² − 12x.", a:"4x(2x − 3)." },
  ], practiceQs:[
    { q:"Expand and simplify (2x + 3)(x − 4). (3 marks)", weak:"2x² − 5x − 12", strong:"First: 2x×x = 2x². Outer: 2x×(−4) = −8x. Inner: 3×x = 3x. Last: 3×(−4) = −12. Combine: 2x² − 8x + 3x − 12 = 2x² − 5x − 12.", tip:"Write all 4 FOIL terms before collecting. This shows method even if you make a sign error." },
  ]},
  { id:"area", name:"9 — Area", learn:[
    { type:"read", title:"Area formulae — all the shapes", xp:15, content:`**Rectangle:** A = length × width
**Triangle:** A = ½ × base × height (height must be perpendicular)
**Parallelogram:** A = base × height
**Trapezium:** A = ½(a + b) × h  (a and b = parallel sides)
**Circle:** A = πr²  (r = radius, not diameter)

**Compound shapes:** Split into simpler shapes, find each area, then add (or subtract).

**Units:** Always give area in square units — cm², m², mm².

⚠️ **Common mistakes:**
- Using diameter instead of radius in circle formula
- Forgetting to use perpendicular height in triangles
- Adding areas when you should subtract (e.g. shape with a hole)` },
  ], flashcards:[
    { q:"Area of a trapezium formula.", a:"A = ½(a + b) × h, where a and b are the parallel sides and h is the perpendicular height." },
    { q:"Area of a circle with radius 5cm.", a:"A = π × 5² = 25π ≈ 78.5 cm²." },
    { q:"A triangle has base 8cm and perpendicular height 6cm. Find its area.", a:"A = ½ × 8 × 6 = 24 cm²." },
  ], practiceQs:[
    { q:"A trapezium has parallel sides 7cm and 11cm and height 4cm. Find its area. (2 marks)", weak:"A = (7+11) × 4 = 72 cm²", strong:"A = ½ × (7 + 11) × 4 = ½ × 18 × 4 = 36 cm².", tip:"The ½ is part of the formula — forgetting it doubles your answer. Write the formula first, then substitute." },
  ]},
  { id:"equations", name:"10 — Solving Equations", learn:[
    { type:"read", title:"The golden rule of equations", xp:15, content:`**Whatever you do to one side, you MUST do to the other.**

Two-step: 3x + 5 = 20
→ −5 both sides: 3x = 15
→ ÷3 both sides: x = 5

With brackets: 2(x + 3) = 14
→ Expand: 2x + 6 = 14
→ −6: 2x = 8 → x = 4

Unknown on both sides: 5x − 2 = 3x + 10
→ −3x: 2x − 2 = 10
→ +2: 2x = 12 → x = 6

**Always substitute back to check.**` },
  ], flashcards:[
    { q:"Solve 4x − 3 = 13.", a:"4x = 16, x = 4." },
    { q:"Solve 3(x + 2) = 21.", a:"3x + 6 = 21 → 3x = 15 → x = 5." },
    { q:"Solve 5x − 1 = 2x + 8.", a:"3x = 9 → x = 3." },
  ], practiceQs:[
    { q:"Solve 4(2x − 1) = 3x + 11. Show all working. (3 marks)", weak:"x = 3", strong:"Expand: 8x − 4 = 3x + 11. Subtract 3x: 5x − 4 = 11. Add 4: 5x = 15. x = 3. Check: 4(5)=20, 9+11=20 ✓.", tip:"3 marks = expand, rearrange, solve. Show each step on its own line." },
  ]},
  { id:"perimeter", name:"11 — Perimeter", learn:[
    { type:"read", title:"Perimeter — add ALL the sides", xp:15, content:`**Perimeter** = total distance around the outside of a shape.

**Rectangle:** P = 2(l + w)
**Circle (circumference):** C = πd = 2πr
**Arc length** (part of circle circumference): arc = (θ/360) × πd

**Compound shapes:** Add all outer edges. Watch for missing sides you have to calculate from given information.

**Key difference from area:**
- Area = inside space (square units: cm²)
- Perimeter = outside edge (linear units: cm)

⚠️ **Common mistake:** Calculating area and giving it as the perimeter (or vice versa). Check your units — if the question asks for perimeter, your answer must be in cm, not cm².` },
  ], flashcards:[
    { q:"Circumference formula using radius.", a:"C = 2πr." },
    { q:"A rectangle is 9cm × 5cm. Find the perimeter.", a:"P = 2(9 + 5) = 28cm." },
    { q:"What is the difference between perimeter and area?", a:"Perimeter: total length around the outside (cm). Area: space inside (cm²)." },
  ], practiceQs:[
    { q:"A semicircle has diameter 12cm. Find the exact perimeter. (3 marks)", weak:"Half of circumference = 6π", strong:"Curved part = ½ × π × 12 = 6π. Plus the diameter = 12. Total perimeter = 6π + 12 cm.", tip:"Perimeter of a semicircle = curved arc + straight diameter. Students forget the straight edge." },
  ]},
  { id:"graphs", name:"12 — Graphs", learn:[
    { type:"read", title:"Straight line graphs: y = mx + c", xp:15, content:`**y = mx + c**
- m = gradient (steepness)
- c = y-intercept (where it crosses the y-axis)

**Gradient** = rise ÷ run = change in y ÷ change in x
(pick two clear points on the line)

**Parallel lines** have the same gradient.
**Perpendicular lines:** gradients multiply to −1. If one gradient is m, the other is −1/m.

**Plotting:** Make a table of x values, calculate y for each, plot points, draw a straight line through them.

**Distance-time graphs:**
- Gradient = speed
- Horizontal line = stationary
- Steeper = faster

**Real-life graphs:** Always read axis labels carefully. What does one square represent?` },
  ], flashcards:[
    { q:"In y = mx + c, what does m represent?", a:"The gradient — the steepness of the line (rise ÷ run)." },
    { q:"What is the gradient of a line through (0,2) and (4,10)?", a:"(10−2) ÷ (4−0) = 8/4 = 2." },
    { q:"Two lines are parallel. One has gradient 3. What is the other's gradient?", a:"Also 3 — parallel lines have identical gradients." },
  ], practiceQs:[
    { q:"A line has equation y = 3x − 2. Write down the gradient and y-intercept. Then find the equation of a parallel line passing through (0, 5). (3 marks)", weak:"Gradient 3, intercept −2, parallel line is y = 3x + 5", strong:"Gradient = 3, y-intercept = −2. A parallel line has the same gradient (3) and passes through (0,5), so c = 5. Equation: y = 3x + 5.", tip:"Parallel = same gradient, different c. Write the reasoning, not just the answer." },
  ]},
  { id:"3dshapes", name:"13 — 3D Shapes", learn:[
    { type:"read", title:"Volume and surface area of 3D shapes", xp:15, content:`**Volume:**
🔷 Cuboid: V = l × w × h
🔶 Prism: V = cross-sectional area × length
🔴 Cylinder: V = πr²h
🔺 Pyramid: V = ⅓ × base area × height
🔺 Cone: V = ⅓πr²h
🔵 Sphere: V = 4/3 πr³

**Surface area:**
Cuboid: 2(lw + lh + wh)
Cylinder: 2πr² + 2πrh (two circles + curved surface)

**Nets:** a 3D shape unfolded flat. The surface area = total area of the net.

**Key 3D properties:**
- Face: a flat surface
- Edge: where two faces meet
- Vertex: a corner point
- Euler's formula: Faces + Vertices − Edges = 2` },
  ], flashcards:[
    { q:"Volume of a cylinder with radius 4cm and height 10cm.", a:"V = π × 4² × 10 = 160π ≈ 502.7 cm³." },
    { q:"What is Euler's formula for 3D shapes?", a:"Faces + Vertices − Edges = 2. E.g. cube: 6 + 8 − 12 = 2 ✓." },
    { q:"How do you find the volume of any prism?", a:"Volume = cross-sectional area × length." },
  ], practiceQs:[
    { q:"A cylinder has radius 3cm and height 8cm. Find the total surface area. Give your answer to 1dp. (3 marks)", weak:"75.4 + 150.8 = 226.2 cm²", strong:"Two circular ends: 2 × π × 3² = 18π. Curved surface: 2 × π × 3 × 8 = 48π. Total = 66π = 207.3 cm².", tip:"Surface area of a cylinder has THREE parts: two circles + one rectangle (the curved surface). Show each separately." },
  ]},
 ]},

 { id:"history", name:"History", emoji:"📜", examTip:"'How far do you agree?' needs BOTH sides + a clear conclusion. One-sided answers are capped. Facts are your evidence — use them to prove a point, don't just list them.", units:[
  { id:"tudors", name:"The Tudors", learn:[
    { type:"read", title:"The Tudor religious rollercoaster", xp:15, content:`**The Tudors ruled 1485–1603. The story: religion swung wildly between Catholic and Protestant.**

👑 **Henry VII (1485–1509) — Catholic.** Won Wars of the Roses at Bosworth Field. United Lancaster and York. Rebuilt royal finances. Stable start.

👑 **Henry VIII (1509–1547) — Catholic → Church of England.** Broke from Rome to divorce Catherine of Aragon — created the Church of England (**the Reformation**). Dissolved the monasteries (took their land and wealth). Huge political AND religious revolution.

👑 **Edward VI (1547–1553) — Protestant.** Only 9 at coronation; uncle the Duke of Somerset ruled. Stripped churches of decoration — focus on God's word, not images.

👑 **Mary I (1553–1558) — Catholic.** Returned England to Rome. Burned 284 Protestants — nickname: **Bloody Mary**. Married Philip II of Spain.

👑 **Elizabeth I (1558–1603) — Protestant.** Religious Settlement sought middle way. Survived Catholic plots (Babington Plot, 1586). Defeated the Spanish Armada (1588). Long, stable reign.` },
    { type:"watch", title:"Henry VIII and the Reformation", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/zkw2d6f/articles/zbnwjhv", linkText:"BBC Bitesize: Henry VIII" },
    { type:"activity", title:"The significance argument", xp:25, content:`**This directly prepares you for your exam essay.**

For THREE Tudors, complete this sentence:
*"[Monarch] was significant because [what they did] which mattered because [long-term impact]."*

Then: who do you think was MOST significant? Write 2 sentences defending your choice.

Then: write ONE counter-argument sentence — who could you argue against, and why?

This is the exact structure of the exam essay, miniaturised. The habit of counter-arguing is what moves an answer from Secure to Deepening.` },
  ], flashcards:[
    { q:"What was the Break with Rome?", a:"Henry VIII rejecting papal authority and declaring himself head of the Church of England so he could divorce Catherine of Aragon." },
    { q:"What was the Dissolution of the Monasteries?", a:"Henry VIII closing Catholic monasteries (1536–1541) and seizing their land and wealth." },
    { q:"Why is Mary I called 'Bloody Mary'?", a:"She burned 284 Protestants at the stake for refusing to convert back to Catholicism." },
    { q:"What was the Spanish Armada?", a:"A Spanish fleet of 130 ships sent by Philip II to invade England in 1588. Defeated by English navy and storms." },
  ], practiceQs:[
    { q:"'Henry VIII was the most important Tudor monarch.' How far do you agree? (8 marks)", weak:"I agree because Henry VIII started the Church of England which was very important.", strong:"Henry VIII transformed England permanently: the Break with Rome ended papal authority and his Church of England fundamentally changed both religion and royal power. The Dissolution of the Monasteries redistributed vast wealth across the nobility. However, Elizabeth I was arguably equally significant — her Religious Settlement stabilised England after decades of upheaval, and defeating the Spanish Armada in 1588 secured England's independence and Protestant future. I partially agree: Henry VIII caused more radical change, but Elizabeth's reign had longer-lasting stability for ordinary people.", tip:"Agree with evidence → counter-argue with evidence → nuanced conclusion that TAKES A POSITION. Sitting on the fence loses marks." },
  ]},
  { id:"civilwar", name:"English Civil War", learn:[
    { type:"read", title:"Why did England fight itself?", xp:15, content:`**Civil War 1642–1651: King Charles I vs Parliament**

**Three causes — RPM:**
💰 **Money:** Charles raised taxes (ship money) without Parliament's consent. Parliament controlled finances and he kept bypassing them.
✝️ **Religion:** Parliament feared Charles was secretly Catholic — he married French Catholic Henrietta Maria, tried to impose a new prayer book on Scotland (1637).
👑 **Power:** Charles believed in Divine Right of Kings — God-given authority to rule alone. Parliament believed they should share power. These views were incompatible.

**Key events:**
- 1642: War starts — Charles raises his standard in Nottingham
- 1645: Parliament's **New Model Army** defeats Royalists at **Battle of Naseby**
- 1649: **Charles I executed** — revolutionary act
- Cromwell becomes Lord Protector

**Cavaliers** = Royalists. **Roundheads** = Parliamentarians.` },
  ], flashcards:[
    { q:"What was the Divine Right of Kings?", a:"The belief that the king's authority came directly from God, meaning he couldn't be questioned by Parliament." },
    { q:"What was the New Model Army?", a:"Parliament's professional, disciplined army (created 1645). Its training made it decisive in defeating the Royalists." },
    { q:"When was Charles I executed and why was it significant?", a:"30 January 1649. The first time England had put its own king on trial and executed him." },
  ], practiceQs:[
    { q:"Explain why religion was an important cause of the Civil War. (4 marks)", weak:"People were worried Charles was Catholic.", strong:"Religion was significant because many Parliamentarians were Puritan and feared Charles intended to return England to Catholicism. His marriage to French Catholic Henrietta Maria fuelled suspicion. When Charles tried to impose a new prayer book on Scotland in 1637 it triggered riots — demonstrating how religion could directly create conflict. These fears made MPs unwilling to trust or cooperate with the King, contributing to the complete breakdown of their relationship.", tip:"4 marks = explain the factor fully (not just name it) + give a specific event as evidence + explain impact." },
  ]},
  { id:"industrial", name:"Industrial Revolution", learn:[
    { type:"read", title:"Britain transformed: 1750–1900", xp:15, content:`**The Industrial Revolution** = a period of massive change in Britain driven by new technology, factories and transport.

**Four areas of change:**
🌾 **Agriculture:** New tools and fertilisers increased productivity, freeing up workers to move to cities.
🏭 **Industry:** Factories replaced cottage industries — producing wool, cotton, coal at scale. Created thousands of jobs.
🚂 **Transport:** Telford built roads and canals. Stephenson and Brunel oversaw the 'Railway Mania' of the 1800s.
🔬 **Technology:** Scientific discoveries transformed medicine and sanitation — John Snow (cholera/water), Edward Jenner (vaccination).

**Key inventions:**
- Water Frame (Arkwright, 1769) — spun cotton into yarn
- Spinning Jenny (Hargreaves, 1770) — multiple threads at once
- Steam Engine (Newcomen 1712, improved by Watt) — powered everything
- Locomotive (Trevithick, 1814) — steam-powered transport

**Factory conditions:** 12–14 hour days, low wages, dangerous machinery, child labour, physical punishment.
**Living conditions:** Overcrowding, disease (cholera, typhus), poor sanitation — waste into rivers.` },
    { type:"watch", title:"The Industrial Revolution (BBC)", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/z8msjhv/articles/znkrwxs", linkText:"BBC Bitesize: Industrial Revolution" },
  ], flashcards:[
    { q:"Name two key inventions of the Industrial Revolution and their inventors.", a:"Water Frame (Arkwright, 1769) — spun cotton. Steam Engine (Newcomen/Watt) — powered factories and transport." },
    { q:"What were working conditions like in Industrial Revolution factories?", a:"12–14 hour days, very low wages, dangerous machinery, child labour, frequent physical punishment." },
    { q:"Who was Robert Peel and what did he do?", a:"Created and supported the Factories Act of 1844, which restricted child working hours and set safety standards." },
  ], practiceQs:[
    { q:"Explain why transport was important to the Industrial Revolution. (4 marks)", weak:"Transport was important because it helped move goods around.", strong:"Improved transport was essential to the Industrial Revolution because factories needed to move raw materials in and finished goods out quickly and cheaply. Telford built roads and canals in the early 1800s, while Stephenson and Brunel developed the railways during 'Railway Mania'. Railways dramatically reduced journey times and costs, allowing goods to reach national markets, driving further growth in industry and factory production.", tip:"Explain the need first, then describe the development, then explain the impact. Specific names = evidence." },
  ]},
  { id:"slavery", name:"Transatlantic Slave Trade", learn:[
    { type:"read", title:"The Trade Triangle and its abolition", xp:15, content:`**The Transatlantic Slave Trade** transported 10–12 million Africans across the Atlantic to be sold into slavery on plantations in the Americas and West Indies.

**The Trade Triangle:**
1️⃣ British ships left ports (e.g. Bristol, Liverpool) with manufactured goods (iron, guns, cloth)
2️⃣ These were traded on the West African coast for enslaved people
3️⃣ The **Middle Passage**: enslaved people chained below deck for 6–8 weeks — brutal conditions, high death rates
4️⃣ In the Americas, enslaved people were sold at auction to work on plantations (sugar, tobacco, cotton, coffee)
5️⃣ Ships returned to Britain with plantation goods

**Why did it exist?** Made some individuals enormously wealthy. Western racism — belief in white superiority.

**Why was it abolished?**
- 1807: Britain abolishes the slave TRADE (Wilberforce's campaign)
- 1833: Slavery abolished throughout the British Empire
- 1865: 13th Amendment abolishes slavery in the USA

Key figures: William Wilberforce, Olaudah Equiano.` },
  ], flashcards:[
    { q:"What was the Middle Passage?", a:"The sea journey from West Africa to the Americas. Enslaved people were chained below deck for 6–8 weeks in horrific conditions." },
    { q:"When did Britain abolish the slave trade, and when was slavery abolished in the Empire?", a:"Slave trade abolished 1807. Slavery abolished throughout the British Empire 1833." },
    { q:"Why did the transatlantic slave trade exist?", a:"It generated enormous wealth for traders and plantation owners, and was justified by racist beliefs in white superiority." },
  ], practiceQs:[
    { q:"'Economic reasons were the main cause of the slave trade.' How far do you agree? (6 marks)", weak:"I agree because it made people rich.", strong:"Economic reasons were central — the trade generated enormous profits for British merchants, port cities like Bristol and Liverpool grew wealthy from it, and plantation goods (sugar, tobacco) drove major industries. However, it was also sustained by racist ideology — the dehumanisation of African people made the cruelty seem acceptable to those who profited. Without both factors working together — profit motive AND racist justification — the scale of the trade could not have been maintained. I therefore partially agree: economics was the engine, but racism was the fuel.", tip:"The strongest answers treat the two factors as interacting, not competing. Show how they work together." },
  ]},
 ]},

 { id:"geography", name:"Geography", emoji:"🌍", examTip:"Use specific examples and geographical terminology (push/pull, subduction, tectonic plates). Extended writing on migration needs both perspectives + a conclusion.", units:[
  { id:"migration", name:"Population & Migration", learn:[
    { type:"read", title:"Why do people move?", xp:15, content:`**Migration** = moving from one place to live in another.

**Push factors** (drive people OUT): war, poverty, unemployment, natural disasters, persecution, famine.
**Pull factors** (attract people IN): better jobs, higher wages, safety, healthcare, education, family.

**Types:**
- International (between countries) vs Internal (within a country)
- Voluntary (by choice) vs Forced (refugees, asylum seekers)
- Rural → Urban migration = **urbanisation**

**Effects on receiving country:**
✅ Fills skills shortages, contributes taxes, enriches culture
❌ Pressure on housing/schools/hospitals, social tensions

**Effects on sending country:**
✅ Reduces unemployment pressure, migrants send money home (remittances)
❌ Brain drain — skilled workers leave, ageing population

**Your exam has an extended writing task on migration** — you need BOTH sides and a conclusion.

**Example to use:** Syrian refugee crisis from 2011 — conflict (push) drove millions towards Europe where safety (pull) attracted them.` },
    { type:"watch", title:"Migration (BBC Bitesize)", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/zf642hv/articles/zqhkw6f", linkText:"BBC Bitesize: Migration" },
    { type:"activity", title:"Build the migration argument", xp:25, content:`**Prepare your extended writing task now — it's in your exam.**

Choose a country that receives many migrants (UK, Germany, USA).

Write TWO bullet points for each side:
✅ Benefits for the receiving country
❌ Challenges for the receiving country

Then write ONE conclusion sentence with a clear position: is migration overall more beneficial or more challenging?

Sentence structure for evidence: "[Benefit/Challenge] because [specific reason]. For example, [real example]."

This structure = the difference between Secure and Deepening marks.` },
  ], flashcards:[
    { q:"What is the difference between a push and pull factor?", a:"Push: drives people away (e.g. war, poverty). Pull: attracts people to a place (e.g. jobs, safety)." },
    { q:"What is the difference between a refugee and an economic migrant?", a:"Refugee: forced to flee due to persecution or conflict. Economic migrant: moves by choice for better economic opportunities." },
    { q:"What is urbanisation?", a:"Movement of people from rural (countryside) to urban (city) areas, often driven by search for employment." },
  ], practiceQs:[
    { q:"'Migration has more benefits than challenges for receiving countries.' How far do you agree? (8 marks)", weak:"Migration is good because migrants work and pay taxes.", strong:"Migration brings significant economic benefits — migrants fill skills shortages in healthcare and construction, and contribute taxes that fund public services. Culturally, migration enriches societies through food, arts and diverse perspectives. However, rapid migration can strain housing, schools and hospitals, particularly where numbers arrive quickly in a short period. Social tensions can also arise when communities feel overwhelmed. Overall I partially agree: when migration is managed well benefits outweigh challenges, but rapid unplanned migration creates genuine pressures requiring active government response.", tip:"Agree with evidence → disagree with evidence → nuanced conclusion. Same structure as History. Use specific examples not vague claims." },
  ]},
  { id:"brazil", name:"Brazil", learn:[
    { type:"read", title:"Brazil — the key facts and issues", xp:15, content:`**Brazil** is the largest country in South America and the fifth largest in the world. It is an **emerging economy** (BRIC nation).

**Physical geography:**
🌿 **Amazon rainforest:** covers ~60% of Brazil. Massive biodiversity, carbon store, indigenous peoples. Under threat from deforestation.
🏙️ **Cities:** São Paulo (20m+ people), Rio de Janeiro. Rapid urbanisation → growth of **favelas** (informal settlements).
🌾 **Cerrado:** Brazil's savanna — major agricultural region (soya, beef).

**Key issues:**

**Deforestation:** cleared for cattle ranching, soya farming, logging, roads. Causes: biodiversity loss, climate change, displacement of indigenous peoples.

**Favelas:** informal settlements lacking clean water, sanitation, security. E.g. Rocinha in Rio. Government programmes (e.g. Bolsa Família) aim to reduce poverty.

**Climate:**
- Equatorial climate in Amazonia: hot and wet year-round, very high rainfall
- Tropical climate further south: distinct wet and dry seasons

**Climate graphs:** bars = rainfall, line = temperature. Brazil's equatorial areas show high rainfall every month with little temperature variation.` },
    { type:"watch", title:"Brazil geography (BBC Bitesize)", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/zb6tyrd/articles/z3g4jxs", linkText:"BBC Bitesize: Brazil" },
  ], flashcards:[
    { q:"What is a favela?", a:"An informal settlement (slum) on the edges of Brazilian cities, often lacking clean water, sanitation and legal property ownership." },
    { q:"Why is the Amazon rainforest important globally?", a:"It is the world's largest tropical rainforest, storing vast amounts of carbon, producing oxygen, and hosting around 10% of all species on Earth." },
    { q:"What type of climate does the Amazon region have?", a:"Equatorial — hot and wet all year round with very high, consistent rainfall and little seasonal temperature variation." },
  ], practiceQs:[
    { q:"Explain the causes and effects of deforestation in the Amazon. (4 marks)", weak:"Trees are cut down for farming and this harms animals.", strong:"The Amazon is deforested primarily for cattle ranching and soya farming to supply global food markets, as well as logging and road building. Effects include: loss of biodiversity as habitats are destroyed, increased CO₂ in the atmosphere (as trees release stored carbon), disruption of the water cycle, and displacement of indigenous peoples who depend on the forest.", tip:"Causes (why it happens) and effects (what results) are different things — cover both clearly, one sentence each minimum." },
  ]},
  { id:"tectonics", name:"Tectonics", learn:[
    { type:"read", title:"Why the ground shakes", xp:15, content:`**The Earth's crust is split into tectonic plates** floating on the semi-molten mantle, moving a few cm/year.

**Three boundary types:**

🔴 **Destructive:** Plates collide. Denser oceanic plate subducts under continental plate. Causes: volcanoes, earthquakes, fold mountains (e.g. Andes, Pacific Ring of Fire).

🟢 **Constructive:** Plates move apart. Magma rises to fill the gap — creates new rock, islands. Causes: volcanoes, new land (e.g. Mid-Atlantic Ridge, Iceland).

🟡 **Conservative:** Plates slide past each other. No crust created/destroyed. Causes: earthquakes ONLY (no volcanoes). E.g. San Andreas Fault, California.

**Earthquakes:** plates lock together, pressure builds, sudden slip releases seismic waves.
- **Focus:** point underground where earthquake starts
- **Epicentre:** point on surface directly above the focus

**Volcanoes:** magma forces through weak points in the crust, erupts as lava.` },
  ], flashcards:[
    { q:"What is a destructive plate boundary?", a:"Two plates collide; the denser oceanic plate subducts. Causes volcanoes and earthquakes. E.g. Pacific Ring of Fire." },
    { q:"Why do conservative boundaries cause earthquakes but not volcanoes?", a:"Plates slide past each other — no crust created or destroyed, no magma. But friction causes earthquakes when plates suddenly slip." },
    { q:"What is the difference between a focus and epicentre?", a:"Focus: where the earthquake originates underground. Epicentre: the point on the surface directly above." },
  ], practiceQs:[
    { q:"Explain why earthquakes and volcanoes often occur in the same areas. (3 marks)", weak:"Because of tectonic plates.", strong:"Both hazards occur at plate boundaries where plates interact. At destructive boundaries, subducting plates generate seismic activity as they grind together (earthquakes) and melt at depth, forcing magma upward (volcanoes). This is why the Pacific Ring of Fire experiences both — it marks where several plates meet.", tip:"Name the boundary type → describe two processes → explain why both hazards result. One mark each." },
  ]},
  { id:"shapingland", name:"Shaping the Land", learn:[
    { type:"read", title:"Rivers and coasts — key processes", xp:15, content:`**Rivers shape the land through three processes:**

💧 **Erosion** (wearing away): hydraulic action (force of water), abrasion (rocks scraping the bed), attrition (rocks wearing each other down), solution (rock dissolved by acidic water).

🚛 **Transportation** (moving material): traction (rolling), saltation (bouncing), suspension (carried in water), solution (dissolved).

📍 **Deposition** (dropping material): occurs when river slows — e.g. inside of meanders, river mouth.

**River features:**
- **V-shaped valley** (upper course — steep, fast, narrow)
- **Meanders** (middle course — wide bends, lateral erosion)
- **Floodplain and delta** (lower course — slow, wide, deposition)
- **Waterfalls** — form where hard rock overlies soft rock

**Coasts:**
- **Erosion:** cliffs, wave-cut platforms, caves, arches, stacks (e.g. Old Harry Rocks)
- **Deposition:** beaches, spits, bars
- **Longshore drift:** moves sediment along the coast in a zig-zag pattern` },
    { type:"watch", title:"River processes (BBC Bitesize)", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/z849q6f/articles/zhdrk2p", linkText:"BBC Bitesize: Rivers" },
  ], flashcards:[
    { q:"What are the four types of river erosion?", a:"Hydraulic action, abrasion, attrition, solution." },
    { q:"What is longshore drift?", a:"The movement of sediment along a coastline in a zig-zag pattern, caused by waves approaching at an angle and backwash going straight back." },
    { q:"What features form in the lower course of a river?", a:"Floodplain, meanders, oxbow lakes, delta — all formed by deposition as the river slows." },
  ], practiceQs:[
    { q:"Explain how a waterfall forms. (4 marks)", weak:"Hard rock is above soft rock and the water wears away the soft rock.", strong:"Where a band of hard rock overlies softer rock, the river erodes the softer rock more quickly through hydraulic action and abrasion. This creates a step, and the soft rock beneath the hard rock is undercut, forming a notch. Eventually the unsupported hard rock collapses. The process repeats and the waterfall gradually retreats upstream, forming a gorge.", tip:"Process questions: starting condition → each stage in sequence → end result. Use erosion vocabulary." },
  ]},
 ]},

 { id:"english", name:"English", emoji:"✍️", examTip:"Multiple choice vocab questions + descriptive/narrative writing. Plan for 2 minutes. Vary sentence length deliberately. Use 3+ different methods in your writing.", units:[
  { id:"wordclasses", name:"Word Classes & Sentence Types", learn:[
    { type:"read", title:"The building blocks of language", xp:15, content:`**Word classes — what each word does:**

**Noun:** a person, place, thing or idea (cat, London, happiness)
**Verb:** an action or state (run, is, became)
**Adjective:** describes a noun (fierce, golden, microscopic)
**Adverb:** modifies a verb, adjective or another adverb (quickly, extremely, never)
**Pronoun:** replaces a noun (he, she, they, it, we)
**Conjunction:** joins clauses or words (and, but, because, although, however)
**Preposition:** shows relationship between words (in, on, under, through, before)

**Sentence types:**
Simple: one main clause. *"The dog barked."*
Compound: two main clauses joined by a coordinating conjunction (FANBOYS). *"The dog barked and the cat fled."*
Complex: main clause + subordinate clause. *"Although it was late, she kept writing."*

**Sentence functions:**
Declarative: states something. Interrogative: asks a question. Imperative: gives a command. Exclamative: expresses strong feeling.` },
  ], flashcards:[
    { q:"What is the difference between a simple and complex sentence?", a:"Simple: one main clause. Complex: main clause + subordinate clause joined by a subordinating conjunction (e.g. although, because, when)." },
    { q:"Give an example of a conjunction.", a:"Coordinating (FANBOYS): for, and, nor, but, or, yet, so. Subordinating: because, although, when, since, unless, while." },
    { q:"What is an adverb? Give an example.", a:"A word that modifies a verb, adjective, or adverb. E.g. 'She ran quickly' — quickly is an adverb modifying the verb ran." },
  ], practiceQs:[
    { q:"Identify the word class of each underlined word: 'She walked [slowly] through the [dark] forest, [but] she wasn't afraid.' (3 marks)", weak:"slowly = adverb, dark = adjective, but = joining word", strong:"Slowly = adverb (modifies the verb 'walked'). Dark = adjective (describes the noun 'forest'). But = coordinating conjunction (joins two main clauses, making it a compound sentence).", tip:"Name the class AND explain what it does in the sentence. The explanation is often its own mark." },
  ]},
  { id:"methods", name:"Literary Methods & Writing", learn:[
    { type:"read", title:"Methods — and how to actually use them", xp:15, content:`**The methods you need to know:**

🎭 **Simile:** comparison using 'like' or 'as'. *"The water was as cold as iron."*
🔥 **Metaphor:** says something IS something else. *"The classroom was a battlefield."*
👤 **Personification:** gives human qualities to non-human things. *"The wind screamed through the trees."*
🌩️ **Pathetic fallacy:** weather/nature reflects mood. *"Rain lashed the windows as she wept."*
↔️ **Juxtaposition:** contrasting ideas placed together for effect.
🔁 **Repetition:** repeated word/phrase for emphasis or rhythm.
🖼️ **Imagery:** language that creates a picture in the mind.
🕊️ **Symbolism:** an object representing a deeper idea.

**Structural features:**
- **Dialogue:** characters speaking
- **Monologue:** one character speaking at length
- **Aside:** character speaks to the audience, unheard by others
- **Stage directions:** instructions in a script about action/setting
- **Dramatic irony:** audience knows something a character doesn't

**For your writing exam:**
1. Plan for 2 minutes — just a few words for the shape
2. Vary sentence length — short sentences hit hard after long ones
3. Use 3+ different methods
4. Paragraph deliberately — new idea, new paragraph` },
    { type:"activity", title:"The 3-method paragraph challenge", xp:25, content:`**Write ONE paragraph describing a storm at sea.** It must include:
1. A simile or metaphor
2. Personification
3. A short sentence (5 words or fewer) for impact after a long one

Don't worry about it being perfect. The goal is to practise combining methods naturally — not doing them one at a time.

**Then check:** Read it back. Does your short sentence land harder because of what came before it? If yes — you've understood one of the most powerful tools in descriptive writing.` },
  ], flashcards:[
    { q:"What is pathetic fallacy?", a:"Using weather or nature to reflect a character's mood or the atmosphere of a scene. E.g. a storm during an argument." },
    { q:"What is the difference between a simile and a metaphor?", a:"Simile uses 'like' or 'as' (comparison). Metaphor says something IS something else (direct equation)." },
    { q:"What is dramatic irony?", a:"When the audience knows something a character doesn't — creating tension or humour." },
    { q:"What is juxtaposition?", a:"Placing two contrasting ideas side by side for deliberate effect — e.g. describing beauty next to ugliness." },
  ], practiceQs:[
    { q:"Write the opening paragraph of a description of an abandoned building. Use at least three different methods. (marks vary)", weak:"The building was old and falling apart. It was dark inside and smelled bad. Nobody had been there for years.", strong:"Silence had swallowed the building whole. Shards of glass glittered on the floor like scattered teeth, and the smell — damp, ancient, warning — pressed against the lungs. Somewhere above, a beam groaned. Then: nothing.", tip:"Three methods used: personification (silence swallowed), simile (like scattered teeth), short sentence for impact. Vary the rhythm — long, long, short." },
  ]},
 ]},

 { id:"tech", name:"Technology", emoji:"🔧", examTip:"30 multiple choice + 6 longer answers. Process questions need sequence AND precise vocabulary. Name the equipment. Use 'first, then, next, finally'.", units:[
  { id:"plastics", name:"Plastics & Vacuum Forming", learn:[
    { type:"read", title:"Thermoplastics vs thermosets", xp:15, content:`**All plastics are polymers — long chains of molecules. But they behave very differently:**

🔵 **Thermoplastics** — soften when heated, harden when cooled. Can be reheated and reshaped many times. Recyclable ♻️
Examples: acrylic (signs, bath panels), polystyrene (packaging), ABS (LEGO, phone cases), polypropylene (food containers), HDPE (buckets), LDPE (bags)

🔴 **Thermosets** — molecules form a permanent 3D network during moulding. Cannot be reheated, reshaped, or recycled.
Examples: epoxy resin (adhesives), melamine formaldehyde (plates, worktops), urea formaldehyde (electrical sockets), phenol formaldehyde (pan handles), GRP/fibreglass (kayaks)

**Memory trick:** Thermo**PLASTIC** = PLAstic enough to reshape. Thermo**SET** = permanently SET.` },
    { type:"watch", title:"Thermoplastics and thermosets", xp:20, url:"http://www.technologystudent.com/despro_flsh/plasticsrev2.html", linkText:"Technology Student: Plastics" },
    { type:"read", title:"Vacuum forming — 6 stages", xp:15, content:`**Vacuum forming** uses a thermoplastic sheet and a mould to make shaped objects (like chocolate bar trays).

1️⃣ **Mould manufactured** — wood, plaster or aluminium. Must have tapered (angled) sides so plastic can be removed.
2️⃣ **Mould placed in the vacuum former** on a platform.
3️⃣ **Thermoplastic sheet clamped securely** above the mould — must be airtight at edges.
4️⃣ **Electric heater turned on** — softens the sheet until it sags slightly.
5️⃣ **Sheet lowered over the mould** — vacuum pump removes air from below.
6️⃣ **Atmospheric pressure pushes the soft plastic onto the mould** — it cools and hardens in shape.

⚠️ Common mistake: "suction pulls the plastic" → WRONG. Atmospheric pressure PUSHES it. This distinction comes up in exams.` },
    { type:"activity", title:"Sketch the 6 stages", xp:25, content:`**Draw the 6 stages of vacuum forming as simple box diagrams.** Label: mould, heater, plastic sheet, clamp, vacuum pump.

This is one of the tasks set by your Technology teacher — use this as your chance to do it carefully and learn the stages properly.

Then cover your diagrams and describe the process out loud in order. If you can explain it clearly without notes, you can write it in the exam.` },
  ], flashcards:[
    { q:"Key difference between thermoplastics and thermosets?", a:"Thermoplastics: reheatable, reshapable, recyclable. Thermosets: permanently set, cannot be reheated or recycled." },
    { q:"Why must vacuum forming moulds have tapered sides?", a:"So the hardened plastic can be removed without tearing or getting stuck." },
    { q:"What actually pushes the plastic onto the mould in vacuum forming?", a:"Atmospheric pressure — not suction. The vacuum removes air below, so pressure from above pushes the softened plastic down." },
    { q:"Name two thermosets and their uses.", a:"Epoxy resin (adhesives/coatings). Melamine formaldehyde (plates, kitchen worktops)." },
  ], practiceQs:[
    { q:"Describe the process of vacuum forming. (5 marks)", weak:"The plastic gets heated and the vacuum sucks it over the mould.", strong:"First, a suitable mould is placed inside the vacuum former. A thermoplastic sheet is then clamped securely above it, creating an airtight seal. The electric heater softens the sheet until it begins to sag. The softened sheet is lowered over the mould and the vacuum pump removes the air below. Atmospheric pressure pushes the plastic tightly onto the mould's surface, where it cools and hardens in shape.", tip:"5 stages = 5 marks. Sequence words (first, then, next) show structure. Name the equipment." },
  ]},
  { id:"food", name:"Food Technology", learn:[
    { type:"read", title:"Eatwell Guide, 4 Cs & Mediterranean diet", xp:15, content:`**The Eatwell Guide** shows proportions of each food group for a balanced diet:
🟢 Fruit & vegetables — largest section
🟤 Starchy carbohydrates (bread, rice, pasta, potatoes)
🔵 Dairy & alternatives
🔴 Protein (meat, fish, eggs, beans)
🟡 Oils & spreads — smallest

**The 4 Cs of Food Hygiene:**
🧼 **Cleaning** — hands, surfaces, equipment before and after
🌡️ **Cooking** — food must reach correct temperature (75°C) to kill bacteria
❄️ **Chilling** — refrigerate below 5°C to slow bacterial growth
🚫 **Cross-contamination** — keep raw and cooked food separate; colour-coded boards

**Mediterranean diet:** high in olive oil, fish, fruit, vegetables, whole grains, legumes. Low in red meat and processed foods. Associated with heart health.

**Cooking terminology:** simmering (just below boiling, small bubbles), sautéing (fry quickly in a little oil), blanching (brief boiling then ice water), folding (gentle mixing to keep air in).` },
    { type:"watch", title:"The Eatwell Guide (official)", xp:20, url:"https://www.food4life.org.uk/learning-areas/key-stage-3/food-safety-and-hygiene/the-4-c-s", linkText:"Food4Life: The 4 Cs" },
  ], flashcards:[
    { q:"What are the 4 Cs of food hygiene?", a:"Cleaning, Cooking, Chilling, Cross-contamination (avoiding it)." },
    { q:"What temperature should food be cooked to?", a:"75°C — kills harmful bacteria." },
    { q:"Name three features of a Mediterranean diet.", a:"High in olive oil, fish, vegetables, whole grains. Low in red meat and processed foods." },
  ], practiceQs:[
    { q:"Explain two ways to prevent cross-contamination in a kitchen. (4 marks)", weak:"Keep raw and cooked food apart and wash hands.", strong:"First, colour-coded chopping boards should be used — red for raw meat, green for vegetables — preventing bacteria from raw food transferring to ready-to-eat items. Second, raw and cooked foods should be stored separately in the fridge, with raw meat on the bottom shelf to prevent juices dripping onto other foods.", tip:"2 methods × 2 marks each. Name the specific method + explain HOW it prevents cross-contamination." },
  ]},
  { id:"lanterns", name:"Pictogram Lanterns", learn:[
    { type:"read", title:"Pictograms, tools and scales of production", xp:15, content:`**What makes a good pictogram?**
A pictogram is a symbol that communicates meaning through simple visual image — without words. Good pictograms are:
- Simple and uncluttered — instantly recognisable
- Bold and clear — works at any size
- Universal — understood across languages and cultures
- Consistent in style — same visual language throughout

Examples: road signs, toilet signs, airport symbols, Olympic sport icons.

**Tools used in making the lanterns:**
- Craft knife / scalpel (cutting)
- Cutting mat (protects surface)
- Metal ruler (for straight cuts)
- Scoring tool (for folding card neatly)
- Hole punch / awl (making holes)
- Bone folder (crisp, clean folds)

**Scales of production:**
🔨 **One-off/bespoke:** single unique item made to order. High skill, high cost. E.g. a wedding cake, a custom suit.
📦 **Batch production:** a set number made at once. E.g. 500 chairs. Flexible, moderate cost.
🏭 **Mass production:** continuous large-scale production. E.g. cars, bottles. Low cost per unit, requires expensive setup.
🔄 **Continuous production:** 24/7 production of the same product. E.g. paper, electricity.` },
    { type:"watch", title:"Scales of production (Technology Student)", xp:20, url:"https://technologystudent.com/pdf14/display5.pdf", linkText:"Technology Student: Scales of production" },
  ], flashcards:[
    { q:"Name three qualities of a good pictogram.", a:"Simple and uncluttered, bold and clear, universally understood across languages and cultures." },
    { q:"What is the difference between batch and mass production?", a:"Batch: a fixed quantity is made at once (flexible, moderate cost). Mass: continuous large-scale production (low cost per unit, high setup cost)." },
    { q:"What tool would you use to make a clean fold in card?", a:"A scoring tool and bone folder — score along the fold line first, then fold over a bone folder for a crisp, clean edge." },
  ], practiceQs:[
    { q:"Explain why mass production is suitable for making chocolate bar wrappers but not for a custom wedding cake. (4 marks)", weak:"Because chocolate wrappers are made in large amounts.", strong:"Mass production is suited to chocolate bar wrappers because millions of identical items are needed, and the high setup cost of machinery is offset by the low cost per unit at scale. A custom wedding cake, by contrast, is a one-off/bespoke item requiring skilled craftsmanship tailored to the client's specifications — mass production methods cannot accommodate individual customisation, making them inappropriate.", tip:"Explain why mass production fits one case AND why it doesn't fit the other. Both parts needed for full marks." },
  ]},
 ]},

 { id:"french", name:"French", emoji:"🥐", examTip:"Listening, reading, dictation and writing. Include a past tense AND a future tense — this lifts marks. Learn 4 core questions from each module by heart.", units:[
  { id:"fr1", name:"Module 1 — T'es branché(e)?", learn:[
    { type:"read", title:"Tech and media vocab + present tense", xp:15, content:`**This module is about technology and media — what you watch, read, do online.**

**Key verbs (present tense):**
Je regarde = I watch | J'écoute = I listen | Je lis = I read | Je joue = I play | Je télécharge = I download | Je tchate = I chat online

**Core questions and model answers:**
*Qu'est-ce que tu regardes à la télé?* — What do you watch on TV?
→ Je regarde des films d'action parce que c'est passionnant.

*Qu'est-ce que tu aimes comme films?* — What sort of films do you like?
→ J'aime les films d'horreur mais je n'aime pas les documentaires parce que c'est ennuyeux.

*Que fais-tu quand tu es connecté(e)?* — What do you do when online?
→ Je tchate avec mes amis et je télécharge de la musique.

**Opinion boosters:** J'adore (I love) / J'aime bien (I quite like) / Je n'aime pas (I don't like) / Je déteste (I hate)
**Intensifiers:** très (very) / vraiment (really) / assez (quite) / trop (too)
**Connectives:** mais (but) / parce que (because) / cependant (however) / donc (so/therefore)` },
  ], flashcards:[
    { q:"How do you say 'I watch action films because it's exciting'?", a:"Je regarde des films d'action parce que c'est passionnant." },
    { q:"Translate: 'I like reading but I don't like documentaries.'", a:"J'aime lire mais je n'aime pas les documentaires." },
    { q:"Give three intensifiers in French.", a:"Très (very), vraiment (really), assez (quite), trop (too)." },
  ], practiceQs:[
    { q:"Answer: Qu'est-ce que tu aimes comme films? Write 4–5 sentences including a past tense and a future tense. (marks vary)", weak:"J'aime les films d'action.", strong:"J'aime beaucoup les films d'action parce que c'est passionnant et excitant. Je n'aime pas du tout les documentaires parce que c'est vraiment ennuyeux. Hier soir, j'ai regardé un film fantastique avec ma famille. À l'avenir, je vais regarder plus de films en français.", tip:"The upgrade: opinion + type + parce que + reason. Add one past tense (j'ai regardé) and one future (je vais regarder). These two tenses alone lift your mark significantly." },
  ]},
  { id:"fr2", name:"Module 2 — Paris, je t'adore", learn:[
    { type:"read", title:"Past tense (passé composé) — the key to Module 2", xp:15, content:`**Module 2 is about visiting Paris — ALL of it is in the past tense (passé composé).**

**How to form it:** avoir/être + past participle

**With avoir (most verbs):**
J'ai visité = I visited | J'ai mangé = I ate | J'ai fait = I did/made | J'ai vu = I saw | J'ai pris = I took

**With être (movement/state verbs — DR MRS VANDERTRAMP):**
Je suis allé(e) = I went | Je suis arrivé(e) = I arrived

**Core questions:**
*As-tu visité Paris?* → Oui, j'ai visité Paris l'année dernière / Non, je n'ai pas visité Paris.
*C'était comment?* → C'était fantastique/magnifique/décevant parce que...
*Qu'est-ce que tu as fait?* → J'ai visité la Tour Eiffel et j'ai mangé des crêpes.
*Où es-tu allé(e)?* → Je suis allé(e) au Louvre / à Montmartre.

**Time phrases for past:** hier (yesterday), la semaine dernière (last week), l'année dernière (last year), le weekend dernier (last weekend).` },
  ], flashcards:[
    { q:"How do you say 'I went to the Eiffel Tower'?", a:"Je suis allé(e) à la Tour Eiffel. (être verb — note the é agreement)" },
    { q:"How do you say 'It was fantastic because...'?", a:"C'était fantastique parce que..." },
    { q:"What is the past tense of 'je mange'?", a:"J'ai mangé (I ate). Avoir + past participle of manger." },
  ], practiceQs:[
    { q:"Write 5–6 sentences about a visit to Paris. Include at least two different past tense verbs.", weak:"J'ai visité Paris. C'était bien.", strong:"L'année dernière, je suis allé(e) à Paris avec ma famille. J'ai visité le Louvre et j'ai vu la Joconde — c'était vraiment impressionnant. Nous avons mangé des crêpes près de la Tour Eiffel. C'était délicieux! Cependant, il y avait beaucoup de touristes et c'était un peu stressant. J'aimerais retourner à Paris à l'avenir.", tip:"Two different past verbs (suis allé + ai visité) + past adjective (c'était) + opinion + connective + future = the formula for a high mark." },
  ]},
  { id:"fr3", name:"Module 3 — Mon Identité", learn:[
    { type:"read", title:"Identity, relationships and style", xp:15, content:`**Module 3 covers family relationships, music taste and personal style.**

**Relationships:**
*Est-ce que tu t'entends bien avec...?* — Do you get on well with...?
→ Oui, je m'entends très bien avec ma mère parce qu'elle est sympa et compréhensive.
→ Non, je ne m'entends pas bien avec mon frère parce qu'il est égoïste.

**Music:**
*Quel genre de musique aimes-tu?* — What type of music do you like?
→ J'aime la musique pop / le hip-hop / le rock parce que c'est dynamique.

**Style:**
*Quel est ton style?* — What is your style?
→ Mon style est décontracté — je porte souvent un jean et un sweat.
*Qu'est-ce que tu vas faire/porter ce weekend?* — What are you going to do/wear?
→ Ce weekend, je vais porter un t-shirt noir et je vais sortir avec mes amis.

**Future tense (aller + infinitive):** je vais + verb = I am going to...
Je vais porter = I am going to wear | Je vais aller = I am going to go` },
  ], flashcards:[
    { q:"How do you say 'I get on well with my sister because she is kind'?", a:"Je m'entends bien avec ma sœur parce qu'elle est gentille." },
    { q:"How do you form the immediate future tense in French?", a:"Je vais + infinitive. E.g. Je vais manger = I am going to eat." },
    { q:"How do you say 'I don't get on with my brother because he is selfish'?", a:"Je ne m'entends pas bien avec mon frère parce qu'il est égoïste." },
  ], practiceQs:[
    { q:"Answer: Quel est ton style? Write 5 sentences including a future tense. (marks vary)", weak:"Mon style est cool. Je porte des jeans.", strong:"Mon style est assez décontracté — je porte souvent un jean et un sweat à capuche car c'est confortable. Je n'aime pas porter des vêtements formels parce que c'est inconfortable. Cependant, pour les occasions spéciales, je m'habille plus élégamment. Ce weekend, je vais porter un t-shirt blanc et un jean bleu pour sortir avec mes amis.", tip:"Opinion + reason + contrast (cependant) + future tense = the upgrade formula. Aim for 5 sentences minimum." },
  ]},
  { id:"fr4", name:"Module 4 — Chez Moi, Chez Toi", learn:[
    { type:"read", title:"Home, food and past/future tenses combined", xp:15, content:`**Module 4 covers home life, where you live, and what you ate/did recently.**

**Describing your home:**
*Où habites-tu?* — Where do you live?
→ J'habite dans une maison / un appartement à [town].
*Décris ta maison.* — Describe your house.
→ Ma maison est assez grande. Il y a cinq chambres, une cuisine moderne et un jardin.

**Food questions (past tense):**
*Qu'est-ce que tu as pris/mangé hier?* — What did you have/eat yesterday?
→ Hier soir, j'ai mangé des pâtes avec du fromage. C'était délicieux.

**Going out (past + future):**
*Tu es allé(e) au carnaval?* — Did you go to the carnival?
→ Oui, je suis allé(e) au carnaval avec mes amis. C'était fantastique!
→ Non, je n'y suis pas allé(e) mais je vais y aller l'année prochaine.

**Rooms of the house:** la cuisine (kitchen), la salle de bains (bathroom), la chambre (bedroom), le salon (living room), le jardin (garden), la salle à manger (dining room).` },
  ], flashcards:[
    { q:"How do you say 'In my house there are 4 bedrooms and a garden'?", a:"Dans ma maison, il y a quatre chambres et un jardin." },
    { q:"How do you say 'Yesterday I ate pasta. It was delicious.'?", a:"Hier, j'ai mangé des pâtes. C'était délicieux." },
    { q:"How do you say 'I didn't go but I'm going to go next year'?", a:"Je n'y suis pas allé(e) mais je vais y aller l'année prochaine." },
  ], practiceQs:[
    { q:"Décris ta maison. Write 5–6 sentences in French including a past and future tense. (marks vary)", weak:"Ma maison est grande. Il y a des chambres.", strong:"J'habite dans une grande maison à la campagne avec ma famille. Il y a cinq chambres, deux salles de bains et une grande cuisine moderne. J'adore ma chambre parce qu'elle est confortable et j'y passe beaucoup de temps. Hier soir, j'ai mangé dans la salle à manger avec toute la famille. À l'avenir, je voudrais habiter dans un appartement en ville.", tip:"Description → opinion + reason → past tense → future tense. Four distinct things in six sentences = strong answer." },
  ]},
 ]},

 { id:"re", name:"RE", emoji:"✝️", examTip:"Know the key ideas, stories and theological concepts for each module. Questions often ask you to explain beliefs AND give a personal response.", units:[
  { id:"creation", name:"Creation & Covenant", learn:[
    { type:"read", title:"Creation, God and covenant", xp:15, content:`**Creation:** Christians believe God created the world intentionally and that creation is fundamentally good. The two Genesis accounts describe God creating the world in 6 days (Genesis 1) and the Garden of Eden (Genesis 2).

**Key ideas:**
- **Creatio ex nihilo:** God created the universe from nothing
- **Stewardship:** humans are called to care for creation, not exploit it
- **Imago Dei:** humans are made 'in the image of God' — this gives all human life special dignity

**Covenant:** A sacred promise/agreement between God and humanity.

**The Covenant with Noah:** After the flood, God promises never to destroy the earth again. Sign = the rainbow.

**The Covenant with Abraham:** God promises Abraham land, descendants, and that he will be the father of a great nation. Abraham promises faith and obedience.

**Big questions this module raises:**
- How did the world begin?
- Does God exist?
- What responsibilities do humans have towards creation?` },
  ], flashcards:[
    { q:"What does 'imago Dei' mean?", a:"'In the image of God' — the belief that all humans are created to reflect God, giving every person inherent dignity and worth." },
    { q:"What is a covenant?", a:"A sacred, binding promise between God and humanity. E.g. God's covenant with Noah (rainbow) and with Abraham (land and descendants)." },
    { q:"What is 'stewardship' in a Christian context?", a:"The responsibility of humans to care for and protect God's creation — not to exploit or destroy it." },
  ], practiceQs:[
    { q:"Explain what Christians believe about the creation of the world. (4 marks)", weak:"Christians believe God made the world in 6 days.", strong:"Christians believe God created the world intentionally and from nothing (creatio ex nihilo), as described in Genesis. The world is considered fundamentally good — 'God saw that it was good.' Humans are created in God's image (imago Dei), which gives them special dignity and the responsibility of stewardship — caring for creation. Christians may interpret Genesis literally or symbolically, but the core belief in God as creator remains central.", tip:"4 marks = multiple beliefs, not just one. Cover: God as creator, the goodness of creation, imago Dei, stewardship." },
  ]},
  { id:"desert", name:"Desert to Garden", learn:[
    { type:"read", title:"The Exodus and God's relationship with Israel", xp:15, content:`**The story of Exodus:** God's people (the Israelites) were enslaved in Egypt. God called Moses to lead them to freedom — the **Exodus** (journey out of Egypt).

**Key events:**
- The **burning bush** — God reveals himself to Moses
- The **Ten Plagues** — God demonstrates power to Pharaoh
- **Passover** — God 'passes over' the homes of the Israelites, killing Egyptian firstborns. Israelites mark their doors with lamb's blood.
- **The crossing of the Red Sea** — Pharaoh's army destroyed
- **Mount Sinai** — God gives Moses the **Ten Commandments** (the Law/Torah)
- **40 years in the desert** — God provides manna (bread from heaven) and water from rock
- **The Promised Land** — Canaan, the land God promised to Abraham

**Key themes:**
- Liberation: God acts to free the oppressed
- Covenant at Sinai: "I will be your God, you will be my people"
- Trust and faithfulness: the desert tests Israel's faith` },
  ], flashcards:[
    { q:"What is the Exodus?", a:"The journey of the Israelites out of slavery in Egypt, led by Moses, as described in the Book of Exodus." },
    { q:"What happened at Mount Sinai?", a:"God gave Moses the Ten Commandments — the Law (Torah) — establishing the covenant between God and the Israelites." },
    { q:"What is the significance of Passover?", a:"It commemorates God 'passing over' Israelite homes (marked with lamb's blood) while freeing them from Egypt. Still celebrated by Jewish people today." },
  ], practiceQs:[
    { q:"Explain the significance of the Exodus story for Christians today. (4 marks)", weak:"The Exodus shows God helped the Israelites escape Egypt.", strong:"The Exodus is significant because it demonstrates God's character as a liberator who acts to free the oppressed — a theme Christians believe continues today. The story also shows God's faithfulness to his covenant promises. For many Christians, the Exodus is seen as prefiguring Jesus's liberation of humanity from sin. It provides a model of faith in difficult circumstances — trusting God even through 40 years of desert.", tip:"Significance means 'why it matters'. Don't just retell the story — explain what it MEANS for belief today." },
  ]},
  { id:"ends", name:"To the Ends of the Earth", learn:[
    { type:"read", title:"The early Church and Christian mission", xp:15, content:`**Pentecost:** 50 days after Easter, the Holy Spirit came upon the disciples (Acts 2). Often described as tongues of fire and the disciples suddenly able to speak in many languages. Marks the birth of the Church.

**The early Church:**
- Disciples spread the message of Jesus across the Roman Empire
- **St Paul** (originally Saul) — persecutor of Christians who had a dramatic conversion experience on the road to Damascus. Became the most important missionary, writing many letters (epistles) in the New Testament.
- The Church faced **persecution** — Christians were executed in Rome for their beliefs.

**The Great Commission:** Jesus tells his disciples to "go and make disciples of all nations" (Matthew 28). This drives Christian missionary activity.

**Christianity spreads:** from Jerusalem → Judea → Samaria → to the ends of the earth (Acts 1:8).

**Key themes:**
- Mission: the Church's calling to share the faith
- Community: early Christians formed sharing, caring communities
- Persecution and courage: faith tested under pressure` },
  ], flashcards:[
    { q:"What happened at Pentecost?", a:"The Holy Spirit descended on the disciples (Acts 2) — described as tongues of fire. They could speak in many languages. Marks the beginning of the Christian Church." },
    { q:"Who was St Paul and why is he significant?", a:"Originally Saul, a persecutor of Christians. After a dramatic conversion on the road to Damascus, he became Christianity's greatest missionary, planting churches across the Roman Empire and writing much of the New Testament." },
    { q:"What is the Great Commission?", a:"Jesus's instruction to his disciples to 'go and make disciples of all nations' (Matthew 28) — the foundation for Christian missionary work." },
  ], practiceQs:[
    { q:"Explain the importance of Pentecost for Christians. (4 marks)", weak:"Pentecost is when the Holy Spirit came and the disciples could speak different languages.", strong:"Pentecost is significant because it marks the birth of the Christian Church — the moment the disciples received the Holy Spirit and were empowered to fulfil the Great Commission. The ability to speak in many languages symbolises Christianity's universal scope, intended for all nations. For Christians today, Pentecost affirms that the Holy Spirit continues to guide and empower the Church. It is celebrated as a key feast in the Christian calendar.", tip:"Explain what happened → why it was significant then → why it matters for Christians now." },
  ]},
 ]},

 { id:"music", name:"Music", emoji:"🎵", examTip:"Two sections: listening (3 questions on Blues, Folk, Classical) + knowledge (no listening). Know the musical elements: DRMSTTTH — Dynamics, Rhythm, Melody, Sonority, Texture, Tempo, Tonality, Harmony.", units:[
  { id:"blues", name:"Blues Music", learn:[
    { type:"read", title:"The Blues — everything you need", xp:15, content:`**Origins:** Blues originated in the Deep South of the USA in the late 19th century, rooted in African American experiences of slavery and hardship.

**The 12-Bar Blues — the chord pattern:**
Most blues is built on 12 bars in a repeating pattern:
| I | I | I | I | IV | IV | I | I | V | IV | I | I |
In the key of C: chords are C (I), F (IV), G (V).

**The Blues Scale:** adds 'blue notes' — flattened 3rd, 5th, and 7th degrees — creating the characteristic bluesy, melancholic sound.

**Key features to identify in listening:**
🎸 Call and response (vocalist sings a phrase, instrument answers)
🎵 Improvisation — especially in guitar solos
🎶 Syncopation — off-beat rhythms, gives the music its swing
📍 Shuffle rhythm — a bouncy, rolling rhythmic feel
🎤 Instruments: electric guitar, bass, drums, piano, harmonica, voice

**Musical elements to describe:**
- **Dynamics:** often starts quiet, builds during solos
- **Tempo:** moderate, steady (not rushed)
- **Texture:** quite thin — melody + accompaniment
- **Tonality:** usually minor (melancholic mood)` },
    { type:"watch", title:"12-Bar Blues structure (BBC Bitesize)", xp:20, url:"https://www.bbc.co.uk/bitesize/topics/z3dqhyc/articles/zvw37nb", linkText:"BBC Bitesize: Blues music" },
  ], flashcards:[
    { q:"What is the 12-bar blues structure?", a:"A 12-bar repeating chord pattern using chords I, IV and V. In C major: C, F and G." },
    { q:"What is call and response in blues music?", a:"A vocalist sings a phrase (call) and an instrument (e.g. guitar) answers it (response). A key feature of blues." },
    { q:"Name three typical instruments in blues music.", a:"Electric guitar, bass guitar, drums, piano, harmonica, vocals (any three)." },
    { q:"What is syncopation?", a:"Placing rhythmic emphasis on the off-beat rather than the main beat — gives blues and jazz their characteristic swing." },
  ], practiceQs:[
    { q:"Describe the structure and key features of a piece of 12-bar blues you have heard. Use musical terminology. (4 marks)", weak:"It repeated 12 bars and had a guitar solo.", strong:"The piece followed a 12-bar blues structure, repeating a chord pattern using chords I (tonic), IV (subdominant) and V (dominant). The tempo was moderate with a steady shuffle rhythm and strong syncopation on the off-beats. Call and response was used between the vocal melody and electric guitar. The texture was relatively sparse — a melody-and-accompaniment texture — with improvised guitar solos adding variety.", tip:"Name the structure → describe rhythm/tempo → identify texture → name specific features (call and response, improvisation). Each named element = a mark." },
  ]},
  { id:"theory", name:"Music Theory & Elements", learn:[
    { type:"read", title:"Musical elements — the full glossary", xp:15, content:`**The 9 musical elements — remember DRMSTTTH:**
🥁 **Dynamics** — volume (pp = very quiet, p = quiet, mf = medium loud, f = loud, ff = very loud, crescendo = getting louder, diminuendo = getting quieter)
🎵 **Rhythm** — the pattern of long and short sounds
🎼 **Melody** — the tune (the part you'd sing)
🎻 **Sonority** — the sound/timbre of instruments (e.g. bright, warm, piercing, mellow)
🧵 **Texture** — how many layers of sound (monophonic = one layer, homophonic = melody + chords, polyphonic = multiple independent melodies)
⏱️ **Tempo** — speed (allegro = fast, andante = walking pace, adagio = slow, accelerando = speeding up, rallentando = slowing down)
🎹 **Tonality** — major (bright, happy) or minor (dark, melancholic)
🎶 **Harmony** — chords and how notes sound together (consonant = pleasant, dissonant = harsh/tense)
🏗️ **Structure** — how the music is organised (verse/chorus, 12-bar blues, ABA form)

**Note values:**
Semibreve = 4 beats | Minim = 2 beats | Crotchet = 1 beat | Quaver = ½ beat | Semiquaver = ¼ beat

**Blues scale:** Root, minor 3rd, 4th, flat 5th (blue note), 5th, minor 7th, octave.` },
    { type:"activity", title:"Element identification challenge", xp:25, content:`**Put on any song you like.** Listen for 2 minutes and describe it using as many of the 9 elements as you can.

Write one sentence per element you can identify. E.g.:
- "The tempo is fast (allegro) with a strong regular rhythm."
- "The texture is homophonic — main melody with chords underneath."
- "The tonality is major, giving it a bright, energetic feel."

**Challenge:** Can you identify all 9 elements? You might not always know exact terms — make your best attempt using the vocabulary from the read section above.

This is exactly what the listening section of your exam asks you to do.` },
  ], flashcards:[
    { q:"What does 'homophonic texture' mean?", a:"A main melody accompanied by chords underneath — the most common texture in pop, blues and classical music." },
    { q:"What is the difference between major and minor tonality?", a:"Major sounds bright, happy or triumphant. Minor sounds dark, sad or melancholic." },
    { q:"What does 'dynamics' mean in music?", a:"The volume — how loud or quiet the music is. Includes changes like crescendo (getting louder) and diminuendo (getting quieter)." },
    { q:"What note value equals 4 beats?", a:"A semibreve." },
  ], practiceQs:[
    { q:"Describe the texture and dynamics of a piece of music you have studied. Use musical terminology. (3 marks)", weak:"It was loud and had lots of instruments.", strong:"The texture was homophonic — a clear melody supported by block chords in the lower register. Dynamically, the piece opened quietly (piano) before building through a crescendo to a loud (forte) climax at the peak of the phrase. This dynamic contrast created tension and release.", tip:"Name the texture TYPE (not just 'thick' or 'thin'). Give specific dynamic terms (p, f, crescendo). Explain the EFFECT." },
  ]},
 ]},

 { id:"pe", name:"PE Theory", emoji:"🏃", examTip:"Your report flagged 'application of knowledge'. After every definition, add: 'This is important in [sport] because [specific reason].' Never leave the link implicit.", units:[
  { id:"fitness", name:"Fitness Components & Tests", learn:[
    { type:"read", title:"All 9 components — definitions and tests", xp:15, content:`**Know this completely. Every column may be tested.**

| Component | Definition | Test(s) |
|---|---|---|
| Cardiovascular endurance | Heart & lungs sustaining exercise | Cooper Run (12 min), Bleep Test |
| Speed | Maximum rate of movement | 30m Sprint, 30m Flying Sprint |
| Muscular strength | Maximum force in one effort | Hand Grip Dynamometer |
| Muscular endurance | Muscles working repeatedly without tiring | Press Up Test |
| Flexibility | Range of movement at a joint | Sit & Reach, Shoulder Flexibility Test |
| Agility | Changing direction quickly and accurately | T-Test, Illinois Agility Test |
| Balance | Maintaining equilibrium | Stork Stand Test, Y Balance Test |
| Coordination | Using body parts smoothly together | 30-sec Alternate Hand Wall Toss |
| Power | Force × speed (explosive) | Vertical Jump, Broad Jump |

**The application problem — what your report flagged:**
"Agility is important in sport" = 0 marks.
"Agility is vital in rugby because players must rapidly change direction to evade tackles while maintaining ball control" = full marks.

Specific. Sport. Reason. Every time.` },
    { type:"activity", title:"Sport application drill", xp:25, content:`**Pick TWO sports you know well.**

For each sport, choose THREE fitness components and write one sentence for each explaining WHY it matters in that specific sport.

**Structure:** "[Component] is essential in [sport] because [specific thing that happens in that sport]."

Not: "because it helps you play better."
Yes: "because players sprint up to 10km per match, requiring their cardiovascular system to deliver oxygen to muscles for the full 90 minutes."

Six sentences total. This is your report's flagged weakness — fix it here.` },
  ], flashcards:[
    { q:"What is cardiovascular endurance? Name two tests.", a:"The ability of the heart and lungs to supply oxygen to working muscles over a sustained period. Tests: Cooper Run (12 min) and Multistage Fitness Test (bleep test)." },
    { q:"What is the difference between muscular strength and power?", a:"Strength: maximum force in a single effort. Power: combining strength with speed — explosive movement (force × speed)." },
    { q:"Describe the Illinois Agility Test.", a:"Run a set course around cones involving changes of direction. Time is recorded. Lower time = better agility." },
    { q:"Why is flexibility important in gymnastics?", a:"Gymnasts must perform extreme ranges of motion at joints — splits, backbends, high kicks — requiring high flexibility to execute and avoid injury." },
  ], practiceQs:[
    { q:"A basketball player wants to test their agility. Describe a suitable test and explain its relevance to basketball. (4 marks)", weak:"The T-test is good because it tests agility.", strong:"The T-Test is appropriate. The athlete sprints to a centre cone, sidesteps left and right to other cones, then backpedals to the start — recording the time. This directly reflects basketball demands because players constantly change direction at speed: cutting to receive a pass, closing down defenders, or driving to the basket — meaning agility directly determines performance quality.", tip:"Name the test → describe how it works → link to SPECIFIC movements in that sport. The link is where marks are lost." },
  ]},
 ]},
];

// ── XP VALUES ───────────────────────────────────────────────────────────────
const XP_VAL = { read:15, watch:20, activity:25, flashcard:5, practice:30 };

// ── BADGES ──────────────────────────────────────────────────────────────────
const BADGES = [
 { id:"first",    icon:"🎯", label:"First Quest",    desc:"Complete your first activity",     check:s=>s.totalSessions>=1 },
 { id:"streak3",  icon:"🔥", label:"3-Day Streak",   desc:"Study 3 days in a row",            check:s=>s.streak>=3 },
 { id:"flipper",  icon:"🃏", label:"Card Shark",     desc:"Flip 30 flashcards",               check:s=>(s.totalFlips||0)>=30 },
 { id:"scientist",icon:"⚗️", label:"Lab Rat",        desc:"Do 3 Science activities",          check:s=>(s.subjectCounts?.science||0)>=3 },
 { id:"polymath", icon:"🧠", label:"Polymath",       desc:"Complete a unit in 5 subjects",    check:s=>Object.keys(s.subjectCounts||{}).length>=5 },
 { id:"allsubs",  icon:"🌟", label:"Renaissance",    desc:"Try all 11 subjects",              check:s=>Object.keys(s.subjectCounts||{}).length>=11 },
 { id:"xp500",    icon:"💎", label:"XP Hunter",      desc:"Earn 500 XP",                      check:s=>s.totalXP>=500 },
 { id:"xp1000",   icon:"👑", label:"Grind Mode",     desc:"Earn 1000 XP",                     check:s=>s.totalXP>=1000 },
 { id:"examhero", icon:"📝", label:"Exam Hero",      desc:"Complete 10 practice questions",   check:s=>(s.practiceCount||0)>=10 },
 { id:"linguist", icon:"🗣️", label:"Linguist",      desc:"Do a French and RE unit",          check:s=>(s.subjectCounts?.french||0)>=1&&(s.subjectCounts?.re||0)>=1 },
];

const INIT = { totalXP:0, totalSessions:0, streak:0, lastStudyDate:null, subjectCounts:{}, completedActivities:{}, earnedBadges:[], totalFlips:0, practiceCount:0 };

// ── HELPERS ─────────────────────────────────────────────────────────────────
function allKeys(sub) {
 return sub.units.flatMap(u=>[
  ...u.learn.map((_,i)=>`${sub.id}::${u.id}::learn${i}`),
  ...u.flashcards.map((_,i)=>`${sub.id}::${u.id}::fc${i}`),
  ...(u.practiceQs.length?[`${sub.id}::${u.id}::pq0`]:[]),
 ]);
}
function unitKeys(subId, u) {
 return [
  ...u.learn.map((_,i)=>`${subId}::${u.id}::learn${i}`),
  ...u.flashcards.map((_,i)=>`${subId}::${u.id}::fc${i}`),
  ...(u.practiceQs.length?[`${subId}::${u.id}::pq0`]:[]),
 ];
}

// ── LEARN CARD COMPONENT ────────────────────────────────────────────────────
function LearnCard({ item, subId, unitId, idx, col, done, onDone }) {
 const [open, setOpen] = useState(false);
 const key = `${subId}::${unitId}::learn${idx}`;
 const typeIcon = { read:"📖", watch:"📺", activity:"✏️" };
 const typeLabel = { read:"Read", watch:"Watch", activity:"Do" };

 const renderContent = (text) =>
  text.split("\n").map((line, i) => {
   const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
   if (line.startsWith("|") && line.endsWith("|")) {
    const cells = line.split("|").filter(Boolean).map(c=>c.trim());
    const isHeader = cells.every(c=>c==="---"||c.startsWith("---"));
    if (isHeader) return null;
    return <div key={i} style={{display:"grid",gridTemplateColumns:`repeat(${cells.length},1fr)`,gap:4,marginBottom:2}}>
     {cells.map((c,j)=><div key={j} style={{fontSize:12,padding:"3px 6px",background:"var(--color-background-secondary)",borderRadius:3}} dangerouslySetInnerHTML={{__html:c.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}}/>)}
    </div>;
   }
   if (line.trim()==="") return <div key={i} style={{height:6}}/>;
   return <p key={i} style={{margin:"2px 0",fontSize:14,lineHeight:1.6}} dangerouslySetInnerHTML={{__html:html}}/>;
  });

 return (
  <div style={{borderRadius:"var(--border-radius-md)",border:`0.5px solid ${done?col.c:"var(--color-border-tertiary)"}`,background:done?col.l:"var(--color-background-primary)",overflow:"hidden",marginBottom:8}}>
   <div style={{padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}} onClick={()=>setOpen(o=>!o)}>
    <div style={{display:"flex",alignItems:"center",gap:8}}>
     <span style={{fontSize:14}}>{typeIcon[item.type]}</span>
     <span style={{fontSize:11,padding:"1px 6px",borderRadius:3,background:done?col.c:col.l,color:done?"white":col.d,fontWeight:500}}>{typeLabel[item.type]}</span>
     <span style={{fontSize:13,fontWeight:500}}>{item.title}</span>
    </div>
    <span style={{fontSize:12,color:done?col.d:"var(--color-text-secondary)"}}>{done?"✓ done":`+${item.xp} XP`} {open?"▲":"▼"}</span>
   </div>
   {open && (
    <div style={{padding:"0 14px 14px"}}>
     {item.content && <div style={{marginBottom:10}}>{renderContent(item.content)}</div>}
     {item.url && (
      <a href={item.url} target="_blank" rel="noopener noreferrer"
       style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:13,color:col.d,textDecoration:"none",padding:"6px 12px",borderRadius:"var(--border-radius-md)",border:`0.5px solid ${col.c}`,marginBottom:10}}
       onClick={()=>!done&&onDone()}>
       {item.linkText} →
      </a>
     )}
     {!done && <button onClick={onDone} style={{padding:"7px 18px",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Done — claim +{item.xp} XP ✓</button>}
     {done && <span style={{fontSize:13,color:col.d,fontWeight:500}}>✓ Completed</span>}
    </div>
   )}
  </div>
 );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
 const [stats, setStats] = useState(() => {
  try {
    const saved = localStorage.getItem('harvey-stats');
    return saved ? JSON.parse(saved) : INIT;
  } catch { return INIT; }
 });

 useEffect(() => {
  try { localStorage.setItem('harvey-stats', JSON.stringify(stats)); }
  catch {}
 }, [stats]);
 const [view, setView] = useState("home");          // home|subject|unit|flashcard|practiceq|badges
 const [selSub, setSelSub] = useState(null);
 const [selUnit, setSelUnit] = useState(null);
 const [cardIdx, setCardIdx] = useState(0);
 const [flipped, setFlipped] = useState(false);
 const [pqStep, setPqStep] = useState(0);
 const [newBadges, setNewBadges] = useState([]);
 const [toast, setToast] = useState(null);

 const showToast = (msg, col="#1D9E75") => { setToast({msg,col}); setTimeout(()=>setToast(null), 2500); };

 const applyXP = (xpAmt, label, extra={}) => {
  setStats(prev => {
   const today = new Date().toDateString();
   const yest = new Date(); yest.setDate(yest.getDate()-1);
   const wasYest = prev.lastStudyDate === yest.toDateString();
   const isToday = prev.lastStudyDate === today;
   const newStreak = isToday ? prev.streak : wasYest ? prev.streak+1 : 1;
   const next = { ...prev, totalXP:prev.totalXP+xpAmt, totalSessions:prev.totalSessions+1, streak:newStreak, lastStudyDate:today, ...extra };
   const earned = BADGES.filter(b=>!prev.earnedBadges.includes(b.id)&&b.check(next)).map(b=>b.id);
   if (earned.length) { next.earnedBadges=[...prev.earnedBadges,...earned]; setNewBadges(earned); }
   return next;
  });
  showToast(`+${xpAmt} XP — ${label}`);
 };

 const markActivity = (key, xpAmt, label, subId, extra={}) => {
  if (stats.completedActivities[key]) return;
  const newCounts = { ...stats.subjectCounts, [subId]:(stats.subjectCounts[subId]||0)+1 };
  applyXP(xpAmt, label, { completedActivities:{...stats.completedActivities,[key]:true}, subjectCounts:newCounts, ...extra });
 };

 const go = (v, s=null, u=null) => { setView(v); setSelSub(s); setSelUnit(u); setCardIdx(0); setFlipped(false); setPqStep(0); };

 const sub = selSub ? SUBJECTS.find(s=>s.id===selSub) : null;
 const col = sub ? COLS[sub.id] : null;
 const unit = selUnit && sub ? sub.units.find(u=>u.id===selUnit) : null;

 const level = Math.floor(stats.totalXP/100)+1;
 const xpInLvl = stats.totalXP%100;
 const totalActs = SUBJECTS.flatMap(s=>allKeys(s));
 const doneActs = totalActs.filter(k=>stats.completedActivities[k]).length;

 // ── FLASHCARD VIEW ────────────────────────────────────────────────────────
 if (view==="flashcard" && unit && col) {
  const card = unit.flashcards[cardIdx];
  const key = `${selSub}::${selUnit}::fc${cardIdx}`;
  const done = !!stats.completedActivities[key];
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("unit",selSub,selUnit)} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Back</button>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.75rem"}}>
     <h2 style={{fontSize:16,fontWeight:500,margin:0}}>{unit.name} — Flashcards</h2>
     <span style={{fontSize:13,color:"var(--color-text-secondary)"}}>{cardIdx+1}/{unit.flashcards.length}</span>
    </div>
    <div onClick={()=>{ if(!flipped){ setFlipped(true); if(!done) markActivity(key,XP_VAL.flashcard,"Flashcard",selSub,{totalFlips:(stats.totalFlips||0)+1}); } }}
     style={{minHeight:180,borderRadius:"var(--border-radius-lg)",border:`1.5px solid ${flipped?col.c:"var(--color-border-secondary)"}`,background:flipped?col.l:"var(--color-background-primary)",padding:"1.5rem",cursor:flipped?"default":"pointer",marginBottom:"1rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
     <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 0.5rem"}}>{flipped?"Answer ↓":"Question — tap to reveal"}</p>
     <p style={{fontSize:15,color:flipped?col.d:"var(--color-text-primary)",margin:0,lineHeight:1.6}}>{flipped?card.a:card.q}</p>
    </div>
    <div style={{display:"flex",gap:8}}>
     <button onClick={()=>{setCardIdx(i=>Math.max(0,i-1));setFlipped(false);}} disabled={cardIdx===0} style={{flex:1,padding:"10px 0",fontSize:13,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",opacity:cardIdx===0?0.4:1}}>← Prev</button>
     {flipped && cardIdx<unit.flashcards.length-1 && <button onClick={()=>{setCardIdx(i=>i+1);setFlipped(false);}} style={{flex:2,padding:"10px 0",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Next →</button>}
     {flipped && cardIdx===unit.flashcards.length-1 && <button onClick={()=>go("unit",selSub,selUnit)} style={{flex:2,padding:"10px 0",fontSize:13,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Done ✓</button>}
    </div>
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:toast.col,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast.msg}</div>}
   </div>
  );
 }

 // ── PRACTICE Q VIEW ───────────────────────────────────────────────────────
 if (view==="practiceq" && unit && col) {
  const pq = unit.practiceQs[0];
  if (!pq) return <div style={{padding:"1rem 0"}}><button onClick={()=>go("unit",selSub,selUnit)} style={{background:"none",border:"none",fontSize:14,cursor:"pointer"}}>← Back</button></div>;
  const key = `${selSub}::${selUnit}::pq0`;
  const done = !!stats.completedActivities[key];
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("unit",selSub,selUnit)} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Back</button>
    <div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",marginBottom:"1rem"}}>
     <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 4px"}}>Exam question</p>
     <p style={{fontSize:15,fontWeight:500,margin:0}}>{pq.q}</p>
    </div>
    <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 1rem"}}>Try it mentally first — then reveal the progression below.</p>
    {pqStep<1&&<button onClick={()=>setPqStep(1)} style={{width:"100%",padding:"10px",fontSize:14,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",marginBottom:8}}>Show weak answer ↓</button>}
    {pqStep>=1&&<div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"#FCEBEB",border:"0.5px solid #F09595",marginBottom:8}}>
     <p style={{fontSize:12,color:"#A32D2D",fontWeight:500,margin:"0 0 4px"}}>Weak answer (few marks)</p>
     <p style={{fontSize:14,margin:0,color:"#501313"}}>{pq.weak}</p>
    </div>}
    {pqStep>=1&&pqStep<2&&<button onClick={()=>setPqStep(2)} style={{width:"100%",padding:"10px",fontSize:14,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",marginBottom:8}}>Show strong answer ↓</button>}
    {pqStep>=2&&<div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"#EAF3DE",border:"0.5px solid #C0DD97",marginBottom:8}}>
     <p style={{fontSize:12,color:"#3B6D11",fontWeight:500,margin:"0 0 4px"}}>Strong answer (full marks)</p>
     <p style={{fontSize:14,margin:0,color:"#173404",lineHeight:1.7}}>{pq.strong}</p>
    </div>}
    {pqStep>=2&&pqStep<3&&<button onClick={()=>setPqStep(3)} style={{width:"100%",padding:"10px",fontSize:14,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer",marginBottom:8}}>Show technique tip ↓</button>}
    {pqStep>=3&&<div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"#E6F1FB",border:"0.5px solid #B5D4F4",marginBottom:"1rem"}}>
     <p style={{fontSize:12,color:"#185FA5",fontWeight:500,margin:"0 0 4px"}}>Why this works</p>
     <p style={{fontSize:14,margin:0,color:"#042C53"}}>{pq.tip}</p>
    </div>}
    {pqStep>=3&&!done&&<button onClick={()=>{markActivity(key,XP_VAL.practice,"Practice Q",selSub,{practiceCount:(stats.practiceCount||0)+1});go("unit",selSub,selUnit);}} style={{width:"100%",padding:"12px",fontSize:14,fontWeight:500,borderRadius:"var(--border-radius-md)",border:`1.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer"}}>Claim +{XP_VAL.practice} XP ✓</button>}
    {done&&<p style={{textAlign:"center",fontSize:13,color:"var(--color-text-secondary)"}}>Already completed ✓</p>}
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:toast.col,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast.msg}</div>}
   </div>
  );
 }

 // ── UNIT VIEW ─────────────────────────────────────────────────────────────
 if (view==="unit" && unit && col) {
  const keys = unitKeys(selSub, unit);
  const done = keys.filter(k=>stats.completedActivities[k]).length;
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("subject",selSub)} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Back to {sub.name}</button>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
     <span style={{fontSize:22}}>{sub.emoji}</span>
     <h2 style={{fontSize:18,fontWeight:500,margin:0}}>{unit.name}</h2>
    </div>
    <div style={{height:5,background:"var(--color-background-secondary)",borderRadius:3,margin:"0.75rem 0",overflow:"hidden"}}>
     <div style={{height:"100%",width:`${keys.length?Math.round((done/keys.length)*100):0}%`,background:col.c,borderRadius:3,transition:"width 0.4s"}}/>
    </div>
    <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 1.25rem"}}>{done}/{keys.length} activities completed</p>
    <p style={{fontSize:13,fontWeight:500,color:"var(--color-text-secondary)",margin:"0 0 0.5rem"}}>LEARN FIRST</p>
    {unit.learn.map((item,i)=>(
     <LearnCard key={i} item={item} subId={selSub} unitId={selUnit} idx={i} col={col}
      done={!!stats.completedActivities[`${selSub}::${selUnit}::learn${i}`]}
      onDone={()=>markActivity(`${selSub}::${selUnit}::learn${i}`,item.xp,item.type==="read"?"Read":item.type==="watch"?"Watch":"Activity",selSub)}/>
    ))}
    <p style={{fontSize:13,fontWeight:500,color:"var(--color-text-secondary)",margin:"1rem 0 0.5rem"}}>TEST YOURSELF</p>
    <div style={{display:"flex",gap:8,marginBottom:"1.25rem"}}>
     <button onClick={()=>go("flashcard",selSub,selUnit)} style={{flex:1,padding:"12px 8px",fontSize:13,borderRadius:"var(--border-radius-md)",border:`0.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer",textAlign:"center"}}>
      🃏 Flashcards<br/><span style={{fontSize:11,opacity:0.8}}>{unit.flashcards.length} cards · +{XP_VAL.flashcard} XP each</span>
     </button>
     {unit.practiceQs.length>0&&<button onClick={()=>go("practiceq",selSub,selUnit)} style={{flex:1,padding:"12px 8px",fontSize:13,borderRadius:"var(--border-radius-md)",border:`0.5px solid ${col.c}`,background:col.l,color:col.d,cursor:"pointer",textAlign:"center"}}>
      📝 Exam Q<br/><span style={{fontSize:11,opacity:0.8}}>Weak→Strong +{XP_VAL.practice} XP</span>
     </button>}
    </div>
    <div style={{padding:"12px 14px",borderRadius:"var(--border-radius-md)",background:"#FAEEDA",border:"0.5px solid #FAC775"}}>
     <p style={{fontSize:12,fontWeight:500,color:"#633806",margin:"0 0 4px"}}>Exam technique</p>
     <p style={{fontSize:13,color:"#412402",margin:0}}>{sub.examTip}</p>
    </div>
    {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:toast.col,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast.msg}</div>}
   </div>
  );
 }

 // ── SUBJECT VIEW ──────────────────────────────────────────────────────────
 if (view==="subject" && sub && col) {
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("home")} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Home</button>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"0.75rem"}}>
     <span style={{fontSize:28}}>{sub.emoji}</span>
     <h2 style={{fontSize:20,fontWeight:500,margin:0}}>{sub.name}</h2>
    </div>
    <div style={{padding:"10px 14px",borderRadius:"var(--border-radius-md)",background:"#FAEEDA",border:"0.5px solid #FAC775",marginBottom:"1rem"}}>
     <p style={{fontSize:12,fontWeight:500,color:"#633806",margin:"0 0 2px"}}>Exam technique</p>
     <p style={{fontSize:13,color:"#412402",margin:0}}>{sub.examTip}</p>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
     {sub.units.map(u=>{
      const ks=unitKeys(sub.id,u);
      const d=ks.filter(k=>stats.completedActivities[k]).length;
      return(
       <div key={u.id} onClick={()=>go("unit",sub.id,u.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",borderRadius:"var(--border-radius-lg)",border:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",cursor:"pointer"}}>
        <div style={{flex:1}}>
         <p style={{margin:"0 0 6px",fontSize:15,fontWeight:500}}>{u.name}</p>
         <div style={{height:4,background:"var(--color-background-secondary)",borderRadius:2,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${ks.length?Math.round((d/ks.length)*100):0}%`,background:col.c,borderRadius:2}}/>
         </div>
        </div>
        <span style={{fontSize:12,color:"var(--color-text-secondary)",flexShrink:0}}>{d}/{ks.length}</span>
        <span style={{color:"var(--color-text-secondary)"}}>›</span>
       </div>
      );
     })}
    </div>
   </div>
  );
 }

 // ── BADGES VIEW ───────────────────────────────────────────────────────────
 if (view==="badges") {
  return (
   <div style={{padding:"1rem 0"}}>
    <button onClick={()=>go("home")} style={{background:"none",border:"none",color:"var(--color-text-secondary)",fontSize:14,cursor:"pointer",padding:0,marginBottom:"1rem"}}>← Home</button>
    <h2 style={{fontSize:18,fontWeight:500,margin:"0 0 1rem"}}>Badges</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10}}>
     {BADGES.map(b=>{
      const earned=stats.earnedBadges.includes(b.id);
      return(
       <div key={b.id} style={{padding:"12px 10px",borderRadius:"var(--border-radius-lg)",border:`0.5px solid ${earned?"#1D9E75":"var(--color-border-tertiary)"}`,background:earned?"#E1F5EE":"var(--color-background-secondary)",textAlign:"center"}}>
        <div style={{fontSize:22,marginBottom:4}}>{earned?b.icon:"🔒"}</div>
        <p style={{margin:0,fontSize:12,fontWeight:500,color:earned?"#085041":"var(--color-text-secondary)"}}>{b.label}</p>
        <p style={{margin:"3px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>{b.desc}</p>
       </div>
      );
     })}
    </div>
    {newBadges.length>0&&<div style={{marginTop:"1rem",padding:"12px",borderRadius:"var(--border-radius-md)",background:"#E1F5EE",border:"0.5px solid #1D9E75"}}>
     <p style={{margin:0,fontSize:14,color:"#085041",fontWeight:500}}>Unlocked: {newBadges.map(id=>BADGES.find(b=>b.id===id)?.label).join(", ")}</p>
     <button onClick={()=>setNewBadges([])} style={{fontSize:12,color:"#1D9E75",background:"none",border:"none",padding:0,cursor:"pointer",marginTop:4}}>Dismiss</button>
    </div>}
   </div>
  );
 }

 // ── HOME VIEW ─────────────────────────────────────────────────────────────
 return (
  <div style={{padding:"1rem 0"}}>
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.5rem"}}>
    <div>
     <h1 style={{fontSize:20,fontWeight:500,margin:0}}>Harvey's Revision Quest</h1>
     <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"2px 0 0"}}>EOY Assessments · 27 Apr – 10 May 2026</p>
    </div>
    <div style={{textAlign:"right"}}>
     <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>Level {level}</p>
     <p style={{margin:0,fontSize:22,fontWeight:500}}>{stats.totalXP} XP</p>
    </div>
   </div>
   <div style={{height:6,background:"var(--color-background-secondary)",borderRadius:3,marginBottom:"1rem",overflow:"hidden"}}>
    <div style={{height:"100%",width:`${xpInLvl}%`,background:"#7F77DD",borderRadius:3,transition:"width 0.5s"}}/>
   </div>
   <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:"1.5rem"}}>
    {[["Done",`${doneActs}/${totalActs.length}`],["Sessions",stats.totalSessions],["Streak",`${stats.streak}🔥`],["Badges",`${stats.earnedBadges.length}/${BADGES.length}`]].map(([l,v])=>(
     <div key={l} style={{padding:"8px",borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)"}}>
      <p style={{margin:0,fontSize:10,color:"var(--color-text-secondary)"}}>{l}</p>
      <p style={{margin:0,fontSize:16,fontWeight:500}}>{v}</p>
     </div>
    ))}
   </div>
   <h2 style={{fontSize:14,fontWeight:500,margin:"0 0 0.75rem",color:"var(--color-text-secondary)"}}>ALL SUBJECTS</h2>
   <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:"1.25rem"}}>
    {SUBJECTS.map(s=>{
     const ks=allKeys(s);
     const d=ks.filter(k=>stats.completedActivities[k]).length;
     const c=COLS[s.id];
     return(
      <div key={s.id} onClick={()=>go("subject",s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:"var(--border-radius-lg)",border:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",cursor:"pointer"}}>
       <span style={{fontSize:20,flexShrink:0}}>{s.emoji}</span>
       <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
         <span style={{fontSize:13,fontWeight:500}}>{s.name}</span>
         <span style={{fontSize:10,padding:"1px 5px",borderRadius:3,background:c.l,color:c.d}}>{s.units.length}u</span>
        </div>
        <div style={{height:3,background:"var(--color-background-secondary)",borderRadius:2,overflow:"hidden"}}>
         <div style={{height:"100%",width:`${ks.length?Math.round((d/ks.length)*100):0}%`,background:c.c,borderRadius:2}}/>
        </div>
       </div>
       <span style={{fontSize:11,color:"var(--color-text-secondary)",flexShrink:0}}>{d}/{ks.length}</span>
       <span style={{color:"var(--color-text-secondary)",fontSize:12}}>›</span>
      </div>
     );
    })}
   </div>
   <button onClick={()=>go("badges")} style={{width:"100%",padding:"10px",fontSize:13,borderRadius:"var(--border-radius-md)",border:"0.5px solid var(--color-border-secondary)",background:"var(--color-background-primary)",cursor:"pointer"}}>🏅 View badges ({stats.earnedBadges.length}/{BADGES.length})</button>
   {newBadges.length>0&&<div style={{marginTop:"1rem",padding:"12px",borderRadius:"var(--border-radius-md)",background:"#E1F5EE",border:"0.5px solid #1D9E75"}}>
    <p style={{margin:0,fontSize:14,color:"#085041",fontWeight:500}}>Badge unlocked: {newBadges.map(id=>BADGES.find(b=>b.id===id)?.label).join(", ")}!</p>
    <button onClick={()=>setNewBadges([])} style={{fontSize:12,color:"#1D9E75",background:"none",border:"none",padding:0,cursor:"pointer",marginTop:4}}>Dismiss</button>
   </div>}
   {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:toast.col,color:"white",padding:"8px 20px",borderRadius:"var(--border-radius-lg)",fontSize:14,fontWeight:500,zIndex:99}}>{toast.msg}</div>}
  </div>
 );
}