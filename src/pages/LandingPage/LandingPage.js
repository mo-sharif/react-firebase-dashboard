import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LockIcon from '@material-ui/icons/Lock'
import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  textColor: {
    color: 'black',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    background: 'linear-gradient(45deg, #421caf 30%, #4679fa 90%)',
    height: 800,
    paddingTop: 100,
    border: 0,
    padding: 0,
    maxHeight: 1600,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    'text-align': 'center',
    backgroundColor: 'white',
    'border-radius': 12,
    'box-shadow': '0px 16px 20px rgba(0, 0, 0, 0.45)'
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
})

class LandingPage extends Component {


  isAuthorised = () => {
    try {
      const key = Object.keys(localStorage).find(e => e.match(/persist:root/))
      const data = JSON.parse(localStorage.getItem(key))
      const auth = JSON.parse(data.auth)

      return auth && auth.isAuthorised

    } catch (ex) {
      return false
    }
  }

  componentDidMount() {
    const { history } = this.props

    if (this.isAuthorised()) {
      history.push('/signin')
    }
  }


  render() {
    const { classes, history, theme } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.main}>
          <Helmet>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <meta name="apple-mobile-web-app-status-bar-style" content={theme.palette.primary.main} />
            <meta name="msapplication-navbutton-color" content={theme.palette.primary.main} />
            <title>Promania</title>
          </Helmet>
          <AppBar position='static'  className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit">
              Promania
              </Typography>
              <div style={{ flex: 1 }} />

              <Tooltip id="tooltip-icon1" title="Sign in">
                <IconButton
                  name='signin'
                  aria-label='Open Github'
                  color='inherit'
                  onClick={() => { history.push('/signin') }}
                  rel='noopener'
                >
                  <LockIcon />
                </IconButton>
              </Tooltip>
              <Tooltip id="tooltip-icon2" title="GitHub repository">
                <IconButton
                  name='github'
                  aria-label='Open Github'
                  color='inherit'
                  href='https://github.com/Mosh-Media/promania-platform'
                  target='_blank'
                  rel='noopener'
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <div className={classes.heroUnit} >
              <div className={classes.heroContent}>
               <img src="https://cdn.pbrd.co/images/HSkE2Wm.png" 
                  alt="Promania" 
                  width="270"
               />
                <Typography 
                  component="h2" variant="h2" align="center" className={classes.textColor} gutterBottom>
                  Promania
                </Typography>
                <Typography 
                  variant="h6" align="center"  className={classes.textColor} color="white" paragraph>
                  Launch your dashboard quickly without the headache
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container justify="center">
                    <Grid item>
                      <Button variant="contained" color="secondary" 
                        className={classes.customRedButton}
                        onClick={() => { history.push('/signin') }}>
                        Try our Demo
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Promania 2018
            </Typography>
          </footer>
          {/* End footer */}
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(LandingPage))
