import React from 'react';
import { Table, ConfigProvider } from 'antd';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];



function Workbench() {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: 'red',
            }
          }
        }}
      >
        <Table dataSource={dataSource} columns={columns} />;
      </ConfigProvider>
    </div>
  );
}

export default Workbench;
