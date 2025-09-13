# Template Layouts per il Configuratore

Questo documento descrive tutti i template layout standardizzati disponibili per creare nuove schermate nel configuratore. Ogni template è progettato per un caso d'uso specifico e può essere riutilizzato semplicemente specificando il nome del layout.

## 🎯 Come utilizzare i template

Per creare una nuova schermata, dì semplicemente: **"Crea una nuova schermata con il layout [NOME_LAYOUT]"** e specifica:
- Il modulo (elettrico, fotovoltaico, sicurezza)
- La domanda/contenuto specifico
- I dati da raccogliere

## 📋 Template Layouts Disponibili

### 1. **QuestionStepLayout** 
*Layout per domande semplici con scelta singola*

**Quando usare:** Domande con 2-6 opzioni, selezione singola obbligatoria
**Esempio:** "Che tipo di impianto hai?" con opzioni Radio

```typescript
// Proprietà principali:
- options: QuestionOption[]
- selectedValue: string
- onSelectionChange: (value: string) => void
- infoBox?: { title: string, content: string }
```

---

### 2. **ScenarioComparisonLayout**
*Layout per confrontare due scenari/opzioni complesse*

**Quando usare:** Confronto tra 2 soluzioni con pro/contro dettagliati
**Esempio:** "KNX vs Wireless" con descrizioni e features

```typescript
// Proprietà principali:
- options: ScenarioOption[] // max 2-3 opzioni
- selectedValue: string
- onSelectionChange: (value: string) => void
// Ogni opzione ha: title, subtitle, description, features[]
```

---

### 3. **MultipleSelectionLayout**
*Layout per selezioni multiple con controlli avanzati*

**Quando usare:** Selezione di più elementi da una lista
**Esempio:** "Seleziona gli ambienti da ristrutturare"

```typescript
// Proprietà principali:
- items: SelectableItem[]
- selectedItems: string[]
- onSelectionChange: (items: string[]) => void
- showSelectAllButton?: boolean
- minSelections?: number
- maxSelections?: number
```

---

### 4. **ConfigurationLayout**
*Layout per configurazioni complesse con opzioni avanzate*

**Quando usare:** Configurazione di elettrodomestici, consumi, features avanzate
**Esempio:** "Definizione consumi standard" con elettrodomestici + opzioni avanzate

```typescript
// Proprietà principali:
- standardItems?: ConfigurableItem[] // elementi semplici on/off
- advancedItems?: ConfigurableItem[] // elementi con configurazione
- advancedOptions?: Record<string, AdvancedOption[]>
- sections?: Array<{id, title, description, items}>
```

---

### 5. **InputFormLayout**
*Layout per form con campi di input vari*

**Quando usare:** Raccolta dati con input, select, button groups
**Esempio:** "Dati di contatto", "Informazioni generali"

```typescript
// Proprietà principali:
- sections: InputSection[]
// Ogni sezione ha fields[] con tipi: text, number, email, select, button-group
// Supporta validazione, errori, campi obbligatori
```

---

### 7. **SummaryStepLayout**
*Layout per riepiloghi e stime*

**Quando usare:** Mostrare riassunti, stime, CTA finali
**Esempio:** "Stima finale", "Riepilogo configurazione"

```typescript
// Proprietà principali:
- estimate?: EstimateData
- summaryCards?: SummaryCard[]
- ctaText?: string
- ctaSubtext?: string
```

---

### 8. **WelcomeStepLayout**
*Layout per pagine di benvenuto con selezione moduli*

**Quando usare:** Pagine iniziali, selezione moduli/servizi
**Esempio:** "Benvenuto nel configuratore"

```typescript
// Proprietà principali:
- modules: SelectableModule[]
- selectedModules: string[]
- onModuleToggle: (moduleId: string) => void
- exampleProject?: ExampleProject
- animatedWords?: string[]
```

---

### 9. **StepLayout** (Base)
*Layout base per casi custom*

**Quando usare:** Casi specifici non coperti dagli altri template
**Proprietà:** badge, title, description, icon, navigation

---

## 🔧 Pattern di Utilizzo

### Per domande semplici:
**"Crea con QuestionStepLayout"** → Domanda + opzioni radio

### Per confronti:
**"Crea con ScenarioComparisonLayout"** → Due soluzioni dettagliate

### Per selezioni multiple:
**"Crea con MultipleSelectionLayout"** → Lista checkboxes

### Per configurazioni:
**"Crea con ConfigurationLayout"** → Mix semplice + avanzato

### Per raccolta dati:
**"Crea con InputFormLayout"** → Form con validazione

### Per riepiloghi:
**"Crea con SummaryStepLayout"** → Recap + stima

## 💡 Esempi Pratici

```bash
# Esempi di richieste:
"Crea una schermata con QuestionStepLayout per chiedere il tipo di tetto"
"Usa ScenarioComparisonLayout per confrontare pompa di calore vs caldaia"
"Fai con MultipleSelectionLayout per selezionare i sistemi di sicurezza"
"Usa ConfigurationLayout per configurare l'impianto KNX"
"Crea con InputFormLayout per raccogliere i dati dell'immobile"
```

Ogni template gestisce automaticamente:
- ✅ Responsive design (mobile + desktop)
- ✅ Validazione e stati di errore
- ✅ Navigazione (Avanti/Indietro)
- ✅ Styling consistente con il design system
- ✅ Accessibilità e UX ottimizzata