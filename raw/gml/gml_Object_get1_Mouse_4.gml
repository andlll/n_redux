/// gml_Object_get1_Mouse_4
// locals: __b__
action_set_relative(1);
with (r12) {
    __b__ = action_if_variable(mon, 2000, 4);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        mon = mon + -2000;
    }
    with (tradebuttoner) {
        action_set_relative(0);
        active = 0;
        action_set_relative(1);
    }
    with (tradebuttoner) {
        action_set_relative(0);
        action_set_alarm(400, 2);
        action_set_relative(1);
    }
    with (r12) {
        oil = oil + 1000;
    }
}
action_set_relative(0);
