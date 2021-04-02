import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import { Table, Pagination, Button, Tooltip, TablePaginationConfig } from 'antd';
import { InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { I_ChildDataSource } from './types';
import { I_DataSource, I_SortedInfo } from '../../store/table/types';
import { moneyFormat } from '@/utils';
import { getChannelApp } from '@/apis/check';
import { I_getChannelApp } from '@/apis/check/types';
import { M_Third_settlement_bill_status, M_Third_settlement_flow_status, E_Third_settlement_bill_status, E_Third_settlement_flow_status } from '../../maps/common';
interface I_Props {
  parentRecord: I_DataSource
}

const RChildTable: FC<I_Props> = ({ parentRecord }) => {
  const [childDataSource, setChildDataSource] = useState<I_ChildDataSource[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<I_SortedInfo>({
    columnKey: '',
    order: false
  });

  const pageSize = useRef<number>(15);
  
  const isComplete = (record: I_ChildDataSource) => {
    return record.third_settlement_flow_status === E_Third_settlement_flow_status.complete && 
          record.third_settlement_bill_status === E_Third_settlement_bill_status.complete
  }

  const columns: any = [

    {
      title: '部门',
      key: 'department',
      render (text: unknown, record: I_ChildDataSource) {
        return (
          <div style={{ minWidth: 30 }}>
            {record.department}
          </div>
        )
      }
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='财务为便捷地区分游戏而填写的备注（原游戏大类）'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>财务游戏备注</span>
          </Tooltip>
        </div>
      ),
      key: 'financial_remark',
      dataIndex: 'financial_remark'
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
      render (text: unknown, record: I_ChildDataSource) {
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
      render (text: unknown, record: I_ChildDataSource) {
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
      render (text: unknown, record: I_ChildDataSource) {
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
      sortOrder: sortedInfo.columnKey === 'error_settlement_flow' && sortedInfo.order,
      render (text: unknown, record: I_ChildDataSource) {
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
      sortOrder: sortedInfo.columnKey === 'error_settlement_per' && sortedInfo.order,
      render (text: unknown, record: I_ChildDataSource) {
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
      fixed: 'right',
      render (text: unknown, record: I_ChildDataSource) {
        return (
          <div className='ant-btn-no-padding'>
            <Button type='link'>
              下载差错流水
            </Button>
          </div>
        )
      }
    }
  ];

  const getColumns = () => {
    if (parentRecord.channel_type === '直充') {
      return columns;
    }
    const newColumns = [...columns];
    newColumns.splice(1, 0, {
      title: (
        <div>
          <Tooltip placement='topLeft' title='三方渠道提供的，在三方后台标识应用唯一的ID'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>三方应用ID</span>
          </Tooltip>
        </div>
      ),
      key: 'third_app_id',
      dataIndex: 'third_app_id'
    },
    {
      title: (
        <div>
          <Tooltip placement='topLeft' title='三方渠道后台显示的游戏主体名称'>
            <InfoCircleOutlined className='color-black-9' />
            <span className='padding-left-4'>三方应用名</span>
          </Tooltip>
        </div>
      ),
      key: 'third_app_name',
      dataIndex: 'third_app_name'
    })
    return newColumns;
  }
  
  const handleChildDataSource = useCallback(() => {
    setLoading(true);
    const params: I_getChannelApp = {
      page,
      task_id: parentRecord.task_id
    }
    if (sortedInfo.order) {
      params.order_by = `${sortedInfo.columnKey} desc`
    }
    getChannelApp(params).then((data: any) => {
      setTotal(data.page.rcount || 0);
      setChildDataSource(data.list || []);
      setLoading(false);
    });
    
  }, [page, sortedInfo, parentRecord.task_id])

  const changeCurrent = (page: number) => {
    setPage(page);
  }

  const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {

    const columnKey = (sorter.order && sorter.columnKey) || '';
    const order = sorter.order || false;

    setSortedInfo({
      columnKey,
      order
    })
    changeCurrent(1);
  }

  useEffect(() => {
    handleChildDataSource();
  }, [handleChildDataSource])

  return (
    <div className='padding-all-4'>
      <Table
        onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
        sortDirections={['descend']}
        loading={loading}
        rowKey='id'
        columns={getColumns()}
        dataSource={childDataSource}
        bordered
        size='small'
        pagination={false}
      />
      <div className='padding-all-12' flex='main:right'>
        <Pagination
          size='small'
          total={total}
          current={page}
          pageSize={pageSize.current}
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

export default RChildTable;
