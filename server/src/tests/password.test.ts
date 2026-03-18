import { validatePassword } from "../utils/password";
import { describe, it, expect } from "@jest/globals";

describe("Password Validator - White Box Testing", () => {

  // --- BRANCHES DE BASE (Communes) ---
  it("devrait rejeter un mot de passe vide (Branch 1)", () => {
    expect(validatePassword("", 25)).toBe(false);
  });

  it("devrait rejeter un mot de passe < 8 caractères (Branch 2)", () => {
    expect(validatePassword("Ab1!", 25)).toBe(false);
  });

  it("devrait rejeter un mot de passe > 20 caractères (Branch 3)", () => {
    expect(validatePassword("AnExtremelyLongPassword123!", 25)).toBe(false);
  });

  // --- BRANCHES ENFANT (< 12) ---
  it("Enfant : devrait rejeter si pas de minuscule (Branch 4)", () => {
    expect(validatePassword("123456789", 10)).toBe(false);
  });

  it("Enfant : devrait accepter avec juste des minuscules", () => {
    expect(validatePassword("password", 10)).toBe(true);
  });

  // --- BRANCHES ADULTE (12 - 64) ---
  it("Adulte : devrait rejeter si manque Maj ou Min ou Chiffre (Branch 5)", () => {
    // Manque Majuscule
    expect(validatePassword("password123!", 25)).toBe(false);
    // Manque Chiffre
    expect(validatePassword("Password!", 25)).toBe(false);
  });

  it("Adulte : devrait rejeter si manque Caractère Spécial (Branch 6)", () => {
    expect(validatePassword("Password123", 25)).toBe(false);
  });

  it("Adulte : devrait accepter si tout est présent", () => {
    expect(validatePassword("Password123!", 25)).toBe(true);
  });

  // --- BRANCHES SENIOR (>= 65) ---
  it("Senior : devrait rejeter si manque Chiffre ET Majuscule (Branch 7)", () => {
    // Uniquement des minuscules + spécial (manque chiffre et maj)
    expect(validatePassword("password!", 70)).toBe(false);
  });

  it("Senior : devrait accepter avec au moins une Majuscule (Branch 7 ok)", () => {
    expect(validatePassword("Password!", 70)).toBe(true);
  });

  it("Senior : devrait accepter avec au moins un Chiffre (Branch 7 ok)", () => {
    expect(validatePassword("password1!", 70)).toBe(true);
  });
});