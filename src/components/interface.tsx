import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

export interface ReportsTable {
  id: number;
  status: string;
  room_label: string | undefined | null;
  accurency: number;
  report_time: string;
  report_date: string;
  image: string;
  person_count: number | undefined | null;
  comon_count: number | undefined | null;
}

export const camTable: ColumnsType<ReportsTable> = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Date",
    key: "report_date",
    dataIndex: "report_date",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={{ pathname: `/reports/${record.id}` }}>Details</Link>
      </Space>
    ),
  },
];

export const homePageTable: ColumnsType<ReportsTable> = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Date",
    key: "report_date",
    dataIndex: "report_date",
  },
  {
    title: "Time",
    key: "report_time",
    dataIndex: "report_time",
  },
  { title: "Room", dataIndex: "room_label", key: "room_label" },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={{ pathname: `/reports/${record.id}` }}>Details</Link>
      </Space>
    ),
  },
];

export const reportPageTables: ColumnsType<ReportsTable> = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Date",
    key: "report_date",
    dataIndex: "report_date",
  },
  {
    title: "Time",
    key: "report_time",
    dataIndex: "report_time",
  },
  { title: "Room", dataIndex: "room_label", key: "room_label" },
  { title: "Person", dataIndex: "person_count", key: "person_count" },
  { title: "Com On", dataIndex: "comon_count", key: "comon_count" },
  { title: "Accurency", dataIndex: "accurency", key: "accurency" },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={{ pathname: `/reports/${record.id}` }}>Details</Link>
      </Space>
    ),
  },
];
