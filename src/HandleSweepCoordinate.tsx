interface DataItem {
    title: string;
    value: number;
    color: string;
    percent: number; // Add the percent property to the type
    sweepAngleRadians: number;
  }
  interface Props {
    data: DataItem[];
    cx: number;
    cy: number;
    radius: number;
  }
  interface ParamForDraw {
    x: number;
    y: number;
    path: string;
  }
  
  // This function uses for the slice that has its size more than 50% .
  interface HandleInputDataProps {
    cx: number;
    cy: number;
    radius: number;
    startX: number;
    startY: number;
    endpoint_Arc_X: number;
    endpoint_Arc_Y: number;
  }
  function HandleInputData({
    cx,
    cy,
    radius,
    startX,
    startY,
    endpoint_Arc_X,
    endpoint_Arc_Y,
  }: HandleInputDataProps) {
    //We start draw from (cx+radius, cy), let get the point when it draws 180 degree.
    const symmetricalPoint_X = cx - radius;
    const symmetricalPoint_Y = cy;
    const path = `
          M ${startX} ${startY} 
          A ${radius} ${radius} 0 0 1 ${symmetricalPoint_X} ${symmetricalPoint_Y}
          M ${symmetricalPoint_X} ${symmetricalPoint_Y}
          A ${radius} ${radius} 0 0 1 ${endpoint_Arc_X} ${endpoint_Arc_Y}
          `;
      const path_2 = `
          M ${startX} ${startY} 
          A ${radius} ${radius} 0 0 1 ${symmetricalPoint_X} ${symmetricalPoint_Y}
          A ${radius} ${radius} 0 0 1 ${endpoint_Arc_X} ${endpoint_Arc_Y}
          `;
    return path_2;
  }
  export default function HandleSweepCoordinate({ data, cx, cy, radius }: Props) {
    // console.log("handle", data)
    const { PI, cos, sin } = Math;
    let pathLists: ParamForDraw[] = [];
    data.forEach((item, i) => {
      if (i === 0) {
        if (item.percent > 50) {
          const startX = cx + radius;
          const startY = cy;
          const endpoint_Arc_X = cx + radius * cos(item.sweepAngleRadians);
          const endpoint_Arc_Y = cy + radius * sin(item.sweepAngleRadians);
          const path = HandleInputData({
            cx,
            cy,
            radius,
            startX,
            startY,
            endpoint_Arc_X,
            endpoint_Arc_Y,
          });
          pathLists.push({
            x: endpoint_Arc_X,
            y: endpoint_Arc_Y,
            path: path,
          });
        } else {
          const x1 = cx + radius * cos(item.sweepAngleRadians);
          const y1 = cy + radius * sin(item.sweepAngleRadians);
          const path = `M ${
            cx + radius
          } ${cy} A ${radius} ${radius} 0 0 1 ${x1} ${y1}`;
          pathLists.push({
            x: x1,
            y: y1,
            path: path,
          });
        }
      } else {
        const x1 = pathLists[i - 1].x;
        const y1 = pathLists[i - 1].y;
        const angleFromStart = Math.atan2(y1 - cy, x1 - cx); // Angle from center to starting point
        // console.log("angleFromStart",angleFromStart)
        const angleToEndpoint = angleFromStart + item.sweepAngleRadians; // Angle to the endpoint
        const x_Next = cx + radius * Math.cos(angleToEndpoint);
        const y_Next = cy + radius * Math.sin(angleToEndpoint);
        const path = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x_Next} ${y_Next}`;
        pathLists.push({
          x: x_Next,
          y: y_Next,
          path: path,
        });
      }
    });
    return pathLists;
  }
  