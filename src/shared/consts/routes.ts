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
  ProfileOrders = 'orders', // страница истории заказов пользователя. Доступен только авторизованным пользователям.
  NotFound = '*'
}
