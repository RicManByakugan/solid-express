exports.slugify = (text) =>
  text
    .normalize("NFD") // Supprime les accents
    .replace(/[\u0300-\u036f]/g, "") // Supprime les caractères diacritiques
    .replace(/[^a-zA-Z0-9]/g, "-") // Remplace les caractères spéciaux par "-"
    .toLowerCase();
