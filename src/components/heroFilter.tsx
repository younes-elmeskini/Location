import CarFilterForm from "./formFilter";

export default function heroFilter() {
  return (
    <section className="bg-[url(/images/Hero.png)] bg-cover bg-center h-[auto] md:h-[600px] flex justify-center items-center gap-6 p-4 md:p-[72px] mx-[30px] md:mx-[80px] my-4 md:my-[40px] rounded-[32px] flex-col md:flex-row">
      <div className="text-white space-y-6 text-center md:text-left">
        <h1 className="font-bold text-[28px] md:text-[60px]">
          Experience the road like never before
        </h1>
        <p className="md:text-[16px] text-[12px] max-w-[460px]">
          Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor
          tristique et gravida. Quis nunc interdum gravida ullamcorper
        </p>
        <button className="px-4 py-2 md:px-6 md:py-3 bg-[#FF9E0C] text-white rounded-[12px] hover:bg-[#7c5dfa] transition-colors duration-300">
          View all cars
        </button>
      </div>
      <div className="bg-white p-[20px] md:p-[40px] rounded-[16px] w-full md:w-[500px]">
        <h2 className="md:text-[24px] text-[18px] font-bold mb-4 text-center">
          Book your car
        </h2>
        <CarFilterForm />
      </div>
    </section>
  );
}
