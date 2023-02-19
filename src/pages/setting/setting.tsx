import { TimePicker } from "antd";
import { Checkbox, Button, Card } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import dayjs from "dayjs";
import { useState } from "react";

export default function SettingsPage() {
  const [onmonday, setOnMonday] = useState(false);
  const [ontuesday, setOnTuesday] = useState(false);
  const [onwednesday, setOnWednesday] = useState(false);
  const [onthursday, setOnThursday] = useState(false);
  const [onfriday, setOnFriday] = useState(false);
  const [onsaturday, setOnSaturday] = useState(false);
  const [onsunday, setOnSunday] = useState(false);

  const onChangeMonday = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);

    const check = e.target.checked;
    if (check == true) {
      setOnMonday(true);
    } else setOnMonday(false);
  };
  // const onChangeTuesday = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);

  //   const check = e.target.checked;
  //   if (check == false) {
  //     setOnTuesday(true);
  //   } else setOnTuesday(false);
  // };

  // const onChangeWednesday = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);

  //   const check = e.target.checked;
  //   if (check == true) {
  //     setOnWednesday(true);
  //   } else setOnWednesday(false);
  // };

  // const onChangeThursday = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);

  //   const check = e.target.checked;
  //   if (check == true) {
  //     setOnThursday(true);
  //   } else setOnThursday(false);
  // };

  // const onChangeFriday = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);

  //   const check = e.target.checked;
  //   if (check == true) {
  //     setOnFriday(true);
  //   } else setOnFriday(false);
  // };

  // const onChangeSaturday = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);

  //   const check = e.target.checked;
  //   if (check == true) {
  //     setOnSaturday(true);
  //   } else setOnSaturday(false);
  // };

  // const onChangeSunday = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);

  //   const check = e.target.checked;
  //   if (check == true) {
  //     setOnSunday(true);
  //   } else setOnSunday(false);
  // };

  return (
    <>
      <Checkbox onChange={onChangeMonday}>
        Monday
        {onmonday ? (
          <>
            <Card
              title="Monday set trun off AI"
              hoverable={true}
              bordered={false}
              style={{
                height: 150,
                width: 300,
                margin: 10,
                border: "1px solid #C0C0C0",
              }}
            >
              <TimePicker.RangePicker
                onChange={(v) => {
                  console.log("onchange value:", v);
                }}
              />
            </Card>
          </>
        ) : (
          "Set Time off"
        )}
      </Checkbox>

      {/* <Checkbox onChange={onChangeTuesday}>
        Tuesday {ontuesday ? <TimePicker.RangePicker /> : "Set Time off"}
      </Checkbox>
      <Checkbox onChange={onChangeWednesday}>
        Wednesday {onwednesday ? <TimePicker.RangePicker /> : "Set Time off"}
      </Checkbox>
      <Checkbox onChange={onChangeThursday}>
        Thursday {onthursday ? <TimePicker.RangePicker /> : "Set Time off"}
      </Checkbox>
      <Checkbox onChange={onChangeFriday}>
        Friday {onfriday ? <TimePicker.RangePicker /> : "Set Time off"}
      </Checkbox>
      <Checkbox onChange={onChangeSaturday}>
        Saturday {onsaturday ? <TimePicker.RangePicker /> : "Set Time off"}
      </Checkbox>
      <Checkbox onChange={onChangeSunday}>
        Sunday {onsunday ? <TimePicker.RangePicker /> : "Set Time off"}
      </Checkbox> */}
    </>
  );
}
