// ─── Chapter Prerequisites ──────────────────────────────────────────────────
// Maps each chapter to its prerequisite chapters that should be studied first

export interface Prerequisite {
  chapter: string;
  subject: string;
  reason: string; // Why this prerequisite is important
  priority: 'essential' | 'recommended' | 'helpful';
}

export function getChapterPrerequisites(chapter: string): Prerequisite[] {
  return PREREQUISITES_BANK[chapter] || [];
}

const PREREQUISITES_BANK: Record<string, Prerequisite[]> = {

  // ════════════════════════ PHYSICS ════════════════════════

  'Kinematics': [
    { chapter: 'Physics and Measurement', subject: 'Physics', reason: 'Understanding units, dimensions, and error analysis is fundamental to solving kinematics problems', priority: 'essential' },
  ],

  'Laws of Motion': [
    { chapter: 'Kinematics', subject: 'Physics', reason: 'You must understand velocity, acceleration, and displacement before studying forces', priority: 'essential' },
    { chapter: 'Physics and Measurement', subject: 'Physics', reason: 'Dimensional analysis helps verify force equations', priority: 'helpful' },
  ],

  'Work, Energy, and Power': [
    { chapter: 'Laws of Motion', subject: 'Physics', reason: 'Work is defined using force and displacement — you need Newton\'s laws first', priority: 'essential' },
    { chapter: 'Kinematics', subject: 'Physics', reason: 'Velocity concepts are needed for kinetic energy and power calculations', priority: 'essential' },
  ],

  'Rotational Motion': [
    { chapter: 'Laws of Motion', subject: 'Physics', reason: 'Torque extends the concept of force to rotational systems', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Rotational KE builds on translational energy concepts', priority: 'essential' },
    { chapter: 'Kinematics', subject: 'Physics', reason: 'Angular kinematics parallels linear kinematics', priority: 'recommended' },
  ],

  'Gravitation': [
    { chapter: 'Laws of Motion', subject: 'Physics', reason: 'Gravitational force is governed by Newton\'s laws', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Gravitational PE and escape velocity require energy concepts', priority: 'essential' },
    { chapter: 'Kinematics', subject: 'Physics', reason: 'Orbital motion uses projectile and circular motion concepts', priority: 'recommended' },
  ],

  'Properties of Solids and Liquids': [
    { chapter: 'Laws of Motion', subject: 'Physics', reason: 'Pressure, buoyancy, and viscosity involve force analysis', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Bernoulli\'s theorem is based on energy conservation', priority: 'recommended' },
  ],

  'Thermodynamics': [
    { chapter: 'Kinetic Theory of Gases', subject: 'Physics', reason: 'Understanding molecular motion and ideal gas law is foundation for thermodynamic processes', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Internal energy and work in thermodynamics build on energy concepts', priority: 'recommended' },
  ],

  'Kinetic Theory of Gases': [
    { chapter: 'Laws of Motion', subject: 'Physics', reason: 'Molecular collisions and pressure involve Newton\'s laws', priority: 'recommended' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Kinetic energy of gas molecules is a key concept', priority: 'recommended' },
  ],

  'Oscillations and Waves': [
    { chapter: 'Kinematics', subject: 'Physics', reason: 'SHM involves displacement, velocity, and acceleration analysis', priority: 'essential' },
    { chapter: 'Laws of Motion', subject: 'Physics', reason: 'Restoring forces drive oscillatory motion', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Energy conservation in SHM is crucial', priority: 'recommended' },
    { chapter: 'Trigonometry', subject: 'Mathematics', reason: 'Wave equations use sine and cosine functions extensively', priority: 'essential' },
  ],

  'Electrostatics': [
    { chapter: 'Gravitation', subject: 'Physics', reason: 'Coulomb\'s law has the same mathematical form as gravitational law — understanding one helps the other', priority: 'recommended' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Electric potential and potential energy parallel mechanical energy concepts', priority: 'essential' },
    { chapter: 'Coordinate Geometry', subject: 'Mathematics', reason: 'Electric field calculations require vector and distance formulas', priority: 'helpful' },
  ],

  'Current Electricity': [
    { chapter: 'Electrostatics', subject: 'Physics', reason: 'Current flow is driven by electric potential difference', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Electrical power and energy dissipation build on energy concepts', priority: 'recommended' },
  ],

  'Magnetic Effects of Current and Magnetism': [
    { chapter: 'Current Electricity', subject: 'Physics', reason: 'Magnetic fields are produced by moving charges and currents', priority: 'essential' },
    { chapter: 'Electrostatics', subject: 'Physics', reason: 'Force on charges in fields extends electrostatic concepts', priority: 'essential' },
    { chapter: 'Laws of Motion', subject: 'Physics', reason: 'Force analysis on current-carrying conductors', priority: 'recommended' },
  ],

  'Electromagnetic Induction and Alternating Currents': [
    { chapter: 'Magnetic Effects of Current and Magnetism', subject: 'Physics', reason: 'EMI is based on changing magnetic fields and flux', priority: 'essential' },
    { chapter: 'Current Electricity', subject: 'Physics', reason: 'AC circuits extend DC circuit analysis with impedance', priority: 'essential' },
    { chapter: 'Oscillations and Waves', subject: 'Physics', reason: 'AC signals are sinusoidal — wave concepts are needed', priority: 'recommended' },
  ],

  'Electromagnetic Waves': [
    { chapter: 'Electromagnetic Induction and Alternating Currents', subject: 'Physics', reason: 'EM waves arise from changing electric and magnetic fields', priority: 'essential' },
    { chapter: 'Electrostatics', subject: 'Physics', reason: 'Electric field concepts are fundamental to EM wave theory', priority: 'recommended' },
  ],

  'Optics': [
    { chapter: 'Oscillations and Waves', subject: 'Physics', reason: 'Light is an electromagnetic wave — wave properties are essential', priority: 'essential' },
    { chapter: 'Electromagnetic Waves', subject: 'Physics', reason: 'Understanding the EM spectrum contextualizes optical phenomena', priority: 'recommended' },
    { chapter: 'Trigonometry', subject: 'Mathematics', reason: 'Snell\'s law and lens formulas require trigonometric functions', priority: 'recommended' },
  ],

  'Dual Nature of Matter and Radiation': [
    { chapter: 'Optics', subject: 'Physics', reason: 'Photoelectric effect involves light — optical concepts are needed', priority: 'essential' },
    { chapter: 'Electromagnetic Waves', subject: 'Physics', reason: 'Understanding photon energy requires EM wave knowledge', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Work function and KE of photoelectrons use energy concepts', priority: 'recommended' },
  ],

  'Atoms and Nuclei': [
    { chapter: 'Dual Nature of Matter and Radiation', subject: 'Physics', reason: 'Bohr model uses quantised energy and photon emission', priority: 'essential' },
    { chapter: 'Electrostatics', subject: 'Physics', reason: 'Coulomb interaction between nucleus and electrons', priority: 'essential' },
    { chapter: 'Work, Energy, and Power', subject: 'Physics', reason: 'Binding energy and mass-energy equivalence', priority: 'recommended' },
  ],

  'Electronic Devices': [
    { chapter: 'Current Electricity', subject: 'Physics', reason: 'Semiconductor devices are circuit elements — Ohm\'s law and circuit analysis needed', priority: 'essential' },
    { chapter: 'Atoms and Nuclei', subject: 'Physics', reason: 'Band theory builds on atomic structure concepts', priority: 'recommended' },
  ],

  // ════════════════════════ CHEMISTRY ════════════════════════

  'Atomic Structure': [
    { chapter: 'Some Basic Concepts in Chemistry', subject: 'Chemistry', reason: 'Mole concept and atomic masses are needed for atomic calculations', priority: 'essential' },
  ],

  'Chemical Bonding and Molecular Structure': [
    { chapter: 'Atomic Structure', subject: 'Chemistry', reason: 'You need to understand orbitals and electronic configuration before bonding', priority: 'essential' },
    { chapter: 'Classification of Elements and Periodicity', subject: 'Chemistry', reason: 'Periodic trends explain why elements bond differently', priority: 'recommended' },
  ],

  'Chemical Thermodynamics': [
    { chapter: 'Some Basic Concepts in Chemistry', subject: 'Chemistry', reason: 'Stoichiometry is needed for enthalpy calculations', priority: 'essential' },
    { chapter: 'Thermodynamics', subject: 'Physics', reason: 'Physics thermodynamics provides the foundational laws', priority: 'recommended' },
  ],

  'Equilibrium': [
    { chapter: 'Chemical Thermodynamics', subject: 'Chemistry', reason: 'Gibbs free energy determines spontaneity and equilibrium position', priority: 'essential' },
    { chapter: 'Some Basic Concepts in Chemistry', subject: 'Chemistry', reason: 'Concentration calculations are fundamental to equilibrium expressions', priority: 'essential' },
  ],

  'Redox Reactions': [
    { chapter: 'Some Basic Concepts in Chemistry', subject: 'Chemistry', reason: 'Balancing equations and mole concept are prerequisites', priority: 'essential' },
    { chapter: 'Atomic Structure', subject: 'Chemistry', reason: 'Understanding electron transfer requires knowledge of electronic configuration', priority: 'recommended' },
  ],

  'Electrochemistry': [
    { chapter: 'Redox Reactions', subject: 'Chemistry', reason: 'Electrochemistry is the study of redox reactions in cells', priority: 'essential' },
    { chapter: 'Chemical Thermodynamics', subject: 'Chemistry', reason: 'Gibbs energy relates to cell EMF', priority: 'essential' },
    { chapter: 'Equilibrium', subject: 'Chemistry', reason: 'Nernst equation connects cell potential to equilibrium', priority: 'recommended' },
  ],

  'Chemical Kinetics': [
    { chapter: 'Some Basic Concepts in Chemistry', subject: 'Chemistry', reason: 'Concentration and mole calculations are needed for rate equations', priority: 'essential' },
    { chapter: 'Chemical Thermodynamics', subject: 'Chemistry', reason: 'Activation energy concept connects kinetics to thermodynamics', priority: 'recommended' },
    { chapter: 'Integral Calculus', subject: 'Mathematics', reason: 'Integrated rate laws require calculus knowledge', priority: 'helpful' },
  ],

  'Solutions': [
    { chapter: 'Some Basic Concepts in Chemistry', subject: 'Chemistry', reason: 'Molarity, molality, and mole fraction calculations', priority: 'essential' },
    { chapter: 'Chemical Thermodynamics', subject: 'Chemistry', reason: 'Colligative properties relate to thermodynamic principles', priority: 'recommended' },
  ],

  'Classification of Elements and Periodicity': [
    { chapter: 'Atomic Structure', subject: 'Chemistry', reason: 'Electronic configuration determines position in periodic table', priority: 'essential' },
  ],

  'p-Block Elements': [
    { chapter: 'Chemical Bonding and Molecular Structure', subject: 'Chemistry', reason: 'Understanding molecular structures of p-block compounds', priority: 'essential' },
    { chapter: 'Classification of Elements and Periodicity', subject: 'Chemistry', reason: 'Periodic trends explain p-block element properties', priority: 'essential' },
  ],

  'd- and f-Block Elements': [
    { chapter: 'Atomic Structure', subject: 'Chemistry', reason: 'Variable oxidation states arise from d-orbital filling', priority: 'essential' },
    { chapter: 'Classification of Elements and Periodicity', subject: 'Chemistry', reason: 'Position and trends of transition elements', priority: 'essential' },
    { chapter: 'Chemical Bonding and Molecular Structure', subject: 'Chemistry', reason: 'Complex formation and bonding in transition metals', priority: 'recommended' },
  ],

  'Coordination Compounds': [
    { chapter: 'd- and f-Block Elements', subject: 'Chemistry', reason: 'Transition metal chemistry is the basis of coordination compounds', priority: 'essential' },
    { chapter: 'Chemical Bonding and Molecular Structure', subject: 'Chemistry', reason: 'VBT and CFT build on bonding theory', priority: 'essential' },
  ],

  'Basic Principles of Organic Chemistry': [
    { chapter: 'Chemical Bonding and Molecular Structure', subject: 'Chemistry', reason: 'Hybridisation and molecular geometry are fundamental to organic chemistry', priority: 'essential' },
    { chapter: 'Atomic Structure', subject: 'Chemistry', reason: 'Electronic effects (inductive, resonance) require orbital knowledge', priority: 'recommended' },
  ],

  'Hydrocarbons': [
    { chapter: 'Basic Principles of Organic Chemistry', subject: 'Chemistry', reason: 'IUPAC naming, electronic effects, and reaction types must be known first', priority: 'essential' },
  ],

  'Organic Compounds Containing Halogens': [
    { chapter: 'Hydrocarbons', subject: 'Chemistry', reason: 'Halogen derivatives are formed from hydrocarbons', priority: 'essential' },
    { chapter: 'Basic Principles of Organic Chemistry', subject: 'Chemistry', reason: 'SN1, SN2, E1, E2 mechanisms require understanding of reaction intermediates', priority: 'essential' },
  ],

  'Organic Compounds Containing Oxygen': [
    { chapter: 'Organic Compounds Containing Halogens', subject: 'Chemistry', reason: 'Alcohols and ethers are often prepared from halides', priority: 'recommended' },
    { chapter: 'Basic Principles of Organic Chemistry', subject: 'Chemistry', reason: 'Nucleophilic addition and substitution mechanisms', priority: 'essential' },
    { chapter: 'Hydrocarbons', subject: 'Chemistry', reason: 'Functional group chemistry builds on hydrocarbon backbone', priority: 'essential' },
  ],

  'Organic Compounds Containing Nitrogen': [
    { chapter: 'Organic Compounds Containing Oxygen', subject: 'Chemistry', reason: 'Amines share reaction patterns with alcohols', priority: 'recommended' },
    { chapter: 'Basic Principles of Organic Chemistry', subject: 'Chemistry', reason: 'Basicity, nucleophilicity, and named reactions', priority: 'essential' },
  ],

  'Biomolecules': [
    { chapter: 'Basic Principles of Organic Chemistry', subject: 'Chemistry', reason: 'Biomolecules are organic compounds — functional group chemistry is needed', priority: 'essential' },
    { chapter: 'Organic Compounds Containing Oxygen', subject: 'Chemistry', reason: 'Carbohydrates, amino acids contain hydroxyl, carbonyl, carboxyl groups', priority: 'recommended' },
  ],

  // ════════════════════════ MATHEMATICS ════════════════════════

  'Complex Numbers and Quadratic Equations': [
    { chapter: 'Sets, Relations, and Functions', subject: 'Mathematics', reason: 'Function concepts and algebraic foundations', priority: 'recommended' },
  ],

  'Matrices and Determinants': [
    { chapter: 'Sets, Relations, and Functions', subject: 'Mathematics', reason: 'Basic algebraic structures and operations', priority: 'helpful' },
  ],

  'Permutations and Combinations': [
    { chapter: 'Sets, Relations, and Functions', subject: 'Mathematics', reason: 'Counting principles use set theory', priority: 'recommended' },
  ],

  'Binomial Theorem and its Simple Applications': [
    { chapter: 'Permutations and Combinations', subject: 'Mathematics', reason: 'Binomial coefficients use nCr combinations', priority: 'essential' },
  ],

  'Sequence and Series': [
    { chapter: 'Sets, Relations, and Functions', subject: 'Mathematics', reason: 'Sequences are special functions from N to R', priority: 'helpful' },
    { chapter: 'Binomial Theorem and its Simple Applications', subject: 'Mathematics', reason: 'Series expansions connect to binomial theorem', priority: 'helpful' },
  ],

  'Limit, Continuity, and Differentiability': [
    { chapter: 'Sets, Relations, and Functions', subject: 'Mathematics', reason: 'Limits are defined for functions — domain, range concepts needed', priority: 'essential' },
    { chapter: 'Trigonometry', subject: 'Mathematics', reason: 'Trigonometric limits are a major topic', priority: 'essential' },
    { chapter: 'Sequence and Series', subject: 'Mathematics', reason: 'Limits of sequences connect to function limits', priority: 'recommended' },
  ],

  'Integral Calculus': [
    { chapter: 'Limit, Continuity, and Differentiability', subject: 'Mathematics', reason: 'Integration is the reverse of differentiation — derivatives must be known', priority: 'essential' },
    { chapter: 'Trigonometry', subject: 'Mathematics', reason: 'Trigonometric integrals require trig identities', priority: 'essential' },
  ],

  'Differential Equations': [
    { chapter: 'Integral Calculus', subject: 'Mathematics', reason: 'Solving ODEs requires integration techniques', priority: 'essential' },
    { chapter: 'Limit, Continuity, and Differentiability', subject: 'Mathematics', reason: 'Derivatives form the basis of differential equations', priority: 'essential' },
  ],

  'Coordinate Geometry': [
    { chapter: 'Sets, Relations, and Functions', subject: 'Mathematics', reason: 'Equations of curves are function relationships', priority: 'recommended' },
    { chapter: 'Trigonometry', subject: 'Mathematics', reason: 'Parametric forms of conics use trigonometric functions', priority: 'recommended' },
  ],

  'Three-Dimensional Geometry': [
    { chapter: 'Coordinate Geometry', subject: 'Mathematics', reason: '3D geometry extends 2D coordinate geometry to three dimensions', priority: 'essential' },
    { chapter: 'Vector Algebra', subject: 'Mathematics', reason: 'Lines and planes in 3D are expressed using vectors', priority: 'essential' },
  ],

  'Vector Algebra': [
    { chapter: 'Coordinate Geometry', subject: 'Mathematics', reason: 'Vectors use coordinate geometry for representation', priority: 'recommended' },
    { chapter: 'Trigonometry', subject: 'Mathematics', reason: 'Dot product involves cosine, cross product involves sine', priority: 'recommended' },
  ],

  'Statistics and Probability': [
    { chapter: 'Permutations and Combinations', subject: 'Mathematics', reason: 'Probability calculations use counting principles', priority: 'essential' },
    { chapter: 'Binomial Theorem and its Simple Applications', subject: 'Mathematics', reason: 'Binomial distribution uses binomial coefficients', priority: 'recommended' },
  ],

  // ════════════════════════ BIOLOGY ════════════════════════

  'Structural Organisation in Animals and Plants': [
    { chapter: 'Diversity in Living World', subject: 'Biology', reason: 'Classification provides the framework for understanding plant and animal organisation', priority: 'essential' },
  ],

  'Cell Structure and Function': [
    { chapter: 'Diversity in Living World', subject: 'Biology', reason: 'Understanding cell types across organisms requires classification knowledge', priority: 'recommended' },
    { chapter: 'Some Basic Concepts in Chemistry', subject: 'Chemistry', reason: 'Biomolecule chemistry underpins cell biology', priority: 'helpful' },
  ],

  'Plant Physiology': [
    { chapter: 'Cell Structure and Function', subject: 'Biology', reason: 'Transport, photosynthesis, and respiration occur at the cellular level', priority: 'essential' },
    { chapter: 'Structural Organisation in Animals and Plants', subject: 'Biology', reason: 'Plant tissue systems are involved in transport and nutrition', priority: 'essential' },
  ],

  'Human Physiology': [
    { chapter: 'Cell Structure and Function', subject: 'Biology', reason: 'All physiological processes occur at the cellular level', priority: 'essential' },
    { chapter: 'Structural Organisation in Animals and Plants', subject: 'Biology', reason: 'Tissue and organ systems are the basis of physiology', priority: 'essential' },
  ],

  'Reproduction': [
    { chapter: 'Cell Structure and Function', subject: 'Biology', reason: 'Mitosis and meiosis are cellular processes fundamental to reproduction', priority: 'essential' },
    { chapter: 'Human Physiology', subject: 'Biology', reason: 'Hormonal regulation of reproduction connects to endocrine physiology', priority: 'recommended' },
    { chapter: 'Plant Physiology', subject: 'Biology', reason: 'Plant reproduction involves understanding of plant growth and development', priority: 'recommended' },
  ],

  'Genetics and Evolution': [
    { chapter: 'Cell Structure and Function', subject: 'Biology', reason: 'DNA replication and cell division are in cell biology', priority: 'essential' },
    { chapter: 'Reproduction', subject: 'Biology', reason: 'Meiosis and genetic variation arise during reproduction', priority: 'essential' },
    { chapter: 'Biomolecules', subject: 'Chemistry', reason: 'DNA and RNA structures require knowledge of nucleic acid chemistry', priority: 'recommended' },
  ],

  'Biology and Human Welfare': [
    { chapter: 'Human Physiology', subject: 'Biology', reason: 'Immunity and disease understanding requires physiological knowledge', priority: 'essential' },
    { chapter: 'Diversity in Living World', subject: 'Biology', reason: 'Microbes used in human welfare are classified organisms', priority: 'recommended' },
  ],

  'Biotechnology and Its Applications': [
    { chapter: 'Genetics and Evolution', subject: 'Biology', reason: 'Genetic engineering builds on DNA structure, replication, and gene expression', priority: 'essential' },
    { chapter: 'Cell Structure and Function', subject: 'Biology', reason: 'Vectors, host organisms, and cell culture are cell biology concepts', priority: 'essential' },
  ],

  'Ecology and Environment': [
    { chapter: 'Diversity in Living World', subject: 'Biology', reason: 'Biodiversity and species classification are ecological foundations', priority: 'essential' },
    { chapter: 'Plant Physiology', subject: 'Biology', reason: 'Energy flow starts with photosynthesis in producers', priority: 'recommended' },
  ],
};
