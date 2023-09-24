import LoadingAnim from "../componenets/LoadingAnim";

export default function LoadingPulse() {
  return (
    <div className="animate-pulse w-full text-center  min-h-fit px-2 flex flex-col items-center justify-start">
      <div className="w-full bg-slate-700 mb-2 rounded-lg">
        <div className="w-full h-[250px] rounded-lg relative">
          <div className="w-full h-[16rem] flex justify-center items-center">
            <LoadingAnim />
          </div>
        </div>
      </div>
      <div className="w-full  mb-2 rounded-lg">
        <h1 className="text-white text-2xl">All Movies</h1>
        <div className="w-full h-[150px] rounded-lg bg-slate-700 flex justify-center items-center">
          <LoadingAnim />
        </div>
      </div>
      <div className="w-full  mb-2 rounded-lg">
        <h1 className="text-white text-2xl">Popular Movies</h1>
        <div className="w-full h-[150px] rounded-lg bg-slate-700 flex justify-center items-center">
          <LoadingAnim />
        </div>
      </div>
      <div className="w-full mb-2 rounded-lg">
        <h1 className="text-white text-2xl">All Movies</h1>
        <div className="w-full h-[150px] rounded-lg bg-slate-700 flex justify-center items-center">
          <LoadingAnim />
        </div>
      </div>
    </div>
  );
}
