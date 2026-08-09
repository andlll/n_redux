/// gml_Object_media1d_Alarm_3
// locals: __b__
action_set_relative(0);
action_set_alarm(120, 3);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        action_set_relative(1);
        ele = ele + -150;
        action_set_relative(0);
    }
} else {
    with (r12) {
        action_set_relative(1);
        ele = ele + -60;
        action_set_relative(0);
    }
}
with (r12) {
    action_set_relative(1);
    mon = mon + -60;
    action_set_relative(0);
}
action_set_relative(0);
