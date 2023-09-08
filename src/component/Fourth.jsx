import "../App.css"
import React, { useState } from 'react';
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  Area,
  Line,
  Legend,
  Layer
} from 'recharts';

const res =[
    {
        "timestamp": "2023-09-06T18:00:00.000Z",
        "result": {
            "y": 424601,
            "anomaly": "False",
            "yhat_lower": 53805.40980451566,
            "yhat_upper": 765950.8707903643
        }
    },
    {
        "timestamp": "2023-09-06T19:00:00.000Z",
        "result": {
            "y": 411976,
            "anomaly": "False",
            "yhat_lower": 27129.69367012108,
            "yhat_upper": 790056.5941141804
        }
    },
    {
        "timestamp": "2023-09-06T20:00:00.000Z",
        "result": {
            "y": 344354,
            "anomaly": "False",
            "yhat_lower": 18785.296401777247,
            "yhat_upper": 707942.3491121845
        }
    },
    {
        "timestamp": "2023-09-06T21:00:00.000Z",
        "result": {
            "y": 264841,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 598476.1253670333
        }
    },
    {
        "timestamp": "2023-09-06T22:00:00.000Z",
        "result": {
            "y": 202597,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 460032.11318714434
        }
    },
    {
        "timestamp": "2023-09-06T23:00:00.000Z",
        "result": {
            "y": 154180,
            "anomaly": "False",
            "yhat_lower": 0.01,
            "yhat_upper": 395266.6146814873
        }
    },
    {
        "timestamp": "2023-09-07T00:00:00.000Z",
        "result": {
            "y": 2576989,
            "anomaly": "True",
            "yhat_lower": 0.01,
            "yhat_upper": 426680.8356950211
        }
    },
    {
        "timestamp": "2023-09-07T01:00:00.000Z",
        "result": {
            "y": 2453478,
            "anomaly": "False",
            "yhat_lower": 1539109.0650049224,
            "yhat_upper": 3323188.622440093
        }
    },
    {
        "timestamp": "2023-09-07T02:00:00.000Z",
        "result": {
            "y": 2309544,
            "anomaly": "False",
            "yhat_lower": 1478287.011076894,
            "yhat_upper": 3283160.869028732
        }
    },
    {
        "timestamp": "2023-09-07T03:00:00.000Z",
        "result": {
            "y": 2292354,
            "anomaly": "False",
            "yhat_lower": 1415689.226077489,
            "yhat_upper": 3242461.295868521
        }
    },
    {
        "timestamp": "2023-09-07T04:00:00.000Z",
        "result": {
            "y": 2474928,
            "anomaly": "False",
            "yhat_lower": 1534883.4952458926,
            "yhat_upper": 3262109.4978078315
        }
    },
    {
        "timestamp": "2023-09-07T05:00:00.000Z",
        "result": {
            "y": 2579441,
            "anomaly": "False",
            "yhat_lower": 1703210.763933219,
            "yhat_upper": 3561517.3013397977
        }
    },
    {
        "timestamp": "2023-09-07T06:00:00.000Z",
        "result": {
            "y": 2721806,
            "anomaly": "False",
            "yhat_lower": 1763292.88137589,
            "yhat_upper": 3715212.231377152
        }
    },
    {
        "timestamp": "2023-09-07T07:00:00.000Z",
        "result": {
            "y": 3019127,
            "anomaly": "False",
            "yhat_lower": 1829898.3588451445,
            "yhat_upper": 3834344.6877906704
        }
    },
    {
        "timestamp": "2023-09-07T08:00:00.000Z",
        "result": {
            "y": 3159342,
            "anomaly": "False",
            "yhat_lower": 2056134.1274836247,
            "yhat_upper": 4045972.58989662
        }
    },
    {
        "timestamp": "2023-09-07T09:00:00.000Z",
        "result": {
            "y": 2917772,
            "anomaly": "False",
            "yhat_lower": 2140319.286307996,
            "yhat_upper": 4143008.7879149807
        }
    },
    {
        "timestamp": "2023-09-07T10:00:00.000Z",
        "result": {
            "y": 3257689,
            "anomaly": "False",
            "yhat_lower": 1951846.3280052687,
            "yhat_upper": 3878609.957518573
        }
    },
    {
        "timestamp": "2023-09-07T11:00:00.000Z",
        "result": {
            "y": 3380070,
            "anomaly": "False",
            "yhat_lower": 2203014.98175298,
            "yhat_upper": 4260506.197117747
        }
    },
    {
        "timestamp": "2023-09-07T12:00:00.000Z",
        "result": {
            "y": 3289893,
            "anomaly": "False",
            "yhat_lower": 2310221.1894649165,
            "yhat_upper": 4355405.222615556
        }
    },
    {
        "timestamp": "2023-09-07T13:00:00.000Z",
        "result": {
            "y": 2970561,
            "anomaly": "False",
            "yhat_lower": 2173339.2857082714,
            "yhat_upper": 4260133.602527189
        }
    },
    {
        "timestamp": "2023-09-07T14:00:00.000Z",
        "result": {
            "y": 2725752,
            "anomaly": "False",
            "yhat_lower": 1905348.904816915,
            "yhat_upper": 3896092.081167576
        }
    },
    {
        "timestamp": "2023-09-07T15:00:00.000Z",
        "result": {
            "y": 2608528,
            "anomaly": "False",
            "yhat_lower": 1734924.5381142772,
            "yhat_upper": 3637126.8500033976
        }
    },
    {
        "timestamp": "2023-09-07T16:00:00.000Z",
        "result": {
            "y": 2561427,
            "anomaly": "False",
            "yhat_lower": 1666331.573872805,
            "yhat_upper": 3564434.0949237915
        }
    },
    {
        "timestamp": "2023-09-07T17:00:00.000Z",
        "result": {
            "y": 1964884,
            "anomaly": "False",
            "yhat_lower": 1674604.4562324854,
            "yhat_upper": 3530666.2528587664
        }
    },
    {
        "timestamp": "2023-09-07T18:00:00.000Z",
        "result": {
            "y": 3030951,
            "anomaly": "True",
            "yhat_lower": 1196744.0997706326,
            "yhat_upper": 2871790.063131141
        }
    }
]

