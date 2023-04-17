import { Table, Col, Typography, Space, Button } from "antd";

const { Title } = Typography;

import { Link } from "react-router-dom";

export default function UserPage() {
  const dataSource = [
    {
      key: "1",
      id: "001",
      firsname: "Kittiphong",
      lastname: "Bubpawong",
    },
    {
      key: "2",
      id: "002",
      firsname: "Kiattiphoom",
      lastname: "Poonkhetkit",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Firsname",
      dataIndex: "firsname",
      key: "firsname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Link to={{ pathname: `/users/1` }}>
            {/* FIXME */}
            <Button type="primary">Edit User</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <Col span={24} style={{ margin: 10 }}>
      <Title level={3}>USERS</Title>
      <Table columns={columns} dataSource={dataSource} />
    </Col>
  );
}
