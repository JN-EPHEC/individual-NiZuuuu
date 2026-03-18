import { describe, expect, test } from '@jest/globals';
import { calculateShipping } from '../utils/shipping';

describe('Shipping Calculator - Tests Complets', () => {

  // --- PARTIE 5.1 : CATALOG-BASED & BOUNDARIES (12 cas) ---
  describe('1. Catalog & Boundaries', () => {
    
    // Cas de succès (8 cas)
    const successCases = [
      // [Distance, Poids, Type, Résultat]
      [0, 5, 'standard', 10],   // D1 - Limite basse
      [50, 5, 'standard', 10],  // D1 - Limite haute
      [51, 5, 'standard', 25],  // D2 - Limite basse
      [500, 5, 'standard', 25], // D2 - Limite haute
      [501, 5, 'standard', 50], // D3 - Tranche haute
      [10, 9, 'standard', 10],  // W1 - Juste avant majoration
      [10, 10, 'standard', 15], // W2 - Début majoration (10€ + 50%)
      [10, 50, 'standard', 15], // W2 - Limite haute poids
    ];

    test.each(successCases)(
      'Distance %p km -> Prix %p€ (%p)', 
      (dist, weight, type, expected) => {
        const result = calculateShipping(dist as number, weight as number, type as any);
        expect(result).toBe(expected);
      }
    );

    // Cas d'erreurs (4 cas)
    const errorCases = [
      [-1, 5, 'standard', "Invalid distance"],
      [10, 0, 'standard', "Invalid weight"],
      [10, -5, 'standard', "Invalid weight"],
      [10, 51, 'standard', "Invalid weight"],
    ];

    test.each(errorCases)(
      'Entrée invalide (%p, %p) doit lever "standard"', 
      (dist, weight, type, error) => {
        expect(() => 
          calculateShipping(dist as number, weight as number, type as any)
        ).toThrow(error);
      }
    );
  });

  // --- PARTIE 5.2 : N-WISE TESTING / PAIRWISE (6 cas) ---
  describe('2. Pairwise Testing (Optimisé)', () => {
    
    const pairwiseCases = [
      // ID | Dist | Poids | Type | Résultat Calculé
      [10, 5, 'standard', 10],    // ID 1: D1, W1, T1
      [10, 20, 'express', 30],    // ID 2: D1, W2, T2 -> (10 + 50%) * 2
      [100, 5, 'express', 50],    // ID 3: D2, W1, T2 -> (25 + 0%) * 2
      [100, 20, 'standard', 37.5],// ID 4: D2, W2, T1 -> (25 + 50%)
      [600, 5, 'express', 100],   // ID 5: D3, W1, T2 -> (50 + 0%) * 2
      [600, 20, 'standard', 75],   // ID 6: D3, W2, T1 -> (50 + 50%)
    ];

    test.each(pairwiseCases)(
      'Pairwise ID %#: Dist %p, Poids %p, Type %p -> %p€',
      (dist, weight, type, expected) => {
        const result = calculateShipping(dist as number, weight as number, type as any);
        expect(result).toBe(expected);
      }
    );
  });

});