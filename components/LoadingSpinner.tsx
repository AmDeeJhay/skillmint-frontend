
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
