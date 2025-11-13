// Progressive rules list
const rules = [
  {
    id: "rule_length",
    text: "Password must be at least 6 characters long",
    validate: (p) => p.length >= 6
  },
  {
    id: "rule_letter",
    text: "Password must contain at least one letter (a-z)",
    validate: (p) => /[a-zA-Z]/.test(p)
  },
  {
    id: "rule_case",
    text: "Password must contain both uppercase and lowercase letters",
    validate: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p)
  },
  {
    id: "rule_special",
    text: "Password must contain at least one special character (!@#$%^&* etc.)",
    validate: (p) => /[!@#$%^&*(),.?\":{}|<>]/.test(p)
  },
  {
    id: "rule_space",
    text: "Password must contain one or more spaces",
    validate: (p) => /\s/.test(p)
  },
  {
    id: "rule_banana",
    text: "Password must include the word 'banana' spelled backwards",
    validate: (p) => p.toLowerCase().includes("ananab")
  },
  {
    id: "rule_current_length",
    text: "Password must include the current password length somewhere inside",
    validate: (p) => p.includes(p.length.toString())
  },
  {
    id: "rule_hp",
    text: "Password must contain the Harry Potter spell to unlock doors",
    validate: (p) => p.toLowerCase().includes("alohomora")
  },
  {
    id: "rule_true",
    text: "Password must contain 'true' or 'truth' because honesty matters",
    validate: (p) => p.toLowerCase().includes("true") || p.toLowerCase().includes("truth")
  },
  {
    id: "rule_mona",
    text: "Password must contain the first name of the painter of the Mona Lisa",
    validate: (p) => p.toLowerCase().includes("leonardo")
  },
  {
    id: "rule_pi",
    text: "Password must contain the first three digits of π without a comma",
    validate: (p) => p.includes("314")
  },
  {
    id: "rule_rings",
    text: "Password must mention the one who wants the precious",
    validate: (p) => p.toLowerCase().includes("gollum") || p.toLowerCase().includes("smeagol")
  },
  {
    id: "rule_last_char",
    text: "Password's last character must be the same as the first character",
    validate: (p) => p.length > 0 && p[p.length - 1] === p[0]
  },
  {
    id: "rule_pokemon",
    text: "Password must contain the name of the first Pokémon in the National Pokédex",
    validate: (p) => p.toLowerCase().includes("bulbasaur")
  },
  {
    id: "rule_souls",
    text: "Password must contain what players say when struggling in Souls games",
    validate: (p) => p.toLowerCase().includes("git gud") || p.toLowerCase().includes("gitgud")
  },
  {
    id: "rule_cinema",
    text: "Password must contain the name of the planet from the movie 'Avatar'",
    validate: (p) => p.toLowerCase().includes("pandora")
  },
  {
    id: "rule_vowel_count",
    text: "Password must contain more vowels than consonants (I hope you like vowels)",
    validate: (p) => {
      const vowels = (p.match(/[aeiou]/gi) || []).length;
      const consonants = (p.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
      return vowels > consonants;
    }
  },
  {
    id: "rule_sarcasm",
    text: "Password must contain the word 'password' because irony",
    validate: (p) => p.toLowerCase().includes("password")
  },
  {
    id: "rule_time",
    text: "Password must contain the current year",
    validate: (p) => p.includes(new Date().getFullYear().toString())
  },
  {
    id: "rule_quixote",
    text: "Password must contain what was the giant that the knight Don Quixote fought",
    validate: (p) => p.toLowerCase().includes("windmill")
  },
  {
    id: "rule_lovecraft",
    text: "Password must contain the name of the most famous ancient other god of the universe, the god of madness in the horror novel 'The Call of Cthulhu'",
    validate: (p) => p.toLowerCase().includes("azathoth")
  },
  {
    id: "rule_remember",
    text: "Password must include the answer for the sixth rule but without vowels",
    validate: (p) => p.toLowerCase().includes("nnb")
  },
  {
    id: "rule_hex",
    text: "Password must contain a valid hex color code",
    validate: (p) => /#[0-9A-Fa-f]{6}/.test(p)
  },
  {
    id: "rule_binary",
    text: "Password must contain 42 in binary",
    validate: (p) => p.includes("101010")
  },
  {
    id: "rule_ai",
    text: "Password must contains the name of who created the three ethical guidelines for Laws of Robotics",
    validate: (p) => p.toLowerCase().includes("asimov") || p.toLowerCase().includes("isaac")
  },
  {
    id: "rule_alice",
    text: "Password must contains who followed the rabbit",
    validate: (p) => p.toLowerCase().includes("alice") || p.toLowerCase().includes("neo")
  },
  {
    id: "rule_skyrim",
    text: "Password must contains what is the 'Music of Life', my fellow Dragonborn",
    validate: (p) => p.toLowerCase().includes("silence")
  },
  {
    id: "rule_wow",
    text: "Password must contains one of the World of Warcraft's classical sides",
    validate: (p) => p.toLowerCase().includes("alliance") || p.toLowerCase().includes("horde")
  },
  {
    id: "rule_done",
    text: "Password must end with 'done' to be complete",
    validate: (p) => p.toLowerCase().endsWith("done")
  },
];
// ===============================
// Password Rules Evaluator
// ===============================

// Elements
const password_input = document.getElementById('password_input');
const rules_container = document.getElementById('rules_container');
const progress_bar = document.getElementById('progress_bar');
const password_value = document.getElementById('password_value');

const password_status = ["Poor", "Weak", "Average", "Strong", "Unholy"];

// Defensive addRule
function addRule(rule) {
  if (!rule || !rule.id) return;
  if (document.getElementById(rule.id)) return;

  const span = document.createElement('span');
  span.id = rule.id;
  span.textContent = rule.text;
  span.classList.add('password_rules', 'invalid_rule', 'rule-appear');
  rules_container.appendChild(span);
}

// ---------------------------
// Main logic
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  rules_container.innerHTML = "";
  addRule(rules[0]);

  password_input.addEventListener('input', (e) => {
    const password = e.target.value;
    validateAll(password);
  });
});

