import { Col, Card, Row, Avatar } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const logo =
  "https://media.discordapp.net/attachments/1010925967469989908/1067768595599343636/image.png";

export default function HomePage() {
  interface DataType {
    key: string;
    Room: string;
    age: number;
    address: string;
    tags: string[];
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Room",
      dataIndex: "Room",
      key: "Room",
      render: (text) => <a>{text}</a>,
    },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.Room}</a> <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      Room: "703",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      Room: "704",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      Room: "705",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <>
      <Row gutter={[48, 16]}>
        <Col span={4} />
        <Card
          hoverable={true}
          title="Person Count"
          bordered={true}
          style={{
            height: 300,
            width: 600,
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
        >
          27
        </Card>
        <Card
          hoverable={true}
          title="Com On Count"
          bordered={true}
          style={{
            height: 300,
            width: 600,
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
        >
          22
        </Card>
      </Row>
      <Row gutter={[48, 48]}>
        <Col span={4} />
        <Card
          hoverable={true}
          title="Lasted time"
          bordered={true}
          style={{
            height: 300,
            width: 600,
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
        >
          2m 34s
        </Card>
        <Card
          hoverable={true}
          bordered={true}
          style={{
            height: 300,
            width: 600,
            margin: 10,
            border: "1px solid #C0C0C0",
          }}
          cover={<img height={300} alt="Logo" src={logo} />}
        ></Card>
        <Col span={24} style={{ margin: 10 }}>
          Activities log
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}
