import moment from 'moment/moment';

class Prediction {
  constructor(prediction) {
    this.id = prediction.id;
    this.isSharePublicaly = prediction.isSharePublicaly;
    this.percentage = prediction.percentage;
    this.challenges = prediction.challenges;
    this.predictionDateTime = prediction.predictionDateTime;
    this.afterPercentageTarget = prediction.afterPercentageTarget;
    this.selectedDurationType = prediction.selectedDurationType;
    this.stock = prediction.stock;
    this.target = prediction.target;
    this.userId = prediction.userId;
  }

  getFormattedData() {
    return {
      id: this.id,
      isSharePublicaly: this.isSharePublicaly,
      percentage: this.percentage,
      challenges: this.challenges,
      predictionDateTime: moment(this.predictionDateTime.toDate()).format('L'),
      afterPercentageTarget: parseFloat(this.afterPercentageTarget).toFixed(2),
      selectedDurationType: this.selectedDurationType,
      stock: this.stock,
      target: this.target,
      userId: this.userId,
    };
  }
}

const predictionConverter = {
  toFirestore: (prediction) => ({
    ...prediction,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Prediction(data);
  },
};

export default predictionConverter;
