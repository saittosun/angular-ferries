import { Injectable } from '@angular/core';
import { Location } from '../models/common/location';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor() {}

  getLocations() {
    return this.locations;
  }

  private locations: Location[] =  [
      {
        idOrCode: 'ANC',
        name: 'ANCONA',
        country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
      },
      {
        idOrCode: 'BRI',
        name: 'BRINDISI',
        country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
      },
      {
        idOrCode: 'DAT',
        name: 'DATCA',
        country: { idOrCode: 'TR', name: 'Turkey', telephonePrefix: [] },
      },
      {
        idOrCode: 'DRZ',
        name: 'DURRES',
        country: { idOrCode: 'AL', name: 'Albania', telephonePrefix: [] },
      },
      {
        idOrCode: 'DVR',
        name: 'DOVER',
        country: { idOrCode: 'GB', name: 'United Kingdom', telephonePrefix: [] },
      },
      {
        idOrCode: 'GRA',
        name: 'PATRA',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'HEL',
        name: 'HELSINKI',
        country: { idOrCode: 'FI', name: 'Finland', telephonePrefix: [] },
      },
      {
        idOrCode: 'HER',
        name: 'HERAKLIO (CRETE)',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'IGO',
        name: 'IGOUMENITSA',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'JNX',
        name: 'NAXOS',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'JTR',
        name: 'SANTORINI (THIRA)',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'LES',
        name: 'LESVOS (MYTILENE)',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'PAS',
        name: 'PAROS',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'PIR',
        name: 'PIRAEUS (ATHENS)',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'RHO',
        name: 'RHODES',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'RNO',
        name: 'RETHYMNO (CRETE)',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'SYM',
        name: 'SYMI',
        country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
      },
      {
        idOrCode: 'TAL',
        name: 'ΤALINNA',
        country: { idOrCode: 'EE', name: 'Estonia', telephonePrefix: [] },
      },
      {
        idOrCode: 'AMS',
        name: 'AMSTERDAM',
        country: { idOrCode: 'NL', name: 'Netherlands', telephonePrefix: [] },
      },
      {
        idOrCode: 'BRC',
        name: 'BARCELONA',
        country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
      },
      {
        idOrCode: 'CQF',
        name: 'CALAIS',
        country: { idOrCode: 'FR', name: 'France', telephonePrefix: [] },
      },
      {
        idOrCode: 'NAP',
        name: 'NAPLES',
        country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
      },
      {
        idOrCode: 'NCS',
        name: 'NEWCASTLE',
        country: { idOrCode: 'GB', name: 'United Kingdom', telephonePrefix: [] },
      },
    ];

    // Before production, change the locations.

