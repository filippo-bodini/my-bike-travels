import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './common/api/api.service';
import { DataService } from './common/data-service.service';
import { HttpClientModule } from '@angular/common/http';
import {BikePoint} from './models/bikePoint.model';
import {BikePointAdditionalTypesInterface} from './interface/bikePointAdditionalTypes.interface';
import {LoggerService} from './common/logger.service';

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
  const croydonResult = {
    documentation: 'https://opencagedata.com/api',
    licenses: [
      {
        name: 'see attribution guide',
        url: 'https://opencagedata.com/credits'
      }
    ],
    rate: {
      limit: 2500,
      remaining: 2499,
      reset: 1605225600
    },
    results: [
      {
        bounds: {
          northeast: {
            lat: 51.4113049,
            lng: -0.061957
          },
          southwest: {
            lat: 51.3313049,
            lng: -0.141957
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'place',
          _type: 'city',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          postcode: 'CR0 1SZ',
          state: 'England',
          state_code: 'ENG',
          state_district: 'Greater London',
          town: 'Croydon'
        },
        confidence: 7,
        formatted: 'Croydon CR0 1SZ, United Kingdom',
        geometry: {
          lat: 51.3713049,
          lng: -0.101957
        }
      },
      {
        bounds: {
          northeast: {
            lat: 51.4232442,
            lng: 0.0032818
          },
          southwest: {
            lat: 51.2867601,
            lng: -0.1619055
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'place',
          _type: 'neighbourhood',
          city: 'London',
          city_district: 'London Borough of Croydon',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          state: 'England',
          state_code: 'ENG',
          state_district: 'Greater London'
        },
        confidence: 6,
        formatted: 'London, United Kingdom',
        geometry: {
          lat: 51.3550556,
          lng: -0.0643104
        }
      },
      {
        bounds: {
          northeast: {
            lat: -17.330751,
            lng: 143.513152
          },
          southwest: {
            lat: -19.696452,
            lng: 141.131831
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'AU',
          'ISO_3166-1_alpha-3': 'AUS',
          _category: 'place',
          _type: 'municipality',
          continent: 'Oceania',
          country: 'Australia',
          country_code: 'au',
          municipality: 'Croydon Shire',
          state: 'Queensland',
          state_code: 'QLD'
        },
        confidence: 1,
        formatted: 'Croydon Shire, Queensland, Australia',
        geometry: {
          lat: -18.5136365,
          lng: 141.9670153
        }
      },
      {
        bounds: {
          northeast: {
            lat: 43.4933736,
            lng: -72.1113624
          },
          southwest: {
            lat: 43.394402,
            lng: -72.2718565
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'US',
          'ISO_3166-1_alpha-3': 'USA',
          _category: 'place',
          _type: 'village',
          continent: 'North America',
          country: 'United States of America',
          country_code: 'us',
          county: 'Sullivan County',
          postcode: '03754',
          state: 'New Hampshire',
          state_code: 'NH',
          village: 'Croydon'
        },
        confidence: 6,
        formatted: 'Croydon, NH 03754, United States of America',
        geometry: {
          lat: 43.450925,
          lng: -72.163696
        }
      },
      {
        bounds: {
          northeast: {
            lat: 52.1477704,
            lng: -0.0613098
          },
          southwest: {
            lat: 52.1077704,
            lng: -0.1013098
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'place',
          _type: 'village',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          county: 'Cambridgeshire',
          county_code: 'CAM',
          postcode: 'SG8 0DN',
          state: 'England',
          state_code: 'ENG',
          state_district: 'East of England',
          village: 'Croydon'
        },
        confidence: 7,
        formatted: 'Croydon SG8 0DN, United Kingdom',
        geometry: {
          lat: 52.1277704,
          lng: -0.0813098
        }
      },
      {
        bounds: {
          northeast: {
            lat: 40.1073329,
            lng: -74.8834996
          },
          southwest: {
            lat: 40.0673329,
            lng: -74.9234996
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'US',
          'ISO_3166-1_alpha-3': 'USA',
          _category: 'place',
          _type: 'village',
          city: 'Bristol Township',
          continent: 'North America',
          country: 'United States of America',
          country_code: 'us',
          county: 'Bucks County',
          hamlet: 'Croydon',
          postcode: '19021',
          state: 'Pennsylvania',
          state_code: 'PA'
        },
        confidence: 7,
        formatted: 'Bristol Township, PA 19021, United States of America',
        geometry: {
          lat: 40.0873329,
          lng: -74.9034996
        }
      },
      {
        bounds: {
          northeast: {
            lat: 40.105444,
            lng: -74.8723448
          },
          southwest: {
            lat: 40.073697,
            lng: -74.914487
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'US',
          'ISO_3166-1_alpha-3': 'USA',
          _category: 'unknown',
          _type: 'boundary',
          boundary: 'Croydon',
          city: 'Bristol Township',
          continent: 'North America',
          country: 'United States of America',
          country_code: 'us',
          county: 'Bucks County',
          hamlet: 'Croydon',
          postcode: '19021',
          state: 'Pennsylvania',
          state_code: 'PA'
        },
        confidence: 7,
        formatted: 'Croydon, Bristol Township, PA 19021, United States of America',
        geometry: {
          lat: 40.0894885,
          lng: -74.8980805
        }
      },
      {
        bounds: {
          northeast: {
            lat: -37.7904483,
            lng: 145.2854735
          },
          southwest: {
            lat: -37.8004483,
            lng: 145.2754735
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'AU',
          'ISO_3166-1_alpha-3': 'AUS',
          _category: 'transportation',
          _type: 'railway',
          continent: 'Oceania',
          country: 'Australia',
          country_code: 'au',
          municipality: 'City of Maroondah',
          postcode: '3136',
          railway: 'Croydon',
          road: 'Pierson Drive',
          state: 'Victoria',
          state_code: 'VIC',
          suburb: 'Croydon'
        },
        confidence: 8,
        formatted: 'Croydon, Pierson Drive, Croydon VIC 3136, Australia',
        geometry: {
          lat: -37.7954483,
          lng: 145.2804735
        }
      },
      {
        bounds: {
          northeast: {
            lat: -33.8697181,
            lng: 151.1276212
          },
          southwest: {
            lat: -33.8918585,
            lng: 151.1062723
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'AU',
          'ISO_3166-1_alpha-3': 'AUS',
          _category: 'place',
          _type: 'neighbourhood',
          city: 'Sydney',
          continent: 'Oceania',
          country: 'Australia',
          country_code: 'au',
          county: 'Burwood Council',
          postcode: '2132',
          state: 'New South Wales',
          state_code: 'NSW',
          suburb: 'Croydon'
        },
        confidence: 7,
        formatted: 'Croydon NSW 2132, Australia',
        geometry: {
          lat: -33.8777935,
          lng: 151.1156502
        }
      },
      {
        bounds: {
          northeast: {
            lat: -37.769276,
            lng: 145.308837
          },
          southwest: {
            lat: -37.81339,
            lng: 145.254159
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'AU',
          'ISO_3166-1_alpha-3': 'AUS',
          _category: 'place',
          _type: 'neighbourhood',
          continent: 'Oceania',
          country: 'Australia',
          country_code: 'au',
          municipality: 'City of Maroondah',
          postcode: '3136',
          state: 'Victoria',
          state_code: 'VIC',
          suburb: 'Croydon'
        },
        confidence: 7,
        formatted: 'Croydon VIC 3136, Australia',
        geometry: {
          lat: -37.795177,
          lng: 145.284447
        }
      }
    ],
    status: {
      code: 200,
      message: 'OK'
    },
    stay_informed: {
      blog: 'https://blog.opencagedata.com',
      twitter: 'https://twitter.com/OpenCage'
    },
    thanks: 'For using an OpenCage API',
    timestamp: {
      created_http: 'Thu, 12 Nov 2020 16:44:56 GMT',
      created_unix: 1605199496
    },
    total_results: 10
  };
  const romfordResult = {
    documentation: 'https://opencagedata.com/api',
    licenses: [
      {
        name: 'see attribution guide',
        url: 'https://opencagedata.com/credits'
      }
    ],
    rate: {
      limit: 2500,
      remaining: 2498,
      reset: 1605225600
    },
    results: [
      {
        bounds: {
          northeast: {
            lat: 51.6160462,
            lng: 0.2222646
          },
          southwest: {
            lat: 51.5360462,
            lng: 0.1422646
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'place',
          _type: 'city',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          postcode: 'RM1 1RX',
          state: 'England',
          state_code: 'ENG',
          state_district: 'Greater London',
          town: 'Romford'
        },
        confidence: 7,
        formatted: 'Romford RM1 1RX, United Kingdom',
        geometry: {
          lat: 51.5760462,
          lng: 0.1822646
        }
      },
      {
        bounds: {
          northeast: {
            lat: 51.5796268,
            lng: 0.1872306
          },
          southwest: {
            lat: 51.5696268,
            lng: 0.1772306
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'transportation',
          _type: 'railway',
          city: 'London',
          city_district: 'London Borough of Havering',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          postcode: 'RM1 1TU',
          railway: 'Romford',
          road: 'The Battis',
          state: 'England',
          state_code: 'ENG',
          state_district: 'Greater London'
        },
        confidence: 9,
        formatted: 'Romford, The Battis, London RM1 1TU, United Kingdom',
        geometry: {
          lat: 51.5746268,
          lng: 0.1822306
        }
      },
      {
        bounds: {
          northeast: {
            lat: 46.4963665,
            lng: -80.8603485
          },
          southwest: {
            lat: 46.4763665,
            lng: -80.8803485
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'CA',
          'ISO_3166-1_alpha-3': 'CAN',
          _category: 'road',
          _type: 'road',
          city: 'Greater Sudbury',
          continent: 'North America',
          country: 'Canada',
          country_code: 'ca',
          county: 'Sudbury District',
          place: 'Romford',
          postcode: 'P3B 2G5',
          state: 'Ontario',
          state_code: 'ON',
          state_district: 'Northeastern Ontario'
        },
        confidence: 8,
        formatted: 'Romford, Greater Sudbury, ON P3B 2G5, Canada',
        geometry: {
          lat: 46.4863665,
          lng: -80.8703485
        }
      },
      {
        bounds: {
          northeast: {
            lat: 51.1652388,
            lng: 0.3578651
          },
          southwest: {
            lat: 51.1252388,
            lng: 0.3178651
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'place',
          _type: 'village',
          city: 'Tunbridge Wells',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          county: 'Kent',
          county_code: 'KEN',
          hamlet: 'Romford',
          postcode: 'TN2 4AY',
          state: 'England',
          state_code: 'ENG',
          state_district: 'South East'
        },
        confidence: 7,
        formatted: 'Romford TN2 4AY, United Kingdom',
        geometry: {
          lat: 51.1452388,
          lng: 0.3378651
        }
      },
      {
        bounds: {
          northeast: {
            lat: 41.6953737,
            lng: -73.2709503
          },
          southwest: {
            lat: 41.6553737,
            lng: -73.3109503
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'US',
          'ISO_3166-1_alpha-3': 'USA',
          _category: 'place',
          _type: 'village',
          continent: 'North America',
          country: 'United States of America',
          country_code: 'us',
          county: 'Litchfield County',
          hamlet: 'Romford',
          state: 'Connecticut',
          state_code: 'CT',
          town: 'Washington'
        },
        confidence: 7,
        formatted: 'Romford, Washington, Connecticut, United States of America',
        geometry: {
          lat: 41.6753737,
          lng: -73.2909503
        }
      },
      {
        bounds: {
          northeast: {
            lat: 51.5750543,
            lng: 0.1842522
          },
          southwest: {
            lat: 51.5749543,
            lng: 0.1841522
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'transportation',
          _type: 'railway',
          city: 'London',
          city_district: 'London Borough of Havering',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          postcode: 'RM1 3PJ',
          railway: 'Romford',
          road: 'Eastern Road',
          state: 'England',
          state_code: 'ENG',
          state_district: 'Greater London'
        },
        confidence: 9,
        formatted: 'Romford, Eastern Road, London RM1 3PJ, United Kingdom',
        geometry: {
          lat: 51.5750043,
          lng: 0.1842022
        }
      },
      {
        bounds: {
          northeast: {
            lat: 46.4855649,
            lng: -80.8686606
          },
          southwest: {
            lat: 46.4854649,
            lng: -80.8687606
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'CA',
          'ISO_3166-1_alpha-3': 'CAN',
          _category: 'transportation',
          _type: 'railway',
          city: 'Greater Sudbury',
          continent: 'North America',
          country: 'Canada',
          country_code: 'ca',
          county: 'Sudbury District',
          postcode: 'P3B 2G5',
          railway: 'Romford',
          road: 'Allan Street',
          state: 'Ontario',
          state_code: 'ON',
          state_district: 'Northeastern Ontario'
        },
        confidence: 9,
        formatted: 'Romford, Allan Street, Greater Sudbury, ON P3B 2G5, Canada',
        geometry: {
          lat: 46.4855149,
          lng: -80.8687106
        }
      },
      {
        bounds: {
          northeast: {
            lat: 53.2336216,
            lng: -2.5212065
          },
          southwest: {
            lat: 53.2335335,
            lng: -2.5213628
          }
        },
        components: {
          'ISO_3166-1_alpha-2': 'GB',
          'ISO_3166-1_alpha-3': 'GBR',
          _category: 'building',
          _type: 'building',
          building: 'Romford',
          continent: 'Europe',
          country: 'United Kingdom',
          country_code: 'gb',
          county: 'Cheshire West and Chester',
          county_code: 'CHW',
          postcode: 'CW9 8JR',
          road: 'Eaton Crescent',
          state: 'England',
          state_code: 'ENG',
          state_district: 'North West England',
          suburb: 'Davenham',
          village: 'Davenham'
        },
        confidence: 10,
        formatted: 'Romford, Eaton Crescent, Davenham CW9 8JR, United Kingdom',
        geometry: {
          lat: 53.2335775,
          lng: -2.5212846
        }
      }
    ],
    status: {
      code: 200,
      message: 'OK'
    },
    stay_informed: {
      blog: 'https://blog.opencagedata.com',
      twitter: 'https://twitter.com/OpenCage'
    },
    thanks: 'For using an OpenCage API',
    timestamp: {
      created_http: 'Thu, 12 Nov 2020 16:54:33 GMT',
      created_unix: 1605200073
    },
    total_results: 8
  };

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
        ApiService,
        LoggerService
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get(ApiService);
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  afterEach(async () => {
    component = null;
    spy = null;
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

  it('should fetch all London bike points', async () => {
    spy = spyOn(apiService, 'call').and.returnValue(Promise.resolve(apiResults));
    compiled = fixture.debugElement.nativeElement;
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component.londonBikePoints.length).toBeGreaterThanOrEqual(1);
  });

  it('should display error if fetching London bike points fails', async () => {
    spy = spyOn(apiService, 'call').and.returnValue(Promise.reject('not found'));
    compiled = fixture.debugElement.nativeElement;
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component.londonBikePoints.length).toBeGreaterThanOrEqual(0);
  });

  it('should fetch places and coordinates after user search',  fakeAsync(() => {
    spy = null;
    spy = spyOn(apiService, 'call').and.returnValue(Promise.resolve(croydonResult));
    component.searchLocation('croydon', 'from');
    tick(1000);
    fixture.detectChanges();
    expect(component.selectedPlaces.from.lat).toBeGreaterThanOrEqual(0);
    expect(component.selectedPlaces.from.lon).toBeLessThanOrEqual(0);

    // overwrite spyOn
    spy.and.returnValue(Promise.resolve(romfordResult));
    component.searchLocation('romford', 'to');
    tick(1000);
    fixture.detectChanges();
    expect(component.selectedPlaces.to.lat).toBeGreaterThanOrEqual(0);
    expect(component.selectedPlaces.to.lon).toBeGreaterThanOrEqual(0);
  }));

  it('should display an error if at least one place is not found',  fakeAsync(() => {
    spy = null;
    spy = spyOn(apiService, 'call').and.returnValue(Promise.reject('not found'));
    component.searchLocation('croydon', 'from');
    tick(1000);
    fixture.detectChanges();
    expect(component.errorMessage.length).toBeGreaterThanOrEqual(1);
  }));

  it('should always find a nearest bikePoint for every chosen coordinates',  fakeAsync(() => {
    component.londonBikePoints = apiResults;
    spy = null;
    spy = spyOn(apiService, 'call').and.returnValue(Promise.resolve(croydonResult));
    component.searchLocation('croydon', 'from');
    tick(1000);
    fixture.detectChanges();
    spy.and.returnValue(Promise.resolve(romfordResult));
    component.searchLocation('romford', 'to');
    tick(1000);
    fixture.detectChanges();
    expect(component.startBikePointCoordinates.lat).toBeGreaterThan(0);
    expect(component.startBikePointCoordinates.lon).toBeLessThan(0);
    expect(component.endBikePointCoordinates.lat).toBeGreaterThan(0);
    expect(component.endBikePointCoordinates.lon).toBeLessThan(0);
  }));
});
