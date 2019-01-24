import React from 'react'

const CATCH = 'catchError'

class Eitherx extends React.Component {
  constructor(props) {
    super(props)
    if (props.render) {
      if (!props[CATCH]) {
        throw new Error(`If \`render\` prop is passed, you must also pass a \`${CATCH}\` callback`)
      }
      if (typeof props.render !== 'function' || typeof props[CATCH] !== 'function') {
        throw new Error(`\`render\` and \`${CATCH}\` must both be functions`)
      }
    } else {
      const childCount = React.Children.count(props.children)
      if (childCount < 1 || childCount > 2) {
        throw new Error(`Eitherx expects either 1 or 2 children. You passed ${childCount} children`)
      }
    }
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: { error } }
  }

  componentDidCatch(error, info) {
    if (typeof this.props.handleError === 'function') {
      this.props.handleError({ error, info })
    }
  }

  render() {
    // Render Prop Style
    if (this.props.render) {
      return this.state.hasError ? this.props[CATCH](this.state.hasError) : this.props.render()
    }

    // Wrapper Component Style
    const [renderChild, errorChild] = React.Children.toArray(this.props.children)

    if (this.state.hasError) {
      if (!errorChild) return null
      return errorChild
    }
    return renderChild
  }
}

export default Eitherx
