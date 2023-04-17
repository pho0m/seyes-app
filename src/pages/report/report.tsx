import { Col, Table } from "antd";
import { GetAllReport } from "../../api/report";
import { reportPageTables, ReportsTable } from "../../components/interface";
import { useAsync } from "react-use";
import { useState } from "react";

export default function ReportPage() {
  const data: ReportsTable[] = [];
  const [loading, setLoading] = useState(false);
  const [resdata, setResdata] = useState() as any;
  const [page, setPage] = useState(1);
  const [total_count, setTotalCount] = useState(1);
  const [total_page, setTotalPage] = useState(1);

  // const response = GetAllReport();
  // console.log(response);

  const tp = useAsync(async () => {
    setLoading(true);

    const res = await GetAllReport(page);
    console.log(res);
    setResdata(res);
    setTotalCount(resdata.items.length);
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

  console.log("res data length" + resdata.items.length);

  return (
    <>
      <Col>
        <Table columns={reportPageTables} dataSource={data} />
      </Col>
    </>
  );
}
