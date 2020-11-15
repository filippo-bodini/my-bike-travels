import {Component, OnInit} from '@angular/core';
import {BikePoint} from './models/bikePoint.model';
import {DataService} from './common/data-service.service';
import {LoggerService} from './common/logger.service';
import {SearchLocation} from './models/searchLocation.model';
import {SearchCoordinates} from './interface/searchCoordinates.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'my-bike-travels';
  londonBikePoints: BikePoint[] = [];
  errorMessage: string;
  selectedPlaces: { from: {lat: number, lon: number}, to: {lat: number, lon: number} };
  startBikePointCoordinates: {lat: number, lon: number};
  endBikePointCoordinates: {lat: number, lon: number};
  inputPlaces: FormGroup;
  constructor(private dataService: DataService, private logger: LoggerService, private fb: FormBuilder) {
  }

  async ngOnInit(): Promise<void> {
    this.inputPlaces = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
      });
    this.selectedPlaces = this.initCoordinates();
    this.errorMessage = '';
    const londonBikePoints = await this.dataService.fetchBikePoints();
    if (londonBikePoints.length === 0) {
      this.errorMessage = 'Unable to fetch bike points!';
    } else {
      this.londonBikePoints = [...this.londonBikePoints, londonBikePoints];
    }
  }

  public searchLocations(): void {
    const val = this.inputPlaces.getRawValue();
    if (val && val.start && val.end) {
      this.searchLocation(val.start, 'from');
      this.searchLocation(val.end, 'to');
    }
  }

  public searchLocation(location: string, direction: string): void {
    this.dataService.getPlacesCoordinatesByName(location).then(response => {

      // filter array for english place, sorted by best confidence and take the first element
      const foundPlaces = response.results.filter(el => {
        return el.components.country_code === 'gb' &&
          el.geometry.lat < 52 && el.geometry.lat > 51 &&
          el.geometry.lng < 1 && el.geometry.lng > -1;
      }).sort((first, next) => {
        if (first.confidence >= next.confidence) {
          return -1;
        }
        return 1;
      }) as SearchLocation[];
      if (!foundPlaces.length) {
        this.errorMessage = 'Unable to find x/y coordinates for "' + location + '" location!';
      } else {
        this.selectedPlaces[direction].lat =  foundPlaces[0].geometry.lat;
        this.selectedPlaces[direction].lon =  foundPlaces[0].geometry.lng;
        if (this.selectedPlaces.from.lat !== 0 && this.selectedPlaces.to.lat !== 0) {
          this.evaluatePath();
        }
      }
    }).catch(error => {
      this.errorMessage = 'Unable to find x/y coordinates for "' + location + '" location!';
      this.logger.warn(error);
    });
  }

  public evaluatePath(form: any = {}): void {
    let firstTravelBikePoint;
    let lastTravelBikePoint;
    let startMinDistance = 0;
    let endMinDistance = 0;
    let currentStartMinDistance = 0;
    let currentEndMinDistance = 0;
    for (const bikePoint of this.londonBikePoints) {
      // check if this bike point is the nearest from start coordinates
      currentStartMinDistance = (bikePoint.lat - this.selectedPlaces.from.lat) * (bikePoint.lat - this.selectedPlaces.from.lat) +
        (bikePoint.lon - this.selectedPlaces.from.lon) * (bikePoint.lon - this.selectedPlaces.from.lon);
      if (startMinDistance === 0 || startMinDistance > currentStartMinDistance) {
        startMinDistance = currentStartMinDistance;
        firstTravelBikePoint = bikePoint;
      }
      // check if this bike point is the nearest from end coordinates
      currentEndMinDistance = (bikePoint.lat - this.selectedPlaces.to.lat) * (bikePoint.lat - this.selectedPlaces.to.lat) +
        (bikePoint.lon - this.selectedPlaces.to.lon) * (bikePoint.lon - this.selectedPlaces.to.lon);
      if (endMinDistance === 0 || endMinDistance > currentEndMinDistance) {
        endMinDistance = currentEndMinDistance;
        lastTravelBikePoint = bikePoint;
      }
    }
    this.startBikePointCoordinates = {lon: firstTravelBikePoint.lon, lat: firstTravelBikePoint.lat};
    this.endBikePointCoordinates = {lon: lastTravelBikePoint.lon, lat: lastTravelBikePoint.lat};
  }

  initCoordinates(): SearchCoordinates {
    return { from: {lat: 0, lon: 0}, to: {lat: 0, lon: 0} } as SearchCoordinates;
  }
}
