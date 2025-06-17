
import { FormData } from "@/types/FormData";

export const useStepManager = (step: number, formData: FormData) => {
  const getStepComponent = () => {
    if (step === 3 && formData.tipoRistrutturazione === 'parziale') {
      return 'EtaImpiantoElettrico';
    } else if (step === 3) {
      return 'TipoImpiantoElettrico';
    }

    if (step === 4) {
      if (formData.tipoRistrutturazione === 'parziale') {
        if (formData.impiantoVecchio === 'si') {
          return 'InterventiElettrici';
        } else {
          return 'TipoImpiantoElettrico';
        }
      } else {
        if (formData.tipoImpianto === 'livello3') {
          return 'TipoDomotica';
        } else {
          return 'TapparelleElettriche';
        }
      }
    }

    if (step === 5) {
      if (formData.tipoRistrutturazione === 'parziale') {
        if (formData.impiantoVecchio === 'si' && formData.interventiElettrici) {
          return 'TipoImpiantoElettrico';
        } else {
          if (formData.tipoImpianto === 'livello3') {
            return 'TipoDomotica';
          } else {
            return 'TapparelleElettriche';
          }
        }
      } else {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'ConfigurazioneKNX';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'TapparelleElettriche';
        } else {
          return 'DatiContatto';
        }
      }
    }

    if (step === 6) {
      if (formData.tipoRistrutturazione === 'parziale') {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'ConfigurazioneKNX';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'TapparelleElettriche';
        } else {
          return 'DatiContatto';
        }
      } else {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'TapparelleElettriche';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'DatiContatto';
        } else {
          return 'StimaFinale';
        }
      }
    }

    if (step === 7) {
      if (formData.tipoRistrutturazione === 'parziale') {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'TapparelleElettriche';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'DatiContatto';
        } else {
          return 'StimaFinale';
        }
      } else {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'DatiContatto';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'StimaFinale';
        } else {
          return 'RichiestaInviata';
        }
      }
    }

    if (step === 8) {
      if (formData.tipoRistrutturazione === 'parziale') {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'DatiContatto';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'StimaFinale';
        } else {
          return 'RichiestaInviata';
        }
      } else {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'StimaFinale';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'RichiestaInviata';
        } else {
          return 'Invalid';
        }
      }
    }

    if (step === 9) {
      if (formData.tipoRistrutturazione === 'parziale') {
        if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
          return 'StimaFinale';
        } else if (formData.tipoImpianto === 'livello3') {
          return 'RichiestaInviata';
        } else {
          return 'Invalid';
        }
      } else {
        return 'RichiestaInviata';
      }
    }

    if (step === 10) {
      return 'RichiestaInviata';
    }

    return null;
  };

  return { getStepComponent };
};
