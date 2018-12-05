import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import classnames from 'classnames'
import { ToastContainer } from 'react-toastify'
import { Route, Switch, Redirect, Link, NavLink, Router, BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'
import SidebarFooter from './SidebarFooter'

import SelectContentManager from '~/components/Content/Select/Manager'
import Content from '~/views/Content'
import GhostContent from '~/views/GhostContent'
import FlowBuilder from '~/views/FlowBuilder'
import Module from '~/views/Module'
import Notifications from '~/views/Notifications'
import Logs from '~/views/Logs'
import BackendToast from '~/components/Util/BackendToast'

import PluginInjectionSite from '~/components/PluginInjectionSite'

import { viewModeChanged } from '~/actions'

import stylus from './Layout.styl'
import StatusBar from './StatusBar'
import menu from './menu.styl'

class Layout extends React.Component {
  state = {
    statusBarModuleEvent: undefined
  }

  componentDidMount() {
    this.botpressVersion = window.BOTPRESS_VERSION
    this.botName = window.BOT_ID

    const viewMode = this.props.location.query && this.props.location.query.viewMode

    setImmediate(() => {
      this.props.viewModeChanged(viewMode || 0)
    })
  }

  handleModuleEvent = event => {
    this.setState({ statusBarModuleEvent: event })
  }

  render() {
    if (this.props.viewMode < 0) {
      return null
    }

    // const hasHeader = this.props.viewMode <= 2
    // const classNames = classnames({
    //   [style.container]: hasHeader,
    //   'bp-container': hasHeader
    // })

    return (
      <div className={stylus.container}>
        <main className={stylus.main}>
          <header className={stylus.mainHeader}>Header</header>
          <div className={stylus.mainContent}>
            <aside className={stylus.aside}>
              <img src="stylus/assets/logo.svg" className={stylus.aside__logo} />
              <nav role="menubar" className={menu.navigation}>
                <ul role="menu" className={menu.navigationList}>
                  <li role="menuitem" className={menu.navigation__item}>
                    <a role="link" href="#" className={menu.navigation__link}>
                      <span className={menu.navigation__icon} />
                      Dashboard
                    </a>
                  </li>
                  <li role="menuitem" className={menu.navigation__item}>
                    <Link to="/content">Content</Link>
                  </li>
                  <li role="menuitem" className={menu.navigation__item}>
                    <a role="link" href="#" className={menu.navigation__link}>
                      Version Control
                    </a>
                  </li>
                  <li role="menuitem" className={menu.navigation__item}>
                    <Link to="/flows">Flows</Link>
                  </li>
                </ul>
                <ul role="menu" className={classnames(menu.navigationList, 'bp-navbar-module-buttons')} />
                <ul role="menu" className={classnames(menu.navigationList, 'nav.navbar-nav')} />
              </nav>
            </aside>
            <main>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/flows" />} />
                <Route exact path="/content" component={Content} />
                <Route exact path="/version-control" component={GhostContent} />
                <Route exact path="/flows/:flow*" component={FlowBuilder} />
                <Route
                  exact
                  path="/modules/:moduleName/:subView?"
                  render={props => <Module {...props} onModuleEvent={this.handleModuleEvent} />}
                />
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/logs" component={Logs} />
              </Switch>
            </main>
          </div>
          <StatusBar
            botName={this.botName}
            botpressVersion={this.botpressVersion}
            moduleEvent={this.state.statusBarModuleEvent}
          />
        </main>
        {/* <ToastContainer position="bottom-right" /> */}
        {/* <SidebarFooter /> */}
        <PluginInjectionSite site="overlay" />
        <BackendToast />
        {/* <SelectContentManager /> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  license: state.license,
  viewMode: state.ui.viewMode
})

const mapDispatchToProps = dispatch => bindActionCreators({ viewModeChanged }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
