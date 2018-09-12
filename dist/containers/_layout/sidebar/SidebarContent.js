var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import { changeThemeToDark, changeThemeToLight } from '../../../redux/actions/themeActions';
import { makeEdgeUiContext } from 'edge-login-ui-web';
import { logIn, logOut } from '../../../redux/actions/accountActions.js';
let edgeContext; // : EdgeUiContext
makeEdgeUiContext({
    apiKey: 'aac3421135575c7433551969b28f72c5b74d7b78',
    appId: 'com.CaptainsRelay.www',
    appName: 'CaptainsRelay'
}).then((context) => __awaiter(this, void 0, void 0, function* () {
    edgeContext = context;
    console.log('context is: ', context);
}));
class SidebarContent extends PureComponent {
    constructor() {
        super(...arguments);
        this.changeToDark = () => {
            this.props.changeThemeToDark();
            this.hideSidebar();
        };
        this.changeToLight = () => {
            this.props.changeThemeToLight();
            this.hideSidebar();
        };
        this.openLogin = () => {
            const { logIn } = this.props;
            if (edgeContext) {
                edgeContext.openLoginWindow({
                    onLogin(account) {
                        console.log('account is: ', account);
                        logIn(account);
                    },
                    onClose() {
                        console.log('Closing window');
                    }
                });
            }
        };
        this.hideSidebar = () => {
            this.props.onClick();
        };
    }
    render() {
        const { account, logOut } = this.props;
        const accountOptionSyntax = account ? 'Log Out' : 'Log In';
        const onPressAccount = account ? logOut : this.openLogin;
        return (<div className='sidebar__content'>
        <ul className='sidebar__block'>
          <SidebarLink title={accountOptionSyntax} icon='exit' onClick={onPressAccount}/>
          <SidebarCategory title='Layout' icon='layers'>
            <li className='sidebar__link' onClick={this.changeToLight}>
              <p className='sidebar__link-title'>Light Theme</p>
            </li>
            <li className='sidebar__link' onClick={this.changeToDark}>
              <p className='sidebar__link-title'>Dark Theme</p>
            </li>
          </SidebarCategory>
        </ul>
        <ul className='sidebar__block'>
          <SidebarCategory title='Example Pages' icon='diamond'>
            <SidebarLink title='Page one' route='/pages/one' onClick={this.hideSidebar}/>
            <SidebarLink title='Page two' route='/pages/two' onClick={this.hideSidebar}/>
          </SidebarCategory>
        </ul>
      </div>);
    }
}
const mapStateToProps = (state) => ({
    account: state.account
});
const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    logIn: (account) => dispatch(logIn(account)),
    changeThemeToDark: () => dispatch(changeThemeToDark()),
    changeThemeToLight: () => dispatch(changeThemeToLight())
});
export const SidebarContentConnector = connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
