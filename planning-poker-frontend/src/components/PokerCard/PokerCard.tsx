import './PokerCard.css';

export default function PokerCard(props: {number: number | string}){
  const { number } = props
  return (
      <div className="poker-card">
        <span className="card-number">{number}</span>
      </div>
    );
}