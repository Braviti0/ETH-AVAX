// SPDX-License-Identifier: MIT

// declaration of compiler version
pragma solidity 0.8.2;

// declaration of contract
contract counter{
    // declaration of contract parameters (in storage location)

    //backup of original counter value set during deployment
    uint private defaultValue;
    // counter value
    uint presentValue;

    // the constructor assigns values to the parameters during contract deployment
    constructor (uint x) {
        defaultValue = x;
        presentValue = x;
    }

    // function (increments the counter value by one)
    function increment() public returns (uint) {
        presentValue += 1;
        return 1;
    }

    // function (decrements the counter value by one)
    function decrement() public returns (uint) {
        presentValue = presentValue - 1;
        return 1;
    }

    // function (resets the counter value to the original value during deployment)
    function reset() public returns (uint) {
        presentValue = defaultValue;
        return 1;
    }

    // function (checks the present counter value)
    function check() public view returns (uint) {
        return presentValue;
    }
}
