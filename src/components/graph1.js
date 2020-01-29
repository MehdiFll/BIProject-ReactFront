import React, { Component } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';
import GridLayout from 'react-grid-layout';
import axios from 'axios';
import WordCloud from "react-d3-cloud";
import randomColor from "randomcolor";
import {Chart} from 'primereact/chart';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
export class Graph1 extends Component {

  constructor() {
    super();
    this.state = { articlesperCountry: [], wordcount: [], articlesperYear: []};


  };

  componentDidMount() {
    axios.get('/articles/country', {
    }).then(response => {
      console.log(response);

      this.setState({
        articlesperCountry: response.data,
      })
    }).catch(error => {
      console.log(error);
    });

    axios.get('/articles/year', {
    }).then(response => {
      console.log(response);

      this.setState({
        articlesperYear: response.data,
      })
    }).catch(error => {
      console.log(error);
    })

    axios.get('/wordscount', {
    }).then(response => {
      console.log(response);

      this.setState({
        wordcount: response.data,
      })
    }).catch(error => {
      console.log(error);
    })


  }


  render() {

    const fontSizeMapper = word => Math.log2(word.value) * 5;

  
const data = [];
    this.state.wordcount.forEach(element => {
      data.push({ text: element._1, value: element._2 * 5 });
    });
    
    const data2 = {
      datasets: [{
          data: [],
          backgroundColor: [
           
        ],
        hoverBackgroundColor: [
        
        ]
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
      ]
  };
    this.state.articlesperCountry.forEach(element => {
      data2.labels.push(element._1);
      data2.datasets[0].data.push(element._2);
      const rc = randomColor();
      data2.datasets[0].backgroundColor.push(rc);
      data2.datasets[0].hoverBackgroundColor.push(rc);



    });


   
    this.state.articlesperYear.sort(function (a, b) {
      return parseInt(a._1) - parseInt(b._1)
    }

    );


    const data3 = [];
    this.state.articlesperYear.forEach(element => {
      data3.push({ year: element._1, nbrofarticles: element._2 });
    });




    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${name}`}
        </text>
      );
    };
    return (
        <div>
        <center>
        <div>
      <h3>Word cloud</h3>
      <h5>Occurence des mots dans les résumés des articles</h5>
      <WordCloud data={data} fontSizeMapper={fontSizeMapper} />
        </div>
          <div>
      <h3>Pie chart</h3>
      <h5>Distribution des articles publié par pays</h5>
      <div className="content-section implementation">
                    <Chart type="pie" data={data2} />
                </div>
        </div>
         


          <div>
            <br/>
            <br/>
            <br/>
            <br/>
      <h3>Line chart</h3>
      <h5>Représentation linéaire du développement de nombres des articles par année </h5>
      <LineChart
            width={800}
            height={500}
            data={data3}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="nbrofarticles" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
       


          </center>
        </div>
    );
  }
}