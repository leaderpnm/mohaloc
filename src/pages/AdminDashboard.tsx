import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Car, Plus, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const AdminDashboard = () => {
  const {
    user,
    loading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    unavailable: 0,
    avgPrice: 0
  });
  const [dailyEarningsEstimate, setDailyEarningsEstimate] = useState(0);
  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);
  useEffect(() => {
    fetchStats();
    calculateDailyEarningsEstimate();
  }, []);

  const calculateDailyEarningsEstimate = async () => {
    try {
      const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select('price_per_day, is_available');

      if (error) throw error;

      if (vehicles && vehicles.length > 0) {
        // Calcul exact : seulement les véhicules réservés/loués (is_available = false)
        const rentedVehicles = vehicles.filter(vehicle => !vehicle.is_available);
        const actualDailyEarnings = rentedVehicles.reduce((sum, vehicle) => sum + vehicle.price_per_day, 0);
        
        setDailyEarningsEstimate(actualDailyEarnings);
      } else {
        setDailyEarningsEstimate(0);
      }
    } catch (error) {
      console.error('Error calculating daily earnings estimate:', error);
    }
  };
  const fetchStats = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('vehicles').select('price_per_day, is_available');
      if (error) throw error;
      if (data) {
        const total = data.length;
        const available = data.filter(v => v.is_available).length;
        const unavailable = total - available;
        const avgPrice = total > 0 ? Math.round(data.reduce((sum, v) => sum + v.price_per_day, 0) / total) : 0;
        setStats({
          total,
          available,
          unavailable,
          avgPrice
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  const handleSignOut = async () => {
    const {
      error
    } = await signOut();
    if (error) {
      toast.error('Erreur lors de la déconnexion');
    } else {
      toast.success('Déconnexion réussie');
      navigate('/admin');
    }
  };
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>;
  }
  if (!user) {
    return null;
  }
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img alt="Moha Location" className="h-8 w-auto dark:hidden" src="https://image.noelshack.com/fichiers/2025/25/2/1750194009-mohade.png" />
              <img alt="Moha Location" className="h-8 w-auto hidden dark:block" src="https://image.noelshack.com/fichiers/2025/25/2/1750194878-mohade-white.png" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300 text-center flex-1 sm:text-left sm:flex-none transition-colors">
                Connecté en tant que {user.email}
              </span>
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
              Tableau de bord
            </h2>
            <p className="text-gray-600 dark:text-gray-300 transition-colors">
              Gérez vos véhicules et surveillez votre activité
            </p>
          </div>

          {/* Daily Earnings */}
          <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      Gains journaliers actuels
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Basé sur les véhicules actuellement réservés/loués
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {dailyEarningsEstimate} DA
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stats.unavailable} véhicule{stats.unavailable !== 1 ? 's' : ''} loué{stats.unavailable !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700" onClick={() => navigate('/admin/vehicles/add')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ajouter un véhicule
                </CardTitle>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Ajouter un nouveau véhicule à votre flotte
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700" onClick={() => navigate('/admin/vehicles')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Gérer les véhicules
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Voir et modifier vos véhicules existants
                </p>
              </CardContent>
            </Card>
          </div>



          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Véhicules totaux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Dans votre flotte
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.available}</div>
                <p className="text-xs text-muted-foreground">
                  Prêts à la location
                </p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Réservés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.unavailable}</div>
                <p className="text-xs text-muted-foreground">
                  Actuellement loués
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>;
};

export default AdminDashboard;
