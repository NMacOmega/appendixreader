import { SvgShapeComponent } from "./svgShape.styles";

const SvgShape = ({ feature, isSet }) => {
  const {
    properties: { color, outlineColor },
  } = feature;

  const defaultFillColor = "#000000";
  const defaultStrokeColor = "#000000";

  const fillColor = color ? color : defaultFillColor;
  const strokeColor = outlineColor ? outlineColor : defaultStrokeColor;
  const strokeWidth = outlineColor ? "1" : "0";

  return (
    <>
      <SvgShapeComponent>
        <circle
          cx="25"
          cy="35"
          r="7%"
          fill={isSet ? fillColor : "#ebcf34"}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </SvgShapeComponent>
    </>
  );
};

export default SvgShape;
