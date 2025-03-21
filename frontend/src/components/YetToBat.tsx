interface YetToBatProps {
  players: string[];
}

export default function YetToBat({ players }: YetToBatProps) {
  if (!players || players.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md fade-in">
      <h3 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">
        Yet to bat
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {players.join(" · ")}
      </p>
    </div>
  );
}
