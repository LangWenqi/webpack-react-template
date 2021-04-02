import React, { FC, useEffect } from 'react';
import { Table, Tooltip, Button, Pagination, TablePaginationConfig } from 'antd';
import { observer } from 'mobx-react';
import { usePageStores } from '../../store';
import { I_DataSource } from '../../store/table/types';
import RChildTable from '../childTable/childTable';
import { InfoCircleOutlined, DownOutlined, RightOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { moneyFormat } from '@/utils';
import { M_Third_settlement_bill_status, M_Third_settlement_flow_status, E_Third_settlement_bill_status, E_Third_settlement_flow_status } from '../../maps/common';

const RTable: FC = () => {
  const { tableStore, controlStore } = usePageStores();

  const isComplete = (record: I_DataSource) => {
    return record.third_settlement_flow_status === E_Third_settlement_flow_status.complete && 
          record.third_settlement_bill_status === E_Third_settlement_bill_status.complete
  }

  const columns: any = [
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='用户原始充值金额归属期，显示为某年某月'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>核对月份</span>
          </Tooltip>
        </div>
      ),
      dataIndex: 'month_str',
      key: 'month_str',
      width: 95
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='合同签订的本企业全称'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>主体资质</span>
          </Tooltip>
        </div>
      ),
      dataIndex: 'enterprise',
      key: 'enterprise',
      width: 110
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='业务合作模式，分为直充、联运、广告三种类型'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>渠道类型</span>
          </Tooltip>
        </div>
      ),
      dataIndex: 'channel_type',
      key: 'channel_type'
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='业务为便捷地区分渠道而填写的备注'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>渠道标签</span>
          </Tooltip>
        </div>
      ),
      key: 'channel_short_name',
      dataIndex: 'channel_short_name'
    },
    {
      title: (
        <div>
          <Tooltip
            placement='topLeft'
            title={
              <div>
                <div>渠道全称：（联运和广告）签订合同中三方企业全称；</div>
                <div>渠道账户：（直充-支付宝、微信、iOS）渠道账户</div>
              </div>
            }
          >
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>渠道全称/渠道账户</span>
          </Tooltip>
        </div>
      ),
      key: 'channel_name',
      dataIndex: 'channel_name'
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='用户原始充值总金额'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>三方结算单原始总额</span>
          </Tooltip>
        </div>
      ),
      key: 'third_settlement_bill',
      render (text: unknown, record: I_DataSource) {
        return (
          <div style={{ minWidth: 100 }}>
            {record.third_settlement_bill_status === E_Third_settlement_bill_status.complete
              ? moneyFormat(record.third_settlement_bill) 
              : `-（${M_Third_settlement_bill_status[record.third_settlement_bill_status]}）`}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='渠道所有流水明细累加的总金额'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>三方流水总额</span>
          </Tooltip>
        </div>
      ),
      key: 'third_settlement_flow',
      render (text: unknown, record: I_DataSource) {
        return (
          <div style={{ minWidth: 100 }}>
            {record.third_settlement_flow_status === E_Third_settlement_flow_status.complete
              ? moneyFormat(record.third_settlement_flow) 
              : `-（${M_Third_settlement_flow_status[record.third_settlement_flow]}）`}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='由hummer交易服务记录的所有流水明细累加的总金额'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>内部流水总额</span>
          </Tooltip>
        </div>
      ),
      key: 'hummer_settlement_flow',
      render (text: unknown, record: I_DataSource) {
        return (
          <div style={{ minWidth: 100 }}>
            {moneyFormat(record.hummer_settlement_flow)}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='内部流水总额 - 三方流水总额'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>内外流水差额</span>
          </Tooltip>
        </div>
      ),
      key: 'error_settlement_flow',
      sorter: true,
      sortOrder: tableStore.sortedInfo.columnKey === 'error_settlement_flow' && tableStore.sortedInfo.order,
      render (text: unknown, record: I_DataSource) {
        return (
          <div style={{ minWidth: 80 }}>
            {isComplete(record) ? <span className={record.error_settlement_flow !== 0 ? 'color-red' : ''}>{moneyFormat(record.error_settlement_flow)}</span> : '-'}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='内部流水总额 / 三方流水总额 - 1'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>内外流水差额率</span>
          </Tooltip>
        </div>
      ),
      key: 'error_settlement_per',
      sorter: true,
      sortOrder: tableStore.sortedInfo.columnKey === 'error_settlement_per' && tableStore.sortedInfo.order,
      render (text: unknown, record: I_DataSource) {
        return (
          <div style={{ minWidth: 80 }}>
            {isComplete(record) 
              ? (
                <span>
                  <span className={record.error_settlement_per !== 0 || record.third_mismatch_amount > 0 || record.hummer_mismatch_amount > 0 ? 'color-red' : ''}>
                    {`${record.error_settlement_per}%`}
                  </span>
                  {(record.third_mismatch_amount > 0 || record.hummer_mismatch_amount > 0) && (
                    <Tooltip
                      placement='topLeft' title={(
                        <div>
                          <div>成功匹配订单金额：{record.match_amount}</div>
                          <div>内匹外失败金额：{record.third_mismatch_amount}</div>
                          <div>外匹内失败金额：{record.hummer_mismatch_amount}</div>
                        </div>
                      )}
                    >
                      <ExclamationCircleOutlined className='color-red margin-left-4' />
                    </Tooltip>
                  )}
                </span>
              )
              : '-'}
          </div>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render (text: unknown, record: I_DataSource) {
        return (
          <div className='ant-btn-no-padding'>
            <div>
              <Button type='link'>
                下载差错流水
              </Button>
            </div>
            <Button type='link' onClick={() => handleExpandedRowKeys(record)}>
              详情
              {isExpanded(record)
                ? <DownOutlined className='ant-icon-in-btn' />
                : <RightOutlined className='ant-icon-in-btn' />}
            </Button>
          </div>
        )
      }
    }
  ];

  const isExpanded = (record: I_DataSource) => {
    return tableStore.expandedRowKeys.includes(record.id)
  }
  
  const handleExpandedRowKeys = (record: I_DataSource) => {
    tableStore.setExpandedRowKeys(isExpanded(record) ? [] : [record.id]);
  }

  const changeCurrent = (page: number) => {
    tableStore.changePage(page);
    tableStore.handleDataSource(controlStore.controlData);
  }

  const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    const columnKey = (sorter.order && sorter.columnKey) || '';
    const order = sorter.order || false;

    tableStore.setSortedInfo({
      columnKey,
      order
    })

    changeCurrent(1);
  }
  
  useEffect(() => {
    changeCurrent(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-white padding-all-16'>
      <Table
        sortDirections={['descend']}
        onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
        expandedRowKeys={tableStore.expandedRowKeys}
        expandIconColumnIndex={-1}
        loading={tableStore.loading}
        rowKey='id'
        onRow={record => {
          return {
            onDoubleClick: () => {
              handleExpandedRowKeys(record);
            }
          };
        }}
        expandable={{
          expandedRowRender (record: I_DataSource) {
            return (
              <>
                {isExpanded(record) && <RChildTable parentRecord={record} />}
              </>
            )
          }
          // rowExpandable: record => !!record,
        }}
        columns={columns}
        dataSource={tableStore.dataSource}
        bordered
        size='small'
        pagination={false}
      />
      <div className='padding-all-12' flex='main:right'>
        <Pagination
          size='default'
          total={tableStore.total}
          current={tableStore.page}
          pageSize={tableStore.pageSize}
          showTotal={(total, range) => `共${total}条（${range[0]}条-${range[1]}条） `}
          hideOnSinglePage
          showQuickJumper
          showSizeChanger={false}
          onChange={(current: number) => changeCurrent(current)}
        />
      </div>
    </div>
  );
}

export default observer(RTable);
