import { Prediction, type PredictionProps } from '@core/models/prediction';
import type { DataService } from './data-service';
import { inject, Injectable } from '@angular/core';
import { DexieDatabase } from './storage/dixie/dexie.database';
import { PredictionAdapter } from './adapters/prediction-adapter';
import { OptionalId } from '@core/models/optional-id';

@Injectable({ providedIn: 'root' })
export class PredictionDataService implements DataService<Prediction> {

  private readonly predictionsDb = inject(DexieDatabase).predictions;
  private readonly adapter = inject(PredictionAdapter);

  async all(): Promise<Prediction[]> {
    return (await this.predictionsDb.toArray()).map(data => this.adapter.toPrediction(data));
  }

  async get(id: string): Promise<Prediction | null> {
    const prediction = await this.predictionsDb.get(id);
    return prediction ? this.adapter.toPrediction(prediction) : null;
  }

  async save(prediction: OptionalId<PredictionProps>): Promise<void> {
    const data = this.adapter.fromPrediction(prediction);
    if (!data.id) {
      data.id = crypto.randomUUID();
    }

    return this.predictionsDb.put(data);
  }

  async delete(id: string): Promise<void> {
    return this.predictionsDb.delete(id);
  }
}
