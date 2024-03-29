import { Card, Button, Input, Space } from "antd";
import { useState } from "react";

const { Meta } = Card;

export default function SingleUser() {
  const [checkupdate, SetCheckUpdate] = useState(false);

  const updatepass = () => {
    SetCheckUpdate(true);
  };

  const cmpass = () => {
    SetCheckUpdate(false);
  };
  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://scontent.fbkk13-3.fna.fbcdn.net/v/t39.30808-6/323227695_474872821468449_5341368541502882614_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE-nW3_5P4jV2xO-p1GYlrF1b3Z_IH79tzVvdn8gfv23GzGFDbr2kmwYEtNq9SSDlBS0Y6x0iMtKhVt2mwmjjJz&_nc_ohc=RRLGpHdw8nIAX971htz&tn=2rbqIk1jj6LVwyR8&_nc_ht=scontent.fbkk13-3.fna&oh=00_AfD8plrhUrkbs-grPNH6FSUBgXr7biqkxOW86AOF7rHWOg&oe=63FC2645"
          />
        }
      >
        <Meta title="Kittiphong Bubpawong" description="0643362043" />
        <Input.Password
          style={{ marginTop: 20 }}
          placeholder="input password"
        />
        <Button style={{ marginTop: 20 }} type="primary" onClick={updatepass}>
          Update Password
        </Button>
        {checkupdate ? (
          <>
            <Input.Password
              style={{ marginTop: 20 }}
              placeholder="Confirm password"
            />
            <Button style={{ marginTop: 20 }} type="primary" onClick={cmpass}>
              Confirm Password
            </Button>
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
