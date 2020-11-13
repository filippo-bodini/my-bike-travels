import {Component, OnInit} from '@angular/core';
import {BikePoint} from './models/bikePoint.model';
import {DataService} from './common/data-service.service';
import {LoggerService} from './common/logger.service';
import {SearchLocation} from './models/searchLocation.model';
import {SearchCoordinates} from './interface/searchCoordinates.interface';

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
  constructor(private dataService: DataService, private logger: LoggerService) {
  }

  async ngOnInit(): Promise<void> {
    this.selectedPlaces = this.initCoordinates();
    this.errorMessage = '';
    const londonBikePoints = await this.dataService.fetchBikePoints();
    if (londonBikePoints.length === 0) {
      this.errorMessage = 'Unable to fetch bike points!';
    } else {
      this.londonBikePoints = [...this.londonBikePoints, londonBikePoints];
    }
  }

  public searchLocations(location, direction): void {
    this.dataService.getPlacesCoordinatesByName(location).then(response => {

      // filter array for english place, sorted by best confidence and take the first element
      const foundPlace = response.results.filter(el => {
        return el.components.state_code === 'ENG' &&
          el.geometry.lat < 53 && el.geometry.lat > 50 &&
          el.geometry.lng < 2 && el.geometry.lng > -2;
      }).sort((first, next) => {
        if (first.confidence >= next.confidence) {
          return -1;
        }
        return 1;
      }) as SearchLocation[];
      this.selectedPlaces[direction].lat =  foundPlace[0].geometry.lat;
      this.selectedPlaces[direction].lon =  foundPlace[0].geometry.lng;
      if (this.selectedPlaces.from.lat !== 0 && this.selectedPlaces.to.lat !== 0) {
        this.evaluatePath();
      }
    }).catch(error => {
      this.errorMessage = 'Unable to find x/y coordinates for "' + location + '" location!';
      this.logger.warn(error);
    });
  }

  private evaluatePath(): void {
    let firstTravelBikePoint;
    let lastTravelBikePoint;
    let minDistance = 0;
    let d = 0;
    for (const bikePoint of this.londonBikePoints) {
      d = (bikePoint.lat - this.selectedPlaces.from.lat) * (bikePoint.lat - this.selectedPlaces.from.lat) +
        (bikePoint.lon - this.selectedPlaces.from.lon) * (bikePoint.lon - this.selectedPlaces.from.lon);

      if (minDistance === 0 || minDistance > d) {
        minDistance = d;
        firstTravelBikePoint = bikePoint;
      }
    }
    d = 0;
    minDistance = 0;
    for (const bikePoint of this.londonBikePoints) {
      d = (bikePoint.lat - this.selectedPlaces.to.lat) * (bikePoint.lat - this.selectedPlaces.to.lat) +
        (bikePoint.lon - this.selectedPlaces.to.lon) * (bikePoint.lon - this.selectedPlaces.to.lon);
      if (minDistance === 0 || minDistance > d) {
        minDistance = d;
        lastTravelBikePoint = bikePoint;
      }
    }
    this.startBikePointCoordinates = {lon: firstTravelBikePoint.lon, lat: firstTravelBikePoint.lat};
    this.endBikePointCoordinates = {lon: lastTravelBikePoint.lon, lat: lastTravelBikePoint.lat};
    console.log(this.startBikePointCoordinates);
    console.log(this.endBikePointCoordinates);
  }

  initCoordinates(): SearchCoordinates {
    return { from: {lat: 0, lon: 0}, to: {lat: 0, lon: 0} } as SearchCoordinates;
  }
}
