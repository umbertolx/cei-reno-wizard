
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { mockLeads, leadStates } from "@/data/mockLeads";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

type TimeFrame = 'oggi' | 'settimana' | 'mese' | 'anno';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('mese');

  // Simula dati diversi per diversi periodi
  const getKPIData = (timeFrame: TimeFrame) => {
    const baseData = {
      oggi: {
        totalLeads: 2,
        totalValue: 120000,
        avgValue: 60000,
        acquired: 0,
        comparison: { total: '+15%', value: '+8%', avg: '+3%', acquired: '+0%' },
        benchmark: 'rispetto a ieri'
      },
      settimana: {
        totalLeads: 8,
        totalValue: 450000,
        avgValue: 56250,
        acquired: 1,
        comparison: { total: '+25%', value: '+12%', avg: '-5%', acquired: '+100%' },
        benchmark: 'rispetto alla settimana scorsa'
      },
      mese: {
        totalLeads: mockLeads.length,
        totalValue: mockLeads.reduce((sum, lead) => sum + lead.stimaMax, 0),
        avgValue: mockLeads.reduce((sum, lead) => sum + lead.stimaMax, 0) / mockLeads.length,
        acquired: mockLeads.filter(lead => lead.stato === 'chiuso').length,
        comparison: { total: '+12%', value: '+8%', avg: '+5%', acquired: '+20%' },
        benchmark: 'rispetto al mese scorso'
      },
      anno: {
        totalLeads: 145,
        totalValue: 8500000,
        avgValue: 58620,
        acquired: 28,
        comparison: { total: '+35%', value: '+42%', avg: '+8%', acquired: '+25%' },
        benchmark: 'rispetto all\'anno scorso'
      }
    };
    return baseData[timeFrame];
  };

  const data = getKPIData(timeFrame);

  const leadsByState = Object.keys(leadStates).map(state => ({
    stato: leadStates[state as keyof typeof leadStates].label,
    count: mockLeads.filter(lead => lead.stato === state).length,
    color: leadStates[state as keyof typeof leadStates].color
  }));

  const recentLeads = mockLeads
    .sort((a, b) => new Date(b.dataRichiesta).getTime() - new Date(a.dataRichiesta).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Panoramica generale dei preventivi</p>
          </div>
          <div className="flex items-center space-x-4">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
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
              <DollarSign className="h-4 w-4 text-muted-foreground" />
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
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
              <Calendar className="h-4 w-4 text-muted-foreground" />
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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leadsByState}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stato" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#d8010c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Leads */}
          <Card>
            <CardHeader>
              <CardTitle>Ultimi Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{lead.nome} {lead.cognome}</p>
                      <p className="text-sm text-gray-600">{lead.citta}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{lead.stimaMax.toLocaleString()}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${leadStates[lead.stato].color}`}>
                        {leadStates[lead.stato].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
