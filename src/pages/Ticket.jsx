import { useState, useEffect } from "react";
import { busService } from "../services/busService";
import { FaQrcode, FaCheckCircle, FaSpinner, FaCreditCard, FaMobileAlt, FaBus, FaStar, FaMapMarkerAlt, FaClock, FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userImg from "../assets/8.png";


export default function Ticket() {
  const [step, setStep] = useState("selection");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  const goToPayment = () => {
    setStep("payment");
  };

  const handleConfirmPayment = () => {
    setStep("processing");

    busService.processPayment(132.90).then(() => {
      setStep("success");
    });
  };


  const busRoutes = [
    { route: "Central - Station", busNo: "101", price: "150.00", rating: 4.8, location: "Town Hall", nextStop: "5 mins", type: "Express" },
    { route: "Fort - Kottawa", busNo: "138", price: "120.00", rating: 4.5, location: "Nugegoda", nextStop: "12 mins", type: "Normal" },
    { route: "Kandy - Colombo", busNo: "ICT-1", price: "550.00", rating: 4.9, location: "Warakapola", nextStop: "45 mins", type: "Intercity" },
    { route: "Galle - Matara", busNo: "350", price: "100.00", rating: 4.2, location: "Koggala", nextStop: "8 mins", type: "Normal" },
    { route: "Negombo - Colombo", busNo: "240", price: "200.00", rating: 4.6, location: "Ja-Ela", nextStop: "15 mins", type: "AC" },
    { route: "Kadawatha - Matara", busNo: "EX-1", price: "1100.00", rating: 5.0, location: "Dodangoda", nextStop: "30 mins", type: "Highway" }
  ];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in min-h-screen">


      {step !== "success" && (
        <div className="relative flex items-center justify-center mb-12">
          <button
            onClick={() => step === "seats" ? setStep("selection") : step === "payment" ? setStep("seats") : navigate("/")}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition border border-white/10 hover:border-blue-400 group z-10"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition text-xl" />
          </button>

          <div className="text-center px-12">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 neon-text uppercase mb-2">
              {step === "selection" ? "Select Trip" : step === "seats" ? "Choose Seats" : "Secure Payment"}
            </h1>
            <p className="hidden md:block text-xl text-blue-200">
              {step === "selection" ? "Live tracking & premium comfort" : step === "seats" ? "Select your preferred spot" : "Complete your booking securely"}
            </p>
          </div>


          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
            <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <div className="text-right">
                <p className="text-white font-bold text-sm">Lasith Eeshan</p>
                <p className="text-gray-400 text-xs text-[10px] tracking-wider font-bold">GOLD MEMBER</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-green-400 overflow-hidden shadow-[0_0_10px_rgba(74,222,128,0.3)]">
                <img src={userImg} alt="User" />
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "selection" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {busRoutes.map((bus, i) => (
            <button
              key={i}
              onClick={() => { setSelectedRoute(`${bus.route} (Bus #${bus.busNo})`); setStep("seats"); }}
              className="glass p-8 rounded-[2.5rem] border border-white/10 hover:border-blue-400/50 hover:bg-white/5 transition duration-500 group text-left relative overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >

              <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition transform group-hover:scale-110 group-hover:rotate-12 duration-700 pointer-events-none">
                <FaBus className="text-9xl text-white" />
              </div>


              <div className="flex justify-between items-start mb-8 relative z-10 w-full">
                <div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block shadow-lg ${bus.type === 'Highway' || bus.type === 'Intercity' ? 'bg-purple-500/20 text-purple-300 shadow-purple-900/20' : 'bg-blue-500/20 text-blue-300 shadow-blue-900/20'}`}>
                    {bus.type}
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight mb-1">{bus.route}</h3>
                  <p className="text-sm text-gray-400 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    Bus #{bus.busNo}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center border border-yellow-400/30 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                  <FaStar className="text-lg" />
                </div>
              </div>


              <div className="bg-black/40 rounded-3xl p-5 mb-auto space-y-4 border border-white/5 relative z-10 backdrop-blur-md">

                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Driver Rating</span>
                  <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-black bg-yellow-400/10 px-2 py-1 rounded-lg">
                    {bus.rating} <FaStar className="text-[10px]" />
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Current Location</p>
                    <p className="text-white text-sm font-bold">{bus.location}</p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <FaClock className="text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Next Stop In</p>
                    <p className="text-white text-sm font-bold">{bus.nextStop}</p>
                  </div>
                </div>
              </div>


              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Total Price</p>
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Rs. {bus.price}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  <FaArrowLeft className="rotate-180 text-lg" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === "seats" && (
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

            <div className="relative order-2 md:order-1">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-white italic tracking-tight">Select Seats</h3>
                <div className="flex space-x-4 text-xs font-bold text-gray-400 bg-black/20 p-2 rounded-xl">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div> Available</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500 opacity-50"></div> Occupied</div>
                </div>
              </div>

              <div className="bg-black/30 rounded-[2.5rem] p-8 border border-white/10 max-h-[600px] overflow-y-auto custom-scrollbar flex justify-center shadow-inner">
                <div className="grid grid-cols-5 gap-4 w-full max-w-[300px]">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const isAisle = (i % 5) === 2;
                    if (isAisle) return <div key={i} className="w-6"></div>;
                    const seatIndex = i > 2 ? i - Math.floor(i / 5) : i;
                    const isOccupied = [2, 5, 8, 14, 18, 22].includes(seatIndex);

                    return (
                      <button
                        key={i}
                        disabled={isOccupied}
                        onClick={goToPayment}
                        className={`
                                                aspect-square rounded-2xl flex items-center justify-center text-sm font-black shadow-lg transition-all duration-300
                                                ${isOccupied ? "bg-orange-500/10 text-orange-500/30 cursor-not-allowed border border-orange-500/10" : "bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] border border-green-400/30"}
                                            `}
                      >
                        {seatIndex + 1}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>


            <div className="space-y-6 order-1 md:order-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex items-center gap-6 mb-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg"><FaBus /></div>
                  <div>
                    <p className="text-sm text-blue-200 uppercase tracking-widest font-bold mb-1">Selected Route</p>
                    <h3 className="text-2xl font-black">{selectedRoute?.split('(')[0]}</h3>
                  </div>
                </div>
                <div className="flex justify-between text-sm border-t border-white/20 pt-6 mt-6 relative z-10">
                  <div>
                    <p className="text-blue-200 font-bold mb-1 uppercase text-xs">Date</p>
                    <p className="font-black text-xl">Jan 20</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 font-bold mb-1 uppercase text-xs">Time</p>
                    <p className="font-black text-xl">10:45 AM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-white/10 shadow-xl text-gray-900">
                <h4 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-wider">Booking Details</h4>
                <div className="space-y-4 text-gray-600 font-medium">
                  <div className="flex justify-between"><span>Price per Seat</span><span className="text-gray-900 font-bold">Rs. 150.00</span></div>
                  <div className="flex justify-between"><span>Tax & Fees</span><span className="text-gray-900 font-bold">Rs. 0.00</span></div>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between text-2xl font-black text-blue-600">
                    <span>Total</span>
                    <span>Rs. 150.00</span>
                  </div>
                </div>
                <button onClick={goToPayment} className="w-full mt-8 bg-gray-900 text-white font-black py-5 rounded-2xl hover:bg-black hover:scale-[1.02] transition shadow-xl flex items-center justify-center gap-3">
                  PROCEED TO PAY <FaArrowLeft className="rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "payment" && (
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-2xl backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-white italic mb-2">Payment Method</h2>
                <p className="text-blue-200">Choose how you want to pay</p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-6 hover:border-blue-400 hover:bg-blue-600/20 transition group duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl group-hover:bg-blue-500 group-hover:text-white transition shadow-[0_0_15px_rgba(59,130,246,0.2)]"><FaCreditCard /></div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg group-hover:text-blue-200 transition">Credit / Debit Card</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Visa, Mastercard, Amex</p>
                  </div>
                </button>
                <button className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-6 hover:border-green-400 hover:bg-green-600/20 transition group duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center text-2xl group-hover:bg-green-500 group-hover:text-white transition shadow-[0_0_15px_rgba(34,197,94,0.2)]"><FaMobileAlt /></div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg group-hover:text-green-200 transition">Mobile Wallet</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">PayHere, eZ Cash</p>
                  </div>
                </button>
                <button className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-6 hover:border-purple-400 hover:bg-purple-600/20 transition group duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl group-hover:bg-purple-500 group-hover:text-white transition shadow-[0_0_15px_rgba(168,85,247,0.2)]"><FaQrcode /></div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg group-hover:text-purple-200 transition">LankaQR</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Scan to Pay</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 md:p-10 text-gray-900 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-widest">Summary</h3>
                <div className="space-y-6 text-sm font-bold text-gray-500">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span>Route</span>
                    <span className="text-gray-900 font-black text-lg">{selectedRoute?.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span>Passenger</span>
                    <span className="text-gray-900 font-black text-lg">Lasith</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                    <span>Seat No</span>
                    <span className="text-blue-600 font-black text-xl bg-blue-100 px-3 py-1 rounded-lg">08</span>
                  </div>

                  <div className="flex justify-between text-3xl font-black text-gray-900 pt-6 mt-4 border-t-2 border-dashed border-gray-200">
                    <span>Total</span>
                    <span className="text-blue-600">Rs. 132.90</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl hover:bg-black hover:scale-[1.02] transition shadow-2xl mt-8 flex items-center justify-center gap-3 relative z-10"
              >
                <span className="tracking-widest">PAY NOW</span>
                <FaCreditCard />
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "processing" && (
        <div className="glass w-full max-w-lg mx-auto flex flex-col items-center justify-center p-12 min-h-[50vh] rounded-[3rem]">
          <FaSpinner className="animate-spin text-6xl text-blue-400 mb-8" />
          <p className="text-3xl animate-pulse text-white font-black italic">Processing...</p>
          <p className="text-blue-200 mt-2">Securely validating your payment</p>
        </div>
      )}

      {step === "success" && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-6 animate-fade-in">

          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <div className="bg-green-500 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <FaCheckCircle className="text-7xl mx-auto mb-4 text-white drop-shadow-md" />
              <h2 className="text-3xl font-black italic tracking-tighter">CONFIRMED!</h2>
              <p className="text-green-100 text-sm font-bold uppercase tracking-widest mt-1">Ready to Board</p>
            </div>

            <div className="p-8 space-y-8 bg-gray-50">
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-3xl shadow-xl">
                  <FaQrcode className="text-9xl text-gray-900" />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Route</p>
                  <p className="text-2xl font-black text-gray-900 leading-tight">{selectedRoute?.split('(')[0]}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Date</p>
                    <p className="font-black text-gray-900 text-lg">Jan 20</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Time</p>
                    <p className="font-black text-gray-900 text-lg">10:45 AM</p>
                  </div>
                </div>
              </div>

              <button onClick={() => navigate("/")} className="w-full text-center text-gray-400 text-xs font-bold hover:text-gray-900 transition flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Redirecting to Home...
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
