interface Props {
  lists: { path: string }[];
}

export default function FileList({ lists }: Props) {
  return (
    <div className="flex flex-col">
      {lists.map((list, index) => (
        <p key={index}>{list.path}</p>
      ))}
    </div>
  );
}
