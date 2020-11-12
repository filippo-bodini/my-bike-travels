import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './common/api/api.service';
import { DataService } from './common/data-service.service';
import { HttpClientModule } from '@angular/common/http';
import {BikePoint} from './models/bikePoint.model';
import {BikePointAdditionalTypesInterface} from './interface/bikePointAdditionalTypes.interface';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let spy;
  let compiled;
  let apiService: ApiService;

  const apiResults = [
    {
      id: 'BikePoints_1',
      url: '/Place/BikePoints_1',
      commonName: 'River Street , Clerkenwell',
      placeType: 'BikePoint',
      additionalProperties: [
        {
          category: 'Description',
          key: 'TerminalName',
          sourceSystemKey: 'BikePoints',
          value: '001023',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'Installed',
          sourceSystemKey: 'BikePoints',
          value: 'true',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'Locked',
          sourceSystemKey: 'BikePoints',
          value: 'false',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'InstallDate',
          sourceSystemKey: 'BikePoints',
          value: '1278947280000',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'RemovalDate',
          sourceSystemKey: 'BikePoints',
          value: '',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'Temporary',
          sourceSystemKey: 'BikePoints',
          value: 'false',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'NbBikes',
          sourceSystemKey: 'BikePoints',
          value: '10',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'NbEmptyDocks',
          sourceSystemKey: 'BikePoints',
          value: '7',
          modified: '2020-11-12T08:37:08.277Z'
        },
        {
          category: 'Description',
          key: 'NbDocks',
          sourceSystemKey: 'BikePoints',
          value: '19',
          modified: '2020-11-12T08:37:08.277Z'
        }
      ] as BikePointAdditionalTypesInterface[],
      children: [],
      childrenUrls: [],
      lat: 51.529163,
      lon: -0.10997
    },
    {
      id: 'BikePoints_2',
      url: '/Place/BikePoints_2',
      commonName: 'Phillimore Gardens, Kensington',
      placeType: 'BikePoint',
      additionalProperties: [
        {
          category: 'Description',
          key: 'TerminalName',
          sourceSystemKey: 'BikePoints',
          value: '001018',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'Installed',
          sourceSystemKey: 'BikePoints',
          value: 'true',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'Locked',
          sourceSystemKey: 'BikePoints',
          value: 'false',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'InstallDate',
          sourceSystemKey: 'BikePoints',
          value: '1278585780000',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'RemovalDate',
          sourceSystemKey: 'BikePoints',
          value: '',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'Temporary',
          sourceSystemKey: 'BikePoints',
          value: 'false',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'NbBikes',
          sourceSystemKey: 'BikePoints',
          value: '14',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'NbEmptyDocks',
          sourceSystemKey: 'BikePoints',
          value: '21',
          modified: '2020-11-12T09:04:43.73Z'
        },
        {
          category: 'Description',
          key: 'NbDocks',
          sourceSystemKey: 'BikePoints',
          value: '37',
          modified: '2020-11-12T09:04:43.73Z'
        }
      ] as BikePointAdditionalTypesInterface[],
      children: [],
      childrenUrls: [],
      lat: 51.499606,
      lon: -0.197574
    },
    {
      id: 'BikePoints_3',
      url: '/Place/BikePoints_3',
      commonName: 'Christopher Street, Liverpool Street',
      placeType: 'BikePoint',
      additionalProperties: [
        {
          category: 'Description',
          key: 'TerminalName',
          sourceSystemKey: 'BikePoints',
          value: '001012',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'Installed',
          sourceSystemKey: 'BikePoints',
          value: 'true',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'Locked',
          sourceSystemKey: 'BikePoints',
          value: 'false',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'InstallDate',
          sourceSystemKey: 'BikePoints',
          value: '1278240360000',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'RemovalDate',
          sourceSystemKey: 'BikePoints',
          value: '',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'Temporary',
          sourceSystemKey: 'BikePoints',
          value: 'false',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'NbBikes',
          sourceSystemKey: 'BikePoints',
          value: '6',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'NbEmptyDocks',
          sourceSystemKey: 'BikePoints',
          value: '25',
          modified: '2020-11-12T08:58:28.81Z'
        },
        {
          category: 'Description',
          key: 'NbDocks',
          sourceSystemKey: 'BikePoints',
          value: '32',
          modified: '2020-11-12T08:58:28.81Z'
        }
      ] as BikePointAdditionalTypesInterface[],
      children: [],
      childrenUrls: [],
      lat: 51.521283,
      lon: -0.084605
    },
  ] as BikePoint[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        DataService,
        ApiService
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get(ApiService);
    spy = spyOn(apiService, 'call').and.returnValue(Promise.resolve(apiResults));
    compiled = fixture.debugElement.nativeElement;
    await component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-bike-travels'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-bike-travels');
  });

  it('should render title', () => {
    expect(compiled.querySelector('.content span').textContent).toContain('my-bike-travels app is running!');
  });

  it('should fetch all London bike points', () => {
    expect(component.londonBikePoints.length).toBeGreaterThanOrEqual(1);
  });
});
