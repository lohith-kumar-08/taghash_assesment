import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';

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

  const fetchData = async () => {
    const result = await axios.get('http://localhost:8080/data');
    const allVotes = result.data.data;
    setVotes(allVotes);

    // Aggregate data by date
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
    const yesData = labels?.map(date => aggregatedData[date].yes);
    const noData = labels?.map(date => aggregatedData[date].no);

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
        }
      ]
    });
  };

  useEffect(() => {
    fetchData();
  }, [dataUpdated]); 

  return (
    <div className="trend-container">
      <Paper className="table-container">
        <Typography variant="h6" component="h2">
            <h1>Voter Participation Record</h1>  
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Voting Choice</TableCell>
              <TableCell>Date of Submission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votes?.map((vote) => (
              <TableRow key={vote.id}>
                <TableCell>{vote.name}</TableCell>
                <TableCell>{vote.voting_choice ? 'Yes' : 'No'}</TableCell>
                <TableCell>{vote.casted_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
  data-testid="line-chart" // Add data-testid attribute
/>

    </div>
  
  );
};

export default Trend;
