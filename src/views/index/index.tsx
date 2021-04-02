import React, { FC, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import HeaderBar from '@/components/layouts/HearderBar';
import SideBar from '@/components/layouts/sideBar';
import IndexStyle from './styles/index.module.scss';
import classNames from 'classnames/bind';
import { useScrollTop } from '@/hooks'
import { Layout } from 'antd';

const { Content } = Layout;
const ClassNames = classNames.bind(IndexStyle);

const Index: FC<RouteComponentProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useScrollTop(() => {
    contentRef.current?.scrollTo(0, 0);
  });
  const IndexContent = (children: React.ReactNode) => {
    return (
      <Layout className={ClassNames('index__Layout__outer')}>
        <SideBar />
        <Layout className={ClassNames('index__Layout__outer')}>
          <HeaderBar />
          <Content className={ClassNames('index__Layout__inner')}>
            <div ref={contentRef} className={ClassNames('index__Layout__content')}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
  return (
    <>
      {IndexContent(children)}
    </>
  );
}

export default Index;
