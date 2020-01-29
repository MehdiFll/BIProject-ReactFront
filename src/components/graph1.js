import React, { Component } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';
import GridLayout from 'react-grid-layout';
import axios from 'axios';
import WordCloud from "react-d3-cloud";
import randomColor from "randomcolor";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
export class Graph1 extends Component {

    constructor() {
        super();
        this.state = { articlesperCountry: [] ,wordcount : [], articlesperYear : [] };

        
    };

    componentWillMount() {
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
       
          var layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 5, y: 1, w: 5, h: 5},
            {i: 'c', x: 10, y: 2, w: 1, h: 2}
          ];
          const data = [
          ];
          
          this.state.wordcount.forEach(element => {
          data.push({text:element._1, value : element._2*5});        
          });
          const data2 = [
          ];
          this.state.articlesperCountry.forEach(element => {
            data2.push({name:element._1, value : element._2});        
            });
          

            this.state.articlesperYear.sort(function(a, b){
              return parseInt(a._1)-parseInt(b._1)
            }
              );
          



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

            <GridLayout className="layout" layout={layout} cols={10} rowHeight={30} width={1200}>
            <div key="a">
            <WordCloud data={data} fontSizeMapper={fontSizeMapper}  />

            </div>
            <div key="b">
            <PieChart width={500} height={500}>
        <Pie
          data={data2}
          cx={200}
          cy={200}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={randomColor()} />)
          }
        </Pie>
      </PieChart>
            </div>
            <div key="c">
            <LineChart
        width={500}
        height={300}
        data={this.state.articlesperYear}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_1" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="_2" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>


              
            </div>
          </GridLayout>
        );
    }
}