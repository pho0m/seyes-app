import { Card, Col, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { reportPageTables, ReportsTable } from "../../components/interface";
import VideoRender from "../../components/video";

export default function ReportPage() {
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
        subject: "AI",
        date_time: "01/01/0001 12 am.",
        person_count: 20,
        comon_count: 1 + i,
      });
    });
  }

  return (
    <>
      <Col span={20}>
        <Table columns={reportPageTables} dataSource={data} />
      </Col>
    </>
    // <div className="site-card-wrapper">
    //   <Row gutter={18}>
    //     <Col span={6}>
    //       <VideoRender src="http://localhost:8083/stream/uuid-pattern/channel/0/hls/live/index.m3u8" />
    //       <Title level={5} style={{}}>
    //         Cam 1
    //       </Title>
    //       <br />
    //       <br />
    //       <VideoRender src="http://localhost:8083/stream/27b69773-9da9-4a00-a3fb-d33d12ae65cc/channel/0/hls/live/index.m3u8" />
    //       <Title level={5} style={{}}>
    //         Cam 2
    //       </Title>
    //     </Col>
    //   </Row>
    // </div>
  );
}
