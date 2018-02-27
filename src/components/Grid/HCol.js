import './Col.less'
import classnames from 'classnames';

const HCol = ({span,offset,sm,children}) => {
    let classNames = 'hjk-col'+' '+
                     'hjk-col-'+span + ' ' + 
                     (offset?('hjk-col-offset-'+offset):'' +
                     (sm?('hjk-col-sm-'+sm):''));

    return (
        <div className={classNames}>{children}</div>
    )
}

export default HCol;