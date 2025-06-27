
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Database, Table, Users, FileText, Activity, Info, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TableInfo {
  table_name: string;
  column_count: number;
  row_count: number;
}

interface ColumnInfo {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

interface LeadStats {
  total_leads: number;
  by_status: Array<{ status: string; count: number; color: string }>;
  by_city: Array<{ city: string; count: number }>;
  by_month: Array<{ month: string; count: number }>;
  avg_estimate: number;
  total_value: number;
}

const DatabaseInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableInfo, setTableInfo] = useState<TableInfo[]>([]);
  const [leadsColumns, setLeadsColumns] = useState<ColumnInfo[]>([]);
  const [estimatesColumns, setEstimatesColumns] = useState<ColumnInfo[]>([]);
  const [leadStats, setLeadStats] = useState<LeadStats | null>(null);

  const statusColors = {
    'nuovo': '#3b82f6',
    'contattato': '#f59e0b',
    'sopralluogo': '#8b5cf6',
    'preventivo': '#06b6d4',
    'chiuso': '#10b981',
    'perso': '#ef4444'
  };

  const loadDatabaseInfo = async () => {
    setIsLoading(true);
    try {
      // Get table information
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

      if (tablesError) throw tablesError;

      // Get row counts for each table
      const tableInfoPromises = tables?.map(async (table) => {
        const { count } = await supabase
          .from(table.table_name)
          .select('*', { count: 'exact', head: true });
        
        return {
          table_name: table.table_name,
          row_count: count || 0,
          column_count: 0 // Will be filled later
        };
      }) || [];

      const tableInfoResults = await Promise.all(tableInfoPromises);
      setTableInfo(tableInfoResults);

      // Get column information for leads table
      const { data: leadsColumnData } = await supabase.rpc('get_table_columns', { 
        table_name: 'leads' 
      }).single();
      
      if (leadsColumnData) {
        setLeadsColumns(leadsColumnData);
      }

      // Get column information for estimates table
      const { data: estimatesColumnData } = await supabase.rpc('get_table_columns', { 
        table_name: 'estimates' 
      }).single();
      
      if (estimatesColumnData) {
        setEstimatesColumns(estimatesColumnData);
      }

      // Get leads statistics
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*');

      if (leadsError) throw leadsError;

      if (leads) {
        const statusCounts = leads.reduce((acc, lead) => {
          acc[lead.stato] = (acc[lead.stato] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const cityCounts = leads.reduce((acc, lead) => {
          acc[lead.citta] = (acc[lead.citta] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const monthCounts = leads.reduce((acc, lead) => {
          const month = new Date(lead.data_creazione).toLocaleDateString('it-IT', { 
            year: 'numeric', 
            month: 'short' 
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const totalValue = leads.reduce((sum, lead) => sum + (lead.stima_max || 0), 0);
        const avgEstimate = leads.length > 0 ? totalValue / leads.length : 0;

        setLeadStats({
          total_leads: leads.length,
          by_status: Object.entries(statusCounts).map(([status, count]) => ({
            status,
            count,
            color: statusColors[status as keyof typeof statusColors] || '#6b7280'
          })),
          by_city: Object.entries(cityCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([city, count]) => ({ city, count })),
          by_month: Object.entries(monthCounts)
            .map(([month, count]) => ({ month, count })),
          avg_estimate: avgEstimate,
          total_value: totalValue
        });
      }

    } catch (error) {
      console.error("Error loading database info:", error);
      toast({
        title: "Errore",
        description: "Impossibile caricare le informazioni del database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseInfo();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Caricamento informazioni database...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="h-8 w-8" />
              Database Overview
            </h1>
            <p className="text-gray-600">
              Panoramica completa del database Supabase e delle tabelle
            </p>
          </div>
          <Button 
            onClick={loadDatabaseInfo}
            disabled={isLoading}
            className="bg-[#d8010c] hover:bg-[#b8010a]"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Aggiorna
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Panoramica</TabsTrigger>
            <TabsTrigger value="tables">Tabelle</TabsTrigger>
            <TabsTrigger value="data">Dati Lead</TabsTrigger>
            <TabsTrigger value="structure">Struttura</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tabelle Totali</CardTitle>
                  <Table className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tableInfo.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Tabelle nel schema public
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lead Totali</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leadStats?.total_leads || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Preventivi registrati
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valore Totale</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€{leadStats?.total_value.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Valore stimato totale
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead per Stato</CardTitle>
                </CardHeader>
                <CardContent>
                  {leadStats?.by_status.length ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={leadStats.by_status}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ status, count }) => `${status}: ${count}`}
                        >
                          {leadStats.by_status.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      Nessun dato disponibile
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead per Città (Top 10)</CardTitle>
                </CardHeader>
                <CardContent>
                  {leadStats?.by_city.length ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={leadStats.by_city}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#d8010c" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      Nessun dato disponibile
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informazioni Tabelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tableInfo.map((table) => (
                    <div key={table.table_name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Table className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{table.table_name}</h3>
                          <p className="text-sm text-gray-600">{table.row_count} righe</p>
                        </div>
                      </div>
                      <Badge variant="outline">{table.table_name === 'leads' ? 'Principale' : 'Supporto'}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            {leadStats && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuzione Lead per Mese</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={leadStats.by_month}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Statistiche Economiche</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Valore Medio Lead:</span>
                        <span className="font-semibold">€{Math.round(leadStats.avg_estimate).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valore Totale Portfolio:</span>
                        <span className="font-semibold">€{leadStats.total_value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lead Totali:</span>
                        <span className="font-semibold">{leadStats.total_leads}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Stati Lead</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {leadStats.by_status.map((item) => (
                          <div key={item.status} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="capitalize">{item.status}</span>
                            </div>
                            <span className="font-semibold">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Tabella: leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {[
                      { name: 'id', type: 'uuid', nullable: false, default: 'gen_random_uuid()' },
                      { name: 'nome', type: 'text', nullable: false, default: null },
                      { name: 'cognome', type: 'text', nullable: false, default: null },
                      { name: 'email', type: 'text', nullable: false, default: null },
                      { name: 'telefono', type: 'text', nullable: false, default: null },
                      { name: 'tipologia_abitazione', type: 'text', nullable: false, default: null },
                      { name: 'superficie', type: 'integer', nullable: false, default: null },
                      { name: 'indirizzo', type: 'text', nullable: false, default: null },
                      { name: 'citta', type: 'text', nullable: false, default: null },
                      { name: 'cap', type: 'text', nullable: false, default: null },
                      { name: 'regione', type: 'text', nullable: false, default: null },
                      { name: 'piano', type: 'text', nullable: false, default: null },
                      { name: 'composizione', type: 'jsonb', nullable: false, default: '{}' },
                      { name: 'configurazione_tecnica', type: 'jsonb', nullable: true, default: '{}' },
                      { name: 'stima_min', type: 'integer', nullable: true, default: null },
                      { name: 'stima_max', type: 'integer', nullable: true, default: null },
                      { name: 'stima_media', type: 'integer', nullable: true, default: null },
                      { name: 'stato', type: 'text', nullable: true, default: 'nuovo' },
                      { name: 'data_creazione', type: 'timestamp', nullable: true, default: 'now()' },
                      { name: 'data_ultimo_contatto', type: 'timestamp', nullable: true, default: 'now()' }
                    ].map((col) => (
                      <div key={col.name} className="flex items-center justify-between p-2 border-b">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">{col.name}</span>
                          <Badge variant="secondary" className="text-xs">{col.type}</Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          {!col.nullable && <Badge variant="destructive" className="text-xs">NOT NULL</Badge>}
                          {col.default && <Badge variant="outline" className="text-xs">DEFAULT</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Tabella: estimates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {[
                      { name: 'id', type: 'uuid', nullable: false, default: 'gen_random_uuid()' },
                      { name: 'lead_id', type: 'uuid', nullable: true, default: null },
                      { name: 'min_price', type: 'integer', nullable: false, default: null },
                      { name: 'max_price', type: 'integer', nullable: false, default: null },
                      { name: 'average_price', type: 'integer', nullable: false, default: null },
                      { name: 'breakdown', type: 'jsonb', nullable: false, default: '{}' },
                      { name: 'deductions', type: 'jsonb', nullable: true, default: '{}' },
                      { name: 'calculated_at', type: 'timestamp', nullable: true, default: 'now()' },
                      { name: 'configuration_snapshot', type: 'jsonb', nullable: false, default: '{}' }
                    ].map((col) => (
                      <div key={col.name} className="flex items-center justify-between p-2 border-b">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">{col.name}</span>
                          <Badge variant="secondary" className="text-xs">{col.type}</Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          {!col.nullable && <Badge variant="destructive" className="text-xs">NOT NULL</Badge>}
                          {col.default && <Badge variant="outline" className="text-xs">DEFAULT</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Informazioni Generali Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Caratteristiche Principali:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Database PostgreSQL su Supabase</li>
                      <li>• Row Level Security (RLS) abilitato</li>
                      <li>• Policy pubbliche per operazioni CRUD</li>
                      <li>• Supporto per dati JSON (configurazioni)</li>
                      <li>• Chiavi primarie UUID autogenerate</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Flusso Dati:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Configuratore → Genera Lead</li>
                      <li>• Lead salvato in tabella 'leads'</li>
                      <li>• Stima salvata in tabella 'estimates'</li>
                      <li>• Admin gestisce lead via dashboard</li>
                      <li>• Drag & drop aggiorna stati lead</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default DatabaseInfo;
