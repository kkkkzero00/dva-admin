import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './index.less'

const Loader = ({spinning}) => {

    return (
        <div className={classnames({ 
            "loader":true,
            "loader-hidden": !spinning 
        })}>
            <div className="loader-container">
              <div className="loader-spining" />
              <div className="loader-text" >LOADING</div>
            </div>
        </div>
    )
}


Loader.propTypes = {
  spinning: PropTypes.bool,
}

export default Loader