import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

const mapStateToProps = (state) => {
  const { locale, messages } = state.locale

  return { locale, messages }
}

export default connect(mapStateToProps)(IntlProvider)
