import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});

//describe function creates a test suite
// first parameter lets us name the test suite
//it creates a test
// giving it a string gives the test name
// second parameter is the actual test
// expect lets us compare a value to another value
// you can use the describe function inside a existing describe function


/*
expect() has another method we can use: toHaveBeenCalledWith()
this checks what values a mocked method recieved. For exmaple
expect(loacalStorage.setItem.toHaveBeenCalledWith('cart', '[]')
checks if the code localStorage set item 'cart and '[]' at some point
*/