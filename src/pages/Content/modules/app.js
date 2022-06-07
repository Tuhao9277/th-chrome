import { Button, Input, message, Modal, Space } from 'antd';
import React from 'react';
import $ from 'jquery';
import copy from 'copy-to-clipboard';

const App = () => {
  const getQueryParams = (idx) => {
    const [first, second] = $('.PropertyList');
    const target = [first, second][idx];
    let chart;
    chart = $(target).find('.RSortableWrapper.depth-1');
    if (idx === 1) {
      const result = $(target).find('.RSortableWrapper.depth1');
      chart = result.length === 0 ? chart : result;
    }
    const res = chart.children();
    let final;
    if (idx === 0) {
      final = res.toArray().reduce(
        (prev, cur) => {
          const [key, query, type, title] = cur.innerText.split('\n');
          prev.properties[key] = {
            title,
            type: type.toLowerCase(),
          };
          return prev;
        },
        {
          type: 'object',
          properties: {},
        }
      );
    } else {
      final = res
        .map((index, i) => {
          const [dataIndex, type, rule, value, title] = i.innerText.split('\n');
          return { title: title || value || rule, dataIndex };
        })
        .toArray();
    }
    const value = JSON.stringify(final, null, 2);
    const onOk = () => {
      copy(value);
      message.success('复制成功！');
      Modal.destroyAll();
    };
    Modal.info({
      title: '结果',
      width: 600,
      content: <Input.TextArea rows={20} value={value} />,
      okText: '复制',
      onOk,
    });
  };
  return (
    <Space direction="vertical" className="main-content">
      <Button type="primary" onClick={() => getQueryParams(0)}>
        获取请求参数
      </Button>
      <Button type="primary" onClick={() => getQueryParams(1)}>
        获取响应内容
      </Button>
    </Space>
  );
};

export default App;
