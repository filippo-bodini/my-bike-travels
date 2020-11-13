import {Component, OnInit} from '@angular/core';
import {BikePoint} from './models/bikePoint.model';
import {DataService} from './common/data-service.service';
import {LoggerService} from './common/logger.service';
import {SearchLocation} from './models/searchLocation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'my-bike-travels';
  londonBikePoints: BikePoint[] = [];
  errorMessage: string;
  selectedPlaces: any[] = [];
  startBikePointCoordinates: {lat: number, lon: number};
  endBikePointCoordinates: {lat: number, lon: number};
  constructor(private dataService: DataService, private logger: LoggerService) {
  }

  async ngOnInit(): Promise<void> {
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
      this.selectedPlaces =  [...this.selectedPlaces, { direction, coordinates : foundPlace[0].geometry }];

      if (this.selectedPlaces.length > 1) {
        this.evaluatePath();
      }
    }).catch(error => {
      this.errorMessage = 'Unable to find x/y coordinates for "' + location + '" location!';
      this.logger.warn(error);
    });
  }

  private evaluatePath(): void {
    // filter and sort function may not be the fastest way to evaluate the distance between selectedPlaces and bikePoint
    const distanceFrom = [];
    for (const bikePoint of this.londonBikePoints) {
      distanceFrom.push(0);
    }
    const distanceTo = [];
    for (const bikePoint of this.londonBikePoints) {
      distanceTo.push(0);
    }
    this.startBikePointCoordinates = { lat: 0, lon: 0 };
    this.endBikePointCoordinates = { lat: 0, lon: 0 };
  }
}
