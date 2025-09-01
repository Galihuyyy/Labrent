import Spinner from "../elements/Spinner";

export default function WithLoading(props) {
  return (
    <div className="relative w-full h-full">
      {props.loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10 rounded-xl">
          <Spinner />
        </div>
      )}
      {props.children}
    </div>
  );
}