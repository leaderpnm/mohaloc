
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X } from 'lucide-react';

interface EquipmentSelectorProps {
  features: string[];
  onFeaturesChange: (features: string[]) => void;
}

const PREDEFINED_EQUIPMENT = {
  exterior: [
    'Peinture métallisée', 'Jantes en alliage', 'Toit ouvrant', 'Phares LED', 
    'Barres de toit', 'Rétroviseurs chauffants', 'Vitres teintées'
  ],
  interior: [
    'Sièges en cuir', 'Sièges chauffants', 'Volant chauffant', 'Climatisation bizone',
    'Écran tactile', 'Système audio premium', 'Éclairage d\'ambiance'
  ],
  comfort: [
    'Accès sans clé', 'Démarrage à distance', 'Hayon électrique', 'Chargeur sans fil',
    'Ports USB', 'Pare-soleil électrique'
  ],
  security: [
    'Airbags multiples', 'ABS', 'Capteurs de stationnement', 'Caméra de recul',
    'Régulateur adaptatif', 'Assistance de voie', 'Freinage d\'urgence'
  ],
  performance: [
    'Suspension adaptative', 'Mode sport', 'Échappement sport', 'Transmission intégrale'
  ],
  connectivity: [
    'Bluetooth', 'Apple CarPlay', 'Android Auto', 'Navigation GPS', 'Wi-Fi'
  ],
  packs: [
    'Pack Hiver', 'Pack Sport', 'Pack Luxe', 'Pack Tout-terrain'
  ]
};

const CATEGORY_LABELS = {
  exterior: 'Extérieur',
  interior: 'Intérieur', 
  comfort: 'Confort',
  security: 'Sécurité',
  performance: 'Performance',
  connectivity: 'Connectivité',
  packs: 'Packs'
};

export const EquipmentSelector = ({ features, onFeaturesChange }: EquipmentSelectorProps) => {
  const [newFeature, setNewFeature] = useState('');

  const addFeature = (feature: string) => {
    if (feature.trim() && !features.includes(feature.trim())) {
      onFeaturesChange([...features, feature.trim()]);
    }
  };

  const removeFeature = (featureToRemove: string) => {
    onFeaturesChange(features.filter(feature => feature !== featureToRemove));
  };

  const addCustomFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      onFeaturesChange([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équipements et options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Features */}
        {features.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Équipements sélectionnés :</h4>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2 pr-1">
                  <span className="flex-1">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Predefined Equipment Categories */}
        <Tabs defaultValue="exterior" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto p-1">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <TabsTrigger 
                key={key} 
                value={key} 
                className="text-xs px-3 py-3 md:px-4 md:py-3 min-h-[44px] rounded"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(PREDEFINED_EQUIPMENT).map(([category, items]) => (
            <TabsContent key={category} value={category} className="space-y-3 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {items.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={features.includes(item) ? "default" : "outline"}
                    size="sm"
                    onClick={() => features.includes(item) ? removeFeature(item) : addFeature(item)}
                    className="justify-start text-left h-auto py-3 px-4 whitespace-normal text-wrap min-h-[44px]"
                  >
                    <span className="block w-full">{item}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Custom Feature Input */}
        <div>
          <h4 className="text-sm font-medium mb-2">Ajouter un équipement personnalisé :</h4>
          <div className="flex gap-2 items-start">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Saisir un équipement..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
              className="max-w-xs h-11"
            />
            <Button type="button" onClick={addCustomFeature} size="icon" className="shrink-0 h-11 w-11">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
