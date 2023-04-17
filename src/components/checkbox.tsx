import { Button, Card, Checkbox, TimePicker } from "antd";

export const CheckboxComponent = ({ list, handleOnChange }) => {
  const format = "HH:mm";

  return (
    <div>
      {list?.map((item: any, index: any) => (
        <Checkbox
          id={item.focus}
          value={item.focus}
          onChange={(e) => handleOnChange(e, item, index)}
          checked={item.isAdded}
          style={{ margin: 20 }}
        >
          {item.isAdded ? (
            <>
              {item.focus}
              <Card
                title={item.focus + " setting close time"}
                hoverable={true}
                bordered={false}
                style={{
                  width: 300,
                  margin: 10,
                  border: "1px solid #C0C0C0",
                }}
              >
                <p>Morning (AM) 00:00 - 12:00</p>
                <TimePicker.RangePicker
                  format={format}
                  onChange={(v) => {
                    console.log("onchange value:", v);
                  }}
                />

                <p>Evening (PM) 12:00 - 23:00</p>
                <TimePicker.RangePicker
                  format={format}
                  onChange={(v) => {
                    console.log("onchange value:", v);
                  }}
                />

                <Button type="primary" style={{ marginTop: 10 }}>
                  {/* FIXME */}
                  Submit
                </Button>
              </Card>
            </>
          ) : (
            <>{item.focus}</>
          )}
        </Checkbox>
      ))}
    </div>
  );
};
