import { TimePicker } from "antd";
import { Checkbox, Button, Card } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

interface timeparam {
  starttime: string;
  duetime: string;
  section: string;
}

export default function SettingsPage() {
  const [onmonday, setOnMonday] = useState(false);
  const [timeam, SetTimeam] = useState({} as timeparam);
  const [timepm, SetTimepm] = useState({} as timeparam);
  const onChangeMonday = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);

    const check = e.target.checked;
    if (check == true) {
      setOnMonday(true);
    } else setOnMonday(false);
  };

  const time = (t: any, section: string) => {
    let starttime = "";
    let duetime = "";

    (starttime = t[0].$H), t[0].$m;
    duetime = t[1].$H;

    let ti: timeparam = {
      starttime: starttime,
      duetime: duetime,
      section: section,
    };

    if (section == "am") {
      SetTimeam(ti);
    } else SetTimepm(ti);

    console.log(t[0].$H, t[0].$m);
    console.log("section", section);
    console.log("starttime", starttime);
    console.log("duetime", duetime);
  };

  const format = "HH:mm";
  return (
    <>
      <Card
        title="Monday set trun off AI"
        hoverable={true}
        bordered={false}
        style={{
          minHeight: "20vh",
          minWidth: "37vh",
          margin: 10,
          border: "1px solid #C0C0C0",
        }}
      >
        <Checkbox onChange={onChangeMonday}>
          Monday
          {onmonday ? (
            <>
              <TimePicker.RangePicker
                format={format}
                minuteStep={15}
                onChange={(v) => {
                  time(v, "am");
                }}
              />
              <TimePicker.RangePicker
                format={format}
                minuteStep={15}
                onChange={(v) => {
                  time(v, "pm");
                }}
              />
            </>
          ) : (
            " Set Time off"
          )}
        </Checkbox>
        <>
          <h4>Morning</h4>
          <>starttime : {timeam.starttime}</>
          <>duetime : {timeam.duetime}</>
          <h4>Evening</h4>
          <>starttime : {timepm.starttime}</>
          <>duetime : {timepm.duetime}</>
        </>
      </Card>
    </>
  );
}
