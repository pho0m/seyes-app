import { Row, Col, Card } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAsync } from "react-use";
import { useState } from "react";
import Swal from "sweetalert2";
export const env = import.meta.env;

export default function SigleReport() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [resdata, setResdata] = useState() as any;

  const tp = useAsync(async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: env.VITE_BASE_URL + `/reports/${id}`,
      });

      if (response.status === 200) {
        setResdata(response.data);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Something went wrong!",
        text: "can't send data",
      });
    }
  }, []);

  console.log(resdata);

  if (tp.loading) {
    return <>Loading</>; //for loading
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12} />
        <Card
          hoverable={true}
          title="AI Detection Report"
          bordered={true}
          style={{
            width: "100%",
            border: "1px solid #C0C0C0",
            margin: 10,
          }}
        >
          <img src={resdata.image} width="100%" alt="image 702" />
        </Card>
        <Col span={12} />
        <Card
          hoverable={true}
          title="Report Detail"
          bordered={true}
          style={{
            margin: 10,
            width: "100%",
            border: "1px solid #C0C0C0",
          }}
        >
          <Col>
            <Col>
              <p>
                <b>Person: </b>
                {resdata.person_count}
              </p>
              <p>
                <b>Com On: </b>
                {resdata.com_on_count}
              </p>
              <p>
                <b>Upload At: </b>
                {resdata.report_date}
              </p>
              <p>
                <b>Time: </b>
                {resdata.report_time}
              </p>
              <p>
                <b>Accurency: </b>
                {resdata.accurency}
              </p>
            </Col>
          </Col>
        </Card>
      </Row>
    </>
  );
}
