// ─── Chapter-specific mock test questions & resources ────────────────────────

export interface MCQ {
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
}

export interface ChapterResource {
  title: string;
  url: string;
  type: 'YouTube' | 'Notes' | 'Practice';
  icon: string;
}

// Generate deterministic mock questions for any chapter
export function getChapterMockTest(subject: string, chapter: string): MCQ[] {
  const bank = QUESTION_BANK[chapter];
  if (bank) return bank;
  // Fallback: generate generic questions
  return Array.from({ length: 10 }, (_, i) => ({
    question: `Question ${i + 1} on "${chapter}" (${subject}): Which of the following statements is correct?`,
    options: [`Option A for Q${i + 1}`, `Option B for Q${i + 1}`, `Option C for Q${i + 1}`, `Option D for Q${i + 1}`],
    correct: i % 4,
    explanation: `The correct answer demonstrates a key concept from ${chapter}.`,
  }));
}

export function getChapterResources(subject: string, chapter: string): ChapterResource[] {
  const specific = RESOURCE_BANK[chapter];
  if (specific) return specific;
  const subjectChannel: Record<string, string> = {
    Physics: 'PhysicsWallah', Chemistry: 'PhysicsWallah', Mathematics: 'UnacademyJEE', Biology: 'PWNEET',
  };
  const ch = subjectChannel[subject] || 'PhysicsWallah';
  return [
    { title: `${chapter} — Full Lecture`, url: `https://www.youtube.com/@${ch}`, type: 'YouTube', icon: '▶️' },
    { title: `${chapter} — Quick Revision`, url: `https://www.youtube.com/@${ch}`, type: 'YouTube', icon: '⚡' },
    { title: `${chapter} — Practice Problems`, url: `https://www.youtube.com/@${ch}`, type: 'Practice', icon: '📝' },
  ];
}

// ─── Question Bank (key chapters) ───────────────────────────────────────────

