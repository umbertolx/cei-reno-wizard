import { Lead } from "@/types/lead";
import { Zap, Sun, Shield, AlertCircle } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
//  NUMBER FORMATTING
// ═══════════════════════════════════════════════════════════════════════════════

const fmt = (val: number | undefined | null, decimals = 1): string => {
  if (val === undefined || val === null || isNaN(val)) return "—";
  return Number(val.toFixed(decimals)).toLocaleString("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
};

const fmtInt = (val: number | undefined | null): string => {
  if (val === undefined || val === null || isNaN(val)) return "—";
  return Math.round(val).toLocaleString("it-IT");
};

const fmtEuro = (val: number | undefined | null): string => {
  if (val === undefined || val === null || isNaN(val)) return "—";
  return `€${Math.round(val).toLocaleString("it-IT")}`;
};

// ═══════════════════════════════════════════════════════════════════════════════
//  SHARED UI COMPONENTS — used identically across all 3 modules
// ═══════════════════════════════════════════════════════════════════════════════

/** Main stat card — label on top, large value below */
const InfoCard = ({ label, value, accent = false }: { label: string; value: React.ReactNode; accent?: boolean }) => (
  <div className="bg-[#F9FBFF] rounded-xl p-3 md:p-5">
    <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
    <p className={`text-sm md:text-lg font-semibold mt-1 md:mt-1.5 font-nums ${accent ? "text-[#d8010c]" : "text-gray-900"}`}>
      {value}
    </p>
  </div>
);

/** Single detail row — label left, value right */
const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2.5 px-1 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-semibold text-gray-900 text-right font-nums">{value}</span>
  </div>
);

/** Sub-section heading */
const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide mb-3">
    {children}
  </p>
);

