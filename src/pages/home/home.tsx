import { Col, Card, Row, Avatar } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { useAsync } from "react-use";
import { GetAllReport } from "../../api/report";
import { homePageTable, ReportsTable } from "../../components/interface";
import { useState } from "react";
const logo =
  "https://media.discordapp.net/attachments/1010925967469989908/1067768595599343636/image.png";

const width = "80%";
const height = "40%";
const margin = 20;

export default function HomePage() {
  const data: ReportsTable[] = [];
  const [loading, setLoading] = useState(false);
  const [resdata, setResdata] = useState() as any;

  // const response = GetAllReport();
  // console.log(response);

  const tp = useAsync(async () => {
    setLoading(true);

    const res = await GetAllReport(1);
    console.log(res);
    setResdata(res);
  }, []);

  if (tp.loading) {
    return <>Loading</>; //for loading
  }

  console.log("resdata", resdata.items);

  let reportdata = resdata.items.map((v) => {
    data.push({
      id: v.id,
      status: v.status,
      room_label: v.room_label,
      accurency: v.accurency,
      report_time: v.report_time,
      report_date: v.report_date,
      image: v.image,
      person_count: v.person_count,
      comon_count: v.com_on_count,
    });
  });

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
