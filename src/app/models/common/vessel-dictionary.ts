export class VesselDictionary {

  name: string;
  details: {key: string, detail: any}[] = [];
  // accommodationFacilities: {[key: string]: string}[];
  // hasGarage: boolean;
  // hasCabins: boolean;
  kind: string;
  // infantDefaultAccommodation: string;

  constructor(vesselDictionary){
    this.name = vesselDictionary.name;
    this.kind = vesselDictionary.kind;
    for (const [key, value] of Object.entries(vesselDictionary.details)) {
      this.details.push({key: key, detail: value});
    }
  }

}
