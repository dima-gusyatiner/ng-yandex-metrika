import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

import { Metrika } from './ng-yandex-metrika.service';
import {
  CounterConfig,
  DEFAULT_COUNTER_ID,
  DEFAULT_COUNTER_ID_AOT,
  YANDEX_COUNTERS_CONFIGS,
  YANDEX_COUNTERS_CONFIGS_AOT,
} from './ng-yandex-metrika.config';
import { appInitializerFactory, countersFactory, defaultCounterIdFactory, } from './ng-yandex-metrika-config-factories';

@NgModule({})
export class MetrikaModule {

  static forRoot(configs: CounterConfig | CounterConfig[], defaultCounterId?: number | string): ModuleWithProviders {
    return {
      ngModule: MetrikaModule,
      providers: [
        {
          provide: DEFAULT_COUNTER_ID_AOT,
          useValue: defaultCounterId,
        },
        {
          provide: YANDEX_COUNTERS_CONFIGS_AOT,
          useValue: configs,
        },
        {
          provide: DEFAULT_COUNTER_ID,
          useFactory: defaultCounterIdFactory,
          deps: [YANDEX_COUNTERS_CONFIGS_AOT, DEFAULT_COUNTER_ID_AOT],
        },
        {
          provide: YANDEX_COUNTERS_CONFIGS,
          useFactory: countersFactory,
          deps: [YANDEX_COUNTERS_CONFIGS_AOT],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializerFactory,
          deps: [YANDEX_COUNTERS_CONFIGS, PLATFORM_ID],
          multi: true,
        },
        {
          provide: Metrika,
          useClass: Metrika,
          deps: [Injector, PLATFORM_ID],
        }
      ],
    };
  }
}
