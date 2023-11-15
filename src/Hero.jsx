import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SportsEsports } from "@mui/icons-material";
import { auth, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/search");
  }, [user, loading]);
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-black font-medium">
          Play, Review, Repeat
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Welcome to Cutscene
        </h3>
        <p className="text-base md:text-lg text-black-700 my-4 md:my-6">
          Join a community of gamers <SportsEsports />
        </p>
        <div style={{ paddingBottom: "10px" }}>
          <button
            className="bg-white text-indigo-500 font-medium py-2 px-4 rounded transition-all hover:text-indigo-700 active:scale-95"
            onClick={signInWithGoogle}
          >
            Sign in
          </button>
        </div>
        <div>
          <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:text-slate-300 active:scale-95">
            Sign up
          </button>
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://landing.imgix.net/control.jpeg",
  },
  {
    id: 2,
    src: "https://landing.imgix.net/cyber.jpeg",
  },
  {
    id: 3,
    src: "https://landing.imgix.net/gow.jpeg",
  },
  {
    id: 4,
    src: "https://landing.imgix.net/gta.jpeg",
  },
  {
    id: 5,
    src: "https://landing.imgix.net/halo.jpeg",
  },
  {
    id: 6,
    src: "https://landing.imgix.net/lol.jpeg",
  },
  {
    id: 7,
    src: "https://landing.imgix.net/mc.jpeg",
  },
  {
    id: 8,
    src: "https://landing.imgix.net/sf.jpeg",
  },
  {
    id: 9,
    src: "https://landing.imgix.net/spider.jpeg",
  },
  {
    id: 10,
    src: "https://landing.imgix.net/uc4.jpeg",
  },
  {
    id: 11,
    src: "https://landing.imgix.net/ds.jpeg",
  },
  {
    id: 12,
    src: "https://landing.imgix.net/fifa.jpeg",
  },
  {
    id: 13,
    src: "https://landing.imgix.net/val.jpeg",
  },
  {
    id: 14,
    src: "https://landing.imgix.net/ac.jpeg",
  },
  {
    id: 15,
    src: "https://landing.imgix.net/rl.jpeg",
  },
  {
    id: 16,
    src: "https://landing.imgix.net/horizon.jpeg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 4000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[500px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;
