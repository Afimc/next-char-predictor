import './TrainInput.css';

interface InputAreaProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}


function TrainInput({ value, placeholder, onChange }: InputAreaProps) {
  return (
    <div className="input-container">
      <textarea
        className="input-textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TrainInput