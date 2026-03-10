import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }) => {
  return (
    <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-black">
            {resume.companyName}
          </h2>
          <h3 className="text-lg text-gray-500">
            {resume.jobTitle}
          </h3>
        </div>
        <div >
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="h-full w-full">
          <img className="w-full h-[350px] max-sm:h-[200px] object-cover object-top" src={resume.imagePath} alt="resume" />
        </div>
      </div>

    </Link>
  );
};

export default ResumeCard;