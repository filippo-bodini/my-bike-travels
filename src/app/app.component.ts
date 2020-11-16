import {Component, OnInit} from '@angular/core';
import {BikePoint} from './models/bikePoint.model';
import {DataService} from './common/data-service.service';
import {LoggerService} from './common/logger.service';
import {SearchLocation} from './models/searchLocation.model';
import {SearchCoordinates} from './interface/searchCoordinates.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SingleCordinate} from './interface/singleCoordinate.interface';
import {appSettings} from './app.settings';
import {MarkerInterface} from './interface/marker.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  londonLat: number = appSettings.LONDON_LAT;
  londonLon: number = appSettings.LONDON_LON;
  markerEnabled: boolean;
  markers: MarkerInterface[];
  title = 'my-bike-travels';
  londonBikePoints: BikePoint[] = [];
  errorMessage: string;
  selectedPlaces: SearchCoordinates;
  startBikePointCoordinates: SingleCordinate;
  endBikePointCoordinates: SingleCordinate;
  inputPlaces: FormGroup;

  constructor(private dataService: DataService, private logger: LoggerService, private fb: FormBuilder) {
  }

  async ngOnInit(): Promise<void> {
    this.markerEnabled = false;
    this.inputPlaces = this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required]
      }, {validator: this.checkIfSamePoint('start', 'end')});
    this.selectedPlaces = this.initCoordinates();
    this.errorMessage = '';
    const londonBikePoints = await this.dataService.fetchBikePoints();
    if (londonBikePoints.length === 0) {
      this.errorMessage = 'Unable to fetch bike points!';
    } else {
      this.londonBikePoints = londonBikePoints;
    }
  }

  public searchLocations(): void {
    const val = this.inputPlaces.getRawValue();
    if (val && val.start && val.end) {
      if (val.start === val.end) {
        this.errorMessage = 'Please, select two different locations.';
        return;
      }
      this.markerEnabled = false;
      this.searchLocation(val.start, 'from');
      this.searchLocation(val.end, 'to');
    }
  }

  public searchLocation(location: string, direction: string): void {
    this.dataService.getPlacesCoordinatesByName(location).then(response => {

      // filter array for english place, sorted by best confidence and take the first element
      const foundPlaces = response.results.filter(el => {
        return el.components.country_code === appSettings.LONDON_COUNTRY_CODE &&
          el.geometry.lat < appSettings.LONDON_MAX_LAT && el.geometry.lat > appSettings.LONDON_MIN_LAT &&
          el.geometry.lng < appSettings.LONDON_MAX_LON && el.geometry.lng > appSettings.LONDON_MIN_LON;
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

  public evaluatePath(): void {
    let firstTravelBikePoint;
    let lastTravelBikePoint;
    let startMinDistance = 0;
    let endMinDistance = 0;
    let currentStartMinDistance = 0;
    let currentEndMinDistance = 0;

    for (const bikePoint of this.londonBikePoints) {
      // check if this bike point is the nearest from start coordinates
      currentStartMinDistance = Math.pow((bikePoint.lat - this.selectedPlaces.from.lat), 2) +
        Math.pow((bikePoint.lon - this.selectedPlaces.from.lon), 2);
      if (startMinDistance === 0 || startMinDistance > currentStartMinDistance) {
        startMinDistance = currentStartMinDistance;
        firstTravelBikePoint = bikePoint;
      }
      // check if this bike point is the nearest from end coordinates
      currentEndMinDistance = Math.pow((bikePoint.lat - this.selectedPlaces.to.lat), 2) +
        Math.pow((bikePoint.lon - this.selectedPlaces.to.lon), 2);
      if (endMinDistance === 0 || endMinDistance > currentEndMinDistance) {
        endMinDistance = currentEndMinDistance;
        lastTravelBikePoint = bikePoint;
      }
    }

    this.startBikePointCoordinates = {lon: firstTravelBikePoint.lon, lat: firstTravelBikePoint.lat};
    this.endBikePointCoordinates = {lon: lastTravelBikePoint.lon, lat: lastTravelBikePoint.lat};
    this.markers = [
      {
        lat: this.selectedPlaces.from.lat,
        lng: this.selectedPlaces.from.lon,
        label: 'A',
        draggable: false
      },
      {
        lat: this.startBikePointCoordinates.lat,
        lng: this.startBikePointCoordinates.lon,
        label: 'B',
        draggable: false
      },
      {
        lat: this.endBikePointCoordinates.lat,
        lng: this.endBikePointCoordinates.lon,
        label: 'C',
        draggable: false
      },
      {
        lat: this.selectedPlaces.to.lat,
        lng: this.selectedPlaces.to.lon,
        label: 'D',
        draggable: false
      }
    ];
    this.markerEnabled = true;
  }

  private initCoordinates(): SearchCoordinates {
    return { from: {lat: 0, lon: 0}, to: {lat: 0, lon: 0} } as SearchCoordinates;
  }

  private checkIfSamePoint(start: string, end: string): (group: FormGroup) => void {
    return (group: FormGroup) => {
      const startdInput = group.controls[start];
      const endInput = group.controls[end];
      if (startdInput.value.toLowerCase() === endInput.value.toLowerCase()) {
        return endInput.setErrors({Equivalent: true});
      }
      return endInput.setErrors(null);
    };
  }
}
