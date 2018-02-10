import React from 'react'
import { Icon } from 'antd'
import './index.less'

const Error = () => {
    return (<div className="contentInner">
              <div className="error">
                <Icon type="frown-o" />
                <h1>404 Not Found</h1>
              </div>
            </div>);
}

export default Error;
