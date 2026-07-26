import { useState } from "react";
import { columns } from "../constants/coffeeColumns";
import { useCoffeeMonth } from "../hooks/useCoffeeMonths";
import { Button, Card, DatePicker, Space, Spin, Table, Tag } from "antd";
import { useCoffeeRows } from "../hooks/useCoffeeRows";

const CoffeeTable = () => {
  const { months, currentMonth } = useCoffeeMonth();
  const {
    editingRow,
    setEditingRow,
    removeEditDate,
    saveEditingRow,
    addEditDate,
  } = useCoffeeRows();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  // console.log(editingRow);

  if (!months) return <Spin />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={[...(currentMonth?.data ?? [])].reverse()}
        rowKey="_id"
        expandable={{
          expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys([record._id]);
              setEditingRow(record);
            } else {
              setExpandedRowKeys([]);
            }
          },
          expandedRowRender: (record) => {
            return (
              <Card>
                <Space>
                  <p>Дни:</p>
                  {editingRow?.date.map((day) => (
                    <Tag key={day} closable onClose={() => removeEditDate(day)}>
                      {day}
                    </Tag>
                  ))}
                  <DatePicker
                    placeholder="+ день"
                    format="D"
                    allowClear={false}
                    onChange={(day) => addEditDate(day.date())}

                    // value={selectedEditDate}
                    // onChange={(date) => {
                    //   if (!date) return;

                    //   addEditDate(String(date.date()));
                    //   setSelectedEditDate(null);
                    // }}
                  />

                  <Button onClick={() => saveEditingRow(record._id)}>
                    Сохранить
                  </Button>
                </Space>
              </Card>
            );
          },
        }}
      />
    </>
  );
};

export default CoffeeTable;

{
  /*
      expandedRowRender: (record) => {}, // что показать при раскрытии
      expandedRowKeys: [],               // какие строки открыты
      onExpand: (expanded, record) => {}, // открыли/закрыли строку
      rowExpandable: (record) => true,    // можно ли раскрыть строку

      <Table
        columns={columns}
        dataSource={currentMonth?.data}
        rowKey="_id"
        expandable={{
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys([record._id]);
              setEditingRow(record); 
            } else {
              setExpandedRowKeys([]);
            }
          },
          expandedRowRender: (record) => (
            <Card>
              <Space>
                <p>Дни:</p>
                {editingRow?.date.map((day) => (
                  <Tag key={day} closable onClose={() => removeEditDate(day)}>
                    {day}
                  </Tag>
                ))}
                <DatePicker
                  placeholder="+ день"
                  format="D"
                  allowClear={false}
                  value={selectedEditDate}
                  onChange={(date) => {
                    if (!date) return;

                    addEditDate(String(date.date()));
                    setSelectedEditDate(null);
                  }}
                />

                <Button onClick={() => onSaveEditingRow(record._id)}>
                  Сохранить
                </Button>
              </Space>
            </Card>
          ),
        }}
      />  
*/
}
