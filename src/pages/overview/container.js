﻿import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import '../../common/containerConfig';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/breadcrumb';
import 'flarej/lib/components/antd/table';
import 'flarej/lib/components/antd/pagination';
import { Message } from 'flarej/lib/components/antd/message';
import { autobind } from 'core-decorators';
import '../../components/header';
import '../../components/sider';
import ContainerHoc from '../../components/higherOrders/container';
import styles from './overview.m.less';
import tmpls from './overview.t.html';
import OverviewStore from '../../stores/OverviewStore';
const overviewStore = new OverviewStore();

//页面容器组件
@inject('store')
@observer
class Container extends Component {
  componentDidMount() {
    // console.log(overviewStore);
    // const closeLoading = Message.loading('正在加载数据...', 0);
    // this.props.store.getTableData(1, this.props.store.pageSize).then(() => closeLoading());
  }

  render() {
    const { store } = this.props;
    console.log(this, this.props, store);
    return this.props.tmpls[0](this, {
      styles,
      store
    });
  }
}
ContainerHoc('Container', Container, overviewStore); 

@registerTmpl('DataTable')
@inject('store')
@observer
class DataTable extends Component {
  @observable tabObj = [{
    id: 1, title: '区块高度', data: 2 , background: '#0DB18C', url: '../../../resources/images/user.png'
  },{
    id: 2, title: '交易总数', data: 32134 , background: '#10A647', url: '../../../resources/images/user.png'
  },{
    id: 3, title: '用户总数', data: 34 , background: '#037CC1', url: '../../../resources/images/user.png'
  },{
    id: 4, title: '数据账户总数', data: 451 , background: '#5A77D2', url: '../../../resources/images/user.png'
  },{
    id: 5, title: '合约总数', data: 32 , background: '#3C4C9C', url: '../../../resources/images/user.png'
  }];  
  @observable pageIndex = 0;
  state = {
    columns: [{
      title: '测试1',
      dataIndex: 'test1',
      key: 'test1',
    }, {
      title: '测试2',
      dataIndex: 'test2',
      key: 'test2',
    }, {
      title: '测试3',
      dataIndex: 'test3',
      key: 'test3',
      children: [{
        title: '测试4',
        dataIndex: 'test4',
        key: 'test4',
      }, {
        title: '测试5',
        dataIndex: 'test5',
        key: 'test5',
      }, {
        title: '测试6',
        dataIndex: 'test6',
        key: 'test6',
      }]
    }, {
      title: '测试7',
      dataIndex: 'test7',
      key: 'test7',
      children: [{
        title: '测试8',
        dataIndex: 'test8',
        key: 'test8',
      }, {
        title: '测试9',
        dataIndex: 'test9',
        key: 'test9',
      }, {
        title: '测试10',
        dataIndex: 'test10',
        key: 'test10',
      }, {
        title: '测试11',
        dataIndex: 'test11',
        key: 'test11',
      }, {
        title: '测试12',
        dataIndex: 'test12',
        key: 'test12',
      }]
    }, {
      title: '测试13',
      dataIndex: 'test13',
      key: 'test13',
      children: [{
        title: '测试14',
        dataIndex: 'test14',
        key: 'test14',
      }, {
        title: '测试15',
        dataIndex: 'test15',
        key: 'test15',
      }, {
        title: '测试16',
        dataIndex: 'test16',
        key: 'test16',
      }, {
        title: '测试17',
        dataIndex: 'test17',
        key: 'test17',
      }, {
        title: '测试18',
        dataIndex: 'test18',
        key: 'test18',
      }]
    }]
  };

  // itemRender = (current, type, originalElement) => {
  //   if (type === 'prev') {
  //     return <a>{`<上一页`}</a>;
  //   } if (type === 'next') {
  //     return <a>{`下一页>`}</a>;
  //   }
  //   return originalElement;
  // }

  // @page: 页码----->number类型
  handlePageChange = (page) => {
    console.log(page);
    this.pageIndex = page - 1;
    console.log(`当前页码为:${page}, 实际为第${this.pageIndex}页`);
  }

  @autobind
  onPageChange(page, pageSize) {
    const closeLoading = Message.loading('正在加载数据...', 0);
    this.props.store.getTableData(page, pageSize).then(() => closeLoading());
  }

  render() {
    return tmpls.dataTable(this.state, this.props, this, {
      styles
    });
  }
}

if (module.hot) {
  module.hot.accept();
  njr.renderTmplTag({ target: '#container' });
}