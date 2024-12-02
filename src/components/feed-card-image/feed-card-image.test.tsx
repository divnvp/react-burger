import renderer from 'react-test-renderer';

it('Картинка открывается без ошибок', () => {
  const tree = renderer
    .create(
      <img
        src='https://trikky.ru/wp-content/blogs.dir/1/files/2023/03/23/zyro-image-11.jpg'
        style={{
          position: 'relative',
          right: 2 * 15,
          zIndex: 997 - 2
        }}
        alt='Ingredient modile'
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