const QUESTION_BANK: Record<string, MCQ[]> = {
  'Kinematics': [
    { question: 'A ball is thrown vertically upward with velocity 20 m/s. What is the maximum height reached? (g = 10 m/s²)', options: ['10 m', '20 m', '30 m', '40 m'], correct: 1, explanation: 'Using v² = u² - 2gh, h = u²/2g = 400/20 = 20 m.' },
    { question: 'A car accelerates from rest at 2 m/s². What is its velocity after 5 seconds?', options: ['5 m/s', '10 m/s', '15 m/s', '20 m/s'], correct: 1, explanation: 'v = u + at = 0 + 2×5 = 10 m/s.' },
    { question: 'The slope of a velocity-time graph gives:', options: ['Displacement', 'Acceleration', 'Speed', 'Distance'], correct: 1, explanation: 'The slope of v-t graph = dv/dt = acceleration.' },
    { question: 'A projectile is fired at 45°. Its range is maximum when:', options: ['θ = 30°', 'θ = 45°', 'θ = 60°', 'θ = 90°'], correct: 1, explanation: 'Range R = u²sin2θ/g is maximum when 2θ = 90°, i.e., θ = 45°.' },
    { question: 'Two balls are dropped from heights h and 4h. The ratio of time taken is:', options: ['1:2', '1:4', '2:1', '1:√2'], correct: 0, explanation: 't = √(2h/g), so ratio = √h/√(4h) = 1/2.' },
    { question: 'A body travels 10 m in 2nd second of free fall. What is g?', options: ['5 m/s²', '10 m/s²', '15 m/s²', '20 m/s²'], correct: 1, explanation: 'Distance in nth second = u + a(2n-1)/2. For free fall: 10 = 0 + g(3)/2, g = 20/3 ≈ 10 m/s².' },
    { question: 'The area under a velocity-time graph gives:', options: ['Acceleration', 'Velocity', 'Displacement', 'Force'], correct: 2, explanation: 'Area under v-t graph = ∫v dt = displacement.' },
    { question: 'A stone is thrown horizontally from a cliff. Its path is:', options: ['Straight line', 'Circle', 'Parabola', 'Hyperbola'], correct: 2, explanation: 'Horizontal projectile follows a parabolic path.' },
    { question: 'If velocity is doubled, kinetic energy becomes:', options: ['Double', 'Triple', 'Four times', 'Half'], correct: 2, explanation: 'KE = ½mv². If v → 2v, KE → 4 × ½mv².' },
    { question: 'Relative velocity of A w.r.t. B when both move in same direction:', options: ['vA + vB', 'vA - vB', 'vA × vB', 'vA / vB'], correct: 1, explanation: 'Relative velocity = vA - vB when both move in the same direction.' },
  ],
  'Laws of Motion': [
    { question: 'Newton\'s first law is also called:', options: ['Law of acceleration', 'Law of inertia', 'Law of action-reaction', 'Law of gravitation'], correct: 1, explanation: 'Newton\'s first law is the law of inertia.' },
    { question: 'A 5 kg block is pushed with 20 N force on a frictionless surface. Acceleration is:', options: ['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²'], correct: 1, explanation: 'F = ma, a = F/m = 20/5 = 4 m/s².' },
    { question: 'Action and reaction forces act on:', options: ['Same body', 'Different bodies', 'Same point', 'None'], correct: 1, explanation: 'Newton\'s third law: action and reaction act on different bodies.' },
    { question: 'The unit of force in SI system is:', options: ['Dyne', 'Newton', 'Joule', 'Watt'], correct: 1, explanation: 'SI unit of force is Newton (N).' },
    { question: 'A lift accelerates upward at 2 m/s². Apparent weight of a 50 kg man is:', options: ['490 N', '500 N', '590 N', '600 N'], correct: 2, explanation: 'W\' = m(g+a) = 50(10+2) = 600... corrected: 50(9.8+2) = 590 N.' },
    { question: 'Friction force is proportional to:', options: ['Area of contact', 'Normal force', 'Velocity', 'Mass only'], correct: 1, explanation: 'f = μN, friction is proportional to normal force.' },
    { question: 'A rocket works on the principle of:', options: ['Energy conservation', 'Momentum conservation', 'Mass conservation', 'Bernoulli\'s theorem'], correct: 1, explanation: 'Rockets work on conservation of linear momentum (Newton\'s 3rd law).' },
    { question: 'Static friction is always:', options: ['Equal to applied force', 'Greater than kinetic friction', 'Less than or equal to μsN', 'Zero'], correct: 2, explanation: 'Static friction adjusts up to a maximum of μsN.' },
    { question: 'If net external force on a body is zero, it is in:', options: ['Equilibrium', 'Motion', 'Acceleration', 'Rest only'], correct: 0, explanation: 'Zero net force means the body is in equilibrium (at rest or uniform motion).' },
    { question: 'Impulse equals:', options: ['Force × distance', 'Force × time', 'Mass × velocity', 'Both B and C'], correct: 3, explanation: 'Impulse = F×t = Δp = mΔv.' },
  ],
  'Thermodynamics': [
    { question: 'In an isothermal process:', options: ['Temperature changes', 'Pressure is constant', 'Temperature is constant', 'Volume is constant'], correct: 2, explanation: 'Isothermal = constant temperature.' },
    { question: 'First law of thermodynamics is a statement of:', options: ['Conservation of momentum', 'Conservation of energy', 'Conservation of mass', 'Entropy'], correct: 1, explanation: 'First law: ΔU = Q - W (energy conservation).' },
    { question: 'Entropy of an isolated system always:', options: ['Decreases', 'Remains same', 'Increases or remains same', 'Becomes zero'], correct: 2, explanation: 'Second law: entropy of isolated system never decreases.' },
    { question: 'In an adiabatic process:', options: ['Q = 0', 'W = 0', 'ΔU = 0', 'ΔT = 0'], correct: 0, explanation: 'Adiabatic means no heat exchange, Q = 0.' },
    { question: 'Carnot engine efficiency depends on:', options: ['Working substance', 'Temperature of reservoirs', 'Volume', 'Pressure'], correct: 1, explanation: 'η = 1 - T₂/T₁, depends only on reservoir temperatures.' },
    { question: 'Work done in a free expansion is:', options: ['Positive', 'Negative', 'Zero', 'Infinite'], correct: 2, explanation: 'Free expansion: Pext = 0, so W = 0.' },
    { question: 'For an ideal gas, internal energy depends on:', options: ['Pressure only', 'Volume only', 'Temperature only', 'All three'], correct: 2, explanation: 'For ideal gas, U = f(T) only.' },
    { question: 'Cp - Cv for an ideal gas equals:', options: ['R', '2R', 'R/2', '0'], correct: 0, explanation: 'Mayer\'s relation: Cp - Cv = R.' },
    { question: 'A reversible process is:', options: ['Fast', 'Quasi-static', 'Irreversible', 'Spontaneous'], correct: 1, explanation: 'Reversible processes are quasi-static (infinitely slow).' },
    { question: 'Heat engine converts:', options: ['Work to heat', 'Heat to work', 'Mass to energy', 'Potential to kinetic'], correct: 1, explanation: 'Heat engine converts heat energy into mechanical work.' },
  ],
  'Electrostatics': [
    { question: 'Coulomb\'s law force is proportional to:', options: ['r', '1/r', '1/r²', 'r²'], correct: 2, explanation: 'F = kq₁q₂/r², inversely proportional to r².' },
    { question: 'Electric field inside a conductor is:', options: ['Maximum', 'Minimum', 'Zero', 'Infinite'], correct: 2, explanation: 'In electrostatic equilibrium, E inside conductor = 0.' },
    { question: 'Gauss\'s law relates electric flux to:', options: ['Charge enclosed', 'Total charge', 'Surface area', 'Potential'], correct: 0, explanation: 'Gauss\'s law: Φ = q_enclosed/ε₀.' },
    { question: 'Capacitance of a parallel plate capacitor is: C =', options: ['ε₀A/d', 'ε₀d/A', 'ε₀Ad', 'A/ε₀d'], correct: 0, explanation: 'C = ε₀A/d for parallel plate capacitor.' },
    { question: 'Electric potential is a:', options: ['Vector', 'Scalar', 'Tensor', 'None'], correct: 1, explanation: 'Electric potential is a scalar quantity.' },
    { question: 'Energy stored in a capacitor:', options: ['½CV²', 'CV²', '2CV²', 'CV'], correct: 0, explanation: 'U = ½CV² = ½QV = Q²/2C.' },
    { question: 'Dielectric constant of a conductor is:', options: ['0', '1', 'Infinity', '-1'], correct: 2, explanation: 'A conductor has infinite dielectric constant (perfect screening).' },
    { question: 'Equipotential surfaces are always:', options: ['Parallel to E', 'Perpendicular to E', 'At 45° to E', 'Random'], correct: 1, explanation: 'Equipotential surfaces are perpendicular to electric field lines.' },
    { question: 'Unit of electric field is:', options: ['N/C', 'C/N', 'J/C', 'Both A and C'], correct: 3, explanation: 'E is measured in N/C or equivalently V/m (J/C·m = V/m).' },
    { question: 'Two capacitors in series: total capacitance is:', options: ['C₁ + C₂', 'C₁C₂/(C₁+C₂)', 'C₁ - C₂', '(C₁+C₂)/C₁C₂'], correct: 1, explanation: '1/C = 1/C₁ + 1/C₂, so C = C₁C₂/(C₁+C₂).' },
  ],
  'Genetics and Evolution': [
    { question: 'Who is known as the father of genetics?', options: ['Darwin', 'Mendel', 'Lamarck', 'Watson'], correct: 1, explanation: 'Gregor Johann Mendel is the father of genetics.' },
    { question: 'Mendel\'s law of segregation is also called:', options: ['Law of dominance', 'Law of purity of gametes', 'Law of independent assortment', 'Law of inheritance'], correct: 1, explanation: 'Law of segregation = law of purity of gametes.' },
    { question: 'DNA replication is:', options: ['Conservative', 'Semi-conservative', 'Dispersive', 'Random'], correct: 1, explanation: 'Watson-Crick model: DNA replication is semi-conservative (Meselson-Stahl).' },
    { question: 'The phenotypic ratio of a monohybrid cross is:', options: ['1:2:1', '3:1', '9:3:3:1', '1:1'], correct: 1, explanation: 'Monohybrid cross F₂ phenotypic ratio = 3:1 (dominant:recessive).' },
    { question: 'Codominance is seen in:', options: ['Pea flower color', 'ABO blood groups', 'Skin color', 'Height'], correct: 1, explanation: 'ABO blood group: IA and IB are codominant alleles.' },
    { question: 'Hardy-Weinberg equilibrium requires:', options: ['Random mating', 'Large population', 'No migration', 'All of these'], correct: 3, explanation: 'HW equilibrium needs: random mating, large pop, no migration, no mutation, no selection.' },
    { question: 'Point mutation involves change in:', options: ['Chromosome number', 'Single base pair', 'Entire gene', 'Chromosome structure'], correct: 1, explanation: 'Point mutation = change in a single base pair of DNA.' },
    { question: 'Which is a sex-linked disorder?', options: ['Sickle cell anemia', 'Colour blindness', 'Down syndrome', 'Turner syndrome'], correct: 1, explanation: 'Colour blindness is X-linked recessive.' },
    { question: 'Natural selection was proposed by:', options: ['Mendel', 'Lamarck', 'Darwin', 'De Vries'], correct: 2, explanation: 'Charles Darwin proposed natural selection in Origin of Species (1859).' },
    { question: 'Genetic drift is significant in:', options: ['Large populations', 'Small populations', 'All populations equally', 'None'], correct: 1, explanation: 'Genetic drift is most significant in small populations.' },
  ],
  'Human Physiology': [
    { question: 'The functional unit of the kidney is:', options: ['Neuron', 'Nephron', 'Alveolus', 'Hepatocyte'], correct: 1, explanation: 'Nephron is the structural and functional unit of the kidney.' },
    { question: 'Oxyhemoglobin dissociation curve is:', options: ['Linear', 'Sigmoid', 'Exponential', 'Parabolic'], correct: 1, explanation: 'The O₂-Hb dissociation curve is sigmoid (S-shaped) due to cooperative binding.' },
    { question: 'Tidal volume of lungs is approximately:', options: ['150 mL', '500 mL', '1200 mL', '2500 mL'], correct: 1, explanation: 'Tidal volume (normal breathing) ≈ 500 mL.' },
    { question: 'SA node is located in:', options: ['Left atrium', 'Right atrium', 'Left ventricle', 'Right ventricle'], correct: 1, explanation: 'SA node (pacemaker) is in the wall of the right atrium.' },
    { question: 'Bile is produced by:', options: ['Pancreas', 'Gallbladder', 'Liver', 'Stomach'], correct: 2, explanation: 'Bile is produced by the liver and stored in the gallbladder.' },
    { question: 'Normal blood pressure is:', options: ['80/120 mmHg', '120/80 mmHg', '140/90 mmHg', '100/60 mmHg'], correct: 1, explanation: 'Normal BP = 120/80 mmHg (systolic/diastolic).' },
    { question: 'Synaptic transmission is:', options: ['Electrical only', 'Chemical only', 'Usually chemical', 'Mechanical'], correct: 2, explanation: 'Most synapses are chemical (neurotransmitter-mediated), some are electrical.' },
    { question: 'Insulin is secreted by:', options: ['Alpha cells', 'Beta cells', 'Delta cells', 'Liver cells'], correct: 1, explanation: 'Insulin is secreted by β-cells of Islets of Langerhans in pancreas.' },
    { question: 'GFR (Glomerular Filtration Rate) is approximately:', options: ['25 mL/min', '65 mL/min', '125 mL/min', '200 mL/min'], correct: 2, explanation: 'Normal GFR ≈ 125 mL/min (180 L/day).' },
    { question: 'Pepsin works best at pH:', options: ['2', '5', '7', '9'], correct: 0, explanation: 'Pepsin is optimally active at pH 1.5-2 (acidic stomach environment).' },
  ],
  'Integral Calculus': [
    { question: '∫ x² dx equals:', options: ['x³ + C', 'x³/3 + C', '2x + C', 'x²/2 + C'], correct: 1, explanation: '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C. For n=2: x³/3 + C.' },
    { question: '∫₀¹ x dx equals:', options: ['0', '1/2', '1', '2'], correct: 1, explanation: '∫₀¹ x dx = [x²/2]₀¹ = 1/2.' },
    { question: '∫ sin x dx equals:', options: ['cos x + C', '-cos x + C', 'sin x + C', '-sin x + C'], correct: 1, explanation: 'd/dx(-cos x) = sin x, so ∫ sin x dx = -cos x + C.' },
    { question: '∫ eˣ dx equals:', options: ['eˣ + C', 'xeˣ + C', 'eˣ/x + C', 'ln x + C'], correct: 0, explanation: '∫ eˣ dx = eˣ + C since d/dx(eˣ) = eˣ.' },
    { question: '∫ 1/x dx equals:', options: ['x + C', 'ln|x| + C', '-1/x² + C', '1/x² + C'], correct: 1, explanation: '∫ 1/x dx = ln|x| + C.' },
    { question: 'Area under curve y = f(x) from a to b:', options: ['f(b) - f(a)', '∫ₐᵇ f(x) dx', 'f\'(b) - f\'(a)', 'None'], correct: 1, explanation: 'Area = ∫ₐᵇ f(x) dx (definite integral).' },
    { question: 'Integration by parts formula:', options: ['∫uv dx', '∫u dv = uv - ∫v du', '∫(u+v) dx', 'd(uv)/dx'], correct: 1, explanation: 'Integration by parts: ∫u dv = uv - ∫v du.' },
    { question: '∫ cos²x dx can be solved using:', options: ['Direct integration', 'cos 2x identity', 'Substitution only', 'Partial fractions'], correct: 1, explanation: 'cos²x = (1 + cos 2x)/2, then integrate.' },
    { question: '∫₋ₐᵃ f(x) dx = 0 when f(x) is:', options: ['Even', 'Odd', 'Constant', 'Periodic'], correct: 1, explanation: 'For odd functions: f(-x) = -f(x), so integral over symmetric limits = 0.' },
    { question: '∫ sec²x dx equals:', options: ['sec x + C', 'tan x + C', 'cot x + C', '-csc²x + C'], correct: 1, explanation: 'd/dx(tan x) = sec²x, so ∫ sec²x dx = tan x + C.' },
  ],
  'Coordinate Geometry': [
    { question: 'Distance between (1,2) and (4,6) is:', options: ['3', '4', '5', '7'], correct: 2, explanation: 'd = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5.' },
    { question: 'Equation of a circle with center (0,0) and radius r:', options: ['x² + y² = r', 'x² + y² = r²', 'x + y = r', '(x+y)² = r²'], correct: 1, explanation: 'Standard circle: x² + y² = r².' },
    { question: 'Slope of a line perpendicular to y = 2x + 3:', options: ['2', '-2', '1/2', '-1/2'], correct: 3, explanation: 'Perpendicular slopes: m₁ × m₂ = -1. If m₁ = 2, m₂ = -1/2.' },
    { question: 'Eccentricity of a parabola is:', options: ['0', '1', 'Less than 1', 'Greater than 1'], correct: 1, explanation: 'Parabola: e = 1; Ellipse: e < 1; Hyperbola: e > 1.' },
    { question: 'The focus of y² = 4ax is at:', options: ['(a, 0)', '(0, a)', '(-a, 0)', '(0, -a)'], correct: 0, explanation: 'For y² = 4ax, focus is at (a, 0).' },
    { question: 'Midpoint of (2, 4) and (6, 8) is:', options: ['(3, 5)', '(4, 6)', '(8, 12)', '(2, 2)'], correct: 1, explanation: 'Midpoint = ((2+6)/2, (4+8)/2) = (4, 6).' },
    { question: 'section formula divides line in ratio m:n internally:', options: ['(mx₂+nx₁)/(m+n)', '(mx₁+nx₂)/(m+n)', '(x₁+x₂)/2', 'None'], correct: 0, explanation: 'x = (mx₂ + nx₁)/(m+n) for internal division.' },
    { question: 'A line passing through origin has equation:', options: ['y = mx + c', 'y = mx', 'x = c', 'y = c'], correct: 1, explanation: 'Through origin: c = 0, so y = mx.' },
    { question: 'Equation of ellipse with semi-axes a, b:', options: ['x²/a² + y²/b² = 1', 'x²/a + y²/b = 1', 'x/a + y/b = 1', 'xy = ab'], correct: 0, explanation: 'Standard ellipse: x²/a² + y²/b² = 1.' },
    { question: 'Angle between lines with slopes m₁ and m₂:', options: ['tan⁻¹(m₁+m₂)', 'tan⁻¹|(m₁-m₂)/(1+m₁m₂)|', 'm₁ - m₂', 'tan⁻¹(m₁m₂)'], correct: 1, explanation: 'θ = tan⁻¹|(m₁ - m₂)/(1 + m₁m₂)|.' },
  ],
  'Electrochemistry': [
    { question: 'In electrolysis, reduction occurs at:', options: ['Anode', 'Cathode', 'Both', 'Neither'], correct: 1, explanation: 'Cathode: reduction (gain of electrons). Anode: oxidation.' },
    { question: 'Faraday\'s constant is approximately:', options: ['96500 C/mol', '8.314 J/mol·K', '6.022×10²³', '1.6×10⁻¹⁹ C'], correct: 0, explanation: 'F = 96485 ≈ 96500 C/mol of electrons.' },
    { question: 'Standard hydrogen electrode potential is:', options: ['-1 V', '0 V', '+1 V', '+0.5 V'], correct: 1, explanation: 'SHE is defined as 0 V (reference electrode).' },
    { question: 'Nernst equation relates EMF to:', options: ['Temperature only', 'Concentration', 'Pressure only', 'Volume'], correct: 1, explanation: 'E = E° - (RT/nF)ln Q. EMF depends on ion concentrations.' },
    { question: 'In a galvanic cell, anode is:', options: ['Positive', 'Negative', 'Neutral', 'Varies'], correct: 1, explanation: 'In galvanic cell: anode = negative (oxidation), cathode = positive (reduction).' },
    { question: 'Specific conductance has units:', options: ['Ω·cm', 'S/cm', 'S·cm²', 'Ω⁻¹'], correct: 1, explanation: 'Specific conductance (κ) = S/cm or Ω⁻¹cm⁻¹.' },
    { question: 'Kohlrausch\'s law applies to:', options: ['Strong electrolytes at infinite dilution', 'Weak electrolytes only', 'Non-electrolytes', 'Metals'], correct: 0, explanation: 'Kohlrausch: Λ°m = sum of individual ionic conductances at infinite dilution.' },
    { question: 'Rusting of iron is:', options: ['Oxidation', 'Reduction', 'Electrochemical corrosion', 'Physical change'], correct: 2, explanation: 'Rusting is electrochemical corrosion: Fe → Fe²⁺ + 2e⁻ (anodic); O₂ + H₂O + e⁻ → OH⁻ (cathodic).' },
    { question: 'Lead storage battery anode is made of:', options: ['Cu', 'Zn', 'Pb', 'PbO₂'], correct: 2, explanation: 'Lead storage: anode = Pb, cathode = PbO₂, electrolyte = H₂SO₄.' },
    { question: 'Molar conductivity increases on dilution because:', options: ['More ions form', 'Ions move faster', 'Inter-ionic interactions decrease', 'Temperature rises'], correct: 2, explanation: 'Dilution reduces inter-ionic attractions, increasing ionic mobility.' },
  ],
};

