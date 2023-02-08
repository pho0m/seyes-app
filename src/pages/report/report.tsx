import VideoRender from "../../components/video";
import { CameraOutlined, SettingOutlined } from "@ant-design/icons";

import { Card, Col, Row, Button } from "antd";

export default function ReportPage() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card
          title="Camera 702"
          bordered={false}
          style={{ height: 350, width: 400, margin: 10 }}
        >
          <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
          <Button
            type="primary"
            icon={<CameraOutlined />}
            style={{ margin: 25 }}
          >
            ON/OFF
          </Button>
          <Button
            type="primary"
            icon={<SettingOutlined />}
            style={{ margin: 25 }}
          >
            Setting
          </Button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Camera 703"
          bordered={false}
          style={{ height: 350, width: 400, margin: 10 }}
        >
          <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
          <Button
            type="primary"
            icon={<CameraOutlined />}
            style={{ margin: 25 }}
          >
            ON/OFF
          </Button>
          <Button
            type="primary"
            icon={<SettingOutlined />}
            style={{ margin: 25 }}
          >
            Setting
          </Button>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Camera 704"
          bordered={false}
          style={{ height: 350, width: 400, margin: 10 }}
        >
          <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
          <Button
            type="primary"
            icon={<CameraOutlined />}
            style={{ margin: 25 }}
          >
            ON/OFF
          </Button>
          <Button
            type="primary"
            icon={<SettingOutlined />}
            style={{ margin: 25 }}
          >
            Setting
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
