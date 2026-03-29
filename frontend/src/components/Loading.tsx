export default function Loading() {
  return (
    <div className="bg-[#f5e6cc] min-h-screen flex items-center justify-center font-P2P">
      <div className="bg-[#E5CA95] border-[4px] border-[#66422A] shadow-[6px_6px_0px_#66422A] px-10 py-12 w-[380px] text-center">
        <h1 className="text-[#3B3024] text-[18px] mb-8 tracking-widest">
          LOADING...
        </h1>
        <div className="w-full h-[20px] border-[3px] border-[#201E1F] bg-[#f5e6cc] overflow-hidden">
          <div className="bg-[#3B3024] h-full animate-fill"></div>
        </div>
      </div>
    </div>
  )
}