import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { GitHubIcon } from "rmw-shell/lib/components/Icons";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  textColor: {
    color: "black"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    background: "white",
    height: 800,
    paddingTop: 0,
    border: 0,
    padding: 0,
    maxHeight: 1600,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    "text-align": "center",
    backgroundColor: "white",
    "border-radius": 12,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0
    }
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
    display: "block"
  },
  heroButton: {
    margin: 10
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

class LandingPage extends Component {
  isAuthorised = () => {
    try {
      const key = Object.keys(localStorage).find(e => e.match(/persist:root/));
      const data = JSON.parse(localStorage.getItem(key));
      const auth = JSON.parse(data.auth);

      return auth && auth.isAuthorised;
    } catch (ex) {
      return false;
    }
  };

  componentDidMount() {
    const { history } = this.props;
    if (this.isAuthorised()) {
      history.push("/signin");
    }
  }

  render() {
    const { classes, history, theme } = this.props;
    console.log(theme)
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.main}>
          <Helmet>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <meta
              name="apple-mobile-web-app-status-bar-style"
              content={theme.palette.primary.main}
            />
            <meta
              name="msapplication-navbutton-color"
              content={theme.palette.primary.main}
            />
            <title>Promania</title>
          </Helmet>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Promania
              </Typography>
              <div style={{ flex: 1 }} />

              <Tooltip id="tooltip-icon1" title="Sign in">
                <IconButton
                  name="signin"
                  aria-label="Open Github"
                  color="inherit"
                  onClick={() => {
                    history.push("/signin");
                  }}
                  rel="noopener"
                >
                  <LockIcon />
                </IconButton>
              </Tooltip>
              <Tooltip id="tooltip-icon2" title="GitHub repository">
                <IconButton
                  name="github"
                  aria-label="Open Github"
                  color="inherit"
                  href="https://github.com/Mosh-Media/promania-platform"
                  target="_blank"
                  rel="noopener"
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <div>
                  <img
                    src="https://cdn.pbrd.co/images/HSkE2Wm.png"
                    alt="Promania"
                    width="270"
                  />
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    className={classes.textColor}
                    gutterBottom
                  >
                    Promania
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    className={classes.textColor}
                    paragraph
                  >
                    Get a head start launching your dashboard idea{" "}
                    <span role="img" aria-label="rocket">
                      🚀
                    </span>
                  </Typography>
                  <p>
                    Promania is a PWA boilerplate built using React/Redux and
                    Firebase, it has all the tools you need to get started on
                    your idea. It handles authentication, storage and database
                    for you, so you can focus on development.
                  </p>
                </div>
                <div className={classes.heroButtons}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.heroButton}
                    onClick={() => {
                      history.push("/signin");
                    }}
                  >
                    Try our Demo
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.heroButton}
                    href="https://mosh-media.github.io/promania-platform/"
                  >
                    Docs
                  </Button>
                </div>
              </div>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Promania 2018
            </Typography>
          </footer>
          {/* End footer */}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(LandingPage));
