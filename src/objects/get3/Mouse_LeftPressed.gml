/// gml_Object_get3_Mouse_4
// locals: __b__
action_set_relative(1);
with (r12) {
    __b__ = action_if_variable(ele, 1500, 4);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        ele = ele + -1500;
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
        mon = mon + 1000;
    }
}
action_set_relative(0);
