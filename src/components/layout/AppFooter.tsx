import { Flex, Layout } from 'antd';
import type { CSSProperties } from 'react';
const { Footer } = Layout;
const footerStyle: CSSProperties = {
    position: 'fixed',
    left: 0,
    width: '100%',
    bottom: 0,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const FooterPage = () => {
    return (
        <Flex gap="medium" wrap>
            <Layout>
                <Footer style={footerStyle}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Flex>
    )
}

export default FooterPage