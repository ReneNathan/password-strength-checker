// Criando a aplicação Vue
const { createApp } = Vue;

createApp({
  // Estado reativo (data)
  data() {
    return {
      password: "", // senha digitada
      rules: [ // lista de regras
        { id: "rule_length", text: "Password must be at least 6 characters long", validate: p => p.length >= 6 },
        { id: "rule_letter", text: "Password must contain at least one letter (a-z)", validate: p => /[a-zA-Z]/.test(p) },
        { id: "rule_case", text: "Password must contain both uppercase and lowercase letters", validate: p => /[a-z]/.test(p) && /[A-Z]/.test(p) },
        { id: "rule_special", text: "Password must contain at least one special character (!@#$%^&* etc.)", validate: p => /[!@#$%^&*(),.?\":{}|<>]/.test(p) },
        { id: "rule_space", text: "Password must contain one or more spaces", validate: p => /\s/.test(p) },
        { id: "rule_banana", text: "Password must include the word 'banana' spelled backwards", validate: p => p.toLowerCase().includes("ananab") },
        { id: "rule_current_length", text: "Password must include the current password length somewhere inside", validate: p => p.includes(p.length.toString()) },
        { id: "rule_hp", text: "Password must contain the Harry Potter spell to unlock doors", validate: p => p.toLowerCase().includes("alohomora") },
        { id: "rule_true", text: "Password must contain 'true' or 'truth' because honesty matters", validate: p => p.toLowerCase().includes("true") || p.toLowerCase().includes("truth") },
        { id: "rule_mona", text: "Password must contain the first name of the painter of the Mona Lisa", validate: p => p.toLowerCase().includes("leonardo") },
        { id: "rule_pi", text: "Password must contain the first three digits of π without a comma", validate: p => p.includes("314") },
        { id: "rule_rings", text: "Password must mention the one who wants the precious", validate: p => p.toLowerCase().includes("gollum") || p.toLowerCase().includes("smeagol") },
        { id: "rule_last_char", text: "Password's last character must be the same as the first character", validate: p => p.length > 0 && p[p.length - 1] === p[0] },
        { id: "rule_pokemon", text: "Password must contain the name of the first Pokémon in the National Pokédex", validate: p => p.toLowerCase().includes("bulbasaur") },
        { id: "rule_souls", text: "Password must contain what players say when struggling in Souls games", validate: p => p.toLowerCase().includes("git gud") || p.toLowerCase().includes("gitgud") },
        { id: "rule_cinema", text: "Password must contain the name of the planet from the movie 'Avatar'", validate: p => p.toLowerCase().includes("pandora") },
        { id: "rule_vowel_count", text: "Password must contain more vowels than consonants (I hope you like vowels)", validate: p => { const vowels = (p.match(/[aeiou]/gi) || []).length; const consonants = (p.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length; return vowels > consonants; } },
        { id: "rule_sarcasm", text: "Password must contain the word 'password' because irony", validate: p => p.toLowerCase().includes("password") },
        { id: "rule_time", text: "Password must contain the current year", validate: p => p.includes(new Date().getFullYear().toString()) },
        { id: "rule_quixote", text: "Password must contain what was the giant that the knight Don Quixote fought", validate: p => p.toLowerCase().includes("windmill") },
        { id: "rule_lovecraft", text: "Password must contain the name of the most famous ancient other god of the universe, the god of madness in the horror novel 'The Call of Cthulhu'", validate: p => p.toLowerCase().includes("azathoth") },
        { id: "rule_remember", text: "Password must include the answer for the sixth rule but without vowels", validate: p => p.toLowerCase().includes("nnb") },
        { id: "rule_hex", text: "Password must contain a valid hex color code", validate: p => /#[0-9A-Fa-f]{6}/.test(p) },
        { id: "rule_binary", text: "Password must contain 42 in binary", validate: p => p.includes("101010") },
        { id: "rule_ai", text: "Password must contains the name of who created the three ethical guidelines for Laws of Robotics", validate: p => p.toLowerCase().includes("asimov") || p.toLowerCase().includes("isaac") },
        { id: "rule_alice", text: "Password must contains who followed the rabbit", validate: p => p.toLowerCase().includes("alice") || p.toLowerCase().includes("neo") },
        { id: "rule_skyrim", text: "Password must contains what is the 'Music of Life', my fellow Dragonborn", validate: p => p.toLowerCase().includes("silence") },
        { id: "rule_wow", text: "Password must contains one of the World of Warcraft's classical sides", validate: p => p.toLowerCase().includes("alliance") || p.toLowerCase().includes("horde") },
        { id: "rule_done", text: "Password must end with 'done' to be complete", validate: p => p.toLowerCase().endsWith("done") },
      ],
      password_status: ["Poor", "Weak", "Average", "Strong", "Unholy"], // níveis
    };

  },

  // Propriedades computadas (calculadas automaticamente)
  computed: {
    // Regras visíveis (progressivas)
    visibleRules() {
      const visible = [];
      for (let i = 0; i < this.rules.length; i++) {
        visible.push(this.rules[i]);
        // se a regra atual não for válida, para de mostrar as próximas
        if (!this.rules[i].validate(this.password)) break;
      }
      return visible;
    },

    // Quantidade de regras válidas
    validCount() {
      return this.rules.filter(rule => rule.validate(this.password)).length;
    },

    // Percentual de progresso
    progressPercent() {
      return Math.round((this.validCount / this.rules.length) * 100);
    },

    // Texto da força da senha
    passwordStrength() {
      const index = Math.floor((this.validCount / this.rules.length) * this.password_status.length);
      return this.password_status[Math.min(index, this.password_status.length - 1)] + ` (${this.progressPercent}%)`;
    }
  }
}).mount("#app"); // Monta a aplicação no div #app
