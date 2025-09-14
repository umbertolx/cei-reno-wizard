# Modulo Elettrico - Struttura Organizzata

La cartella `3-electrical` è stata riorganizzata secondo il flusso logico del configuratore elettrico:

## 📁 Struttura delle Cartelle

### 01-intervention-type/
**Tipo di intervento e valutazione iniziale**
- `ElectricalConfiguration.tsx` - Scelta del tipo di ristrutturazione (completa/nuova/parziale)
- `ElectricalSystemAge.tsx` - Valutazione dell'età dell'impianto esistente

### 02-system-planning/
**Pianificazione del sistema elettrico**
- `ElectricalInterventions.tsx` - Selezione degli interventi elettrici necessari
- `RoomSelection.tsx` - Scelta degli ambienti dove intervenire

### 03-system-type/
**Configurazione del tipo di sistema**
- `ElectricalSystemType.tsx` - Definizione del tipo di impianto elettrico

### 04-automation/
**Sistemi di automazione e domotica**
- `TipoDomotica.tsx` - Scelta tra sistema filare (KNX) e wireless (BTicino)
- `ConfigurazioneKNX.tsx` - Configurazione specifica per sistemi KNX
- `ConfigurazioneBTicino.tsx` - Configurazione specifica per sistemi BTicino

### 05-accessories/
**Accessori e componenti aggiuntivi**
- `ElectricShutters.tsx` - Configurazione tapparelle elettriche

## 🔄 Flusso Logico

1. **Valutazione iniziale** → Tipo di intervento e età impianto
2. **Pianificazione** → Interventi necessari e ambienti coinvolti  
3. **Sistema base** → Tipo di impianto elettrico
4. **Automazione** → Scelta e configurazione domotica
5. **Accessori** → Componenti aggiuntivi come tapparelle

## 📚 Import

Tutti i componenti sono esportati tramite i file `index.ts` di ogni cartella e possono essere importati dal file principale:

```typescript
// Import singolo
import { ElectricalConfiguration } from './01-intervention-type/ElectricalConfiguration';

// Import multiplo da una cartella
import { TipoDomotica, ConfigurazioneKNX } from './04-automation';

// Import da index principale
import { ElectricalConfiguration, TipoDomotica } from './3-electrical';
```

## ✅ Vantaggi della Nuova Struttura

- **Organizzazione logica** seguendo il flusso del configuratore
- **Facile manutenzione** con componenti raggruppati per funzionalità
- **Scalabilità** per aggiungere nuovi componenti nelle categorie esistenti
- **Chiarezza** nella comprensione del processo di configurazione