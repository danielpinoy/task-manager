// src/components/CompactCount.jsx
import { useState, useEffect } from "react";
import { sampleTasks, getTaskStatusCounts } from "../../services/api";
function CompactCount({ size = 48, showLabels = false }) {
  // State to store task counts by status
  const [taskCounts, setTaskCounts] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    total: 0,
  });

  useEffect(() => {
    // Use the helper function to get status counts from Api
    const counts = getTaskStatusCounts();
    setTaskCounts(counts);
  }, []);

  const viewBoxSize = 100; // Use a fixed viewBox size for easier calculations
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const radius = 40; // Outer radius of the donut
  const thickness = 15; // Thickness of the donut

  // Colors for each segment
  const colors = {
    completed: "#5A5A5A", // Dark gray
    inProgress: "#CCCCCC", // Light gray
    notStarted: "#888888", // Medium gray
  };

  // Calculate the start and end angles for each segment
  const calculateSegments = () => {
    const total = taskCounts.total || 1; // Prevent division by zero

    // Calculate how many degrees each task takes in the 360° circle
    const degreesPerTask = 360 / total;

    // Calculate start and end angles for each segment
    let currentAngle = 0;

    // Calculate segments in clockwise order
    const completedSegment = {
      startAngle: currentAngle,
      endAngle: currentAngle + taskCounts.completed * degreesPerTask,
    };
    currentAngle = completedSegment.endAngle;

    const inProgressSegment = {
      startAngle: currentAngle,
      endAngle: currentAngle + taskCounts.inProgress * degreesPerTask,
    };
    currentAngle = inProgressSegment.endAngle;

    const notStartedSegment = {
      startAngle: currentAngle,
      endAngle: currentAngle + taskCounts.notStarted * degreesPerTask,
    };

    return {
      completed: completedSegment,
      inProgress: inProgressSegment,
      notStarted: notStartedSegment,
    };
  };

  // Convert angle in degrees to radians
  const degToRad = (deg) => (deg * Math.PI) / 180;

  // Create arc path for a segment
  const createArcPath = (startAngle, endAngle) => {
    if (endAngle - startAngle === 0) return "";

    // Convert angles to radians
    const startRad = degToRad(startAngle - 90); // -90 to start from top
    const endRad = degToRad(endAngle - 90);

    // Calculate start and end points
    const startX = centerX + radius * Math.cos(startRad);
    const startY = centerY + radius * Math.sin(startRad);
    const endX = centerX + radius * Math.cos(endRad);
    const endY = centerY + radius * Math.sin(endRad);

    // Calculate inner points (for the donut effect)
    const innerRadius = radius - thickness;
    const innerStartX = centerX + innerRadius * Math.cos(startRad);
    const innerStartY = centerY + innerRadius * Math.sin(startRad);
    const innerEndX = centerX + innerRadius * Math.cos(endRad);
    const innerEndY = centerY + innerRadius * Math.sin(endRad);

    // Determine if the arc should be drawn as a large arc
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    // Create the path
    // Start at outer start point -> arc to outer end point ->
    // line to inner end point -> arc back to inner start point -> close
    let path = `
      M ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      L ${innerEndX} ${innerEndY}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
      Z
    `;

    return path.trim();
  };

  const segments = calculateSegments();

  // Calculate label positions
  const getLabelPosition = (segment) => {
    // Position label at the middle angle of the segment
    const midAngle = degToRad((segment.startAngle + segment.endAngle) / 2 - 90);
    const labelRadius = radius + 10; // Position labels slightly outside the donut

    return {
      x: centerX + labelRadius * Math.cos(midAngle),
      y: centerY + labelRadius * Math.sin(midAngle),
    };
  };

  const completedLabelPos = getLabelPosition(segments.completed);
  const inProgressLabelPos = getLabelPosition(segments.inProgress);
  const notStartedLabelPos = getLabelPosition(segments.notStarted);

  // Create connector lines for labels
  const createConnectorLine = (segment) => {
    const midAngle = degToRad((segment.startAngle + segment.endAngle) / 2 - 90);
    const innerPoint = {
      x: centerX + (radius - thickness / 2) * Math.cos(midAngle),
      y: centerY + (radius - thickness / 2) * Math.sin(midAngle),
    };

    const outerPoint = {
      x: centerX + (radius + 5) * Math.cos(midAngle),
      y: centerY + (radius + 5) * Math.sin(midAngle),
    };

    return `M ${innerPoint.x} ${innerPoint.y} L ${outerPoint.x} ${outerPoint.y}`;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        style={{ overflow: "visible" }} // Allow labels to extend outside SVG
      >
        {/* Completed Segment */}
        {taskCounts.completed > 0 && (
          <path
            d={createArcPath(
              segments.completed.startAngle,
              segments.completed.endAngle
            )}
            fill={colors.completed}
          />
        )}

        {/* In Progress Segment */}
        {taskCounts.inProgress > 0 && (
          <path
            d={createArcPath(
              segments.inProgress.startAngle,
              segments.inProgress.endAngle
            )}
            fill={colors.inProgress}
          />
        )}

        {/* Not Started Segment */}
        {taskCounts.notStarted > 0 && (
          <path
            d={createArcPath(
              segments.notStarted.startAngle,
              segments.notStarted.endAngle
            )}
            fill={colors.notStarted}
          />
        )}

        {/* Labels and connectors - only shown if showLabels=true */}
        {showLabels && (
          <>
            {/* Connector lines */}
            {taskCounts.completed > 0 && (
              <path
                d={createConnectorLine(segments.completed)}
                stroke="#999"
                strokeWidth="0.5"
                fill="none"
              />
            )}

            {taskCounts.inProgress > 0 && (
              <path
                d={createConnectorLine(segments.inProgress)}
                stroke="#999"
                strokeWidth="0.5"
                fill="none"
              />
            )}

            {taskCounts.notStarted > 0 && (
              <path
                d={createConnectorLine(segments.notStarted)}
                stroke="#999"
                strokeWidth="0.5"
                fill="none"
              />
            )}

            {/* Text labels */}
            {taskCounts.completed > 0 && (
              <text
                x={completedLabelPos.x}
                y={completedLabelPos.y}
                textAnchor={
                  completedLabelPos.x > centerX
                    ? "start"
                    : completedLabelPos.x < centerX
                    ? "end"
                    : "middle"
                }
                dominantBaseline="middle"
                fontSize="8"
                fill="#5A5A5A"
              >
                Completed
              </text>
            )}

            {taskCounts.inProgress > 0 && (
              <text
                x={inProgressLabelPos.x}
                y={inProgressLabelPos.y}
                textAnchor={
                  inProgressLabelPos.x > centerX
                    ? "start"
                    : inProgressLabelPos.x < centerX
                    ? "end"
                    : "middle"
                }
                dominantBaseline="middle"
                fontSize="8"
                fill="#5A5A5A"
              >
                In progress
              </text>
            )}

            {taskCounts.notStarted > 0 && (
              <text
                x={notStartedLabelPos.x}
                y={notStartedLabelPos.y}
                textAnchor={
                  notStartedLabelPos.x > centerX
                    ? "start"
                    : notStartedLabelPos.x < centerX
                    ? "end"
                    : "middle"
                }
                dominantBaseline="middle"
                fontSize="8"
                fill="#5A5A5A"
              >
                Not started
              </text>
            )}
          </>
        )}

        {/* Total count in center */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={radius / 1.5}
          fontWeight="bold"
          fill="#000"
        >
          {taskCounts.total}
        </text>
      </svg>
    </div>
  );
}

export default CompactCount;
