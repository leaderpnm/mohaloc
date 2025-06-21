-- Migration pour ajouter la fonctionnalité de réorganisation des véhicules
-- À exécuter dans l'éditeur SQL de Supabase

-- Étape 1: Ajouter la colonne display_order à la table vehicles
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Étape 2: Initialiser l'ordre pour les véhicules existants
-- (Les plus récents en premier, comme l'ordre actuel)
UPDATE vehicles 
SET display_order = sub.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_num 
  FROM vehicles
  WHERE display_order IS NULL
) sub 
WHERE vehicles.id = sub.id AND vehicles.display_order IS NULL;

-- Étape 3: Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_vehicles_display_order ON vehicles(display_order);

-- Vérification: Afficher les véhicules avec leur nouvel ordre
SELECT name, display_order, created_at 
FROM vehicles 
ORDER BY display_order; 