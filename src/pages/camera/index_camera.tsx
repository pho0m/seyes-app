import { Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

const width = "100%";
const height = "100%";

//FIXME make dynamic function
export default function IndexCameraPage() {
  return (
    <>
      <Row>
        <Col xs={24} xl={8} style={{ margin: 5 }}>
          <Link
            to={{
              pathname: `/cameras/1`,
            }}
          >
            <Card
              title="Room"
              hoverable={true}
              bordered={true}
              style={{ height: height, width: width }}
            >
              <center>
                <Title level={1}>702</Title>
              </center>
            </Card>
          </Link>
        </Col>
        <Col xs={24} xl={8} style={{ margin: 5 }}>
          <Link to={{ pathname: `/cameras/2` }}>
            <Card
              title="Room"
              hoverable={true}
              bordered={true}
              style={{ height: height, width: width }}
            >
              <center>
                <Title level={1}>703</Title>
              </center>
            </Card>
          </Link>
        </Col>
        <Col xs={24} xl={8}></Col>
      </Row>
    </>
  );
}
