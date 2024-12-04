import {Col, Row, Space} from 'antd';
import BannerCard from './banner-card';
import { Conversation, Application } from './aplication-conversation';


function Workbench() {
  return (
    <div className='p-2'>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={16}>
          <BannerCard />
        </Col>
        <Col span={24} lg={8}>
          <Space direction='vertical' className='w-full'>
            <Conversation />
            <Application />
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default Workbench;
