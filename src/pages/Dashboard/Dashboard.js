import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { injectIntl, intlShape } from "react-intl";
import { GitHubIcon } from "rmw-shell/lib/components/Icons";
import { Activity } from "rmw-shell";
import { withTheme } from "@material-ui/core/styles";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import { withFirebase } from "firekit-provider";
import CountUp from "react-countup";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
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

// function that returns a color based on an interval of numbers
import Stats from "../../components/Stats/Stats.jsx";
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "../../variables/charts.jsx";

const currentYear = new Date().getFullYear();
const daysPath = `/user_registrations_per_day/${currentYear}/${new Date()
  .toISOString()
  .slice(5, 7)}`;
const monthsPath = `/user_registrations_per_month/${currentYear}`;
const providerPath = "/provider_count";

class Dashboard extends Component {
  componentDidMount() {
    const { watchPath } = this.props;

    watchPath(daysPath);
    watchPath(monthsPath);
    watchPath(providerPath);
    watchPath("users_count");
  }

  render() {
    const { theme, intl, days, months, providers, usersCount, nightMode } = this.props;
    let styles = { backgroundColor: theme.palette.background.paper }
    nightMode ? styles.backgroundColor = '#f4f3ef' : styles.backgroundColor = '#FFFFFF' 
    let daysLabels = [];
    let daysData = [];
    if (days) {
      Object.keys(days)
        .sort()
        .map(key => {
          daysLabels.push(key);
          daysData.push(days[key]);
          return key;
        });
    }
    
    const daysComponentData = {
      labels: daysLabels,
      datasets: [
        {
          key: 2,
          label: intl.formatDate(Date.now(), { month: "long" }),
          fill: false,
          lineTension: 0.1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          borderCapStyle: "square",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: theme.palette.secondary.main,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: theme.palette.primary.main,
          pointHoverBorderColor: theme.palette.secondary.main,
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 1,
          data: daysData
        }
      ]
    };

    let monthsLabels = [];
    let monthsData = [];

    if (months) {
      Object.keys(months)
        .sort()
        .map(key => {
          let date = new Date(`${currentYear}-${key}-1`);
          monthsLabels.push(intl.formatDate(date, { month: "long" }));

          monthsData.push(months[key]);
          return key;
        });
    }

    const monthsComponentData = {
      labels: monthsLabels,
      datasets: [
        {
          key: 3,
          label: intl.formatMessage({ id: "user_registrationg_graph_label" }),
          fill: false,
          maintainAspectRatio: true,
          lineTension: 0.1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          borderCapStyle: "square",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: theme.palette.secondary.main,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: theme.palette.primary.main,
          pointHoverBorderColor: theme.palette.secondary.main,
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          pointHitRadius: 1,
          data: monthsData
        }
      ]
    };

    let providersData = [];
    let providersLabels = [];
    let providersBackgrounColors = [];

    if (providers) {
      Object.keys(providers)
        .sort()
        .map(key => {
          providersLabels.push(intl.formatMessage({ id: key }));
          providersBackgrounColors.push(
            intl.formatMessage({ id: `${key}_color` })
          );
          providersData.push(providers[key]);
          return key;
        });
    }

    const providersComponentData = {
      labels: providersLabels,
      datasets: [
        {
          key: 1,
          data: providersData,
          backgroundColor: theme.palette.secondary.main,
          hoverBackgroundColor: theme.palette.secondary.secondary
        }
      ]
    };


    return (
      <Activity
        iconElementRight={
          <Button
            style={{ marginTop: 4 }}
            href="https://github.com/Mosh-Media/promania-platform"
            target="_blank"
            rel="noopener"
            secondary
            icon={<GitHubIcon />}
          />
        }
        title={intl.formatMessage({ id: "dashboard" })}
      >
        <Scrollbar>
          <div className={"main-panel"}>
            <div className="content">
              <Row>
                <Col xs={12} sm={6} md={6} lg={3}>
                <Card className="card-stats" 
                  style={styles}>
                    <CardBody>
                      <Row>
                        <Col xs={5} md={4}>
                          <div
                            className="icon-big text-center"
                            style={{ color: theme.palette.secondary.main }}
                          >
                            <i className="nc-icon nc-satisfied" />
                          </div>
                        </Col>
                        <Col xs={7} md={8}>
                          <div className="numbers">
                            <p className="card-category">Total Users</p>
                            <CardTitle tag="p">
                              <CountUp 
                              start={0} 
                              end={usersCount}
                              duration={2.75}
                              separator=" "
                              decimals={0}
                              decimal=","
                              prefix=""
                              suffix=""
                               />
                            </CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-refresh-69",
                            t: "Update Now"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} sm={6} md={6} lg={3}>
                  <Card className="card-stats" 
                  style={styles}>
                    <CardBody>
                      <Row>
                        <Col xs={5} md={4}>
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-money-coins" 
                            style={{ color: theme.palette.secondary.main }}/>
                          </div>
                        </Col>
                        <Col xs={7} md={8}>
                          <div className="numbers">
                            <p className="card-category">Revenue</p>
                            <CardTitle tag="p">
                            <CountUp 
                              start={0} 
                              end={4100}
                              duration={1.25}
                              separator=","
                              decimals={0}
                              decimal="."
                              prefix="$"
                              suffix=""
                               />
                               </CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-calendar-60",
                            t: "Last day"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} sm={6} md={6} lg={3}>
                  <Card className="card-stats"
                  style={styles}>
                    <CardBody>
                      <Row>
                        <Col xs={5} md={4}>
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-vector" 
                            style={{ color: theme.palette.secondary.main }}/>
                          </div>
                        </Col>
                        <Col xs={7} md={8}>
                          <div className="numbers">
                            <p className="card-category">Alerts</p>
                            <CardTitle tag="p">
                            <CountUp 
                              start={0} 
                              end={12}
                              duration={1.25}
                              separator=","
                              decimals={0}
                              decimal="."
                              prefix=""
                              suffix=""
                               /></CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-watch-time",
                            t: "In the last hour"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} sm={6} md={6} lg={3}>
                  <Card className="card-stats"
                  style={styles}>
                    <CardBody>
                      <Row>
                        <Col xs={5} md={4}>
                          <div className="icon-big text-center">
                            <i className="nc-icon nc-favourite-28" 
                            style={{ color: theme.palette.secondary.main }}/>
                          </div>
                        </Col>
                        <Col xs={7} md={8}>
                          <div className="numbers">
                            <p className="card-category">Followers</p>
                            <CardTitle tag="p">
                            <CountUp 
                              start={0} 
                              end={45}
                              duration={1.25}
                              separator=","
                              decimals={0}
                              decimal="."
                              prefix="+"
                              suffix="k"
                               />
                               </CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-refresh-69",
                            t: "Update now"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Card
                  style={styles}>
                    <CardHeader>
                      <CardTitle>Users Behavior</CardTitle>
                      <p className="card-category">24 Hours performance</p>
                    </CardHeader>
                    <CardBody>
                      <Line
                        data={dashboard24HoursPerformanceChart.data}
                        options={dashboard24HoursPerformanceChart.options}
                        width={400}
                        height={100}
                      />
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-paper",
                            t: " Updated 3 minutes ago"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={4}>
                  <Card
                  style={styles}>
                    <CardHeader>
                      <CardTitle>Email Statistics</CardTitle>
                      <p className="card-category">Last Campaign Performance</p>
                    </CardHeader>
                    <CardBody>
                      <Pie
                        data={dashboardEmailStatisticsChart.data}
                        options={dashboardEmailStatisticsChart.options}
                      />
                    </CardBody>
                    <CardFooter>
                      <div className="legend">
                        <i className="fa fa-circle text-primary" /> Opened{" "}
                        <i className="fa fa-circle text-warning" /> Read{" "}
                        <i className="fa fa-circle text-danger" /> Deleted{" "}
                        <i className="fa fa-circle text-gray" /> Unopened
                      </div>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-calendar-60",
                            t: " Number of emails sent"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={8}>
                  <Card className="card-chart"
                  style={styles}>
                    <CardHeader>
                      <CardTitle>NASDAQ: AAPL</CardTitle>
                      <p className="card-category">Line Chart With Points</p>
                    </CardHeader>
                    <CardBody>
                      <Line
                        data={dashboardNASDAQChart.data}
                        options={dashboardNASDAQChart.options}
                        width={400}
                        height={100}
                      />
                    </CardBody>
                    <CardFooter>
                      <div className="chart-legend">
                        <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                        <i className="fa fa-circle text-warning" /> BMW 5 Series
                      </div>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-check-2",
                            t: " Data information certified"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <Card className="card-chart"
                  style={styles}>
                    <CardHeader>
                      <CardTitle>Total Users</CardTitle>
                      <p className="card-category">User data</p>
                    </CardHeader>
                    <CardBody>
                    <Line
                  options={{
                    maintainAspectRatio: true
                  }}
                  data={monthsComponentData}
                />
                    </CardBody>
                    <CardFooter>
                      <div className="chart-legend">
                        <i className="fa fa-circle text-info" /> Organic users{" "}
                        <i className="fa fa-circle text-warning" /> Referred users
                      </div>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-check-2",
                            t: " Data information certified"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={6}>
                  <Card className="card-chart"
                  style={styles}>
                    <CardHeader>
                      <CardTitle>Users Per Month</CardTitle>
                      <p className="card-category">User data</p>
                    </CardHeader>
                    <CardBody>
                    <Bar
                  options={{
                    maintainAspectRatio: true
                  }}
                  data={daysComponentData}
                />
                    </CardBody>
                    <CardFooter>
                      <div className="chart-legend">
                        <i className="fa fa-circle text-info" /> Organic{" "}
                        <i className="fa fa-circle text-warning" />and Referred users
                      </div>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-check-2",
                            t: " Data information certified"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={4}>
                  <Card className="card-chart"
                  style={styles}>
                    <CardHeader>
                      <CardTitle>Platform Sign-ups</CardTitle>
                      <p className="card-category">User data</p>
                    </CardHeader>
                    <CardBody>
                    <Doughnut data={providersComponentData} />
                    </CardBody>
                    <CardFooter>
                      <div className="chart-legend">
                        <i className="fa fa-circle text-info" /> Sign-up {" "}
                        <i className="fa fa-circle text-warning" />and Login
                      </div>
                      <hr />
                      <Stats>
                        {[
                          {
                            i: "nc-icon nc-check-2",
                            t: " Data information certified"
                          }
                        ]}
                      </Stats>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Scrollbar>
      </Activity>
    );
  }
}

Dashboard.propTypes = {
  intl: intlShape.isRequired
};
const mapStateToProps = state => {
  const { paths, themeSource } = state;

  return {
    days: paths[daysPath],
    months: paths[monthsPath],
    providers: paths[providerPath],
    usersCount: paths["users_count"] ? paths["users_count"] : 0,
    nightMode: themeSource.isNightModeOn,
  };
};

export default connect(mapStateToProps)(
  injectIntl(withTheme()(withFirebase(Dashboard)))
);
