
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { EquipmentSelector } from '@/components/admin/EquipmentSelector';
import ImageUpload from '@/components/admin/ImageUpload';

const AdminAddVehicle = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price_per_day: 0,
    fuel_type: 'Essence',
    transmission: 'Manuelle',
    seats: 5,
    is_available: true,
    rating: 4.5
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('vehicles')
        .insert({
          ...formData,
          image_url: images[0] || '', // Use first image as main image
          additional_images: images.length > 1 ? images.slice(1) : [], // Store additional images
          features: features
        });

      if (error) throw error;

      toast.success('Véhicule ajouté avec succès !');
      navigate('/admin/vehicles');
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Erreur lors de l\'ajout du véhicule');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/vehicles')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la liste
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 transition-colors">
            Ajouter un véhicule
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom du véhicule *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      placeholder="Ex: Renault Clio"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Marque</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Ex: Renault"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="model">Modèle</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="Ex: Clio"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Année</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                      min="1990"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Décrivez les caractéristiques principales du véhicule..."
                    rows={3}
                  />
                </div>

                <ImageUpload
                  value={images}
                  onChange={setImages}
                  label="Images du véhicule"
                />
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Spécifications techniques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fuel_type">Carburant</Label>
                    <select
                      id="fuel_type"
                      value={formData.fuel_type}
                      onChange={(e) => handleInputChange('fuel_type', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Essence">Essence</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybride">Hybride</option>
                      <option value="Électrique">Électrique</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="transmission">Transmission</Label>
                    <select
                      id="transmission"
                      value={formData.transmission}
                      onChange={(e) => handleInputChange('transmission', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Manuelle">Manuelle</option>
                      <option value="Automatique">Automatique</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="seats">Nombre de places</Label>
                    <Input
                      id="seats"
                      type="number"
                      value={formData.seats}
                      onChange={(e) => handleInputChange('seats', parseInt(e.target.value))}
                      min="2"
                      max="9"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price_per_day">Prix par jour (DA) *</Label>
                    <Input
                      id="price_per_day"
                      type="number"
                      value={formData.price_per_day}
                      onChange={(e) => handleInputChange('price_per_day', parseInt(e.target.value))}
                      required
                      min="0"
                      step="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rating">Note (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      value={formData.rating}
                      onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                      min="1"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <EquipmentSelector features={features} onFeaturesChange={setFeatures} />

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Disponibilité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_available"
                    checked={formData.is_available}
                    onCheckedChange={(checked) => handleInputChange('is_available', checked)}
                  />
                  <Label htmlFor="is_available">Véhicule disponible à la location</Label>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/vehicles')}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Ajout en cours...' : 'Ajouter le véhicule'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminAddVehicle;