/** Badge pill */
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-1 md:gap-1.5 rounded-full px-2.5 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium ${className}`}>
    {children}
  </span>
);

/** Badge list with heading */
const BadgeGroup = ({ label, badges }: { label: string; badges: { text: string; className?: string }[] }) => (
  <div>
    <SubHeading>{label}</SubHeading>
    <div className="flex flex-wrap gap-2">
      {badges.map((b, i) => (
        <Badge key={i} className={b.className || "bg-yellow-400 text-gray-900"}>
          {b.text}
        </Badge>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
//  LABELS
// ═══════════════════════════════════════════════════════════════════════════════

const livelloImpiantoLabels: Record<string, string> = {
  livello_1: "Livello 1 – Base",
  livello_2: "Livello 2 – Standard",
  livello_3: "Livello 3 – Domotico",
};

const tipoInterventoLabels: Record<string, string> = {
  rifacimento_completo: "Nuovo Impianto",
  intervento_parziale: "Intervento Parziale",
};

const funzioniDomoticheLabels: Record<string, string> = {
  luci: "Controllo Luci",
  luci_dali: "Luci DALI",
  tapparelle: "Tapparelle Motorizzate",
  tende: "Tende Motorizzate",
  clima: "Controllo Clima",
  audio: "Sistema Audio",
  videocitofono: "Videocitofono",
  sicurezza: "Sicurezza Integrata",
  prese_smart: "Prese Smart",
  supervisor: "Supervisore Centrale",
};

const interventiParzialiLabels: Record<string, string> = {
  elettrificare_tapparelle: "Elettrificazione Tapparelle",
  nuovi_punti_luce: "Nuovi Punti Luce",
  modificare_tracce: "Modifica Tracce",
  sostituire_prese: "Sostituzione Prese",
  comandi_smart: "Comandi Smart",
};

const orientamentoLabels: Record<string, string> = {
  sud: "Sud (ottimale)",
  "sud-est": "Sud-Est",
  "sud-ovest": "Sud-Ovest",
  est: "Est",
  ovest: "Ovest",
  nord: "Nord (sconsigliato)",
};

const obiettivoLabels: Record<string, string> = {
  "risparmio-bolletta": "Risparmio in Bolletta",
  "indipendenza-energetica": "Indipendenza Energetica",
};

const tettoTipologiaLabels: Record<string, string> = {
  piano: "Tetto Piano",
  singola: "Singola Falda",
  multiple: "Falde Multiple",
};

const zoneOmbraLabels: Record<string, string> = {
  nessuna: "Nessuna",
  leggera: "Leggera",
  importante: "Importante",
};

const consumiAggiuntiviLabels: Record<string, string> = {
  climatizzatori: "Climatizzatori",
  piano_induzione: "Piano Induzione",
  pompa_calore: "Pompa di Calore",
  boiler_elettrico: "Boiler Elettrico",
  auto_elettrica: "Auto Elettrica",
  piscina: "Piscina",
};

const rilevazioneLabels: Record<string, string> = {
  movimento: "Sensori di Movimento",
  porte_finestre: "Sensori Porte/Finestre",
};

const verificaVisivaLabels: Record<string, string> = {
  notifica: "Solo Notifica",
  foto: "Foto Verifica",
  telecamere: "Telecamere",
};

const telecamereLabels: Record<string, string> = {
  nessuna: "Nessuna",
  live: "Visione Live",
  registrazione: "Con Registrazione",
};

const protezioneLabels: Record<string, string> = {
  ingressi: "Solo Ingressi",
  perimetro: "Perimetrale",
};

// ═══════════════════════════════════════════════════════════════════════════════
//  MODULO ELETTRICO
// ═══════════════════════════════════════════════════════════════════════════════

const ElettricoSection = ({ data }: { data: Record<string, any> }) => {
  const tipoIntervento = data.tipo_intervento;
  const livelloImpianto = data.livello_impianto;
  const tapparelle = data.tapparelle;
  const domotica = data.domotica;
  const tipoDomotica = domotica?.tipo;
  const funzioni = domotica?.funzioni || {};
  const parziale = data.parziale;

  // Funzioni domotiche attive
  const funzioniAttive: { text: string; className?: string }[] = [];
  if (funzioni && typeof funzioni === "object") {
    Object.entries(funzioni).forEach(([key, val]: [string, any]) => {
      if (!funzioniDomoticheLabels[key]) return;
      const isActive = val === true || val?.attivo === true;
      if (isActive) {
        let extra = "";
        if ((key === "tapparelle" || key === "tende") && typeof val === "object" && val.quantita) {
          extra = ` ×${val.quantita}`;
        }
        funzioniAttive.push({
          text: funzioniDomoticheLabels[key] + extra,
          className: "bg-yellow-400 text-gray-900",
        });
      }
    });
  }

  // Interventi parziali
  const interventiSelezionati: { text: string; className?: string }[] = [];
  if (parziale?.interventi && typeof parziale.interventi === "object") {
    Object.entries(parziale.interventi).forEach(([key, val]: [string, any]) => {
      if (!interventiParzialiLabels[key]) return;
      const isActive = val === true || val?.attivo === true;
      if (isActive) {
        let extra = "";
        if (typeof val === "object" && val.quantita) {
          extra = ` ×${val.quantita}`;
        }
        interventiSelezionati.push({
          text: interventiParzialiLabels[key] + extra,
          className: "bg-yellow-400 text-gray-900",
        });
      }
    });
  }

  const stanzeCoivolte = parziale?.stanze_coinvolte as string[] | undefined;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      {/* Header */}
      <h3 className="flex flex-wrap items-center gap-2 md:gap-2.5 text-base md:text-xl font-bold text-[#d8010c] mb-4 md:mb-5">
        <Zap className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
        <span className="min-w-0">Impianto Elettrico</span>
        {tipoIntervento && (
          <Badge className="bg-yellow-400 text-gray-900 ml-auto text-xs whitespace-nowrap flex-shrink-0">
            {tipoInterventoLabels[tipoIntervento] || tipoIntervento}
          </Badge>
        )}
      </h3>

      <div className="space-y-5">
        {/* Dati principali — grid di InfoCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {livelloImpianto && (
            <InfoCard label="Livello Impianto" value={livelloImpiantoLabels[livelloImpianto] || livelloImpianto} />
          )}
          {tipoDomotica && (
            <InfoCard label="Tipo Domotica" value={tipoDomotica === "wireless" ? "Wireless" : "Cablata (KNX)"} />
          )}
          {tapparelle?.elettrificare && (
            <InfoCard label="Tapparelle" value={`${tapparelle.quantita || 0} da elettrificare`} />
          )}
        </div>

        {/* Funzioni domotiche */}
        {funzioniAttive.length > 0 && (
          <BadgeGroup label="Funzioni Domotiche" badges={funzioniAttive} />
        )}

        {/* Interventi parziali */}
        {interventiSelezionati.length > 0 && (
          <BadgeGroup label="Interventi Richiesti" badges={interventiSelezionati} />
        )}

        {/* Impianto obsoleto */}
        {parziale?.impianto_obsoleto && (
          <div className="flex items-center gap-3 p-4 bg-[#F9FBFF] rounded-xl border border-gray-200">
            <AlertCircle className="h-5 w-5 text-[#d8010c] flex-shrink-0" />
            <span className="text-sm md:text-base text-gray-800 font-medium">Impianto segnalato come obsoleto</span>
          </div>
        )}

        {/* Stanze coinvolte */}
        {stanzeCoivolte && stanzeCoivolte.length > 0 && (
          <BadgeGroup
            label="Stanze Coinvolte"
            badges={stanzeCoivolte.map((s) => ({
              text: s.replace(/([A-Z])/g, " $1").replace(/-\d+$/, "").replace(/[-_]/g, " ").trim(),
              className: "bg-yellow-400 text-gray-900",
            }))}
          />
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  MODULO FOTOVOLTAICO
// ═══════════════════════════════════════════════════════════════════════════════

const FotovoltaicoSection = ({ data, pvgis }: { data: Record<string, any>; pvgis: any | null }) => {
  const tipoIntervento = data.tipo_intervento;
  const tetto = data.tetto || {};
  const obiettivo = data.obiettivo;
  const consumi = data.consumi || {};
  const batteria = data.batteria;
  const qualita = data.qualita;
  const stima = data.stima_calcolata || {};
  const impiantoEsistente = data.impianto_esistente;
  const distribuzioneGiorno = data.distribuzione_consumi_giorno;

  // Consumi aggiuntivi
  const aggiuntiviEntries = consumi.aggiuntivi
    ? Object.entries(consumi.aggiuntivi).filter(
        ([, val]: [string, any]) => val?.attivo === true || val === true
      )
    : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      {/* Header */}
      <h3 className="flex flex-wrap items-center gap-2 md:gap-2.5 text-base md:text-xl font-bold text-[#d8010c] mb-4 md:mb-5">
        <Sun className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
        <span className="min-w-0">Impianto Fotovoltaico</span>
        <Badge className="bg-yellow-400 text-gray-900 ml-auto text-xs whitespace-nowrap flex-shrink-0">
          {tipoIntervento === "ampliamento" ? "Ampliamento" : "Nuovo Impianto"}
        </Badge>
      </h3>

      <div className="space-y-5">
        {/* Dati principali — grid di InfoCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {stima.kwp_necessari != null && (
            <InfoCard label="kWp Necessari" value={`${fmt(stima.kwp_necessari)} kWp`} />
          )}
          {stima.mq_tetto_necessari != null && (
            <InfoCard label="Superficie Tetto" value={`${fmtInt(stima.mq_tetto_necessari)} m²`} />
          )}
          <InfoCard
            label="Batteria"
            value={`${batteria ? "Sì" : "No"}${stima.batteria_kwh ? ` (${fmt(stima.batteria_kwh)} kWh)` : ""}`}
          />
        </div>

        {/* Dettagli tetto */}
        <div>
          <SubHeading>Dettagli Tetto</SubHeading>
          <div className="bg-[#F9FBFF] rounded-xl divide-y divide-gray-100">
            {tetto.tipologia && (
              <DetailRow label="Tipologia" value={tettoTipologiaLabels[tetto.tipologia] || tetto.tipologia} />
            )}
            {tetto.orientamento && (
              <DetailRow label="Orientamento" value={orientamentoLabels[tetto.orientamento] || tetto.orientamento} />
            )}
            {tetto.zone_ombra && (
              <DetailRow label="Zone Ombra" value={zoneOmbraLabels[tetto.zone_ombra] || tetto.zone_ombra} />
            )}
            {obiettivo && (
              <DetailRow label="Obiettivo" value={obiettivoLabels[obiettivo] || obiettivo} />
            )}
            {qualita && (
              <DetailRow
                label="Qualità Forniture"
                value={
                  <Badge className="bg-yellow-400 text-gray-900 text-xs">
                    {qualita.charAt(0).toUpperCase() + qualita.slice(1)}
                  </Badge>
                }
              />
            )}
          </div>
        </div>

        {/* Consumi */}
        {(consumi.dichiarati !== undefined || consumi.kwh_anno || consumi.spesa_mensile) && (
          <div>
            <SubHeading>{consumi.dichiarati ? "Consumi Dichiarati" : "Consumi Stimati"}</SubHeading>
            <div className="bg-[#F9FBFF] rounded-xl divide-y divide-gray-100">
              <DetailRow
                label="Consumo"
                value={
                  consumi.dichiarati
                    ? (consumi.kwh_anno ? `${fmtInt(consumi.kwh_anno)} kWh/anno` : consumi.spesa_mensile ? `${fmtEuro(consumi.spesa_mensile)}/mese` : "—")
                    : "Non dichiarati dal cliente"
                }
              />
              {stima.consumo_totale_kwh_anno && (
                <DetailRow
                  label="Consumo totale stimato"
                  value={`${fmtInt(stima.consumo_totale_kwh_anno)} kWh/anno${stima.consumo_totale_euro_anno ? ` (~${fmtEuro(stima.consumo_totale_euro_anno)}/anno)` : ""}`}
                />
              )}
            </div>
          </div>
        )}

        {/* Consumi aggiuntivi */}
        {aggiuntiviEntries.length > 0 && (
          <BadgeGroup
            label="Consumi Aggiuntivi"
            badges={aggiuntiviEntries.map(([key, val]: [string, any]) => ({
              text: `${consumiAggiuntiviLabels[key] || key.replace(/_/g, " ")}${typeof val === "object" && val.valore ? ` (${fmtInt(val.valore)})` : ""}`,
              className: "bg-yellow-400 text-gray-900",
            }))}
          />
        )}

        {/* Distribuzione giorno/sera */}
        {distribuzioneGiorno !== undefined && distribuzioneGiorno !== null && (
          <div>
            <SubHeading>Distribuzione Consumi</SubHeading>
            <div className="bg-[#F9FBFF] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm text-gray-500">Giorno</span>
                <span className="text-sm font-semibold text-gray-900 font-nums">{distribuzioneGiorno}% giorno / {100 - distribuzioneGiorno}% sera</span>
                <span className="text-sm text-gray-500">Sera</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#d8010c] h-2.5 rounded-full transition-all"
                  style={{ width: `${distribuzioneGiorno}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* PVGIS */}
        {pvgis && (
          <div className="bg-[#F9FBFF] rounded-xl divide-y divide-gray-100">
            <DetailRow label="PVGIS — Energia Annua" value={`${fmtInt(pvgis.energia_annua_kwh)} kWh/anno`} />
            {pvgis.kwh_per_kwp && (
              <DetailRow label="PVGIS — Resa per kWp" value={`${fmtInt(pvgis.kwh_per_kwp)} kWh/kWp`} />
            )}
          </div>
        )}

        {/* Impianto esistente (ampliamento) */}
        {impiantoEsistente && (
          <div>
            <SubHeading>Impianto Esistente</SubHeading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {impiantoEsistente.potenza_kwp != null && (
                <InfoCard label="Potenza" value={`${fmt(impiantoEsistente.potenza_kwp)} kWp`} />
              )}
              {impiantoEsistente.anno && (
                <InfoCard label="Anno" value={impiantoEsistente.anno} />
              )}
              {impiantoEsistente.ha_batteria !== undefined && (
                <InfoCard label="Ha Batteria" value={impiantoEsistente.ha_batteria ? "Sì" : "No"} />
              )}
              {impiantoEsistente.copertura_attuale !== undefined && (
                <InfoCard label="Copertura" value={`${impiantoEsistente.copertura_attuale}%`} />
              )}
            </div>
          </div>
        )}

        {/* Stime costi modulo */}
        {(stima.costo_impianto || stima.costo_batteria || stima.costo_totale) && (
          <div>
            <SubHeading>Stime Costo Modulo</SubHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {stima.costo_impianto != null && (
                <InfoCard label="Impianto" value={fmtEuro(stima.costo_impianto)} />
              )}
              {stima.costo_batteria > 0 && (
                <InfoCard label="Batteria" value={fmtEuro(stima.costo_batteria)} />
              )}
              {stima.costo_totale != null && (
                <InfoCard label="Totale Modulo" value={fmtEuro(stima.costo_totale)} accent />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  MODULO SICUREZZA
// ═══════════════════════════════════════════════════════════════════════════════

const SicurezzaSection = ({ data }: { data: Record<string, any> }) => {
  const sistema = data.sistema;
  const aree = data.aree as string[] | undefined;
  const qualita = data.qualita;
  const interni = data.interni;
  const esterni = data.esterni;
  const notifiche = data.notifiche;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
      {/* Header */}
      <h3 className="flex flex-wrap items-center gap-2 md:gap-2.5 text-base md:text-xl font-bold text-[#d8010c] mb-4 md:mb-5">
        <Shield className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
        <span className="min-w-0">Impianto di Sicurezza</span>
        {sistema && (
          <Badge className="bg-yellow-400 text-gray-900 ml-auto text-xs whitespace-nowrap flex-shrink-0">
            {sistema === "wireless" ? "Wireless" : "Filare"}
          </Badge>
        )}
      </h3>

      <div className="space-y-5">
        {/* Dati principali — grid di InfoCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {sistema && (
            <InfoCard label="Sistema" value={sistema === "wireless" ? "Wireless" : "Filare"} />
          )}
          {aree && aree.length > 0 && (
            <InfoCard
              label="Aree Protette"
              value={
                <span className="flex flex-wrap gap-1.5 mt-0.5">
                  {aree.map((area) => (
                    <Badge key={area} className="bg-yellow-400 text-gray-900 capitalize text-xs px-2.5 py-1">{area}</Badge>
                  ))}
                </span>
              }
            />
          )}
          {qualita && (
            <InfoCard
              label="Qualità"
              value={
                <Badge className="bg-yellow-400 text-gray-900 text-xs px-2.5 py-1">
                  {qualita.charAt(0).toUpperCase() + qualita.slice(1)}
                </Badge>
              }
            />
          )}
        </div>

        {/* INTERNI */}
        {interni && (
          <div>
            <SubHeading>Protezione Interni</SubHeading>
            <div className="bg-[#F9FBFF] rounded-xl divide-y divide-gray-100">
              {interni.tipo_rilevazione && (
                <DetailRow
                  label="Tipo Rilevazione"
                  value={rilevazioneLabels[interni.tipo_rilevazione] || interni.tipo_rilevazione}
                />
              )}
              {interni.verifica_visiva && (
                <DetailRow
                  label="Verifica Visiva"
                  value={verificaVisivaLabels[interni.verifica_visiva] || interni.verifica_visiva}
                />
              )}
              {interni.animali_domestici !== undefined && (
                <DetailRow
                  label="Animali Domestici"
                  value={interni.animali_domestici ? "Sì" : "No"}
                />
              )}
            </div>

            {/* Stanze monitorate */}
            {interni.stanze && interni.stanze.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Stanze Monitorate</p>
                <div className="flex flex-wrap gap-2">
                  {(interni.stanze as string[]).map((s, i) => (
                    <Badge key={i} className="bg-yellow-400 text-gray-900">
                      {s.replace(/([A-Z])/g, " $1").replace(/-\d+$/, "").replace(/[-_]/g, " ").trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Finestre per stanza */}
            {interni.finestre_per_stanza && typeof interni.finestre_per_stanza === "object" && Object.keys(interni.finestre_per_stanza).length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Finestre per Stanza</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(interni.finestre_per_stanza).map(([stanza, num]) => (
                    <Badge key={stanza} className="bg-yellow-400 text-gray-900">
                      {stanza.replace(/([A-Z])/g, " $1").replace(/-\d+$/, "").replace(/[-_]/g, " ").trim()}: {String(num)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ESTERNI */}
        {esterni && (
          <div>
            <SubHeading>Protezione Esterni</SubHeading>

            {/* Spazi */}
            {esterni.spazi && esterni.spazi.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {(esterni.spazi as string[]).map((s, i) => (
                  <Badge key={i} className="bg-yellow-400 text-gray-900 capitalize">{s}</Badge>
                ))}
              </div>
            )}

            <div className="bg-[#F9FBFF] rounded-xl divide-y divide-gray-100">
              {esterni.balconi && (
                <DetailRow
                  label="Balconi"
                  value={`${esterni.balconi.numero || 0} (${esterni.balconi.superficie_mq || 0} m²)`}
                />
              )}
              {esterni.giardino && (
                <DetailRow
                  label="Giardino"
                  value={`${esterni.giardino.superficie_mq || 0} m²${esterni.giardino.protezione ? ` · ${protezioneLabels[esterni.giardino.protezione] || esterni.giardino.protezione}` : ""}${esterni.giardino.numero_entrate ? ` · ${esterni.giardino.numero_entrate} entrate` : ""}`}
                />
              )}
              {esterni.telecamere && (
                <DetailRow
                  label="Telecamere"
                  value={telecamereLabels[esterni.telecamere] || esterni.telecamere}
                />
              )}
              {esterni.internet_disponibile !== undefined && (
                <DetailRow
                  label="Internet Disponibile"
                  value={esterni.internet_disponibile ? "Sì" : "No"}
                />
              )}
            </div>
          </div>
        )}

        {/* NOTIFICHE */}
        {notifiche && (
          <BadgeGroup
            label="Avvisi e Notifiche"
            badges={[
              ...(notifiche.tipi || []).map((tipo: string) => ({
                text: tipo.charAt(0).toUpperCase() + tipo.slice(1),
                className: "bg-yellow-400 text-gray-900",
              })),
              ...(notifiche.backup_4g ? [{ text: "Backup 4G", className: "bg-yellow-400 text-gray-900" }] : []),
            ]}
          />
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  EXPORT: ConfigurationSection
// ═══════════════════════════════════════════════════════════════════════════════

interface ConfigurationSectionProps {
  lead: Lead;
}

export const ConfigurationSection = ({ lead }: ConfigurationSectionProps) => {
  const { moduloElettrico, moduloFotovoltaico, moduloSicurezza, pvgis } = lead;

  const hasAnyModule =
    (moduloElettrico && Object.keys(moduloElettrico).length > 0) ||
    (moduloFotovoltaico && Object.keys(moduloFotovoltaico).length > 0) ||
    (moduloSicurezza && Object.keys(moduloSicurezza).length > 0);

  if (!hasAnyModule) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">
        <div className="flex items-center gap-3 text-gray-500">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm md:text-base">Nessuna configurazione tecnica disponibile per questo lead.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-5">
      {moduloElettrico && Object.keys(moduloElettrico).length > 0 && (
        <ElettricoSection data={moduloElettrico} />
      )}
      {moduloFotovoltaico && Object.keys(moduloFotovoltaico).length > 0 && (
        <FotovoltaicoSection data={moduloFotovoltaico} pvgis={pvgis} />
      )}
      {moduloSicurezza && Object.keys(moduloSicurezza).length > 0 && (
        <SicurezzaSection data={moduloSicurezza} />
      )}
    </div>
  );
};
