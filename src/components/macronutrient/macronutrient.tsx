import macronutrientStyles from './macronutrient.module.css';

type Props = {
  value: number;
  name: string;
};

function Macronutrient(props: Props) {
  return (
    <div className={macronutrientStyles.grid}>
      <p className='text text_type_main-default text_color_inactive'>
        {props.name}
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        {props.value}
      </p>
    </div>
  );
}

export default Macronutrient;
