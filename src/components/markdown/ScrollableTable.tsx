export default function ScrollableTable(
  props: React.HTMLAttributes<HTMLTableElement>
) {
  return (
    <div className="overflow-x-auto w-full">
      <table {...props} />
    </div>
  );
}
