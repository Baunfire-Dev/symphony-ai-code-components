import './Slot.css';

export const Slot = ({ children }) => {
  return (
    <div style={{ display: 'contents' }}>
      {children}
    </div>
  );
};