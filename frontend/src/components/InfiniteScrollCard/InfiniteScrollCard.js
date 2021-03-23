import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from 'src/components/GameCard/GameCard';
import styles from './InfiniteScrollCard.module.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Card } from '@material-ui/core';

export default function InfiniteScrollCard() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.

  // const [items, setItems] = useState(Array.from({ length: 20 }));
  const [items, setItems] = useState(new Array());
  const [pageNum, setPageNum] = useState(1);
  const [size, setSize] = useState(20);
  const [isEnd, setIsEnd] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const gameInfo = {
    appName: 'title',
    isJoined: false,
    isOwned: true,
    image: {
      logoImage: {
        id: 1,
        path: 'https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp',
      },
      backgroundImage: {
        id: 1,
        path: 'https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp',
      },
    },
    suitedRate: 77.7,
    totalJoin: 123456,
  };

  const fetchData = () => {
    //TODO: change
    setIsFetching(true);
    axios
      .get(`https://api.openbrewerydb.org/breweries?page=${pageNum}&per_page=${size}`)
      .then((res) => {
        //updating data
        let gameInfos = new Array();
        for (let i = 0; i < 20; ++i) gameInfos.push(gameInfo);
        setItems([...items, ...gameInfos]);
        //updating page numbers
        setPageNum(pageNum + 1);
        setIsFetching(false);
      });
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 1 && isFetching === false && !isEnd) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchData();
    }
  };

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제

      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  return (
    // <div>aa</div>
    <Container maxWidth="lg" spacing={4}>
      <Grid container spacing={4}>
        {items.map((item, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <GameCard isLogin={true} gameInfo={item}></GameCard>
          </Grid>
        ))}
      </Grid>
      {isFetching ? <h3>데이터를 가져오는 중입니다.</h3> : null}
    </Container>
  );
}
