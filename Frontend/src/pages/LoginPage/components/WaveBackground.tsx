import bigWave from "../../../assets/BigWave.png";
import smallWave from "../../../assets/smallWave.png";

const WaveBackground = () => {
  return (
    <>
      <div
        className="absolute bottom-0 w-full h-[85vh] bg-repeat-x animate-scrollBack"
        style={{ backgroundImage: `url(${bigWave})` }}
      ></div>
      <div
        className="absolute bottom-0 w-full h-[40vh] bg-repeat-x animate-scrollFront"
        style={{ backgroundImage: `url(${smallWave})` }}
      ></div>
    </>
  );
};

export default WaveBackground;
