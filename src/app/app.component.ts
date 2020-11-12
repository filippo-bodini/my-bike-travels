import {Component, OnInit} from '@angular/core';
import {BikePoint} from './models/bikePoint.model';
import {DataService} from './common/data-service.service';
import {ApiService} from './common/api/api.service';

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

  ngOnInit(): void {
    this.londonBikePoints = [];
  }
}