// Function to convert timestamp to a numeric value
const getTimeStamp = (val) => new Date(val).getTime();

// Date formatter for the X-axis labels
const dateFormatter = new Intl.DateTimeFormat('in', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});

// Function to format date for X-axis labels
const doSomeDate = (val) => dateFormatter.format(new Date(val)).split(',')[1];

// Function to get the lower and upper range for the area chart
const getAreaRange = (val) => [val.yhat_lower, val.yhat_upper];

// Prepare the data for rendering
const data = res.map((d) => ({
  ts: getTimeStamp(d.timestamp),
  range: getAreaRange(d.result),
  line: d.result.anomaly === 'False' ? d.result.y : undefined,
  anomaly: d.result.anomaly === 'True' ? d.result.y : undefined,
}));
const getInitialYDomain = () => {
    let yBottom = Number.MAX_SAFE_INTEGER;
    let yTop = Number.MIN_SAFE_INTEGER;
  
    res.forEach((item) => {
      const { yhat_lower, yhat_upper, y } = item.result;
      
      if (yhat_lower < yBottom) {
        yBottom = yhat_lower;
      }
      
      if (y < yBottom) {
        yBottom = y;
      }
  
      if (yhat_upper > yTop) {
        yTop = yhat_upper;
      }
  
      if (y > yTop) {
        yTop = y;
      }
    });
  
    // Add some padding to the yBottom and yTop values
    const padding = 20;
    yBottom -= padding;
    yTop += padding*2;
  
    return [yBottom, yTop];
};
  
const [initialYBottom, initialYTop] = getInitialYDomain();
let offsetY = 10000;
let offsetX = 1020000;
// Initial state for the chart and zooming
const initialState = {
  data,
  left: getTimeStamp(res[0].timestamp),
  right: getTimeStamp(res[res.length - 1].timestamp),
  refAreaLeft: '',
  refAreaRight: '',
  refAreaLeftY: null,
  refAreaRightY: null,
  top: initialYTop + offsetY,
  bottom: 0,
  minY: 0,
  maxY: initialYTop ,
  animation: true, // Enable smooth transition
};

