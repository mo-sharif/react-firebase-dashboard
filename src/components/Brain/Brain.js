import React, { Component } from "react";
import { Train, Model, Dense, Conv2D, MaxPooling2D, Flatten } from "tfjsx";
import * as tf from "@tensorflow/tfjs";
import mnist from "mnist";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import "../../assets/paper-dashboard.css";

/* function* trainDataGenerator() {
  yield { x: 1, y: 1 };
  yield { x: 2, y: 2 };
  yield { x: 3, y: 3 };
  yield { x: 4, y: 4 };
  yield { x: 5, y: 5 };
  yield { x: 6, y: 6 };
  yield { x: 11, y: 11 };
} */

const data = mnist.set(1500, 100);
const train = data.training;
const test = data.test;

function* mnistTrainDataGenerator() {
  for (let sample of train) {
    //const square_sample = tf.tensor1d(sample.input).reshape([28, 28]);
    yield {
      x: tf.tensor1d(sample.input).reshape([28, 28, 1]),
      y: sample.output
    };
  }
}

function* mnistTestDataGenerator() {
  for (let sample of test) {
    //const square_sample = tf.tensor1d(sample.input).reshape([28, 28]);
    yield {
      x: tf.tensor1d(sample.input).reshape([28, 28, 1]),
      y: sample.output
    };
  }
}

class MnistModel extends Component {
  render() {
    return (
      <div>
        <Train
          trainData={mnistTrainDataGenerator}
          samples={1500}
          validationData={mnistTestDataGenerator}
          onBatchEnd={this.props.onBatchEnd}
          epochs={5}
          batchSize={64}
          onTrainEnd={this.props.onTrainEnd}
          train={this.props.train}
          display
        >
          <Model
            optimizer={tf.train.sgd(0.15)}
            loss="categoricalCrossentropy"
            metrics={["accuracy"]}
          >
            <Conv2D
              inputShape={[28, 28, 1]}
              kernelSize={5}
              filters={8}
              strides={1}
              activation="relu"
              kernelInitializer="VarianceScaling"
            />
            <MaxPooling2D poolSize={[2, 2]} strides={[2, 2]} />
            <Conv2D
              kernelSize={5}
              filters={16}
              strides={1}
              activation="relu"
              kernelInitializer="VarianceScaling"
            />
            <MaxPooling2D poolSize={[2, 2]} strides={[2, 2]} />
            <Flatten />
            <Dense
              units={10}
              kernelInitializer="VarianceScaling"
              activation="softmax"
            />
          </Model>
        </Train>{" "}
      </div>
    );
  }
}

class Brain extends Component {
  constructor() {
    super();
    this.state = {
      model: null,
      training: false,
      trained: false,
      predicted: null
    };
  }
  render() {
    const { styles } = this.props;
    const testDigits = [1, 3, 9];

    // Randomly selects a test digit, ideally this is drawn from the val
    // set. But it's just random for now.
    const test = tf.stack(
      testDigits.map(digit => {
        return tf.tensor1d(mnist[digit].get()).reshape([28, 28, 1]);
      })
    );

    // MyModel Test
    // const test = tf.tensor([ 1, 3, 25, 99 ], [4, 1]);

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Card className="card-stats" style={styles}>
            <CardHeader>
              <CardTitle>Model Training</CardTitle>
              <p className="card-category" style={{ marginTop: 4 }}>
                Try clicking predict while the model is training and see how the
                model gets more confident as training progresses.
              </p>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12} md={12}>
                  <MnistModel
                    onTrainEnd={model => this.setState({ model })}
                    onBatchEnd={(metrics, model) =>
                      this.setState({ model, trained: true })
                    }
                    train={this.state.training}
                  />
                  <CardFooter>
                    <hr />
                    <Button
                      onClick={() =>
                        this.setState({ training: !this.state.training })
                      }
                      variant="contained"
                      color="primary"
                    >
                      {this.state.training
                        ? "Pause Training"
                        : "Start Training"}
                    </Button>
                    {this.state.trained && (
                      <span style={{ marginLeft: 14 }}>
                        <Button
                          onClick={() => {
                            const probTensor = this.state.model.predict(test);
                            probTensor.print();
                            const probArr = probTensor.dataSync();

                            this.setState({
                              predicted: testDigits.map((digit, i) => {
                                return (
                                  <div className="prob" key={i}>
                                    Sample {i} is digit {digit} with
                                    {" " +
                                      Math.round(probArr[i * 10 + digit] * 100)}
                                    % confidence.
                                  </div>
                                );
                              })
                            });
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          Predict
                        </Button>
                        <p className="card-category" style={{ marginTop: 14 }}>
                          {this.state.predicted}{" "}
                        </p>
                      </span>
                    )}
                  </CardFooter>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Brain;
