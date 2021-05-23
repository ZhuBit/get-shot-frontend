import './App.css';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import { Layout } from 'antd';
import AppMenu from "./components/AppMenu";
import MainRouter from "./router";

function App() {
    const { Header, Content, Footer } = Layout;

  return (
    <div className="App">
        <Layout>
            <Header className="app-header">
                <AppMenu />
            </Header>
            <Content className='app-content'>
                <MainRouter />
            </Content>
            <Footer className="app-footer">
                Get Shot 2021
            </Footer>
        </Layout>
    </div>
  );
}

export default  withRouter(App);
