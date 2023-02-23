import { Col, Card, Row, Avatar } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { homePageTable, ReportsTable } from "../../components/interface";
const logo =
  "https://media.discordapp.net/attachments/1010925967469989908/1067768595599343636/image.png";

const width = "80%";
const height = "40%";
const margin = 20;

export default function HomePage() {
  const data: ReportsTable[] = [];

  {
    [...Array(20)].map((x, i) => {
      i++;
      data.push({
        key: i,
        id: i,
        label: "70" + i,
        status: "detected",
        class: "VTN",
        date_time: "01/01/0001 12 am.",
        subject: null,
        person_count: null,
        comon_count: null,
      });
    });
  }

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <Card
            hoverable={true}
            title="Person Count"
            bordered={true}
            style={{ height: height, width: width, margin: margin }}
          >
            <center>
              <Title level={1}>99</Title>
            </center>
          </Card>
          <Card
            hoverable={true}
            title="Lasted Time"
            bordered={true}
            style={{ height: height, width: width, margin: margin }}
          >
            <center>
              <Title level={1}>99</Title>
            </center>
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card
            hoverable={true}
            title="Com On Count"
            bordered={true}
            style={{ height: height, width: width, margin: margin }}
          >
            <center>
              <Title level={1}>99</Title>
            </center>
          </Card>
          <Card
            hoverable={true}
            style={{ height: height, width: width, margin: margin }}
            cover={<img alt="logo" src={logo} />}
          ></Card>
        </Col>
        <Col span={12}>
          <Table columns={homePageTable} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}
