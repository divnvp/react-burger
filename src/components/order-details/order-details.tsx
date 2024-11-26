import orderDetailsStyles from './order-details.module.css';
import doneImage from '../../images/done.svg';
import { Loader } from '../loader/loader';
import { useSelector } from '../../shared/hooks/store';

function OrderDetails() {
  const order = useSelector(state => state.burgerConstructor.order);
  const loading = useSelector(state => state.burgerConstructor.loading);

  return (
    <div className={`${orderDetailsStyles.grid} pt-8`}>
      {loading ? (
        <div className={`${orderDetailsStyles.loaderGrid} pb-30`}>
          <Loader />
        </div>
      ) : (
        <>
          <p
            className={`text text_type_digits-large ${orderDetailsStyles.glow} pb-8`}
          >
            {order.order.number}
          </p>
          <p className='text text_type_main-medium pb-15'>
            идентификатор заказа
          </p>
          <img src={doneImage} alt='Done' />
          <p className='pt-15 pb-2'>Ваш заказ начали готовить</p>
          <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}

export default OrderDetails;
