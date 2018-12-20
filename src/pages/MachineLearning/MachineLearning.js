import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { injectIntl, intlShape } from "react-intl";
import { GitHubIcon } from "rmw-shell/lib/components/Icons";
import { Activity } from "rmw-shell";
import { withTheme } from "@material-ui/core/styles";
import { withFirebase } from "firekit-provider";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
import "../../assets/paper-dashboard.css";
import Brain from "../../components/Brain/Brain";

class MachineLearning extends Component {
  componentDidMount() {}

  render() {
    const { theme, intl, machinelearning, nightMode } = this.props;
    let styles = { backgroundColor: theme.palette.background.paper };
    nightMode
      ? (styles.backgroundColor = "#f4f3ef")
      : (styles.backgroundColor = "#FFFFFF");

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
        isLoading={machinelearning === undefined}
        containerStyle={{ overflow: "hidden" }}
        title={intl.formatMessage({ id: "machinelearning" })}
      >
        <Scrollbar>
          <div className={"main-panel"}>
            <div className="content">
              <Brain styles={styles}/>
            </div>
          </div>
        </Scrollbar>
      </Activity>
    );
  }
}

MachineLearning.propTypes = {
  intl: intlShape.isRequired
};
const mapStateToProps = state => {
  const { themeSource } = state;

  return {
    nightMode: themeSource.isNightModeOn
  };
};

export default connect(mapStateToProps)(
  injectIntl(withTheme()(withFirebase(MachineLearning)))
);
