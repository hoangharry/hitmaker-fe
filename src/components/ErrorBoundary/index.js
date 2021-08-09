import { Component } from 'react'
import './index.css'

class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error) {
    console.error(error)
    this.setState({ hasError: true })
  }
  render() {
    if (this.state.hasError) {
      return <div className="error">
        <p>Oops! Something went wrong!</p>
        <span>Go back to </span>
        <a href='/'>Homepage</a>
      </div>
    }
    return this.props.children
  }
}

export default ErrorBoundary