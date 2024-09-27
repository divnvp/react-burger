import orderDetailsStyles from './order-details.module.css';
import doneImage from '../../images/done.svg';

function OrderDetails() {
  return (
    <div className={`${orderDetailsStyles.grid} pt-8`}>
      <p
        className={`text text_type_digits-large ${orderDetailsStyles.glow} pb-8`}
      >
        034536
      </p>
      <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
      <img src={doneImage} alt='Done' />
      <p className='pt-15 pb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
