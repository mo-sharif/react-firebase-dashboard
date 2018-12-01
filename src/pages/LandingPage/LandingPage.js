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
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import classNames from 'classnames'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  textColor: {
    color: 'white',
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

const cards = [3]

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
                <Typography 
                  component="h2" variant="h2" align="center" className={classes.textColor} gutterBottom>
                  Promania
                </Typography>
                <Typography 
                  variant="h6" align="center"  className={classes.textColor} color="textPrimary" paragraph>
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
            <div className={classNames(classes.layout, classes.cardGrid)}>
              {/* End hero unit */}
              <Grid container spacing={40}>
                {cards.map(card => (
                  <Grid item key={card} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Heading
                        </Typography>
                        <Typography>
                          This is a media card. You can use this section to describe the content.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <Button size="small" color="primary">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
