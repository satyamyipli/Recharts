import { ComposedChart,Area,CartesianGrid,YAxis,Line,Legend, XAxis, ReferenceArea } from "recharts";
import { useEffect, useState } from "react";

export function DemonstrationWithPatternSeries (){
    // Helpers to fill data
    const getTimeStamp = (val) => {
        let dateStr = new Date(val);
        let timeStamp = dateStr.getTime();
        return (timeStamp);
    };
    
    const getAreaRange = (val) => {
    let [a, b] = [val.yhat_lower, val.yhat_upper];
    return [a, b];
    };
    
    const getLineValues = (val) => {
    if (val.anomaly === "False") {
        return val.y;
    }
    };
    
    const getAnamolyPt = (val) => val["y"];
    // Preparing data to feed into charts
    const data = res.map((d) => {
        if (d.result.anomaly === "False") {
          return {
            ts: getTimeStamp(d.timestamp),
            range: getAreaRange(d.result),
            line: getLineValues(d.result),
          };
        } else {
          return {
            ts: getTimeStamp(d.timestamp),
            range: getAreaRange(d.result),
            line: getLineValues(d.result),
            anamoly: getAnamolyPt(d.result),
          };
        }
    });

    const getTopY = () => {
        const res1 = filteredData.filter(e => e.line!== undefined  ).map(e=>e.line)
        const res2 = filteredData.filter(e =>  e.range[1] !== undefined).map(e=>e.range[1])
        const res = [...res1 ,...res2]
        return Math.max(...res);
    }
    const getBottomY = () =>{
        const res1 = filteredData.filter(e => e.line!== undefined  ).map(e=>e.line)
        const res2 = filteredData.filter(e =>  e.range[1] !== undefined).map(e=>e.range[0])
        const res = [...res1 ,...res2]
        return Math.max(...res);
    }

    const [filteredData , setFilteredData] = useState(data);
    const XAxisLeft = data[0].ts; // 1690000000 format
    const XaxisRight =data[data.length- 1].ts;
    
    const [yBounds, setYbounds] = useState([getTopY(),getBottomY()]); // can be used on Yaxis domain.
    const [xBounds, setXbounds] = useState([XAxisLeft,XaxisRight]) // can be used on Xaxis domain.
    
    const [activeLabel ,setActiveLabel] = useState({l : "", r : ""}) // captures current activelabels (X-axis)
    
    const [XaxisDomains, setXAxisDomain] = useState([XAxisLeft,XaxisRight])
    const [YAxisDomains, setYAxisDomain] = useState(yBounds)
    
    const initialState = {
        left: XaxisDomains[0], // Adjust this value to set the initial left boundary
        right: XaxisDomains[1], // Adjust this value to set the initial right boundary
        refAreaLeft: '',
        refAreaRight: '',
      };
    
    // Drag Area Selection block
    const MIN_ZOOM = 1; // adjust based on your data
        const DEFAULT_ZOOM = { x1: null, y1: null, x2: null, y2: null };
        const [zoomArea, setZoomArea] = useState(DEFAULT_ZOOM);
        const [isZooming, setIsZooming] = useState(false);
        // const isZoomed = filteredData?.length !== data?.length;


      // Mouse Handlers functions :
      const handleMouseDown = (e) => {
        // console.log(e)
        const cursorX = e.chartX; // Get the X-coordinate of the cursor within the chart.
        const cursorY = e.chartY; // Get the Y-coordinate of the cursor within the chart.

        setActiveLabel({l:e.activeLabel,r:null})
        // console.log(yValue) ;
        
        // setChartRealAxisVal([cursorX,cursorY])
        // setTempActiveLabel({l:e.activeLabel,r:null}) // sets x1 and x2 initial values for ref area.

        const xAxisValue = (cursorX / 800) * (xBounds[1] - xBounds[0]) + xBounds[0]; 
        const yAxisValue = yBounds[1] - (cursorY / 400) * (yBounds[1] - yBounds[0]);
        // console.log(xAxisValue,yAxisValue)
        // console.log(cursorX,cursorY)
        setIsZooming(true)
        setZoomArea({ 
                    x1: xAxisValue, 
                    y1: yAxisValue, 
                    x2: xAxisValue,
                    y2: yAxisValue
                });
        };

      const handleMouseMove = (e) => {
          // console.log(e.chartY)
          if(isZooming){
                const xAxisValue = (e.chartX / 800) * (xBounds[1] - xBounds[0]) + xBounds[0];
                const yAxisValue = yBounds[1] - (e.chartY / 400) * (yBounds[1] - yBounds[0]);
                setActiveLabel(p=>({...p,r :e.activeLabel}))
                setZoomArea((prev) => ({ 
                    ...prev, 
                    x2: xAxisValue,
                    y1: yAxisValue
                }));
            }
        };

      const handleMouseUp = (e) => {
        setIsZooming(false)
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
                (d) => getTimeStamp(d.ts) >= x1 && getTimeStamp(d.ts) <= x2 
              );
              setFilteredData(dataPointsInRange);
              setZoomArea(DEFAULT_ZOOM);
              setXAxisDomain([zoomArea.x1,zoomArea.x2])
            }
          }
      };
    
// useEffect(()=>{
//     if (filteredData.length > 0) {
//         const xValues = filteredData.map((entry) => getTimeStamp(entry.ts));
//     }
   
