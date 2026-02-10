import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { leadStates, convertDatabaseLeadToLead } from "@/types/lead";
import { fetchLeads } from "@/services/leadService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RefreshCw, AlertCircle, ChevronDown, Users, BarChart3, TrendingUp } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useIsMobile } from "@/hooks/use-mobile";

type TimeFrame = 'oggi' | 'settimana' | 'mese' | 'anno';

const timeFrameLabels: Record<TimeFrame, string> = {
  oggi: 'Oggi',
  settimana: 'Settimana',
  mese: 'Mese',
  anno: 'Anno',
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

  const loadLeads = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const dbLeads = await fetchLeads();
      const convertedLeads = dbLeads.map(convertDatabaseLeadToLead);
      setLeads(convertedLeads);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Errore sconosciuto');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleRefresh = () => {
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
    };
  };

  const data = getKPIData(timeFrame);

  const leadsByState = Object.keys(leadStates).map(state => ({
    stato: leadStates[state as keyof typeof leadStates].label,
    count: leads.filter(lead => lead.stato === state).length,
    color: leadStates[state as keyof typeof leadStates].color
  })).filter(item => item.count > 0);

  const recentLeads = leads
    .sort((a, b) => new Date(b.dataRichiesta).getTime() - new Date(a.dataRichiesta).getTime())
    .slice(0, 5);

  if (authLoading || isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-cei-red" />
            <p className="text-gray-600 font-roboto">Caricamento...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 px-4">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-ricasa-black mb-2 font-roboto">Errore</h2>
            <p className="text-sm text-gray-600 mb-4 font-roboto">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-cei-red hover:bg-cei-red-dark text-ricasa-white font-medium rounded-xl px-6 py-2.5 shadow-sm transition-all active:scale-[0.98] text-sm font-roboto"
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
      <div className="space-y-3 sm:space-y-4 w-full pb-20 sm:pb-0">
        {/* Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-ricasa-black font-roboto">Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-roboto">
                <span className="font-nums">{leads.length}</span> preventivi totali
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 font-medium text-xs sm:text-sm transition-colors font-roboto"
              >
                <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {!isMobile && "Aggiorna"}
              </button>

              {/* Time frame dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTimeFrameOpen(!timeFrameOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 font-medium text-xs sm:text-sm transition-colors min-w-[100px] sm:min-w-[120px] justify-between font-roboto"
                >
                  <span className="truncate">{timeFrameLabels[timeFrame]}</span>
                  <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                </button>
                {timeFrameOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setTimeFrameOpen(false)} />
                    <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-lg z-20 overflow-hidden">
                      {(Object.keys(timeFrameLabels) as TimeFrame[]).map((tf) => (
                        <button
                          key={tf}
                          onClick={() => { setTimeFrame(tf); setTimeFrameOpen(false); }}
                          className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors font-roboto ${
                            tf === timeFrame ? 'bg-cei-red/10 text-cei-red font-semibold' : 'text-gray-700 hover:bg-gray-50'
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
                className="bg-cei-red hover:bg-cei-red-dark text-ricasa-white font-medium rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-xs sm:text-sm whitespace-nowrap font-roboto"
              >
                {isMobile ? "Leads" : "Gestisci Leads"}
              </button>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {leads.length === 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-ricasa-black text-sm sm:text-base font-roboto">Nessun lead</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-roboto">
                  Completa il configuratore per generare dei lead di esempio.
                </p>
                <button 
                  onClick={() => navigate("/")}
                  className="mt-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors font-roboto"
                >
                  Vai al configuratore
                </button>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards - Mobile: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 md:p-5">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate font-roboto">Lead Totali</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-ricasa-black mt-1 sm:mt-2 truncate font-nums">{data.totalLeads}</p>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 md:p-5">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate font-roboto">Valore Totale</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-ricasa-black mt-1 sm:mt-2 truncate font-nums">€{data.totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 md:p-5">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate font-roboto">Valore Medio</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-ricasa-black mt-1 sm:mt-2 truncate font-nums">€{Math.round(data.avgValue).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 md:p-5">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate font-roboto">Acquisiti</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-ricasa-black mt-1 sm:mt-2 truncate font-nums">{data.acquired}</p>
          </div>
        </div>

        {/* Charts and Recent Leads - Mobile: stacked, Desktop: side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Chart */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 md:p-6 flex flex-col min-h-[280px] sm:min-h-[320px] md:min-h-[400px]">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-cei-red" />
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-ricasa-black font-roboto">Lead per Stato</h2>
            </div>
            <div className="flex-1 min-h-[200px] sm:min-h-[240px] md:min-h-[320px]">
              {leadsByState.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadsByState}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="stato" 
                      tick={{ fontSize: isMobile ? 9 : 11, fill: '#6B7280' }} 
                      angle={isMobile ? -45 : 0}
                      textAnchor={isMobile ? "end" : "middle"}
                      height={isMobile ? 70 : 40}
                    />
                    <YAxis tick={{ fontSize: isMobile ? 9 : 11, fill: '#6B7280' }} width={isMobile ? 30 : 40} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '0.5rem',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                        fontSize: isMobile ? '0.75rem' : '0.875rem',
                        fontFamily: 'Roboto, sans-serif',
                      }}
                    />
                    <Bar dataKey="count" fill="#d8010c" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs sm:text-sm font-roboto">Nessun dato disponibile</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 md:p-6 flex flex-col min-h-[280px] sm:min-h-[320px] md:min-h-[400px]">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-cei-red" />
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-ricasa-black font-roboto">Ultimi Lead</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {recentLeads.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {recentLeads.map((lead, index) => {
                    const leadStateInfo = leadStates[lead.stato as keyof typeof leadStates];
                    return (
                      <div 
                        key={lead.id} 
                        className={`flex items-center justify-between py-2 sm:py-3 gap-2 ${
                          index < recentLeads.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-ricasa-black text-sm sm:text-base md:text-lg truncate font-roboto">
                            {lead.nome} {lead.cognome}
                          </p>
                          <p className="text-[11px] sm:text-sm md:text-base text-gray-500 truncate font-roboto">{lead.citta}</p>
                        </div>
                        <div className="text-right flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                          <p className="font-bold text-cei-red text-sm sm:text-base md:text-lg font-nums">
                            €{lead.stimaMax.toLocaleString()}
                          </p>
                          {leadStateInfo && !isMobile && (
                            <span className="inline-block bg-cei-red/10 text-cei-red rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm font-semibold whitespace-nowrap font-roboto">
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
                    <Users className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs sm:text-sm font-roboto">Nessun lead recente</p>
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
