import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

export interface ReportsTable {
  key: number;
  id: number;
  label: String;
  status: string;
  date_time: string;
  subject: string | undefined | null;
  class: string | undefined | null;
  person_count: number | undefined | null;
  comon_count: number | undefined | null;
}

export const camTable: ColumnsType<ReportsTable> = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Date Time",
    key: "date_time",
    dataIndex: "date_time",
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
  { title: "Label", dataIndex: "label", key: "label" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Class", dataIndex: "class", key: "class" },
  {
    title: "Date Time",
    key: "date_time",
    dataIndex: "date_time",
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

export const reportPageTables: ColumnsType<ReportsTable> = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Label", dataIndex: "label", key: "label" },
  { title: "Status", dataIndex: "status", key: "status" },
  {
    title: "Date Time",
    key: "date_time",
    dataIndex: "date_time",
  },
  { title: "Class", dataIndex: "class", key: "class" },
  { title: "Subject", dataIndex: "subject", key: "subject" },
  { title: "Person", dataIndex: "person_count", key: "person_count" },
  { title: "Com On", dataIndex: "comon_count", key: "comon_count" },
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
