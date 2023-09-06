import React, { useState } from 'react';
import {
  
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

const res =[
  {
      "timestamp": "2023-09-03T06:00:00.000Z",
      "result": {
          "y": 329,
          "anomaly": "False",
          "yhat_lower": 60.042279228521465,
          "yhat_upper": 561.0734242601391
      }
  },
  {
      "timestamp": "2023-09-03T07:00:00.000Z",
      "result": {
          "y": 1284,
          "anomaly": "True",
          "yhat_lower": 163.30523803752345,
          "yhat_upper": 824.1981726234276
      }
  },
  {
      "timestamp": "2023-09-03T08:00:00.000Z",
      "result": {
          "y": 883,
          "anomaly": "True",
          "yhat_lower": 197.34456408390943,
          "yhat_upper": 859.7957987343698
      }
  },
  {
      "timestamp": "2023-09-03T09:00:00.000Z",
      "result": {
          "y": 596,
          "anomaly": "False",
          "yhat_lower": 385.7502191510391,
          "yhat_upper": 1264.7136703203605
      }
  },
  {
      "timestamp": "2023-09-03T10:00:00.000Z",
      "result": {
          "y": 719,
          "anomaly": "False",
          "yhat_lower": 298.2081953525766,
          "yhat_upper": 1030.8483314882778
      }
  },
  {
      "timestamp": "2023-09-03T11:00:00.000Z",
      "result": {
          "y": 917,
          "anomaly": "False",
          "yhat_lower": 348.54660267505903,
          "yhat_upper": 1166.2525080459486
      }
  },
  {
      "timestamp": "2023-09-03T12:00:00.000Z",
      "result": {
          "y": 757,
          "anomaly": "False",
          "yhat_lower": 466.1211646325778,
          "yhat_upper": 1345.8439513715
      }
  },
  {
      "timestamp": "2023-09-03T13:00:00.000Z",
      "result": {
          "y": 708,
          "anomaly": "False",
          "yhat_lower": 361.4160679597512,
          "yhat_upper": 1171.5471969306711
      }
  },
  {
      "timestamp": "2023-09-03T14:00:00.000Z",
      "result": {
          "y": 2114,
          "anomaly": "True",
          "yhat_lower": 375.6676764369336,
          "yhat_upper": 1219.7321400598746
      }
  },
  {
      "timestamp": "2023-09-03T15:00:00.000Z",
      "result": {
          "y": 591,
          "anomaly": "False",
          "yhat_lower": 318.23682931109147,
          "yhat_upper": 1146.0482770577532
      }
  },
  {
      "timestamp": "2023-09-03T16:00:00.000Z",
      "result": {
          "y": 505,
          "anomaly": "False",
          "yhat_lower": 257.58826094434806,
          "yhat_upper": 960.7742662416036
      }
  },
  {
      "timestamp": "2023-09-03T17:00:00.000Z",
      "result": {
          "y": 574,
          "anomaly": "False",
          "yhat_lower": 196.8513126778558,
          "yhat_upper": 875.1533295826373
      }
  },
  {
      "timestamp": "2023-09-03T18:00:00.000Z",
      "result": {
          "y": 607,
          "anomaly": "False",
          "yhat_lower": 207.3906821083292,
          "yhat_upper": 925.6055003271958
      }
  },
  {
      "timestamp": "2023-09-03T19:00:00.000Z",
      "result": {
          "y": 592,
          "anomaly": "False",
          "yhat_lower": 200.62272992882072,
          "yhat_upper": 920.6386679357884
      }
  },
  {
      "timestamp": "2023-09-03T20:00:00.000Z",
      "result": {
          "y": 464,
          "anomaly": "False",
          "yhat_lower": 152.73851831694088,
          "yhat_upper": 781.9125122061394
      }
  },
  {
      "timestamp": "2023-09-03T21:00:00.000Z",
      "result": {
          "y": 237,
          "anomaly": "False",
          "yhat_lower": 76.55601750899893,
          "yhat_upper": 614.122600501748
      }
  },
  {
      "timestamp": "2023-09-03T22:00:00.000Z",
      "result": {
          "y": 449,
          "anomaly": "True",
          "yhat_lower": 16.884617111988632,
          "yhat_upper": 445.2673417543442
      }
  },
  {
      "timestamp": "2023-09-03T23:00:00.000Z",
      "result": {
          "y": 2213,
          "anomaly": "True",
          "yhat_lower": 118.39713501219684,
          "yhat_upper": 754.8247613084384
      }
  },
  {
      "timestamp": "2023-09-04T00:00:00.000Z",
      "result": {
          "y": 364,
          "anomaly": "False",
          "yhat_lower": 193.74278870919105,
          "yhat_upper": 847.4932307335546
      }
  },
  {
      "timestamp": "2023-09-04T01:00:00.000Z",
      "result": {
          "y": 308,
          "anomaly": "False",
          "yhat_lower": 144.07058052919388,
          "yhat_upper": 784.3207560352353
      }
  },
  {
      "timestamp": "2023-09-04T02:00:00.000Z",
      "result": {
          "y": 343,
          "anomaly": "False",
          "yhat_lower": 101.91563743890651,
          "yhat_upper": 701.7352684146238
      }
  },
  {
      "timestamp": "2023-09-04T03:00:00.000Z",
      "result": {
          "y": 243,
          "anomaly": "False",
          "yhat_lower": 76.61545131712967,
          "yhat_upper": 636.4008873747383
      }
  },
  {
      "timestamp": "2023-09-04T04:00:00.000Z",
      "result": {
          "y": 155,
          "anomaly": "False",
          "yhat_lower": 62.7354294235692,
          "yhat_upper": 616.7241847537123
      }
  },
  {
      "timestamp": "2023-09-04T05:00:00.000Z",
      "result": {
          "y": 280,
          "anomaly": "False",
          "yhat_lower": 59.251757718884335,
          "yhat_upper": 587.1876998386176
      }
  },
  {
      "timestamp": "2023-09-04T06:00:00.000Z",
      "result": {
          "y": 1801,
          "anomaly": "True",
          "yhat_lower": 172.72608957049005,
          "yhat_upper": 855.1246453519543
      }
  }
]

const getTimeStamp = (val) => {
  let dateStr = new Date(val);
  let timeStamp = dateStr.getTime();
  return (timeStamp);
};

// const initialState = {
//   data: res,
//   left: getTimeStamp(res[0].timestamp),
//   right: getTimeStamp(res[res.length - 1].timestamp),
//   refAreaLeft: '',
//   refAreaRight: '',
//   animation:true
// };

// console.log(initialState)
const dateFormatter = new Intl.DateTimeFormat("in", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  hour12: true, // Use 12-hour format
});
const doSomeDate = (val) => {
  const dateObject = new Date(val);
  return dateFormatter.format(dateObject).split(",")[1];
  // return dateObject.getUTCMonth()
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

const getAxisYDomain = (from, to,  offset) => {
  let a = data.findIndex(e => ((from - e.ts) < 100 ))
  let b = data.findIndex(e => (to - e.ts) < 100)
  
  const refData = data.slice(a,b);
  
  let [bottom, top] = [refData[0]['range'][0], refData[0]['range'][1]];
  refData.forEach((d) => {
    if (d['range'][1] > top) top = d['range'][1];
    if (d['range'][0] < bottom) bottom = d['range'][0];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data: data,
  left: getTimeStamp(res[0].timestamp),
  right: getTimeStamp(res[res.length - 1].timestamp),
  // left: 'dataMin',
  // right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'auto',
  bottom: 'auto',
  animation: true,
};

const ZoomableGraph = () => {
  const [state, setState] = useState(initialState);

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = state;
    // console.log(refAreaLeft,refAreaRight)
    const { data } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setState({
        ...state,
        refAreaLeft: '',
        refAreaRight: '',
      });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 1500);

    setState({
      ...state,
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    });
  };

  const zoomOut = () => {
    const { data } = state;
    setState({
      ...state,
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: getTimeStamp(res[0].timestamp),
    right: getTimeStamp(res[res.length - 1].timestamp),
      top: 'auto',
      bottom: 'auto',
    });
  };

  const { data, left, right, refAreaLeft, refAreaRight, top, bottom } = state;

  return (
    <div>
      <button type="button" className="btn update" onClick={zoomOut}>
        Zoom Out
      </button>

      {/* <ResponsiveContainer width="100%" height={400}> */}
        <ComposedChart
          width={800}
          height={400}
          data={data}
          onMouseDown={(e) => {
            // console.log(e.activeLabel)
            setState({ ...state, refAreaLeft: e.activeLabel })
          }}
          onMouseMove={(e) =>
            state.refAreaLeft && setState({ ...state, refAreaRight: e.activeLabel })
          }
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
              allowDataOverflow dataKey="ts" 
              domain={[left, right]} 
              type="number" 
              tickFormatter={(ts) => doSomeDate(ts)} 
              includeHidden
              tickCount={10}
              />
          <YAxis 
            allowDataOverflow 
            domain={[bottom, top]} 
            type="number"  
            tickCount={6}
            interval="preserveStartEnd"
            />
          <Tooltip />
          <Line
            
            type="natural"
            dataKey="line"
            stroke="#8884d8"
            // animationDuration={300}
          />
          <Line 
           type="monotone"
           dataKey="anamoly"
           stroke='hotpink'
          />
          <Area
            dataKey="range"
            type="monotone"
            stroke='#c6c6c6'
            fill="lightblue"
            />

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea  x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
          ) : null}
        </ComposedChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default ZoomableGraph;
