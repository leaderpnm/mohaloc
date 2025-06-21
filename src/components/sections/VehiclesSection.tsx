
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Fuel, Users, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "../../hooks/useTranslation";
import VehicleImageCarousel from "@/components/VehicleImageCarousel";

interface Vehicle {
  id: string;
  name: string;
  description: string | null;
  price_per_day: number;
  image_url: string | null;
  additional_images: string[] | null;
  brand: string | null;
  model: string | null;
  fuel_type: string | null;
  transmission: string | null;
  seats: number | null;
  features: string[] | null;
  rating: number | null;
  is_available: boolean;
}

const VehiclesSection = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      console.log('🚗 Starting to fetch vehicles...');
      
      try {
        setLoading(true);
        setError(null);
        
        // Try to order by display_order first, fallback to created_at
        let { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('is_available', true)
          .order('created_at', { ascending: false });

        // If display_order column exists, try to order by it
        try {
          const { data: orderedData, error: orderError } = await supabase
            .from('vehicles')
            .select('*')
            .eq('is_available', true)
            .order('display_order', { ascending: true, nullsFirst: false })
            .order('created_at', { ascending: false });
          
          if (!orderError && orderedData) {
            data = orderedData;
          }
        } catch (e) {
          // Ignore error if display_order column doesn't exist
          console.log('display_order column not available, using created_at order');
        }

        console.log('📊 Query results:', {
          data: data,
          error: error,
          dataLength: data?.length
        });

        if (error) {
          console.error('❌ Query error:', error);
          throw error;
        }

        console.log('✅ Setting vehicles state with:', data?.length || 0, 'vehicles');
        setVehicles(data || []);
        
      } catch (error) {
        console.error('💥 Fetch error:', error);
        setError(error instanceof Error ? error.message : 'Erreur lors du chargement des véhicules');
      } finally {
        setLoading(false);
        console.log('🏁 Fetch completed');
      }
    };

    fetchVehicles();
  }, []);

  console.log('🎨 VehiclesSection render:', {
    loading,
    error,
    vehiclesCount: vehicles.length
  });

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <section id="vehicles" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('vehicles.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.log('❌ Rendering error state:', error);
    return (
      <section id="vehicles" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 text-lg">{t('vehicles.error')}: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              {t('vehicles.retry')}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  console.log('🔍 About to render vehicles section with', vehicles.length, 'vehicles');

  // Determine which vehicles to display
  const vehiclesToDisplay = showAll ? vehicles : vehicles.slice(0, 3);
  const hasMoreVehicles = vehicles.length > 3;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="vehicles" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 sm:mb-4 font-semibold">
            {t('vehicles.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t('vehicles.subtitle')}
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t('vehicles.noVehicles')}</p>
            <p className="text-gray-500 text-sm mt-2">{t('vehicles.dataFound')} {vehicles.length} {t('vehicles.availableCount')}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <div className="bg-white rounded-lg p-3 inline-block border border-gray-200">
                <p className="font-semibold" style={{ color: '#006533' }}>
                  {showAll ? `${vehicles.length} ${t('vehicles.availableCount')}` : `${vehiclesToDisplay.length} ${t('vehicles.displayedCount')} ${vehicles.length} ${t('vehicles.availableCount')}`}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {vehiclesToDisplay.map((vehicle, index) => {
                console.log(`🎯 Rendering vehicle card ${index + 1}:`, vehicle.name, 'ID:', vehicle.id);
                
                // Create images array from image_url and additional_images
                const vehicleImages: string[] = [];
                if (vehicle.image_url) {
                  vehicleImages.push(vehicle.image_url);
                }
                if (vehicle.additional_images && Array.isArray(vehicle.additional_images)) {
                  vehicle.additional_images.forEach(img => {
                    if (img && !vehicleImages.includes(img)) {
                      vehicleImages.push(img);
                    }
                  });
                }
                
                return (
                  <Card 
                    key={vehicle.id} 
                    className="overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-0">
                      {/* Carousel d'images */}
                      <VehicleImageCarousel 
                        images={vehicleImages.length > 0 ? vehicleImages : [vehicle.image_url || 'https://via.placeholder.com/800x600?text=Pas+d\'image']} 
                        vehicleName={vehicle.name}
                      />

                      {/* Informations */}
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{vehicle.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" style={{ color: '#D20F33' }} />
                            <span className="text-sm font-medium">{vehicle.rating || 4.5}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{vehicle.seats || 5} {t('vehicles.seats')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-4 w-4" />
                            <span>{vehicle.fuel_type || 'Essence'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">{vehicle.transmission || t('vehicles.manual')}</span>
                            <span className="sm:hidden">Man.</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {(vehicle.features || []).map((feature, featureIndex) => (
                              <span key={featureIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Prix et bouton - Version mobile */}
                        <div className="sm:hidden">
                          <div className="mb-3">
                            <span className="text-xl font-bold text-primary">{vehicle.price_per_day} DA</span>
                            <span className="text-gray-600 text-sm">{t('vehicles.perDay')}</span>
                          </div>
                          <Button 
                            className="bg-primary hover:bg-primary-dark text-white w-full"
                            onClick={() => window.open('tel:+213123456789', '_self')}
                          >
                            {t('vehicles.reserve')}
                          </Button>
                        </div>

                        {/* Prix et bouton - Version desktop */}
                        <div className="hidden sm:flex items-center justify-between gap-3">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-primary">{vehicle.price_per_day} DA</span>
                            <span className="text-gray-600 text-sm">{t('vehicles.perDay')}</span>
                          </div>
                          <Button 
                            className="bg-primary hover:bg-primary-dark text-white"
                            onClick={() => window.open('tel:+213123456789', '_self')}
                          >
                            {t('vehicles.reserve')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {hasMoreVehicles && (
          <div className="text-center mt-8 sm:mt-12">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto"
              onClick={toggleShowAll}
            >
              {showAll ? t('vehicles.showLess') : t('vehicles.showMore')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehiclesSection;

