/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Rectangle,
} from 'recharts';

const initialData = [
  { name: 1, value: 4.11 },
  { name: 2, value: 2.39 },
  { name: 3, value: 1.37 },
  { name: 4, value: 6.11 },
  { name: 5, value: 1.39 },
  { name: 6, value: 8.37 },
  { name: 7, value: 3.11 },
  { name: 8, value: 2.39 },
  { name: 9, value: 5.37 },
  { name: 10, value: 8.11 },
  { name: 11, value: 2.39 },
  { name: 12, value: 1.37 },
  { name: 13, value: 10.11 },
  { name: 14, value: 6.39 },
  { name: 15, value: 12.37 },
  { name: 16, value: 4.11 },
  { name: 17, value: 20.39 },
  { name: 18, value: 1.37 },
  { name: 19, value: 4.11 },
  { name: 20, value: 2.39 },
  { name: 21, value: 1.37 },
  { name: 22, value: 4.11 },
  { name: 23, value: 2.39 },
  { name: 24, value: 1.37 },
  // Add more data points
];

const Demonstration2 = () => {
    const initialState = {
        data: initialData,
        left: 0, // Adjust this value to set the initial left boundary
        right: initialData.length - 1, // Adjust this value to set the initial right boundary
        refAreaLeft: '',
        refAreaRight: '',
      };

      const [xScale, setXScale] = useState(null); // Initialize xScale as null
      const [scaleValue ,setScaleValue] = useState(null);
      const [scaleValueY,setScaleValueY] = useState(null)
      const [yScale, setYScale] = useState(null);
      const [chartRealAxixValue ,setChartRealAxisVal] = useState(null)

      const [yAxisDomain ,setYAxisDomain] = useState(["auto","auto"])

      const [tempActiveLabel , setTempActiveLabel] = useState(null)
      
      const [filteredData, setFilteredData] = useState(initialState.data);
      // Calculate xScale based on your data when it changes
      useEffect(() => {
        if (filteredData.length > 0) {
            const xValues = filteredData.map((entry) => entry.name);
            const xMin = Math.min(...xValues);
            const xMax = Math.max(...xValues);
            const chartWidth = 800; // Adjust based on your chart's width
        
            // Calculate the xScale based on the chart's width and x-axis domain
            const scaleX = (x) => (x - xMin) / (xMax - xMin) * chartWidth;
            setScaleValue([xMin,xMax]) // updated x domains
            // setXScale(scaleX);
          
            const yValues = filteredData.map((entry) => entry.value);
            const yMin = Math.min(...yValues);
            const yMax = Math.max(...yValues);
            const chartHeight = 400; // Adjust based on your chart's height

            // Calculate the yScale based on the chart's height and y-axis domain
            const scaleY = (y) => chartHeight - (y - yMin) / (yMax - yMin) * chartHeight;
            setScaleValueY([yMin,yMax])
            // setYScale(scaleY);
        }
      }, [filteredData]);
    
        const MIN_ZOOM = 1; // adjust based on your data
        const DEFAULT_ZOOM = { x1: null, y1: null, x2: null, y2: null };
        const [zoomArea, setZoomArea] = useState(DEFAULT_ZOOM);
        const [isZooming, setIsZooming] = useState(false);
        // const isZoomed = filteredData?.length !== data?.length;

        const showZoomBox =
                isZooming 
                // &&
                // !(Math.abs(zoomArea.x1 - zoomArea.x2) < MIN_ZOOM) &&
                // !(Math.abs(zoomArea.y1 - zoomArea.y2) < MIN_ZOOM);
    
        const [state, setState] = useState(initialState);

  const zoom = () => {
    const { refAreaLeft, refAreaRight } = state;
    console.log(state.left,state.right)
    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setState((prevState) => ({
        ...prevState,
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      refAreaLeft: '',
      refAreaRight: '',
      left: Math.floor(refAreaLeft),
      right: Math.floor(refAreaRight),
    }));
  };

  const { data, left, right, refAreaLeft, refAreaRight } = state;

  
  return (
    <div className="zoomable-area-chart" style={{userSelect:'none'}}>
      <button type="button" className="btn update" onClick={() => {
        setFilteredData(initialState.data)
        setYAxisDomain(['auto','auto'])
      }}>
        Reset Zoom
      </button>
      <AreaChart
        width={800}
        height={400}
        data={filteredData}
        onMouseDown={(e) =>{
            const cursorX = e.chartX; // Get the X-coordinate of the cursor within the chart.
            const cursorY = e.chartY; // Get the Y-coordinate of the cursor within the chart.

            setChartRealAxisVal([cursorX,cursorY])
            setTempActiveLabel({l:e.activeLabel,r:null}) // sets x1 and x2 initial values for ref area.

            const xAxisValue = (cursorX / 800) * (scaleValue[1] - scaleValue[0]) + scaleValue[0]; 
            const yAxisValue = scaleValueY[1] - (cursorY / 400) * (scaleValueY[1] - scaleValueY[0]);
            console.log(xAxisValue,yAxisValue)
            console.log(cursorX,cursorY)
            setIsZooming(true)
            console.log(e)
            setZoomArea({ 
                        x1: xAxisValue, 
                        y1: yAxisValue, 
                        x2: xAxisValue,
                        y2: yAxisValue
                    });
        }
        }
        onMouseMove={(e) => {
        setTempActiveLabel(p=>({...p, r :e.activeLabel}))
            const cursorX = e.chartX; // Get the X-coordinate of the cursor within the chart
            const xAxisValue = (cursorX / 800) * (scaleValue[1] - scaleValue[0]) + scaleValue[0]; 
            const yAxisValue = scaleValueY[1] - (e.chartY / 400) * (scaleValueY[1] - scaleValueY[0]);
            // console.log(xAxisValue,yAxisValue)
            if(isZooming){
                setZoomArea((prev) => ({ 
                    ...prev, 
                    x2: xAxisValue,
                    y1: yAxisValue - 2.25
                }));
            }
        }}
        onMouseUp={()=>{
            console.log(zoomArea)
            if (isZooming) {
                setIsZooming(false);
                let { x1, y1, x2, y2 } = zoomArea;
          
                // ensure x1 <= x2 and y1 <= y2
                if (x1 > x2) [x1, x2] = [x2, x1];
                if (y1 > y2) [y1, y2] = [y2, y1];
          
                if (x2 - x1 < MIN_ZOOM || y2 - y1 < MIN_ZOOM) {
                  // console.log("zoom cancel");
                } else {
                  // console.log("zoom stop");
                  const dataPointsInRange = filteredData.filter(
                    (d) => d.name >= tempActiveLabel.l && d.name <= tempActiveLabel.r ) ;
                        setFilteredData(dataPointsInRange);
                        setZoomArea(DEFAULT_ZOOM);
                }
              }
              setYAxisDomain([zoomArea.y2,zoomArea.y1])
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" domain={[left,right]} allowDataOverflow />
        <YAxis allowDataOverflow domain={[yAxisDomain[1],yAxisDomain[0]]}/>
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        {showZoomBox && (
          
          <ReferenceArea
            fill='red'
            x1={tempActiveLabel.l}
            x2={tempActiveLabel.r}
            y1={zoomArea?.y1}
            y2={zoomArea?.y2}
            opacity={0.3}
          />
        )}
      </AreaChart>
    </div>
  );
};

export default Demonstration2;
