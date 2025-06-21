
-- Créer la table des véhicules
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_per_day INTEGER NOT NULL,
  image_url TEXT,
  additional_images TEXT[], -- Array pour plusieurs images
  brand TEXT,
  model TEXT,
  year INTEGER,
  fuel_type TEXT DEFAULT 'Essence',
  transmission TEXT DEFAULT 'Manuelle',
  seats INTEGER DEFAULT 5,
  features TEXT[],
  rating DECIMAL(2,1) DEFAULT 4.5,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur la table vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des véhicules disponibles
CREATE POLICY "Anyone can view available vehicles" 
  ON public.vehicles 
  FOR SELECT 
  USING (is_available = true);

-- Politique pour permettre aux utilisateurs authentifiés de tout voir (pour l'admin)
CREATE POLICY "Authenticated users can view all vehicles" 
  ON public.vehicles 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Politique pour permettre aux utilisateurs authentifiés de modifier
CREATE POLICY "Authenticated users can insert vehicles" 
  ON public.vehicles 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles" 
  ON public.vehicles 
  FOR UPDATE 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete vehicles" 
  ON public.vehicles 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Créer un bucket pour stocker les images des véhicules
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-images', 'vehicle-images', true);

-- Politique pour permettre la lecture publique des images
CREATE POLICY "Anyone can view vehicle images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'vehicle-images');

-- Politique pour permettre aux utilisateurs authentifiés d'uploader des images
CREATE POLICY "Authenticated users can upload vehicle images" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-images');

-- Politique pour permettre aux utilisateurs authentifiés de supprimer des images
CREATE POLICY "Authenticated users can delete vehicle images" 
  ON storage.objects 
  FOR DELETE 
  TO authenticated
  USING (bucket_id = 'vehicle-images');

-- Insérer quelques véhicules d'exemple avec les données existantes
INSERT INTO public.vehicles (name, description, price_per_day, image_url, brand, model, fuel_type, transmission, seats, features, rating, is_available) VALUES
('Renault Clio', 'Véhicule compact et économique, parfait pour vos déplacements en ville', 2500, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Renault', 'Clio', 'Essence', 'Manuelle', 5, ARRAY['Climatisation', 'GPS', 'Bluetooth'], 4.8, true),
('Peugeot 208', 'Citadine moderne avec équipements de série', 2800, 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Peugeot', '208', 'Essence', 'Automatique', 5, ARRAY['Climatisation', 'GPS', 'Caméra de recul'], 4.9, true),
('Dacia Sandero', 'Véhicule spacieux et abordable pour tous vos trajets', 2200, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Dacia', 'Sandero', 'Essence', 'Manuelle', 5, ARRAY['Climatisation', 'Radio', 'USB'], 4.7, true);
