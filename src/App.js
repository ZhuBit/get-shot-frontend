import './App.css';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import { Layout } from 'antd';
import AppMenu from "./components/AppMenu";
import MainRouter from "./router";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
function App() {
    const { Header, Content, Footer } = Layout;

  return (
    <div className="App">
        <Layout>
            <Header className="app-header">
                <AppMenu />
            </Header>
            <Content className='app-content'>
                {isBrowser ?  <MainRouter />:
                    <>
                        <h3> The app is not optimize for mobile devices.</h3>
                        <h3> Please switch to desktop! Get Shot 2021</h3>
                    </>}
                {/*<BrowserView>
                    <MainRouter />
                </BrowserView>
                <MobileView>
                    <h3> The app is not optimize for mobile devices.</h3>
                    <h3> Please switch to desktop! Get Shot 2021</h3>
                </MobileView>*/}
            </Content>
            <Footer className="app-footer">
                Get Shot 2021
            </Footer>
        </Layout>
    </div>
  );
}

export default  withRouter(App);
