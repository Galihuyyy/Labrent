let apiCalled;
const throttle = (fn, time) => {
    if (apiCalled) return
    apiCalled = true
    fn()
    setTimeout(function() {
        apiCalled = false
    }, time);
}

export default throttle