import { View } from 'react-native';
import { LineChart, Grid ,XAxis,YAxis} from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text } from 'react-native-svg';


const MyChart = ({ data, labels }) => {
    const contentInset = { top: 20, bottom: 20 };

    const CustomGrid = ({ x, y, data, ticks }) => (
        <G>
            {
                // Horizontal grid lines
                ticks.map(tick => (
                    <Line
                        key={tick}
                        x1={'0%'}
                        x2={'100%'}
                        y1={y(tick)}
                        y2={y(tick)}
                        stroke={'rgba(0,0,0,0.2)'}
                    />
                ))
            }
            {
                // Vertical grid lines
                data.map((_, index) => (
                    <Line
                        key={index}
                        y1={'0%'}
                        y2={'100%'}
                        x1={x(index)}
                        x2={x(index)}
                        stroke={'rgba(0,0,0,0.2)'}
                    />
                ))
            }
        </G>
    );

    const Decorator = ({ x, y, data }) => {
        return data.map((value, index) => (
            <Circle
                key={index}
                cx={x(index)}
                cy={y(value)}
                r={4}
                stroke={'rgb(134, 65, 244)'}
                fill={'white'}
            />
        ));
    };

    return (
        <View style={{ height: 200, padding: 20 }}>
      <View style={{ height: 150, flexDirection: 'row' }}>
        <YAxis
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'grey' }}
        />
        <LineChart
          style={{ flex: 1 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
            <CustomGrid/>
            <Decorator/>
          <Grid />
        </LineChart>
      </View>
      <XAxis
        data={data}
        formatLabel={(value, index) => labels[index]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fontSize: 10, fill: 'grey' }}
        
      />
    </View>
    );
};

export default MyChart;