// ─── Resource Bank ──────────────────────────────────────────────────────────

const RESOURCE_BANK: Record<string, ChapterResource[]> = {
  'Kinematics': [
    { title: 'Kinematics Full Chapter — Physics Wallah', url: 'https://www.youtube.com/watch?v=kinematics-pw', type: 'YouTube', icon: '▶️' },
    { title: 'Kinematics One Shot — Unacademy', url: 'https://www.youtube.com/watch?v=kinematics-ua', type: 'YouTube', icon: '⚡' },
    { title: 'Kinematics PYQ Analysis — JEE', url: 'https://www.youtube.com/watch?v=kinematics-pyq', type: 'Practice', icon: '📝' },
    { title: 'Kinematics Formula Sheet', url: 'https://www.youtube.com/@PhysicsWallah', type: 'Notes', icon: '📄' },
  ],
  'Laws of Motion': [
    { title: 'Laws of Motion — Physics Wallah', url: 'https://www.youtube.com/@PhysicsWallah', type: 'YouTube', icon: '▶️' },
    { title: 'Newton\'s Laws One Shot', url: 'https://www.youtube.com/@UnacademyJEE', type: 'YouTube', icon: '⚡' },
    { title: 'Friction & NLM Problems', url: 'https://www.youtube.com/@IITPAL', type: 'Practice', icon: '📝' },
  ],
  'Thermodynamics': [
    { title: 'Thermodynamics Complete — PW', url: 'https://www.youtube.com/@PhysicsWallah', type: 'YouTube', icon: '▶️' },
    { title: 'Thermo One Shot — Sachin Sir', url: 'https://www.youtube.com/@UnacademyJEE', type: 'YouTube', icon: '⚡' },
    { title: 'Carnot Engine & PYQs', url: 'https://www.youtube.com/@IITPAL', type: 'Practice', icon: '📝' },
  ],
  'Genetics and Evolution': [
    { title: 'Genetics Full Chapter — NEET PW', url: 'https://www.youtube.com/@PWNEET', type: 'YouTube', icon: '▶️' },
    { title: 'Mendel\'s Laws One Shot', url: 'https://www.youtube.com/@UnacademyNEET', type: 'YouTube', icon: '⚡' },
    { title: 'Genetics NCERT Line by Line', url: 'https://www.youtube.com/@khanacademy', type: 'Notes', icon: '📖' },
    { title: 'Genetics PYQ 10 Years', url: 'https://www.youtube.com/@PWNEET', type: 'Practice', icon: '📝' },
  ],
  'Human Physiology': [
    { title: 'Human Physiology Complete — PW NEET', url: 'https://www.youtube.com/@PWNEET', type: 'YouTube', icon: '▶️' },
    { title: 'Digestion & Absorption One Shot', url: 'https://www.youtube.com/@UnacademyNEET', type: 'YouTube', icon: '⚡' },
    { title: 'Circulatory System — Khan Academy', url: 'https://www.youtube.com/@khanacademy', type: 'YouTube', icon: '▶️' },
    { title: 'NCERT Exemplar — Physiology', url: 'https://www.youtube.com/@PWNEET', type: 'Practice', icon: '📝' },
  ],
  'Integral Calculus': [
    { title: 'Integration Full Chapter — PW', url: 'https://www.youtube.com/@PhysicsWallah', type: 'YouTube', icon: '▶️' },
    { title: 'Definite Integrals One Shot', url: 'https://www.youtube.com/@UnacademyJEE', type: 'YouTube', icon: '⚡' },
    { title: 'Integration Tricks for JEE', url: 'https://www.youtube.com/@IITPAL', type: 'Practice', icon: '📝' },
  ],
  'Coordinate Geometry': [
    { title: 'Coordinate Geometry — PW', url: 'https://www.youtube.com/@PhysicsWallah', type: 'YouTube', icon: '▶️' },
    { title: 'Conic Sections One Shot', url: 'https://www.youtube.com/@UnacademyJEE', type: 'YouTube', icon: '⚡' },
    { title: 'Straight Lines & Circles PYQs', url: 'https://www.youtube.com/@IITPAL', type: 'Practice', icon: '📝' },
  ],
  'Electrochemistry': [
    { title: 'Electrochemistry Full — PW', url: 'https://www.youtube.com/@PhysicsWallah', type: 'YouTube', icon: '▶️' },
    { title: 'Nernst Equation & Cells', url: 'https://www.youtube.com/@UnacademyJEE', type: 'YouTube', icon: '⚡' },
    { title: 'Electrolysis Numericals', url: 'https://www.youtube.com/@IITPAL', type: 'Practice', icon: '📝' },
  ],
};
