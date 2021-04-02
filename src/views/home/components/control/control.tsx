import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Form, Button, Select, DatePicker, Dropdown, Menu } from 'antd';
import { usePageStores } from '../../store';
import { controlLayout } from '@/config/grid';
import { useFilterData } from '@/hooks/common/useFilterData';

const { Option } = Select;

const RControl: FC = () => {
  const { tableStore, controlStore } = usePageStores();
  const { channelShort, enterprises, channelType } = useFilterData();

  const handleSearch = () => {
    tableStore.changePage(1)
    tableStore.handleDataSource(controlStore.controlData);
  }
  const resetSearch = () => {
    tableStore.setSortedInfo({
      columnKey: '',
      order: false
    })
    controlStore.resetControlData();
    handleSearch();
  }

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <Button type='link'>
          渠道充值报表
        </Button>
        
      </Menu.Item>
      <Menu.Item key='1'>
        <Button type='link'>
          对账分析报告
        </Button>   
        
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='bg-white padding-all-16'>
      <Form {...controlLayout}>
        <Row gutter={16} className='ant-form-margin-12'>
          <Col span={8}>
            <Form.Item label='核对月份'>
              <DatePicker 
                className='width-per-100' placeholder='请选择核对月份'
                value={controlStore.controlData.month || null}
                onChange={(date) => controlStore.setControlDataKey('month', date || undefined)}
                picker='month'
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='主体资质'>
              <Select
                className='width-per-100'
                value={controlStore.controlData.enterprise}
                placeholder='请选择主体资质'
                allowClear
                onChange={(val) => controlStore.setControlDataKey('enterprise', val)}
              >
                {enterprises.map((item) => (
                  <Option key={item} value={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='渠道类型'>
              <Select
                className='width-per-100'
                value={controlStore.controlData.channel_type}
                placeholder='请选择渠道类型'
                allowClear
                onChange={(val) => controlStore.setControlDataKey('channel_type', val)}
              >
                {channelType.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='ant-form-margin-0'>
          <Col span={8}>
            <Form.Item label='渠道标签'>
              <Select
                className='width-per-100'
                value={controlStore.controlData.channel_short_id}
                placeholder='请选择渠道标签'
                allowClear
                onChange={(val) => controlStore.setControlDataKey('channel_short_id', val)}
              >
                {channelShort.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} push={8}>
            <Form.Item label=' ' colon={false}>
              <div flex='main:right' className='ant-btn_wrap'>
                <Button type='primary' onClick={() => handleSearch()}>查询</Button>
                <Button type='primary' ghost onClick={() => resetSearch()}>重置</Button>
                <Dropdown overlay={menu}>
                  <Button type='primary' onClick={() => handleSearch()}>下载</Button>
                </Dropdown>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default observer(RControl);
