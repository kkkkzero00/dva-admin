import {Menu,Icon,Dropdown} from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import headerStyle from './Header.less'

const SubMenu = Menu.SubMenu;

const Header = ({user,switchSider,logout}) => {
    // console.log(user)
    const handleClick = ({ item, key, keyPath }) => {
         key === 'logout' && logout();
    }

    return (
        <div className="header">
            <div className="changeSider" onClick={switchSider}>
                <Icon type="menu-fold"/>
            </div>
            <div className="customer">
                <Menu
                    onClick={handleClick}
                    mode="horizontal">
                    <SubMenu title={<span><Icon type="user" />{user.username}</span>}>
                        <Menu.Item key="logout">logout</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    )
}


export default Header;