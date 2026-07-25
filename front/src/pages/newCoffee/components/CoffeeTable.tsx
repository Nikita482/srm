import { columns } from "../constants/coffeeColumns";
import { useCoffeeMonth } from "../hooks/useCreateMonth";
import { Spin, Table } from "antd";

const CoffeeTable = () => {
  const { months, currentMonth } = useCoffeeMonth();

  if (!months) return <Spin />;
  return (
    <>
      <h1>CoffeeTable</h1>
      <Table columns={columns} dataSource={currentMonth?.data} rowKey="_id" />
    </>
  );
};

export default CoffeeTable;

{
  /*
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
