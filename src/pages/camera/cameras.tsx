import VideoRender from "../../components/video";
import { CameraOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button } from "antd";

export default function CameraPage() {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="Camera 702"
            hoverable={true}
            bordered={false}
            style={{
              height: 350,
              width: 400,
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <div className="camera-video" style={{ marginLeft: 20 }}>
              <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
            </div>
            <Link to="/singlecamera">
              <Button
                type="primary"
                icon={<CameraOutlined />}
                style={{ margin: 30 }}
              >
                See more
              </Button>
            </Link>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              style={{ margin: 30 }}
            >
              Setting
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Camera 703"
            hoverable={true}
            bordered={false}
            style={{
              height: 350,
              width: 400,
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <div className="camera-video" style={{ marginLeft: 20 }}>
              <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
            </div>
            <Link to="/singlecamera">
              <Button
                type="primary"
                icon={<CameraOutlined />}
                style={{ margin: 30 }}
              >
                See more
              </Button>
            </Link>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              style={{ margin: 30 }}
            >
              Setting
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Camera 704"
            hoverable={true}
            bordered={false}
            style={{
              height: 350,
              width: 400,
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <div className="camera-video" style={{ marginLeft: 20 }}>
              <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
            </div>
            <Link to="/singlecamera">
              <Button
                type="primary"
                icon={<CameraOutlined />}
                style={{ margin: 30 }}
              >
                See more
              </Button>
            </Link>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              style={{ margin: 30 }}
            >
              Setting
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Camera 705"
            hoverable={true}
            bordered={false}
            style={{
              height: 350,
              width: 400,
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <div className="camera-video" style={{ marginLeft: 20 }}>
              <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
            </div>
            <Link to="/singlecamera">
              <Button
                type="primary"
                icon={<CameraOutlined />}
                style={{ margin: 30 }}
              >
                See more
              </Button>
            </Link>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              style={{ margin: 30 }}
            >
              Setting
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Camera 708"
            hoverable={true}
            bordered={false}
            style={{
              height: 350,
              width: 400,
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <div className="camera-video" style={{ marginLeft: 20 }}>
              <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
            </div>
            <Link to="/singlecamera">
              <Button
                type="primary"
                icon={<CameraOutlined />}
                style={{ margin: 30 }}
              >
                See more
              </Button>
            </Link>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              style={{ margin: 30 }}
            >
              Setting
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Camera 709"
            hoverable={true}
            bordered={false}
            style={{
              height: 350,
              width: 400,
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <div className="camera-video" style={{ marginLeft: 30 }}>
              <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
            </div>
            <Link to="/singlecamera">
              <Button
                type="primary"
                icon={<CameraOutlined />}
                style={{ margin: 30 }}
              >
                See more
              </Button>
            </Link>
            <Button
              type="primary"
              icon={<SettingOutlined />}
              style={{ margin: 30 }}
            >
              Setting
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
}
