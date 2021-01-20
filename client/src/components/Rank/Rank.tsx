interface Props {
  name: string;
  rank: number;
}

const Rank: React.FC<Props> = ({ name, rank }) => {
  return (
    <div className="mt4">
      <div className="white f3">{`${name} your current rank is ...`}</div>
      <div className="white f1">{`#${rank}`}</div>
    </div>
  );
};

export default Rank;
