import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../App.css'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Trend = ({ setPollStationOpen, dataUpdated }) => {
  const [votes, setVotes] = useState([]);
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNumber = 1) => {
    try {
      const result = await axios.get(`http://localhost:8080/data?page=${pageNumber}&limit=5`);
      const newVotes = result.data.data;

      if (newVotes.length === 0) {
        setHasMore(false);
        return;
      }

      setVotes(prevVotes => [...prevVotes, ...newVotes]);

      const allVotes = [...votes, ...newVotes];

      const aggregatedData = allVotes.reduce((acc, vote) => {
        const date = vote.casted_at.split('T')[0];
        if (!acc[date]) {
          acc[date] = { yes: 0, no: 0 };
        }
        if (vote.voting_choice) {
          acc[date].yes += 1;
        } else {
          acc[date].no += 1;
        }
        return acc;
      }, {});

      const labels = Object.keys(aggregatedData).sort();
      const yesData = labels.map(date => aggregatedData[date].yes);
      const noData = labels.map(date => aggregatedData[date].no);

      setLineData({
        labels,
        datasets: [
          {
            label: 'Yes',
            data: yesData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'No',
            data: noData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [dataUpdated]); 

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  return (
    <div className="trend-container">
      <Paper className="table-container">
        <Typography variant="h6" component="h2">
          <h1>Voter Participation Record</h1>
        </Typography>
        <InfiniteScroll
          dataLength={votes.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}>No more votes to show.</p>}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Voting Choice</TableCell>
                <TableCell>Date of Submission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {votes.map((vote) => (
                <TableRow key={vote.id}>
                  <TableCell>{vote.name}</TableCell>
                  <TableCell>{vote.voting_choice ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{vote.casted_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </Paper>
      <div className="button-container">
        <Button variant="contained" color="primary" onClick={() => setPollStationOpen(true)}>
          Cast Vote
        </Button>
      </div>
      <h1 data-testid="data-visualization-title">DATA VISUALIZATION</h1>
      <Line 
        data={lineData} 
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',  
            },
            title: {
              display: true,
              text: 'Line Graph: Count Vs Casted At',
              font: {
                size: 20,
                weight: 'bold'
              },
              color: 'black'
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date of Submission',
                font: {
                  size: 16,
                  weight: 'bold'
                },
                color: 'black'
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Votes',
                font: {
                  size: 16,
                  weight: 'bold'
                },
                color: 'black'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1, 
              },
            },
          },
        }} 
        data-testid="line-chart" 
      />
    </div>
  );
};

export default Trend;
