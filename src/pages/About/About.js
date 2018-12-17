import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { injectIntl, intlShape } from 'react-intl'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import { Activity } from 'rmw-shell'
import ReactMarkdown from 'react-markdown'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar'
import README from './README.md'
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";
import "../../assets/paper-dashboard.css";

require('github-markdown-css')

class About extends Component {
  // Sorry for using setState here but I have to remove 'marked' from the dependencies
  // because of a vulnerability issue
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  UNSAFE_componentWillMount() {
    fetch(README)
      .then(response => response.text())
      .then(text => {
        this.setState({ text: text })
      })
  }

  render() {
    let styles = {}
    const { intl } = this.props

    return (
      <Activity
        appBarContent={
          <IconButton

            href='https://github.com/Mosh-Media/promania-platform/tree/master/docs'
            target='_blank'
            rel='noopener'
          >
            <GitHubIcon />
          </IconButton>
        }
        title={intl.formatMessage({ id: 'about' })}>

        <Scrollbar>
            <div className={"main-panel"}>
                <div className="content">
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Card className="card-stats" 
                            style={styles}>
                                  <CardBody>
                                      <div style={{ backgroundColor: 'white', padding: 12 }}>
                                      <ReactMarkdown
                                      className='markdown-body'
                                      source={this.state.text}
                                      />
                                      </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </Scrollbar>

      </Activity>
    )
  }
}

About.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(About)
