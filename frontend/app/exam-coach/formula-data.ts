// ─── Chapter-wise Formulas ──────────────────────────────────────────────────

export interface Formula {
  name: string;
  formula: string;
  description?: string;
}

export interface FormulaSection {
  heading: string;
  formulas: Formula[];
}

export function getChapterFormulas(subject: string, chapter: string): FormulaSection[] {
  const key = chapter;
  if (FORMULA_BANK[key]) return FORMULA_BANK[key];
  // Fallback
  return [{ heading: chapter, formulas: [{ name: 'Formulas coming soon', formula: '—', description: `Detailed formulas for ${chapter} will be added shortly.` }] }];
}

const FORMULA_BANK: Record<string, FormulaSection[]> = {

  // ════════════════════════ PHYSICS ════════════════════════

  'Physics and Measurement': [
    { heading: 'Dimensional Analysis', formulas: [
      { name: 'Dimensional formula of Force', formula: '[M L T⁻²]' },
      { name: 'Dimensional formula of Energy', formula: '[M L² T⁻²]' },
      { name: 'Dimensional formula of Power', formula: '[M L² T⁻³]' },
      { name: 'Dimensional formula of Pressure', formula: '[M L⁻¹ T⁻²]' },
    ]},
    { heading: 'Errors', formulas: [
      { name: 'Absolute error', formula: 'Δa = |a - a_mean|' },
      { name: 'Relative error', formula: 'δa = Δa / a_mean' },
      { name: 'Percentage error', formula: '% error = (Δa / a_mean) × 100' },
    ]},
  ],

  'Kinematics': [
    { heading: 'Equations of Motion', formulas: [
      { name: 'First equation', formula: 'v = u + at', description: 'Final velocity' },
      { name: 'Second equation', formula: 's = ut + ½at²', description: 'Displacement' },
      { name: 'Third equation', formula: 'v² = u² + 2as', description: 'Velocity-displacement' },
      { name: 'Distance in nth second', formula: 'sₙ = u + a(2n−1)/2' },
    ]},
    { heading: 'Projectile Motion', formulas: [
      { name: 'Range', formula: 'R = u²sin2θ / g' },
      { name: 'Max height', formula: 'H = u²sin²θ / 2g' },
      { name: 'Time of flight', formula: 'T = 2u sinθ / g' },
      { name: 'Horizontal range (max)', formula: 'R_max = u² / g  (at θ = 45°)' },
    ]},
    { heading: 'Relative Motion', formulas: [
      { name: 'Relative velocity', formula: 'v_AB = v_A − v_B' },
    ]},
  ],

  'Laws of Motion': [
    { heading: 'Newton\'s Laws', formulas: [
      { name: 'Second law', formula: 'F = ma', description: 'Net force = mass × acceleration' },
      { name: 'Impulse', formula: 'J = FΔt = Δp', description: 'Change in momentum' },
      { name: 'Momentum', formula: 'p = mv' },
    ]},
    { heading: 'Friction', formulas: [
      { name: 'Static friction (max)', formula: 'f_s = μ_s × N' },
      { name: 'Kinetic friction', formula: 'f_k = μ_k × N' },
      { name: 'Angle of friction', formula: 'tan λ = μ' },
    ]},
    { heading: 'Circular Motion', formulas: [
      { name: 'Centripetal force', formula: 'F = mv²/r = mω²r' },
      { name: 'Banking angle', formula: 'tan θ = v²/rg' },
    ]},
  ],

  'Work, Energy, and Power': [
    { heading: 'Work & Energy', formulas: [
      { name: 'Work done', formula: 'W = F·s·cosθ', description: 'Force × displacement × cosine of angle' },
      { name: 'Kinetic energy', formula: 'KE = ½mv²' },
      { name: 'Potential energy (gravity)', formula: 'PE = mgh' },
      { name: 'Work-energy theorem', formula: 'W_net = ΔKE = ½mv² − ½mu²' },
      { name: 'Spring PE', formula: 'PE = ½kx²' },
    ]},
    { heading: 'Power', formulas: [
      { name: 'Power', formula: 'P = W/t = F·v' },
      { name: 'Efficiency', formula: 'η = (P_output / P_input) × 100%' },
    ]},
  ],

  'Rotational Motion': [
    { heading: 'Rotational Kinematics', formulas: [
      { name: 'Angular velocity', formula: 'ω = dθ/dt' },
      { name: 'Angular acceleration', formula: 'α = dω/dt' },
      { name: 'Torque', formula: 'τ = r × F = Iα' },
      { name: 'Angular momentum', formula: 'L = Iω = r × p' },
    ]},
    { heading: 'Moment of Inertia', formulas: [
      { name: 'Solid sphere', formula: 'I = (2/5)MR²' },
      { name: 'Hollow sphere', formula: 'I = (2/3)MR²' },
      { name: 'Solid cylinder', formula: 'I = ½MR²' },
      { name: 'Rod (center)', formula: 'I = (1/12)ML²' },
      { name: 'Parallel axis theorem', formula: 'I = I_cm + Md²' },
    ]},
    { heading: 'Rotational Energy', formulas: [
      { name: 'Rotational KE', formula: 'KE = ½Iω²' },
      { name: 'Rolling (without slipping)', formula: 'KE = ½mv² + ½Iω²' },
    ]},
  ],

  'Gravitation': [
    { heading: 'Gravitational Force & Field', formulas: [
      { name: 'Newton\'s law of gravitation', formula: 'F = GMm/r²' },
      { name: 'Gravitational field', formula: 'g = GM/R²' },
      { name: 'Variation with height', formula: 'g_h = g(1 − 2h/R)  (h << R)' },
      { name: 'Variation with depth', formula: 'g_d = g(1 − d/R)' },
    ]},
    { heading: 'Orbital Mechanics', formulas: [
      { name: 'Orbital velocity', formula: 'v_o = √(GM/r) = √(gR)' },
      { name: 'Escape velocity', formula: 'v_e = √(2GM/R) = √(2gR)' },
      { name: 'Time period', formula: 'T = 2π√(r³/GM)' },
      { name: 'Gravitational PE', formula: 'U = −GMm/r' },
    ]},
  ],

  'Thermodynamics': [
    { heading: 'Laws & Processes', formulas: [
      { name: 'First law', formula: 'ΔU = Q − W', description: 'Internal energy = heat − work' },
      { name: 'Isothermal work', formula: 'W = nRT ln(V₂/V₁)' },
      { name: 'Adiabatic relation', formula: 'PVᵞ = constant' },
      { name: 'Carnot efficiency', formula: 'η = 1 − T₂/T₁' },
    ]},
    { heading: 'Gas Relations', formulas: [
      { name: 'Ideal gas law', formula: 'PV = nRT' },
      { name: 'Mayer\'s relation', formula: 'Cₚ − Cᵥ = R' },
      { name: 'Adiabatic index', formula: 'γ = Cₚ/Cᵥ' },
      { name: 'Internal energy', formula: 'U = nCᵥT = (f/2)nRT' },
    ]},
  ],

  'Kinetic Theory of Gases': [
    { heading: 'Molecular Speeds', formulas: [
      { name: 'RMS speed', formula: 'v_rms = √(3RT/M) = √(3kT/m)' },
      { name: 'Average speed', formula: 'v_avg = √(8RT/πM)' },
      { name: 'Most probable speed', formula: 'v_mp = √(2RT/M)' },
      { name: 'Ratio', formula: 'v_mp : v_avg : v_rms = 1 : 1.128 : 1.224' },
    ]},
    { heading: 'Pressure & Energy', formulas: [
      { name: 'Pressure', formula: 'P = (1/3)ρ·v²_rms' },
      { name: 'KE per molecule', formula: 'KE = (3/2)kT' },
      { name: 'Degrees of freedom', formula: 'f = 3 (mono), 5 (di), 6 (poly)' },
    ]},
  ],

  'Electrostatics': [
    { heading: 'Electric Force & Field', formulas: [
      { name: 'Coulomb\'s law', formula: 'F = kq₁q₂/r²  (k = 9×10⁹ Nm²/C²)' },
      { name: 'Electric field', formula: 'E = kq/r² = F/q₀' },
      { name: 'Electric potential', formula: 'V = kq/r' },
    ]},
    { heading: 'Capacitance', formulas: [
      { name: 'Parallel plate', formula: 'C = ε₀A/d' },
      { name: 'With dielectric', formula: 'C = Kε₀A/d' },
      { name: 'Series', formula: '1/C = 1/C₁ + 1/C₂ + ...' },
      { name: 'Parallel', formula: 'C = C₁ + C₂ + ...' },
      { name: 'Energy stored', formula: 'U = ½CV² = Q²/2C' },
    ]},
    { heading: 'Gauss\'s Law', formulas: [
      { name: 'Electric flux', formula: 'Φ = ∮E·dA = q_enc/ε₀' },
    ]},
  ],

  'Current Electricity': [
    { heading: 'Ohm\'s Law & Resistance', formulas: [
      { name: 'Ohm\'s law', formula: 'V = IR' },
      { name: 'Resistance', formula: 'R = ρL/A' },
      { name: 'Conductance', formula: 'G = 1/R = σA/L' },
      { name: 'Temperature dependence', formula: 'R_t = R₀(1 + αΔT)' },
    ]},
    { heading: 'Circuits', formulas: [
      { name: 'Series resistance', formula: 'R = R₁ + R₂ + ...' },
      { name: 'Parallel resistance', formula: '1/R = 1/R₁ + 1/R₂ + ...' },
      { name: 'Power', formula: 'P = VI = I²R = V²/R' },
      { name: 'Kirchhoff\'s junction rule', formula: 'ΣI_in = ΣI_out' },
      { name: 'Kirchhoff\'s loop rule', formula: 'ΣV = 0 (around loop)' },
      { name: 'Wheatstone bridge', formula: 'P/Q = R/S (balanced)' },
    ]},
  ],

  'Optics': [
    { heading: 'Reflection & Refraction', formulas: [
      { name: 'Mirror formula', formula: '1/f = 1/v + 1/u' },
      { name: 'Lens formula', formula: '1/f = 1/v − 1/u' },
      { name: 'Magnification (mirror)', formula: 'm = −v/u' },
      { name: 'Snell\'s law', formula: 'n₁sinθ₁ = n₂sinθ₂' },
      { name: 'Critical angle', formula: 'sin θ_c = n₂/n₁ (n₁ > n₂)' },
      { name: 'Lens power', formula: 'P = 1/f (in metres) dioptre' },
    ]},
    { heading: 'Wave Optics', formulas: [
      { name: 'Young\'s fringe width', formula: 'β = λD/d' },
      { name: 'Constructive interference', formula: 'Δx = nλ' },
      { name: 'Destructive interference', formula: 'Δx = (n+½)λ' },
    ]},
  ],

  'Oscillations and Waves': [
    { heading: 'SHM', formulas: [
      { name: 'Displacement', formula: 'x = A sin(ωt + φ)' },
      { name: 'Time period (spring)', formula: 'T = 2π√(m/k)' },
      { name: 'Time period (pendulum)', formula: 'T = 2π√(L/g)' },
      { name: 'Angular frequency', formula: 'ω = 2π/T = 2πf' },
      { name: 'Energy in SHM', formula: 'E = ½kA² = ½mω²A²' },
    ]},
    { heading: 'Waves', formulas: [
      { name: 'Wave speed', formula: 'v = fλ = ω/k' },
      { name: 'String wave speed', formula: 'v = √(T/μ)' },
      { name: 'Sound speed', formula: 'v = √(γP/ρ)' },
      { name: 'Doppler effect', formula: 'f\' = f(v ± v_o)/(v ∓ v_s)' },
    ]},
  ],

  // ════════════════════════ CHEMISTRY ════════════════════════

  'Some Basic Concepts in Chemistry': [
    { heading: 'Mole Concept', formulas: [
      { name: 'Moles', formula: 'n = mass/M = N/Nₐ = V/22.4 (at STP)' },
      { name: 'Avogadro\'s number', formula: 'Nₐ = 6.022 × 10²³ mol⁻¹' },
      { name: 'Molarity', formula: 'M = moles of solute / volume (L)' },
      { name: 'Molality', formula: 'm = moles of solute / mass of solvent (kg)' },
      { name: '% composition', formula: '% = (mass of element / molar mass) × 100' },
    ]},
  ],

  'Chemical Thermodynamics': [
    { heading: 'Enthalpy & Entropy', formulas: [
      { name: 'First law', formula: 'ΔU = q + w' },
      { name: 'Enthalpy', formula: 'ΔH = ΔU + PΔV' },
      { name: 'Hess\'s law', formula: 'ΔH_rxn = Σ ΔH_f(products) − Σ ΔH_f(reactants)' },
      { name: 'Gibbs energy', formula: 'ΔG = ΔH − TΔS' },
      { name: 'Spontaneity', formula: 'ΔG < 0 → spontaneous' },
      { name: 'Equilibrium relation', formula: 'ΔG° = −RT ln K' },
    ]},
  ],

  'Equilibrium': [
    { heading: 'Chemical Equilibrium', formulas: [
      { name: 'Equilibrium constant', formula: 'Kc = [Products]ⁿ / [Reactants]ᵐ' },
      { name: 'Relation Kp & Kc', formula: 'Kp = Kc(RT)^Δn' },
      { name: 'Reaction quotient', formula: 'Q vs K determines direction' },
    ]},
    { heading: 'Ionic Equilibrium', formulas: [
      { name: 'pH', formula: 'pH = −log[H⁺]' },
      { name: 'pOH', formula: 'pOH = −log[OH⁻]' },
      { name: 'pH + pOH', formula: 'pH + pOH = 14 (at 25°C)' },
      { name: 'Henderson equation', formula: 'pH = pKa + log([A⁻]/[HA])' },
      { name: 'Solubility product', formula: 'Ksp = [Aⁿ⁺]ᵐ[Bᵐ⁻]ⁿ' },
    ]},
  ],

  'Electrochemistry': [
    { heading: 'Electrochemical Cells', formulas: [
      { name: 'Nernst equation', formula: 'E = E° − (RT/nF) ln Q' },
      { name: 'Nernst (at 25°C)', formula: 'E = E° − (0.0591/n) log Q' },
      { name: 'Faraday\'s first law', formula: 'w = ZIt = (MIt)/(nF)' },
      { name: 'Faraday constant', formula: 'F = 96485 C/mol' },
      { name: 'Cell EMF', formula: 'E°_cell = E°_cathode − E°_anode' },
    ]},
    { heading: 'Conductance', formulas: [
      { name: 'Molar conductivity', formula: 'Λm = κ × 1000/M' },
      { name: 'Kohlrausch\'s law', formula: 'Λ°m = λ°₊ + λ°₋' },
    ]},
  ],

  'Chemical Kinetics': [
    { heading: 'Rate Laws', formulas: [
      { name: 'Rate law', formula: 'Rate = k[A]ⁿ[B]ᵐ' },
      { name: 'Zero order half-life', formula: 't₁/₂ = [A]₀ / 2k' },
      { name: 'First order rate', formula: 'k = (2.303/t) log([A]₀/[A])' },
      { name: 'First order half-life', formula: 't₁/₂ = 0.693/k' },
      { name: 'Arrhenius equation', formula: 'k = A·e^(−Ea/RT)' },
      { name: 'Arrhenius (two temp)', formula: 'ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂)' },
    ]},
  ],

  'Solutions': [
    { heading: 'Colligative Properties', formulas: [
      { name: 'Raoult\'s law', formula: 'P = P°·x_solvent' },
      { name: 'Relative lowering', formula: 'ΔP/P° = x_solute = n₂/(n₁+n₂)' },
      { name: 'Boiling point elevation', formula: 'ΔTb = Kb·m·i' },
      { name: 'Freezing point depression', formula: 'ΔTf = Kf·m·i' },
      { name: 'Osmotic pressure', formula: 'π = iCRT' },
      { name: 'Van\'t Hoff factor', formula: 'i = 1 + (n−1)α' },
    ]},
  ],

  // ════════════════════════ MATHEMATICS ════════════════════════

  'Sets, Relations, and Functions': [
    { heading: 'Set Operations', formulas: [
      { name: 'Union', formula: 'n(A∪B) = n(A) + n(B) − n(A∩B)' },
      { name: 'De Morgan\'s laws', formula: '(A∪B)\' = A\'∩B\' ;  (A∩B)\' = A\'∪B\'' },
      { name: 'Complement', formula: 'n(A\') = n(U) − n(A)' },
    ]},
  ],

  'Complex Numbers and Quadratic Equations': [
    { heading: 'Complex Numbers', formulas: [
      { name: 'Modulus', formula: '|z| = √(a² + b²)  for z = a + bi' },
      { name: 'Euler\'s form', formula: 'z = re^(iθ) = r(cosθ + i·sinθ)' },
      { name: 'De Moivre\'s theorem', formula: '(cosθ + i·sinθ)ⁿ = cos(nθ) + i·sin(nθ)' },
    ]},
    { heading: 'Quadratic Equations', formulas: [
      { name: 'Quadratic formula', formula: 'x = (−b ± √(b²−4ac)) / 2a' },
      { name: 'Sum of roots', formula: 'α + β = −b/a' },
      { name: 'Product of roots', formula: 'αβ = c/a' },
      { name: 'Discriminant', formula: 'D = b² − 4ac' },
    ]},
  ],

  'Matrices and Determinants': [
    { heading: 'Determinants', formulas: [
      { name: '2×2 determinant', formula: '|A| = ad − bc  for [[a,b],[c,d]]' },
      { name: 'Cramer\'s rule', formula: 'x = Dₓ/D,  y = Dᵧ/D' },
      { name: 'Adjoint', formula: 'A⁻¹ = adj(A) / |A|' },
    ]},
  ],

  'Permutations and Combinations': [
    { heading: 'Counting', formulas: [
      { name: 'Permutation', formula: 'ⁿPᵣ = n! / (n−r)!' },
      { name: 'Combination', formula: 'ⁿCᵣ = n! / (r!(n−r)!)' },
      { name: 'Circular permutation', formula: '(n−1)!' },
      { name: 'With repetition', formula: 'nʳ (r selections from n)' },
    ]},
  ],

  'Binomial Theorem and its Simple Applications': [
    { heading: 'Binomial Expansion', formulas: [
      { name: 'Binomial theorem', formula: '(a+b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ' },
      { name: 'General term', formula: 'Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ' },
      { name: 'Middle term', formula: 'T_(n/2+1) if n is even' },
    ]},
  ],

  'Sequence and Series': [
    { heading: 'AP', formulas: [
      { name: 'nth term', formula: 'aₙ = a + (n−1)d' },
      { name: 'Sum of n terms', formula: 'Sₙ = (n/2)(2a + (n−1)d) = (n/2)(a + l)' },
    ]},
    { heading: 'GP', formulas: [
      { name: 'nth term', formula: 'aₙ = arⁿ⁻¹' },
      { name: 'Sum of n terms', formula: 'Sₙ = a(rⁿ−1)/(r−1)  (r≠1)' },
      { name: 'Sum to infinity', formula: 'S∞ = a/(1−r)  (|r|<1)' },
    ]},
  ],

  'Integral Calculus': [
    { heading: 'Basic Integrals', formulas: [
      { name: 'Power rule', formula: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n≠−1)' },
      { name: '∫1/x dx', formula: 'ln|x| + C' },
      { name: '∫eˣ dx', formula: 'eˣ + C' },
      { name: '∫sin x dx', formula: '−cos x + C' },
      { name: '∫cos x dx', formula: 'sin x + C' },
      { name: '∫sec²x dx', formula: 'tan x + C' },
    ]},
    { heading: 'Techniques', formulas: [
      { name: 'By parts', formula: '∫u dv = uv − ∫v du' },
      { name: 'LIATE order', formula: 'Log > Inverse trig > Algebraic > Trig > Exponential' },
      { name: 'Definite integral', formula: '∫ₐᵇ f(x)dx = F(b) − F(a)' },
    ]},
  ],

  'Coordinate Geometry': [
    { heading: 'Straight Lines', formulas: [
      { name: 'Distance', formula: 'd = √((x₂−x₁)² + (y₂−y₁)²)' },
      { name: 'Slope', formula: 'm = (y₂−y₁)/(x₂−x₁)' },
      { name: 'Point-slope form', formula: 'y − y₁ = m(x − x₁)' },
      { name: 'Slope-intercept', formula: 'y = mx + c' },
      { name: 'Distance point to line', formula: 'd = |ax₁+by₁+c| / √(a²+b²)' },
    ]},
    { heading: 'Conics', formulas: [
      { name: 'Circle', formula: 'x² + y² = r²' },
      { name: 'Ellipse', formula: 'x²/a² + y²/b² = 1' },
      { name: 'Parabola', formula: 'y² = 4ax' },
      { name: 'Hyperbola', formula: 'x²/a² − y²/b² = 1' },
    ]},
  ],

  'Trigonometry': [
    { heading: 'Basic Identities', formulas: [
      { name: 'Pythagorean', formula: 'sin²θ + cos²θ = 1' },
      { name: 'tan identity', formula: '1 + tan²θ = sec²θ' },
      { name: 'cot identity', formula: '1 + cot²θ = csc²θ' },
    ]},
    { heading: 'Compound Angles', formulas: [
      { name: 'sin(A±B)', formula: 'sinA·cosB ± cosA·sinB' },
      { name: 'cos(A±B)', formula: 'cosA·cosB ∓ sinA·sinB' },
      { name: 'Double angle sin', formula: 'sin2A = 2sinA·cosA' },
      { name: 'Double angle cos', formula: 'cos2A = cos²A − sin²A = 2cos²A − 1' },
      { name: 'Half angle', formula: 'sin(A/2) = ±√((1−cosA)/2)' },
    ]},
  ],

  'Statistics and Probability': [
    { heading: 'Statistics', formulas: [
      { name: 'Mean', formula: 'x̄ = Σxᵢ/n' },
      { name: 'Variance', formula: 'σ² = Σ(xᵢ−x̄)²/n' },
      { name: 'Std deviation', formula: 'σ = √(variance)' },
    ]},
    { heading: 'Probability', formulas: [
      { name: 'Addition rule', formula: 'P(A∪B) = P(A) + P(B) − P(A∩B)' },
      { name: 'Conditional', formula: 'P(A|B) = P(A∩B)/P(B)' },
      { name: 'Bayes\' theorem', formula: 'P(A|B) = P(B|A)·P(A) / P(B)' },
      { name: 'Binomial', formula: 'P(X=r) = ⁿCᵣ pʳ qⁿ⁻ʳ' },
    ]},
  ],

  // ════════════════════════ BIOLOGY ════════════════════════

  'Cell Structure and Function': [
    { heading: 'Cell Biology', formulas: [
      { name: 'Cell membrane', formula: 'Fluid Mosaic Model — Singer & Nicolson (1972)' },
      { name: 'Mitosis phases', formula: 'Prophase → Metaphase → Anaphase → Telophase' },
      { name: 'Meiosis result', formula: '1 diploid → 4 haploid cells' },
      { name: 'Cell cycle', formula: 'G₁ → S → G₂ → M' },
    ]},
  ],

  'Genetics and Evolution': [
    { heading: 'Mendelian Ratios', formulas: [
      { name: 'Monohybrid F₂', formula: 'Phenotypic 3:1 | Genotypic 1:2:1' },
      { name: 'Dihybrid F₂', formula: 'Phenotypic 9:3:3:1' },
      { name: 'Test cross', formula: 'Aa × aa → 1:1' },
      { name: 'Back cross', formula: 'F₁ × any parent' },
    ]},
    { heading: 'Molecular Biology', formulas: [
      { name: 'Chargaff\'s rule', formula: 'A = T, G = C; A+G = T+C' },
      { name: 'Central dogma', formula: 'DNA → RNA → Protein' },
      { name: 'Hardy-Weinberg', formula: 'p² + 2pq + q² = 1 (genotype freq)' },
    ]},
  ],

  'Human Physiology': [
    { heading: 'Key Values', formulas: [
      { name: 'Tidal volume', formula: '~500 mL' },
      { name: 'Vital capacity', formula: '~3500–4500 mL' },
      { name: 'Cardiac output', formula: 'CO = SV × HR ≈ 5 L/min' },
      { name: 'Blood pressure', formula: 'Normal: 120/80 mmHg' },
      { name: 'GFR', formula: '~125 mL/min → 180 L/day' },
      { name: 'Blood pH', formula: '7.35 – 7.45' },
    ]},
    { heading: 'Digestive Enzymes', formulas: [
      { name: 'Pepsin', formula: 'Proteins → Peptides (pH 2)' },
      { name: 'Trypsin', formula: 'Proteins → Peptides (pH 8)' },
      { name: 'Amylase', formula: 'Starch → Maltose (pH 7)' },
      { name: 'Lipase', formula: 'Fats → Fatty acids + Glycerol' },
    ]},
  ],

  'Reproduction': [
    { heading: 'Human Reproduction', formulas: [
      { name: 'Menstrual cycle', formula: '28 days — Follicular (1–13) → Ovulation (14) → Luteal (15–28)' },
      { name: 'Spermatogenesis', formula: '1 spermatogonium → 4 sperms (64 days)' },
      { name: 'Oogenesis', formula: '1 oogonium → 1 ovum + 3 polar bodies' },
      { name: 'Gestation period', formula: '~266 days (38 weeks) from fertilization' },
    ]},
  ],

  'Ecology and Environment': [
    { heading: 'Ecosystem', formulas: [
      { name: 'GPP', formula: 'Gross Primary Productivity = Total photosynthesis' },
      { name: 'NPP', formula: 'NPP = GPP − Respiration' },
      { name: '10% rule', formula: 'Only 10% energy transfers between trophic levels' },
      { name: 'Species-area relation', formula: 'log S = log C + Z·log A' },
    ]},
  ],
};
