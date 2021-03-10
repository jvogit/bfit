import React, { useState, useEffect } from "react";
import { FormControl } from "baseui/form-control";
import { Input } from 'baseui/input';
import { DatePicker } from "baseui/datepicker";
import { Button, KIND } from "baseui/button";
import { Delete, Plus } from "baseui/icon";
import { createRecord } from "services/records/CalorieRecordsService";
import { useHistory } from "react-router";

const CreateItem = ({ onClick }) => {
  return (
    <Button
      kind={KIND.minimal}
      onClick={onClick}
      $style={{
        width: '100%',
      }}
      type="button"
    >
      <Plus /> Add Item
    </Button>
  );
}

const Item = ({ item, onChange, onDelete }) => {
  const [name, setName] = useState(item.name);
  const [calories, setCalories] = useState(item.calories);

  useEffect(() => {
    onChange({name, calories});
  }, [name, calories])

  useEffect(() => {
    setName(item.name);
    setCalories(item.calories);
  }, [item]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: '10px',
      alignItems: 'center',
    }}>
      <div style={{
        paddingRight: '10px',
      }}>
        <Input
          value={name}
          placeholder={"Food Name"}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <Input
          value={calories}
          placeholder={"Calories"}
          onChange={(event) => setCalories(event.target.value)}
        />
      </div>
      <Button
        type="button"
        onClick={onDelete}
        kind={KIND.minimal}
      >
        <Delete size={20} />
      </Button>
    </div>
  );
}

const fakeData = [
  {
    name: "Apple",
    calories: 100,
  },
  {
    name: "Banana",
    calories: 200,
  }
];

export default ({ initialDate, initialItems }) => {
  const [items, setItems] = useState(fakeData);
  const [date, setDate] = useState(new Date());
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    createRecord(date.toLocaleDateString("en-CA"), items)
    .then(response => {
      console.log(response);
      history.push("/dashboard");
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl label={"Date"}>
        <DatePicker
          value={date}
          onChange={({ date }) => setDate(date)}
          overrides={{
            Input: Input
          }} />
      </FormControl>
      <FormControl label={"Items"}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {
            items.map((item, index) => {
              console.log(`${index} with ${item.name}`);

              const onChange = (data) => {
                setItems(prev => { prev[index] = data; return prev; });
              }
              const onDelete = () => {
                setItems(prev => { let new_arr = [...prev]; new_arr.splice(index, 1); return new_arr; });
              }

              return (<Item key={index} item={item} onChange={onChange} onDelete={onDelete} />);
            })
          }
          <CreateItem 
            onClick={() => {
              setItems(prev => {
                let new_items = [...prev];
                new_items.push({name: '', calories: ''});
                return new_items;
              })
            }}
          />
        </div>
      </FormControl>
      <Button type="submit">
          Submit
      </Button>
    </form>
  );
}