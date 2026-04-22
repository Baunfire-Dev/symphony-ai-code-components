import './StatCard.css';
export const StatCard = ({ 
  stat,
  text,
  variant = "Teal"
}) => {
  const textVariant = {
    "White" : "white",
    "Blue" : "blue",
    "Teal" : "teal",
    "Yellow" : "yellow",
    "Light Purple" : "light-purple",
    "Magenta" : "magenta"
  };
  return (
    <div className={`flex flex-col gap-[1.5625rem]`}>
      <p className={`font-medium !text-[4.75rem] leading-[5.125rem] tracking-[0%] my-0 md:!text-[5rem] md:leading-[6.0625rem] text-${textVariant[variant]}`}>{stat}</p>
      <hr className='border-t-[0.1875rem] border-[#FFFFFF] opacity-100 w-full m-0'/>
      <div className='text-sol-white text-[1rem] !leading-[1.625rem] md:!leading-[2rem] md:!text-[1.5rem] mb-0'>{text}</div>
    </div>
  );
};
