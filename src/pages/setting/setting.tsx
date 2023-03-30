import { Input, Button, Card, List, Form } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { GetSetting } from "../../api/setting";
import React, { useState, useEffect } from "react";
export const env = import.meta.env;

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [resdata, setResdata] = useState() as any;
  const [onedit, setOnEdit] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await GetSetting();
      setResdata(res);
    })();
  }, [onedit]);

  if (!resdata) {
    return <>Loading</>; //for loading
  }

  const onMenuClick = (e: boolean) => {
    setOnEdit(e);
    console.log("edit", onedit);
  };

  const onFinish = async (values: any) => {
    const res = await axios({
      method: "put",
      url: env.VITE_BASE_URL + "/settings/edit/1",
      data: {
        cronjob_time: values.cronjobtime,
        notify_access_token: values.notifyaccesstoken,
      },
    });
    setOnEdit(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {onedit ? (
        <>
          <Button
            type="primary"
            style={{
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
            onClick={() => onMenuClick(false)}
          >
            Edit Setting
          </Button>

          <Card
            title="Setting Detail"
            hoverable={true}
            bordered={false}
            style={{
              minHeight: "20vh",
              minWidth: "37vh",
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <List>
              <List.Item>
                <List.Item.Meta
                  title="Cronjob Time"
                  description={resdata.cronjob_time}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Notify Access Token"
                  description={resdata.notify_access_token}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Update At"
                  description={resdata.update_at}
                />
              </List.Item>
            </List>
          </Card>
        </>
      ) : (
        <>
          <Button
            style={{
              margin: 10,
              color: "white",
              backgroundColor: "red",
              border: "1px solid #C0C0C0",
            }}
            onClick={() => onMenuClick(true)}
          >
            Cancel
          </Button>

          <Card
            title="Setting Detail"
            hoverable={true}
            bordered={false}
            style={{
              minHeight: "20vh",
              minWidth: "37vh",
              margin: 10,
              border: "1px solid #C0C0C0",
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Cronjob Time"
                name="cronjobtime"
                rules={[
                  {
                    required: true,
                    message: "Please input your Cronjob Time!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Notify Access Token"
                name="notifyaccesstoken"
                rules={[
                  {
                    required: true,
                    message: "Please input your Notify Access Token!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}
