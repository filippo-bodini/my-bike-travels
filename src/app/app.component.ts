import {Component, OnInit} from '@angular/core';
import {BikePoint} from './models/bikePoint.model';
import {DataService} from './common/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'my-bike-travels';
  londonBikePoints: BikePoint[];

  constructor(private dataService: DataService) {

  }

  async ngOnInit(): Promise<void> {
    this.londonBikePoints = await this.dataService.fetchBikePoints();
    console.log(this.londonBikePoints);
  }
}