const ZoomableGraph = () => {
  const [state, setState] = useState(initialState);
  const [legendState, setLegendState] = useState({
    range: false,
    line: false,
    anomaly: false,
  });
  const handleLegendClick = (val) => {
    console.log(val);
    // const { dataKey } = entry;
  
    setLegendState((prevState) => ({
      ...prevState,
      [val]: !prevState[val],
    }));
  };

  // Function to handle zooming
  const zoom = () => {
    let { refAreaLeft, refAreaRight } = state;
    const { data, minY, maxY } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setState({
        ...state,
        refAreaLeft: '',
        refAreaRight: '',
      });
      return;
    }

    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // Calculate the new left and right boundaries based on the selected area
    const newLeft = refAreaLeft;
    const newRight = refAreaRight;

    // Introduce a delay to mimic a smooth transition (uncomment to use)
    // setTimeout(() => {
    setState({
      ...state,
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: newLeft,
      right: newRight,
      minY, // Keep minY unchanged
      maxY, // Keep maxY unchanged
    });
    // }, 100); // Adjust the duration of the animation as needed (e.g., 500 milliseconds)
  };

  // Function to handle zooming out
  const zoomOut = () => {
    setState(initialState);
  };

  // Function to handle mouse down events
  const onMouseDown = (e) => {
    setState({
      ...state,
      refAreaLeft: e?.activeLabel,
      refAreaRight: e?.activeLabel,
      refAreaLeftY: e?.chartY,
      refAreaRightY: e?.chartY,
    });
  };

  // Function to handle mouse move events
  const onMouseMove = (e) => {
    if (state.refAreaLeft !== null) {
      const mouseY = e.chartY;
      const maxY = state.maxY;
      const minY = state.minY;
      const yRange = maxY - minY;

      let y1 = state.refAreaLeftY;
      let y2 = maxY - (mouseY / 400) * yRange;

      y1 = Math.max(minY, Math.min(y1, maxY));
      y2 = Math.max(minY, Math.min(y2, maxY));

      setState({
        ...state,
        refAreaRight: e.activeLabel,
        refAreaLeftY: y1,
        refAreaRightY: y2,
      });
    }
  };

  return (
    <div style={{userSelect:'none'}}>
      <button type="button" className="btn update" onClick={zoomOut}>
        Zoom Out
      </button>

      <ComposedChart
            width={800}
            height={400}
            data={state.data}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
            className="axis-labels"
            axisLine={false}
            allowDataOverflow
            dataKey="ts"
            domain={[state.left-offsetX, state.right+offsetX]}
            type="number"
            tickFormatter={(ts) => doSomeDate(ts)}
            includeHidden
            tickCount={10}
            />
      
        <YAxis
            className="axis-labels"
            tickLine={false}
            axisLine={false}
            allowDataOverflow
            domain={[state.bottom, state.top]}
            type="number"
            tickCount={6}
            interval="preserveStartEnd"
        />
      
        <Area dataKey="range" type="monotone" stroke="#c6c6c6" fill="mediumseagreen" hide={legendState.range}/>
        <Tooltip />
        <Line type="natural" dataKey="line" stroke="#333" hide={legendState.line}/>
        <Line type="monotone" dataKey="anomaly" stroke="hotpink" hide={legendState.anomaly}/>
        <ReferenceArea
            x1={state.refAreaLeft}
            x2={state.refAreaRight}
            y1={state.refAreaLeftY}
            y2={state.refAreaRightY}
            fill="red"
            strokeOpacity={0.3}
        />
        <Legend margin={{bottom:12,}}
            // content={renderLegend} 
            verticalAlign="top" align="right" 
            formatter={(value, entry, index) => {
                return <span key={index}
                        onClick={()=>handleLegendClick(value)}
                        style={{ color: entry.color,cursor:"pointer" }}>
                        {value}
                    </span>
        }} />
      </ComposedChart>
    </div>)
};

export default ZoomableGraph;
