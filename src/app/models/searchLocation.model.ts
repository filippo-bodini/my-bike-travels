import {LatLngInterface} from '../interface/latLan.interface';

export class SearchLocation {
  bounds: object;
  components: object;
  confidence: number;
  formatted: string;
  geometry: LatLngInterface;

  constructor(data) {
    this.bounds = data.bounds;
    this.components = data.components;
    this.confidence = data.confidence;
    this.formatted = data.formatted;
    this.geometry = data.geometry;
  }
}
