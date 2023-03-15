interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  right?: number;
  left?: number;
}

const PaddingContainer: React.FC<Props> = ({ children, style, right = 200, left = 200 }) => {
  return (
    <div
      style={{
        paddingRight: `${right}px"`,
        paddingLeft: `${left}px`,
        width: "100%",
        background: "red",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PaddingContainer;
