export enum Routes {
  Main = '/',
  Login = '/login',
  ResetPassword = '/reset-password',
  ForgotPassword = '/forgot-password',
  Register = '/register',
  Profile = '/profile',
  Ingredients = '/ingredients',
  IngredientDetail = '/ingredients/:id',
  Feed = '/feed', // страница ленты заказов. Доступен всем пользователям.
  FeedDetail = '/feed/:id', // страница заказа в ленте. Доступен всем пользователям.
  ProfileOrders = '/profile/orders', // страница истории заказов пользователя. Доступен только авторизованным пользователям.
  ProfileOrdersDetail = '/profile/orders/:id', // страница заказа в истории заказов. Доступен только авторизованным пользователям.
  NotFound = '*'
}