function validateAll(password) {
  password = password || "";

  // Get all currently visible rules in order
  const visibleRuleElements = Array.from(rules_container.querySelectorAll('.password_rules'));
  let validCount = 0;
  let shouldUnlockNext = true;

  // Validate each visible rule
  for (let i = 0; i < visibleRuleElements.length; i++) {
    const span = visibleRuleElements[i];
    const ruleId = span.id;
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) continue;

    let isValid = false;
    try {
      isValid = !!rule.validate(password);
    } catch {
      isValid = false;
    }

    // Update visual state
    span.classList.toggle('valid_rule', isValid);
    span.classList.toggle('invalid_rule', !isValid);

    if (isValid) {
      validCount++;

      // If this is the last visible rule and it's valid, we should unlock the next one
      if (i === visibleRuleElements.length - 1) {
        const nextIndex = rules.findIndex(r => r.id === ruleId) + 1;
        if (nextIndex < rules.length && !document.getElementById(rules[nextIndex].id)) {
          addRule(rules[nextIndex]);
          // Immediately validate the newly added rule
          setTimeout(() => validateAll(password), 0);
        }
      }
    } else {
      // If any rule fails, stop the chain of unlocking
      shouldUnlockNext = false;
    }
  }

  // Special case: if we have only one rule and it's valid, unlock the next one
  if (visibleRuleElements.length === 1) {
    const firstRule = rules.find(r => r.id === visibleRuleElements[0].id);
    if (firstRule) {
      const isValid = !!firstRule.validate(password);
      if (isValid) {
        const nextIndex = rules.findIndex(r => r.id === firstRule.id) + 1;
        if (nextIndex < rules.length && !document.getElementById(rules[nextIndex].id)) {
          addRule(rules[nextIndex]);
          // Re-validate to include the new rule
          setTimeout(() => validateAll(password), 0);
        }
      }
    }
  }

  // Calculate progress: valid rules / total rules
  const totalRules = rules.length;
  updateProgress(validCount, totalRules);
}

// ---------------------------
// Progress bar updater - FIXED
// ---------------------------
function updateProgress(validCount, totalRules) {
  if (!totalRules || !progress_bar) return;

  // Ensure we don't divide by zero and clamp values
  const ratio = Math.min(Math.max(validCount / totalRules, 0), 1);
  progress_bar.style.width = `${ratio * 100}%`;

  if (password_value) {
    // More precise status calculation
    const statusIndex = Math.floor(ratio * password_status.length);
    password_value.textContent = password_status[Math.min(statusIndex, password_status.length - 1)] + " (" + Math.round(ratio * 100) + "%)";
  }
}