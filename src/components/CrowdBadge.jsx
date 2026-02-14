export default function CrowdBadge({ level }) {
  const colors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-400",
    High: "bg-red-500",
  };

  return (
    <span className={`${colors[level]} text-white px-3 py-1 rounded-full`}>
      Crowd: {level}
    </span>
  );
}
