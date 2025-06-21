import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  price_per_day: number;
  image_url: string;
  is_available: boolean;
  fuel_type: string;
  transmission: string;
  year: number;
  seats: number;
  rating: number;
  display_order?: number;
}

const AdminVehicles = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, searchTerm, statusFilter]);

  const fetchVehicles = async () => {
    try {
      // Try to order by display_order first, fallback to created_at
      let { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      // If display_order column exists, try to order by it
      try {
        const { data: orderedData, error: orderError } = await supabase
          .from('vehicles')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('created_at', { ascending: false });
        
        if (!orderError && orderedData) {
          data = orderedData;
        }
      } catch (e) {
        // Ignore error if display_order column doesn't exist
        console.log('display_order column not available, using created_at order');
      }

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast.error('Erreur lors du chargement des véhicules');
    } finally {
      setIsLoading(false);
    }
  };

  const filterVehicles = () => {
    let filtered = vehicles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(vehicle =>
        statusFilter === 'available' ? vehicle.is_available : !vehicle.is_available
      );
    }

    setFilteredVehicles(filtered);
  };

  const toggleAvailability = async (vehicleId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ is_available: !currentStatus })
        .eq('id', vehicleId);

      if (error) throw error;

      setVehicles(vehicles.map(vehicle =>
        vehicle.id === vehicleId
          ? { ...vehicle, is_available: !currentStatus }
          : vehicle
      ));

      toast.success(`Véhicule ${!currentStatus ? 'activé' : 'désactivé'} avec succès`);
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Erreur lors de la modification du statut');
    }
  };

  const deleteVehicle = async (vehicleId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId);

      if (error) throw error;

      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
      toast.success('Véhicule supprimé avec succès');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDraggedOverIndex(null);
      return;
    }

    const newVehicles = [...filteredVehicles];
    const draggedVehicle = newVehicles[draggedIndex];
    
    // Remove dragged item and insert at new position
    newVehicles.splice(draggedIndex, 1);
    newVehicles.splice(dropIndex, 0, draggedVehicle);

    // Update display order for all vehicles
    const updatedVehicles = newVehicles.map((vehicle, index) => ({
      ...vehicle,
      display_order: index + 1
    }));

    setFilteredVehicles(updatedVehicles);
    
    try {
      // Test if display_order column exists
      const { error: testError } = await supabase
        .from('vehicles')
        .select('display_order')
        .limit(1);

      if (testError && (testError.message.includes('column "display_order" does not exist') || testError.message.includes('display_order'))) {
        throw new Error('COLUMN_MISSING');
      }

      // Update all vehicles with new order in database
      const updates = updatedVehicles.map((vehicle, index) => ({
        id: vehicle.id,
        display_order: index + 1
      }));

      // Update each vehicle's display order
      for (const update of updates) {
        const { error } = await supabase
          .from('vehicles')
          .update({ display_order: update.display_order } as any)
          .eq('id', update.id);
        
        if (error) {
          console.error('Update error for vehicle:', update.id, error);
          throw error;
        }
      }

      // Refresh the full vehicles list to maintain consistency
      await fetchVehicles();
      toast.success('Ordre des véhicules mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating vehicle order:', error);
      
      if (error instanceof Error && error.message === 'COLUMN_MISSING') {
        toast.error('La colonne display_order n\'existe pas encore.', {
          description: 'Consultez l\'encadré bleu au-dessus du tableau pour la commande SQL à exécuter.',
          duration: 8000
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        toast.error(`Erreur lors de la mise à jour de l'ordre: ${errorMessage}`);
      }
      
      // Revert changes on error
      await fetchVehicles();
    } finally {
      setDraggedIndex(null);
      setDraggedOverIndex(null);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.is_available).length,
    unavailable: vehicles.filter(v => !v.is_available).length,
    avgPrice: vehicles.length > 0 ? Math.round(vehicles.reduce((sum, v) => sum + v.price_per_day, 0) / vehicles.length) : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 dark:text-gray-300"
              >
                ← Retour au tableau de bord
              </Button>
            </div>
            <Button onClick={() => navigate('/admin/vehicles/add')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un véhicule
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 transition-colors">
            Gestion des véhicules
          </h1>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.available}</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Indisponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.unavailable}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher par nom, marque ou modèle..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('all')}
                    size="sm"
                  >
                    Tous
                  </Button>
                  <Button
                    variant={statusFilter === 'available' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('available')}
                    size="sm"
                  >
                    Disponibles
                  </Button>
                  <Button
                    variant={statusFilter === 'unavailable' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('unavailable')}
                    size="sm"
                  >
                    Indisponibles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info message for drag and drop */}
          {statusFilter === 'all' && !searchTerm && (
            <Card className="mb-4 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">Réorganisation des véhicules</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      Glissez-déposez les lignes avec l'icône ⋮⋮ pour changer l'ordre d'affichage des véhicules sur le site.
                                             {vehicles.length > 0 && vehicles[0].display_order === undefined && (
                         <span className="block mt-2 text-blue-600 dark:text-blue-300 font-medium">
                           💡 Pour activer cette fonctionnalité, exécutez dans l'éditeur SQL de Supabase: 
                           <code className="block mt-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/50 rounded text-xs font-mono whitespace-pre dark:text-blue-100">
{`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS display_order INTEGER;

UPDATE vehicles 
SET display_order = sub.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_num 
  FROM vehicles
  WHERE display_order IS NULL
) sub 
WHERE vehicles.id = sub.id AND vehicles.display_order IS NULL;`}
                           </code>
                           <small className="block mt-2 text-blue-500 dark:text-blue-400">
                             📄 Script complet disponible dans le fichier <code>migration_display_order.sql</code>
                           </small>
                         </span>
                       )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vehicles Table */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Prix/jour</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle, index) => (
                    <TableRow 
                      key={vehicle.id}
                      draggable={statusFilter === 'all' && !searchTerm}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`
                        ${draggedIndex === index ? 'opacity-50' : ''}
                        ${draggedOverIndex === index ? 'bg-blue-50 dark:bg-blue-950/30 border-t-2 border-blue-400 dark:border-blue-400' : ''}
                        ${statusFilter === 'all' && !searchTerm ? 'cursor-move' : ''}
                      `}
                    >
                      <TableCell className="p-2">
                        {statusFilter === 'all' && !searchTerm && (
                          <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
                            <GripVertical className="h-4 w-4" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <img
                          src={vehicle.image_url || '/placeholder.svg'}
                          alt={vehicle.name}
                          className="h-12 w-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{vehicle.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {vehicle.brand} {vehicle.model} ({vehicle.year})
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-gray-900 dark:text-white">{vehicle.price_per_day} DA</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={vehicle.is_available}
                            onCheckedChange={() => toggleAvailability(vehicle.id, vehicle.is_available)}
                            aria-label={`Basculer la disponibilité de ${vehicle.name}`}
                            className="data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
                          />
                          <span className={`text-sm font-medium ${
                            vehicle.is_available 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {vehicle.is_available ? 'Disponible' : 'Indisponible'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {vehicle.fuel_type} • {vehicle.transmission} • {vehicle.seats} places
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/vehicles/edit/${vehicle.id}`)}
                            title="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteVehicle(vehicle.id)}
                            title="Supprimer"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredVehicles.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Aucun véhicule ne correspond aux critères de recherche'
                    : 'Aucun véhicule trouvé'
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminVehicles;

