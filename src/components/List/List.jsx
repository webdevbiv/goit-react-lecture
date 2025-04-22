const List = ({ news }) => {
  return (
    <ul>
      {news.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default List;
