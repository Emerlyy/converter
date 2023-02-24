import { useSelector } from "react-redux";
import Select from "react-select";
import { selectAllCurrencies } from "../currencies/currencies-slice";
import { useOptions } from "../../hooks/useOptions";
import './ConverterSelect.css';

const selectStyles = {
    container: (baseStyles) => ({
        ...baseStyles,
        position: 'relative',
        height: '100%'
    }),
    control: (baseStyles) => ({
        ...baseStyles,
        border: 'none',
        outline: 'none',
        height: '100%'
    }),
    menuList: (baseStyles) => ({
        ...baseStyles,
        height: '300px'
    }),
}

const ConverterSelect = ({ currCode, currValue, handleSelect, handleChange, children, ...props }) => {

    const currenciesList = useSelector(selectAllCurrencies);

    const [optionsMap, options] = useOptions(currenciesList);

    return (
        <div className="converter-select">
            <input
                className="converter-input"
                type='number'
                value={currValue}
                onChange={handleChange} />
            <div className="converter-select-wrapper">
                <div className="divider"/>
                <Select
                    options={options}
                    value={optionsMap[currCode]}
                    onChange={handleSelect}
                    styles={selectStyles}
                    {...props}>
                    {children}
                </Select>
            </div>
        </div>

    );
}

export default ConverterSelect;