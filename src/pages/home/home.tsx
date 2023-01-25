import { Col, Card, Row, Progress } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
const logo =
  "https://media.discordapp.net/attachments/1010925967469989908/1067768595599343636/image.png";
export default function HomePage() {
  interface DataType {
    key: string;
    ID: string;
    age: number;
    address: string;
    tags: string[];
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
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
           
          <a>Invite {record.ID}</a> <a>Delete</a> 
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      ID: "703",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      ID: "704",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      ID: "705",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
       
      <div className="site-card-wrapper">
         
        <Row gutter={16}>
           
          <Col span={6}>
            <Card
              hoverable={true}
              title="Person Count"
              bordered={true}
              style={{ height: 200, width: 400, margin: 10 }}
            >
              27 
            </Card> 
            <Card
              hoverable={true}
              title="Lasted Time"
              bordered={true}
              style={{ height: 200, width: 400, margin: 10 }}
            >  
              2m 34s 
            </Card> 
          </Col> 
          <Col span={6}>
            <Card
              hoverable={true}
              title="Com On Count"
              bordered={true}
              style={{ height: 200, width: 400, margin: 10 }}
            >
              12 
            </Card> 
            <Card
              hoverable={true}
              style={{ height: 200, width: 400, margin: 10 }}
              cover={<img alt="example" src={logo} height={200} />}
            ></Card> 
          </Col> 
          <Col span={8}>
            <Card
              hoverable={true}
              bordered={true}
              style={{ height: 410, width: 800, margin: 10 }}
            > 
              <Progress percent={30} size="small" /> 
              <Progress percent={50} size="small" /> 
              <Progress percent={70} size="small" /> 
              <Progress percent={50} size="small" /> 
              <Progress percent={30} size="small" /> 
              <Progress percent={50} size="small" /> 
              <Progress percent={70} size="small" /> 
              <Progress percent={50} size="small" /> 
              <Progress percent={30} size="small" /> 
              <Progress percent={50} size="small" /> 
              <Progress percent={70} size="small" /> 
              <Progress percent={50} size="small" /> 
            </Card> 
          </Col> 
        </Row> 
        <Row>
          <Col span={24} style={{ margin: 10 }}>  
            <Table columns={columns} dataSource={data} />; 
          </Col> 
        </Row> 
      </div>
    </div>
  );
}
