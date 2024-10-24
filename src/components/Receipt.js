const receipt = [
  {
    id: 1,
    name: "Cá kiếm Ẽcalibur",
    quantity: 1,
    price: 125000,
    total: 125000,
  },
  {
    id: 2,
    name: "Cá voi xào hành tây",
    quantity: 2,
    price: 12000,
    total: 24000,
  },
  {
    id: 3,
    name: "Cá vàng bơi trong chảo mỡ",
    quantity: 2,
    price: 1200000,
    total: 2400000,
  },
];

export function Receipt() {
  return (
    <section className="basis-1/2 h-full w-full p-4">
      <div className="relative h-full w-full flex flex-col justify-between bg-[#fafafa] shadow-sm rounded-2xl p-4 font-semibold">
        <div>
          <div className="relative ml-[150px] mb-3 z-50 font-bold font-uniform text-sm text-[#959595]">
            T-1 / Tầng 1
            <div className="absolute rounded-b-lg shadow-sm inset-0 -translate-x-4 -translate-y-4 z-[-1] bg-[#ede6d5] w-24 h-12"></div>
          </div>

          <div className="flex items-center h-10 w-full border-dotted border-b-2 border-[#adadad] font-bold mb-2">
            <div className="basis-2/3">Item</div>
            <div className="basis-1/6 text-center">Qty</div>
            <div className="basis-1/6 text-center">Price</div>
          </div>
          <div className="max-h-[450px] overflow-auto">
            {receipt.map((item) => (
              <div
                key={item.id}
                className="group flex items-center h-10 w-full my-2"
              >
                <div className="overflow-hidden text-nowrap basis-2/3">
                  {item.name}
                </div>
                <div className="flex justify-evenly items-center font-bold basis-1/6 rounded-full group-hover:border hover:bg-[#f0f0f0]">
                  <button className="invisible group-hover:visible active:-translate-x-0.5">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 19-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <div>{item.quantity}</div>
                  <button className="invisible group-hover:visible active:translate-x-0.5">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="basis-1/6 text-end">₫{item.total}</div>
              </div>
            ))}
          </div>
          <div className="w-full h-16 my-2 border-dotted border-y-2 border-[#adadad] flex justify-between items-center text-xl font-uniform font-bold">
            <div className="tracking-wide">TỔNG</div>
            <div>₫12000000</div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full h-10">
          <button className="basis-1/2 h-full rounded-md shadow-sm bg-[#f7f7f7] border border-[#333333] text-[#333333] active:bg-[#333333] active:text-[#f7f7f7]">
            Báo nhà bếp
          </button>
          <button className="basis-1/2 h-full rounded-md shadow-sm bg-[#333333] border border-[#333333] text-[#f7f7f7] active:bg-[#f7f7f7] active:text-[#333333]">
            Xác nhận phục vụ
          </button>
        </div>
      </div>
    </section>
  );
}
