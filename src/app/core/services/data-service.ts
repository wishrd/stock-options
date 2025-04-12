export interface DataService<T> {
  all(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  save(object: T): Promise<void>;
  delete(id: string): Promise<void>;
}
