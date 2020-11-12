import {BikePointAdditionalTypesInterface} from '../interface/bikePointAdditionalTypes.interface';

export class BikePoint {
  additionalProperties: BikePointAdditionalTypesInterface[];
  children: any[];
  childrenUrls: string[];
  commonName: string;
  distance?: number;
  id: string;
  lat: number;
  lon: number;
  placeType: string;
  url: string;

  constructor(data: any) {
    this.additionalProperties = data.additionalProperties;
    this.children = [];
    this.childrenUrls = data.childrenUrls;
    this.commonName = data.commonName;
    this.distance = data.distance;
    this.id = data.id;
    this.lat = data.lat;
    this.lon = data.lon;
    this.placeType = data.placeType;
    this.url = data.url;
  }
}
