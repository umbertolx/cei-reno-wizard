import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { leadStates, convertDatabaseLeadToLead } from "@/data/mockLeads";
import { fetchLeads } from "@/services/leadService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, DollarSign, Calendar, RefreshCw, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type TimeFrame = 'oggi' | 'settimana' | 'mese' | 'anno';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('mese');
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica i lead dal database
  const loadLeads = async () => {
    console.log("📊 Dashboard: Loading leads...");
    setIsLoading(true);
    setError(null);
    
    try {
      const dbLeads = await fetchLeads();
      console.log(`📊 Dashboard: Fetched ${dbLeads.length} leads from database`);
      
      const convertedLeads = dbLeads.map(convertDatabaseLeadToLead);
      console.log("📊 Dashboard: Converted leads:", convertedLeads);
      
      setLeads(convertedLeads);
    } catch (error) {
      console.error("❌ Dashboard: Error loading leads:", error);
      setError(error instanceof Error ? error.message : 'Errore sconosciuto');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Funzione per ricaricare manualmente i dati
  const handleRefresh = () => {
    console.log("🔄 Dashboard: Manual refresh requested");
    loadLeads();
  };

  const getKPIData = (timeFrame: TimeFrame) => {
    const now = new Date();
    let startDate: Date;

    switch (timeFrame) {
      case 'oggi':
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'settimana':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'mese':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'anno':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const filteredLeads = leads.filter(lead => {
      const leadDate = new Date(lead.dataRichiesta);
      return leadDate >= startDate;
    });

    const totalLeads = filteredLeads.length;
    const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.stimaMax, 0);
    const avgValue = totalLeads > 0 ? totalValue / totalLeads : 0;
    const acquired = filteredLeads.filter(lead => lead.stato === 'chiuso').length;

    return {
      totalLeads,
      totalValue,
      avgValue,
      acquired,
      comparison: { total: 'N/A', value: 'N/A', avg: 'N/A', acquired: 'N/A' },
      benchmark: `negli ultimi ${timeFrame === 'oggi' ? 'oggi' : timeFrame === 'settimana' ? '7 giorni' : timeFrame === 'mese' ? '30 giorni' : '365 giorni'}`
    };
  };

  const data = getKPIData(timeFrame);

  // Fixed leadsByState with proper null checks
  const leadsByState = Object.keys(leadStates).map(state => ({
    stato: leadStates[state as keyof typeof leadStates].label,
    count: leads.filter(lead => lead.stato === state).length,
    color: leadStates[state as keyof typeof leadStates].color
  })).filter(item => item.count > 0); // Only show states that have leads

  const recentLeads = leads
    .sort((a, b) => new Date(b.dataRichiesta).getTime() - new Date(a.dataRichiesta).getTime())
    .slice(0, 5);

  if (authLoading || isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Caricamento dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null; // useAdminAuth will redirect
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Errore nel caricamento</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={handleRefresh} className="bg-[#d8010c] hover:bg-[#b8010a]">
              Riprova
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Panoramica generale dei preventivi ({leads.length} totali)
              {leads.length === 0 && (
                <span className="text-amber-600 ml-2">
                  ⚠️ Nessun lead presente nel database
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Aggiorna
            </Button>
            <Select value={timeFrame} onValueChange={(value: TimeFrame) => setTimeFrame(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Seleziona periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oggi">Oggi</SelectItem>
                <SelectItem value="settimana">Questa settimana</SelectItem>
                <SelectItem value="mese">Questo mese</SelectItem>
                <SelectItem value="anno">Quest'anno</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => navigate("/admin/leads")}
              className="bg-[#d8010c] hover:bg-[#b8010a]"
            >
              Gestisci Leads
            </Button>
          </div>
        </div>

        {/* Debug info per sviluppatori */}
        {leads.length === 0 && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Database vuoto</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Per testare la dashboard, completa il configuratore sul sito principale per generare dei lead di esempio.
                  </p>
                  <Button 
                    onClick={() => navigate("/")}
                    variant="outline"
                    size="sm"
                    className="mt-2 border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    Vai al configuratore
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalLeads}</div>
              <p className="text-xs text-muted-foreground">
                {data.comparison.total} {data.benchmark}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valore Totale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{data.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {data.comparison.value} {data.benchmark}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valore Medio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{Math.round(data.avgValue).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {data.comparison.avg} {data.benchmark}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acquisiti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.acquired}</div>
              <p className="text-xs text-muted-foreground">
                {data.comparison.acquired} {data.benchmark}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Lead per Stato</CardTitle>
            </CardHeader>
            <CardContent>
              {leadsByState.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadsByState}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stato" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#d8010c" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nessun dato disponibile</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Leads */}
          <Card>
            <CardHeader>
              <CardTitle>Ultimi Lead</CardTitle>
            </CardHeader>
            <CardContent>
              {recentLeads.length > 0 ? (
                <div className="space-y-4">
                  {recentLeads.map((lead) => {
                    const leadStateInfo = leadStates[lead.stato as keyof typeof leadStates];
                    return (
                      <div key={lead.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{lead.nome} {lead.cognome}</p>
                          <p className="text-sm text-gray-600">{lead.citta}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€{lead.stimaMax.toLocaleString()}</p>
                          {leadStateInfo && (
                            <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${leadStateInfo.color}`}>
                              {leadStateInfo.label}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nessun lead recente</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
