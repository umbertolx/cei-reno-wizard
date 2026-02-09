import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { leadStates, convertDatabaseLeadToLead } from "@/types/lead";
import { fetchLeads } from "@/services/leadService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RefreshCw, AlertCircle, ChevronDown, Users } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useIsMobile } from "@/hooks/use-mobile";

type TimeFrame = 'oggi' | 'settimana' | 'mese' | 'anno';

const timeFrameLabels: Record<TimeFrame, string> = {
  oggi: 'Oggi',
  settimana: 'Questa settimana',
  mese: 'Questo mese',
  anno: "Quest'anno",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('mese');
  const [timeFrameOpen, setTimeFrameOpen] = useState(false);
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
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Caricamento dashboard...</p>
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
          <div className="text-center px-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Errore nel caricamento</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-[#d8010c] hover:bg-[#b8000a] text-white font-semibold rounded-xl px-6 py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              Riprova
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6 w-full pb-20 md:pb-0">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm md:text-base font-light text-gray-600">
              Panoramica generale ({leads.length} totali)
              {leads.length === 0 && (
                <span className="text-amber-600 ml-2">
                  ⚠️ Nessun lead
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-3 md:px-4 py-2 font-medium text-sm transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {!isMobile && "Aggiorna"}
            </button>

            {/* Custom dropdown for time frame */}
            <div className="relative">
              <button
                onClick={() => setTimeFrameOpen(!timeFrameOpen)}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-3 md:px-4 py-2 font-medium text-sm transition-colors min-w-[130px] md:min-w-[160px] justify-between"
              >
                <span className="truncate">{timeFrameLabels[timeFrame]}</span>
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              </button>
              {timeFrameOpen && (
                <>
                  {/* Backdrop to close dropdown on mobile */}
                  <div className="fixed inset-0 z-10" onClick={() => setTimeFrameOpen(false)} />
                  <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-md z-20 overflow-hidden">
                    {(Object.keys(timeFrameLabels) as TimeFrame[]).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => { setTimeFrame(tf); setTimeFrameOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          tf === timeFrame ? 'bg-gray-50 text-[#d8010c] font-semibold' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {timeFrameLabels[tf]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button 
              onClick={() => navigate("/admin/leads")}
              className="bg-[#d8010c] hover:bg-[#b8000a] text-white font-semibold rounded-xl px-4 md:px-6 py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-sm whitespace-nowrap"
            >
              {isMobile ? "Leads" : "Gestisci Leads"}
            </button>
          </div>
        </div>

        {/* Debug info per sviluppatori */}
        {leads.length === 0 && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4 md:p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800">Database vuoto</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Per testare la dashboard, completa il configuratore sul sito principale per generare dei lead di esempio.
                </p>
                <button 
                  onClick={() => navigate("/")}
                  className="mt-2 bg-white border border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  Vai al configuratore
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {[
            { label: "Total Leads", value: data.totalLeads.toString(), sub: `${data.comparison.total} ${data.benchmark}` },
            { label: "Valore Totale", value: `€${data.totalValue.toLocaleString()}`, sub: `${data.comparison.value} ${data.benchmark}` },
            { label: "Valore Medio", value: `€${Math.round(data.avgValue).toLocaleString()}`, sub: `${data.comparison.avg} ${data.benchmark}` },
            { label: "Acquisiti", value: data.acquired.toString(), sub: `${data.comparison.acquired} ${data.benchmark}` },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
              <p className="text-xs md:text-sm font-medium text-gray-500 truncate">{stat.label}</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900 mt-1 md:mt-2 truncate">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1 truncate">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts and Recent Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Chart */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 flex flex-col lg:min-h-[420px]">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Lead per Stato</h2>
            <div className="flex-1 min-h-[220px] md:min-h-[300px]">
              {leadsByState.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadsByState}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="stato" 
                      tick={{ fontSize: isMobile ? 10 : 12, fill: '#6B7280' }} 
                      angle={isMobile ? -45 : 0}
                      textAnchor={isMobile ? "end" : "middle"}
                      height={isMobile ? 60 : 30}
                    />
                    <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} width={30} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '0.75rem',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                        fontSize: '0.875rem',
                      }}
                    />
                    <Bar dataKey="count" fill="#d8010c" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nessun dato disponibile</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 flex flex-col lg:min-h-[420px]">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Ultimi Lead</h2>
            <div className="flex-1">
              {recentLeads.length > 0 ? (
                <div>
                  {recentLeads.map((lead, index) => {
                    const leadStateInfo = leadStates[lead.stato as keyof typeof leadStates];
                    return (
                      <div 
                        key={lead.id} 
                        className={`flex items-center justify-between py-3 gap-2 ${
                          index < recentLeads.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm md:text-base truncate">
                            {lead.nome} {lead.cognome}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 truncate">{lead.citta}</p>
                        </div>
                        <div className="text-right flex items-center gap-2 md:gap-3 flex-shrink-0">
                          <p className="font-bold text-[#d8010c] text-sm md:text-base">
                            €{lead.stimaMax.toLocaleString()}
                          </p>
                          {leadStateInfo && !isMobile && (
                            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap">
                              {leadStateInfo.label}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nessun lead recente</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
