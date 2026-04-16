import './StatsGrid.css';
export const StatsGrid = ({ stat }) => {
  return (
    <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-[3.75rem] md:gap-y-[5rem] gap-x-[3.75rem] transition-top-stagger'>
      {stat}
    </div>
  );
};
