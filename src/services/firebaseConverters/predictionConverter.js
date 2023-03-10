import moment from 'moment/moment';

class Prediction {
  constructor(prediction) {
    this.id = prediction.id;
    this.isSharePublicaly = prediction.isSharePublicaly;
    this.percentage = prediction.percentage;
    this.predictionDateTime = prediction.predictionDateTime;
    this.afterPercentageTarget = prediction.afterPercentageTarget;
    this.selectedDurationType = prediction.selectedDurationType;
    this.stock = prediction.stock;
    this.target = prediction.target;
    this.userId = prediction.userId;
    this.userName = prediction.userName;
    this.challenge = prediction.challenge;
  }

  getFormattedData() {
    return {
      id: this.id,
      isSharePublicaly: this.isSharePublicaly,
      percentage: this.percentage,
      predictionDateTime: moment(this.predictionDateTime.toDate()).format('L'),
      afterPercentageTarget: parseFloat(this.afterPercentageTarget).toFixed(2),
      selectedDurationType: this.selectedDurationType,
      stock: this.stock,
      target: this.target,
      userId: this.userId,
      userName: this.userName,
      challenge: this.challenge,
    };
  }
}

const predictionConverter = {
  toFirestore: (prediction) => ({
    ...prediction,
    target: Number(prediction.target),
    afterPercentageTarget: Number(prediction.afterPercentageTarget),
    percentage: Number(prediction.percentage),
    predictionDateTime: new Date(prediction.predictionDateTime),
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Prediction(data);
  },
};

export default predictionConverter;
