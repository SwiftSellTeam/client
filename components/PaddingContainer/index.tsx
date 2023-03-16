interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  right?: number;
  left?: number;
}

const PaddingContainer: React.FC<Props> = ({ children, style, right = 160, left = 160 }) => {
  return (
    <div
      style={{
        paddingRight: `${right}px`,
        paddingLeft: `${left}px`,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PaddingContainer;
