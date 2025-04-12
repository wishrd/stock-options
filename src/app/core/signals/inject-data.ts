import { assertInInjectionContext, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

export function injectData<T>(name: string): Signal<T> {
  assertInInjectionContext(injectData);
  const route = inject(ActivatedRoute);
  return toSignal(route.data.pipe(map(data => data[name])));
}