//     // console.log(YAxisDomains)
// },[])
    return(
        <div style={{userSelect:'none'}}>
            <ComposedChart 
            width={800}
            height={400}
            data={filteredData}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <CartesianGrid vertical = {false}/>
            <YAxis />
            <XAxis domain={XaxisDomains} dataKey="ts" allowDataOverflow/>
            <Area dataKey="range" fill="lightblue" type="monotone" />
            <Line dataKey="line" stroke="black" type="monotone"/>
            <Line dataKey="anomaly" />
            
            {
                isZooming && <ReferenceArea 
                    fill='red'
                    x1={activeLabel.l} 
                    x2={activeLabel.r}
                    y1={zoomArea.y1}
                    y2={zoomArea.y2}
                    opacity={0.3}
                />
            }

        </ComposedChart>
        </div>
    )


}


const res = [
    {
        "timestamp": "2023-09-11T00:00:00.000Z",
        "result": {
            "y": 46,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 138.51484623123855
        }
    },
    {
        "timestamp": "2023-09-11T01:00:00.000Z",
        "result": {
            "y": 80,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 110.69283854820785
        }
    },
    {
        "timestamp": "2023-09-11T02:00:00.000Z",
        "result": {
            "y": 105,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 126.45918281050255
        }
    },
    {
        "timestamp": "2023-09-11T03:00:00.000Z",
        "result": {
            "y": 42,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 123.74726095027572
        }
    },
    {
        "timestamp": "2023-09-11T04:00:00.000Z",
        "result": {
            "y": 17,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 86.61107130392193
        }
    },
    {
        "timestamp": "2023-09-11T05:00:00.000Z",
        "result": {
            "y": 40,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 77.04856079390629
        }
    },
    {
        "timestamp": "2023-09-11T06:00:00.000Z",
        "result": {
            "y": 51,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 124.4847727134277
        }
    },
    {
        "timestamp": "2023-09-11T07:00:00.000Z",
        "result": {
            "y": 62,
            "anomaly": "False",
            "yhat_lower": 2.356945021282499,
            "yhat_upper": 156.8149769762204
        }
    },
    {
        "timestamp": "2023-09-11T08:00:00.000Z",
        "result": {
            "y": 73,
            "anomaly": "False",
            "yhat_lower": 4.126260405121542,
            "yhat_upper": 168.17651655358657
        }
    },
    {
        "timestamp": "2023-09-11T09:00:00.000Z",
        "result": {
            "y": 89,
            "anomaly": "False",
            "yhat_lower": 2.138715438319892,
            "yhat_upper": 169.58573860065803
        }
    },
    {
        "timestamp": "2023-09-11T10:00:00.000Z",
        "result": {
            "y": 58,
            "anomaly": "False",
            "yhat_lower": 9.968565130064974,
            "yhat_upper": 169.0221629294317
        }
    },
    {
        "timestamp": "2023-09-11T11:00:00.000Z",
        "result": {
            "y": 63,
            "anomaly": "False",
            "yhat_lower": 1.3199579137756243,
            "yhat_upper": 153.94096372116024
        }
    },
    {
        "timestamp": "2023-09-11T12:00:00.000Z",
        "result": {
            "y": 67,
            "anomaly": "False",
            "yhat_lower": 7.390072506165708,
            "yhat_upper": 180.1315317032267
        }
    },
    {
        "timestamp": "2023-09-11T13:00:00.000Z",
        "result": {
            "y": 120,
            "anomaly": "False",
            "yhat_lower": 8.65598784052763,
            "yhat_upper": 185.33989344770288
        }
    },
    {
        "timestamp": "2023-09-11T14:00:00.000Z",
        "result": {
            "y": 78,
            "anomaly": "False",
            "yhat_lower": 20.094171178248388,
            "yhat_upper": 200.5652860104783
        }
    },
    {
        "timestamp": "2023-09-11T15:00:00.000Z",
        "result": {
            "y": 42,
            "anomaly": "False",
            "yhat_lower": 3.2166854046185307,
            "yhat_upper": 155.47011236890933
        }
    },
    {
        "timestamp": "2023-09-11T16:00:00.000Z",
        "result": {
            "y": 37,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 122.0849825940066
        }
    },
    {
        "timestamp": "2023-09-11T17:00:00.000Z",
        "result": {
            "y": 51,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 121.1073847071196
        }
    },
    {
        "timestamp": "2023-09-11T18:00:00.000Z",
        "result": {
            "y": 79,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 134.18198623905414
        }
    },
    {
        "timestamp": "2023-09-11T19:00:00.000Z",
        "result": {
            "y": 153,
            "anomaly": "False",
            "yhat_lower": 4.0587547885248085,
            "yhat_upper": 165.6093271689952
        }
    },
    {
        "timestamp": "2023-09-11T20:00:00.000Z",
        "result": {
            "y": 89,
            "anomaly": "False",
            "yhat_lower": 13.037053621402166,
            "yhat_upper": 192.01751370283117
        }
    },
    {
        "timestamp": "2023-09-11T21:00:00.000Z",
        "result": {
            "y": 52,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 119.13568559651556
        }
    },
    {
        "timestamp": "2023-09-11T22:00:00.000Z",
        "result": {
            "y": 70,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 101.51530143057244
        }
    },
    {
        "timestamp": "2023-09-11T23:00:00.000Z",
        "result": {
            "y": 108,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 133.01550099787696
        }
    },
    {
        "timestamp": "2023-09-12T00:00:00.000Z",
        "result": {
            "y": 160,
            "anomaly": "True",
            "yhat_lower": 0.01,
            "yhat_upper": 145.9970794140363
        }
    }
]