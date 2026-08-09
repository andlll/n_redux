/// gml_Object_industria3_Alarm_2
// locals: __b__
action_set_relative(1);
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        oil = oil + -35;
    }
    with (r12) {
        ele = ele + 300;
    }
}
action_set_relative(0);
action_set_alarm(120, 2);
action_set_relative(1);
action_set_relative(0);
