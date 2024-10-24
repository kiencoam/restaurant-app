const prepared = [
  {
    id: 1,
    name: "Cá kiếm Ẽcalibur",
    quantity: 1,
    table: "V-1",
    time: "21:19",
    waiter: "Quoc Co",
  },
  {
    id: 2,
    name: "Cá voi xào hành tây",
    quantity: 2,
    table: "V-1",
    time: "21:19",
    waiter: "Quoc Co",
  },
  {
    id: 3,
    name: "Cà phê fizz",
    quantity: 5,
    table: "V-2",
    time: "21:19",
    waiter: "Quoc Co",
  },
  {
    id: 5,
    name: "Thịt ba ba áp chảo",
    quantity: 2,
    table: "T-3",
    time: "21:19",
    waiter: "Quoc Nghiep",
  },
];

export function Prepared() {
  return (
    <section className="basis-[40%] h-full py-6 pl-3 pr-6">
      <div className="font-extrabold text-2xl mb-6 h-10 flex items-center">
        Đã xong / Chờ phục vụ
      </div>
      <div className="bg-white h-[660px] shadow-sm p-4">
        <div className="max-h-full overflow-auto font-semibold">
          {prepared.map((item) => (
            <div key={item.id} className="flex items-center w-full my-2">
              <div className="basis-2/3">
                <div className="overflow-hidden text-nowrap text-base">
                  {item.name}
                </div>
                <div className="text-[#999999] text-sm font-normal font-flux">
                  {item.time} - By {item.waiter}
                </div>
              </div>
              <div className="basis-1/6 text-center">{item.quantity}</div>
              <div className="basis-1/6 text-center">{item.table}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
