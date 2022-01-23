import React, { PureComponent } from "react";

let rotateAngle = 0;

const SIZE = 34;
const PREFIX = 'donut donut_svg';

const halfSize = SIZE / 2;
const circleProps = {
  cx: halfSize,
  cy: halfSize,
  r: halfSize - 1
};

const getClassName = (p, c) => `${p}${c}`;
const renderProgress = progress => <strong>{progress}</strong>;

const Donut = ({
  progress = 0,
  onRender = renderProgress,
  prefix = PREFIX
}) => (
  <div className={getClassName(prefix, progress < 0 ? ' is--negative' : '')}>
    <svg
      className={getClassName(prefix, '__canvas') + 'donut_svg'}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={getClassName(prefix, '__frame')}
        {...circleProps}
      />

      <circle
        className={getClassName(prefix, '__circle')}
        strokeDasharray={`${Math.abs(progress)} 100`}
        {...circleProps}
      />
    </svg>

    {typeof onRender === 'function' && (
      <div className={getClassName(prefix, '__text')}>
        {onRender(progress)}
      </div>
    )}
  </div>
);



class ComplexDonut extends React.Component {
  loadTimeout = 0;

  constructor(props) {
    super(props);

    this.state = {
      total: this.total(props.segments),
      segments: [],
      transforms: this.transforms(),
      isLoaded: false
    };
  }

  total = values => values.reduce((acc, { value }) => acc + value, 0);

  percent = (value, total) => value / total;

  transforms = () => {
    const rotations = [];
    const textCoords = [];
    const { startAngle, segments } = this.props;
    const total = this.total(segments);

    rotateAngle = startAngle;

    this.sortValues(segments).forEach(({ value }) => {
      const data = rotateAngle;
      const percent = this.percent(value, total);
      const { x, y } = this.textCoordinates(value, rotateAngle);

      rotations.push(data);
      textCoords.push({ x, y });

      const result = rotations[rotations.length - 1] || startAngle;

      rotateAngle = percent * 360 + result;
    });

    return { rotations, textCoords };
  };

  sortValues = values => values.sort((a, b) => b.value - a.value);

  circumference = radius => 2 * Math.PI * radius;

  degreesToRadians = angle => angle * (Math.PI / 180);

  strokeDashOffset = (value, circumference) => {
    const diff = this.percent(value, this.state.total) * circumference;
    return circumference - diff;
  };

  textCoordinates = (value, angleOffset) => {
    const { size, radius, segments } = this.props;
    const total = this.total(segments);
    const angle = (this.percent(value, total) * 360) / 2 + angleOffset;
    const radians = this.degreesToRadians(angle);

    return {
      x: radius * Math.cos(radians) + (size) / 2,
      y: radius * Math.sin(radians) + (size) / 2
    };
  };

  componentDidMount = () => {
    const { segments, size } = this.props;
    let {
      total,
      transforms: { rotations, textCoords }
    } = this.state;

    textCoords = textCoords.map((textCord,i) => {console.log(textCord);textCord['x']= rotations[i]>10?textCord['x']-10:textCord['x']+14;textCord['y']=rotations[i]<50?textCord['y']+15:textCord['y'];return textCord;});
    this.setState({
      segments: this.sortValues(segments).map(({ value, color }, i) => ({
        value,
        color,
        percent: this.percent(value, total),
        rotate: `rotate(${rotations[i]}, ${size / 2}, ${size / 2})`,
        textCoords: textCoords[i]
      }))
    });

    this.loadTimeout = setTimeout(() => {
      this.setState({
        isLoaded: true
      });
    }, 100);
  };

  componentWillUnmount() {
    clearTimeout(this.loadTimeout);
  }

  render() {
    const { size, radius, thickness, className } = this.props;
    const halfSize = size / 2;
    const circumference = this.circumference(radius);

    return (
      <div
        className={`donut-complex${
          this.state.isLoaded ? ' donut-complex--loaded ' : ' '
        }${className}`}
      >
        <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
          {this.state.segments.map((segment, i) => (
            <g key={i}>
              <circle
                r={radius}
                cx={halfSize}
                cy={halfSize}
                transform={segment.rotate}
                stroke={segment.color}
                strokeWidth={thickness}
                strokeDasharray={circumference}
                strokeDashoffset={this.strokeDashOffset(
                  segment.value,
                  circumference
                )}
              />
              <text
                x={segment.textCoords.x}
                y={segment.textCoords.y}
                dy="-3px"
                textAnchor="middle"
              >
                {`${Math.round(segment.percent * 100)}%`}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }
}

export default ComplexDonut;
