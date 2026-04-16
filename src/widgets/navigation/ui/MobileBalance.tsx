interface Props {
  balance: number;
}

export const MobileBalance = ({ balance }: Props) => {
  return (
    <div className="lg:hidden mb-4 px-4 py-3 bg-[#141a26] border border-white/5 rounded-xl flex justify-between items-center">
      <span className="text-xs uppercase text-white/20 tracking-[0.2em]">Balance:</span>
      <span className="text-sm font-bold text-white">${balance.toFixed(2)}</span>
    </div>
  );
};
