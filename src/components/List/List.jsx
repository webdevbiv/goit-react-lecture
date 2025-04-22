const List = ({ news }) => {
  return (
    <ul>
      {news.map((item) => (
        <li key={item.objectID}>
          <a href={item.url || item.story_url} target="_blank">
            {item.title || item.story_title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default List;
