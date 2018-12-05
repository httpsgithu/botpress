import style from './StatusBar.styl'
import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

export default class StatusBar extends React.Component {
  state = {
    working: false,
    message: undefined
  }

  constructor(props) {
    super(props)
    this.expirationDelay = 4000
  }

  // static getDerivedStateFromProps(props, state) {
  //   const moduleEventId = _.get(props, 'moduleEvent.id')

  //   if (moduleEventId === 'nlu.training' || moduleEventId === 'nlu.complete') {
  //     return { working: props.moduleEvent.working, message: props.moduleEvent.message }
  //   }
  //   return null
  // }

  flashWhileWorking = () => {
    return this.state.working ? style.statusBar__worker : ''
  }

  expireLastMessage() {
    setTimeout(() => {
      this.setState({ message: undefined })
    }, this.expirationDelay)
  }

  render() {
    this.expireLastMessage()

    return (
      <footer className={style.statusBar}>
        <ul className={style.statusBar__list}>
          <li className={style.statusBar__listItem}>
            Botpress Version:&nbsp;
            {this.props.botpressVersion}
          </li>
          <li className={style.statusBar__listItem}>
            Active Bot:&nbsp;
            {this.props.botName}
          </li>
          {this.state.message && (
            <li className={classNames(style.statusBar__listItem, this.flashWhileWorking())}>{this.state.message}</li>
          )}
        </ul>
        <span className={style.statusBar__separator} />
      </footer>
    )
  }
}
