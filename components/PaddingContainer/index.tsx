interface Props {
  children: React.ReactNode;
}

const PaddingContainer: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ paddingRight: "200px", paddingLeft: "200px" }}>
      {children}
    </div>
  );
};

export default PaddingContainer;
