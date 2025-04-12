export type PredictionProps = Prediction;

export class Prediction {
  id: string;
  price: number;

  constructor(props: PredictionProps) {
    this.id = props.id;
    this.price = props.price;
  }
}
