import { Container } from './styles';
import { Row, Col } from 'antd';
import EnCode from '@/containers/Home/components/EnCode';
import CreateKey from '@/containers/Home/components/CreateKey';
import DeCode from '@/containers/Home/components/DeCode';

const Home = () => {
  return (
    <Container>
      <Row gutter={[50, 20]}>
        <Col span={6}>
          <CreateKey />
        </Col>
        <Col span={9}>
          <EnCode />
        </Col>
        <Col span={9}>
          <DeCode />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
