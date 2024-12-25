import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      "semi": ["error", "always"], // Oblige les points-virgules
      ...pluginJs.configs.recommended.rules,
      ...pluginJest.configs.recommended.rules,
    },
  },
  {
    // Spécifiquement pour les fichiers de test
    files: ["**/tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest, // Ajout des globals Jest pour les fichiers de test
      },
    },
  },
];
