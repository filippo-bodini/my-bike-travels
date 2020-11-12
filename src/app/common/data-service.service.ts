import { Injectable } from '@angular/core';
import {ApiService} from './api/api.service';
import {LoggerService} from './logger.service';
import {ApiRequest} from './api/api.type';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private api: ApiService, private logger: LoggerService) { }

  getPlacesCoordinatesByName(placeName: string): Promise<any> {
    const data = {
      key: environment.opencagedataKey,
      q: placeName
    };
    const apiEndpoint = environment.opencagedataEndpoint;
    const request = new ApiRequest('get', apiEndpoint, data);
    return this.api.call(request);
  }

  fetchBikePoints(): Promise<any> {
    const apiEndpoint = environment.apiTflEndpoint;
    const request = new ApiRequest('get', apiEndpoint);
    return this.api.call(request).catch(error => {
      console.warn(error);
      return [];
    });
  }
}