//   private locations: Location[] = [
//     {
//       idOrCode: 'AEG',
//       name: 'AEGINA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AES',
//       name: 'SAINT EFSTRATIOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AGA',
//       name: 'AGATHONISSI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AGK',
//       name: 'Saint Kyrikos (Ikaria)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AGS',
//       name: 'AGISTRI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AIG',
//       name: 'AMORGOS (AEGIALI)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AKT',
//       name: 'ANTIKYTHERA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'ALO',
//       name: 'ALONNISOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AMO',
//       name: 'AMORGOS (KATAPOLA)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'ANA',
//       name: 'ANAFI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'ANC',
//       name: 'ANCONA',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AND',
//       name: 'ANDROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AOK',
//       name: 'KARPATHOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'ARK',
//       name: 'ARKIOI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AXL',
//       name: 'ALEXANDROUPOLIS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'BAR',
//       name: 'BARI',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'BRI',
//       name: 'BRINDISI',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CFU',
//       name: 'CORFU',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CHA',
//       name: 'Chania (Crete)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CHI',
//       name: 'CHIOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CHL',
//       name: 'CHALKI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'DFN',
//       name: 'DIAFANI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'DON',
//       name: 'DONOUSA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'DRZ',
//       name: 'DURRES',
//       country: { idOrCode: 'AL', name: 'Albania', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'ERM',
//       name: 'ERMIONI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'EYD',
//       name: 'IKARIA (EVDILOS)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'FOL',
//       name: 'FOLEGANDROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'FOU',
//       name: 'FOURNI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'GLO',
//       name: 'GLOSSA SKOPELOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'GRA',
//       name: 'PATRAS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'GYT',
//       name: 'GYTHIO',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'HEL',
//       name: 'HELSINKI',
//       country: { idOrCode: 'FI', name: 'Finland', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'HER',
//       name: 'HERAKLIO (CRETE)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'HYD',
//       name: 'YDRA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'IBZ',
//       name: 'IBIZA',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'IGO',
//       name: 'IGOUMENITSA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'INO',
//       name: 'INOUSSES',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'IOS',
//       name: 'IOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'IRK',
//       name: 'IRAKLIA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'JMK',
//       name: 'MYKONOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'JNX',
//       name: 'NAXOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'JSH',
//       name: 'CRETE (SITIA)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'JSI',
//       name: 'SKIATHOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'JSY',
//       name: 'SYROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'JTR',
//       name: 'SANTORINI (THIRA)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'JTY',
//       name: 'ASTYPALAIA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KAL',
//       name: 'KALYMNOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KAR',
//       name: 'SAMOS (KARLOVASSI)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KAV',
//       name: 'KAVALA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KEA',
//       name: 'KEA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KGS',
//       name: 'KOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KIL',
//       name: 'KILINI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KIS',
//       name: 'KISSAMOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KMS',
//       name: 'KIMOLOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KOU',
//       name: 'KOUFONISSI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KSJ',
//       name: 'KASOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KTH',
//       name: 'KYTHIRA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KYT',
//       name: 'KYTHNOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LAV',
//       name: 'LAVRION (ATHENS)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LER',
//       name: 'LEROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LES',
//       name: 'LESVOS (MYTILENE)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LIP',
//       name: 'LIPSI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LMN',
//       name: 'LIMNOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'MET',
//       name: 'METHANA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'MHI',
//       name: 'CHIOS (MESTA)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'MLO',
//       name: 'MILOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'NIS',
//       name: 'NISYROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PAS',
//       name: 'PAROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PHA',
//       name: 'PSARA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PHE',
//       name: 'PORTO HELI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PIR',
//       name: 'PIRAEUS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PKE',
//       name: 'KEFALONIA POROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PMS',
//       name: 'PATMOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'POR',
//       name: 'POROS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PSA',
//       name: 'PISAETOS(ITHAKA)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PYT',
//       name: 'SAMOS (PYTHAGOREIO)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'RAF',
//       name: 'RAFINA (ATHENS)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'RHO',
//       name: 'RHODES',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'RNO',
//       name: 'RETHYMNON (CRETE)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SAM',
//       name: 'SAMOTHRACE',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SER',
//       name: 'SERIFOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SIF',
//       name: 'SIFNOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SIG',
//       name: 'SIGRI (LESVOS)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SIK',
//       name: 'SIKINOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SMI',
//       name: 'SAMI (KEFALONIA)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SPE',
//       name: 'SPETSES',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SXI',
//       name: 'SCHINOUSA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SYM',
//       name: 'SYMI',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'THL',
//       name: 'TILOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TIN',
//       name: 'TINOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TRE',
//       name: 'TRIESTE',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TRS',
//       name: 'THIRASSIA',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'VEN',
//       name: 'VENICE',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'VOL',
//       name: 'VOLOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'ZTH',
//       name: 'ZANTE',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TAL',
//       name: 'TALLINN',
//       country: { idOrCode: 'EE', name: 'Estonia', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'NDR',
//       name: 'NADOR',
//       country: { idOrCode: 'MA', name: 'Morocco', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TNG',
//       name: 'TANGER',
//       country: { idOrCode: 'MA', name: 'Morocco', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SET',
//       name: 'SETE',
//       country: { idOrCode: 'FR', name: 'France', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'GOA',
//       name: 'GENOA',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'AGG',
//       name: 'AGISTRI (MYLI)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SKO',
//       name: 'SKOPELOS',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'BRC',
//       name: 'BARCELONA',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CIV',
//       name: 'CIVITAVECCHIA',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'FOR',
//       name: 'FORMENTERA',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LPA',
//       name: 'LAS PALMAS GC',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'OLB',
//       name: 'OLBIA (SARDINIA)',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PLE',
//       name: 'PALERMO SICILY',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KAZ',
//       name: 'KASTELLORIZO',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TUN',
//       name: 'TUNIS',
//       country: { idOrCode: 'TN', name: 'Tunisia', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'VOA',
//       name: 'VLORA',
//       country: { idOrCode: 'AL', name: 'Albania', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'NAP',
//       name: 'NAPLES',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LIV',
//       name: 'LIVORNO',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'MLA',
//       name: 'MALTA',
//       country: { idOrCode: 'MT', name: 'Malta', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PTO',
//       name: 'PORTO TORRES (SARDINIA)',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CTA',
//       name: 'CATANIA CECILIA',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SAL',
//       name: 'SALERNO',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'KPS',
//       name: 'KAPELLSKAR',
//       country: { idOrCode: 'SE', name: 'Sweden', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'FET',
//       name: 'FETIYE',
//       country: { idOrCode: 'TR', name: 'Turkey', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'BTH',
//       name: 'SAMOS (VATHI)',
//       country: { idOrCode: 'GR', name: 'Greece', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TIM',
//       name: 'TERMINI IMERESE',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'VDE',
//       name: 'EL HIERRO (VALVERDE)',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'QFU',
//       name: 'CORRALEJO',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'MOJ',
//       name: 'MORROJABLE',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'FUE',
//       name: 'PTO. ROSARIO',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'GMR',
//       name: 'LA GOMERA SS',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'ACE',
//       name: 'ARRECIFE',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'QLY',
//       name: 'PLAYA BLANCA',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SPC',
//       name: 'LA PALMA S/C',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CRT',
//       name: 'LOS CRISTIANOS',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TCI',
//       name: 'TENERIFE S/C',
//       country: { idOrCode: 'ES', name: 'Spain', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'TKU',
//       name: 'TURKU',
//       country: { idOrCode: 'FI', name: 'Finland', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'LNG',
//       name: 'LÅNGNÄS',
//       country: { idOrCode: 'FI', name: 'Finland', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'MHQ',
//       name: 'MARIEHAMN',
//       country: { idOrCode: 'FI', name: 'Finland', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'STC',
//       name: 'STOCKHOLM',
//       country: { idOrCode: 'SE', name: 'Sweden', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'SBF',
//       name: 'BONIFACIO CORSICA',
//       country: { idOrCode: 'FR', name: 'France', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CGA',
//       name: 'CAGLIARI (SARDINIA)',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CVX',
//       name: 'CAVO',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'GPV',
//       name: 'GIGLIO',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'CPA',
//       name: 'CAPRAIA',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PIA',
//       name: 'PIANOSA',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PSS',
//       name: 'SAINT STEPHAN',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PIO',
//       name: 'PIOMBINO',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'PFE',
//       name: 'PORTOFERRAIO',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'RMA',
//       name: 'RIO MARINA',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//     {
//       idOrCode: 'STE',
//       name: 'SANTA TERESA (SARDINIA)',
//       country: { idOrCode: 'IT', name: 'Italy', telephonePrefix: [] },
//     },
//   ];
}

