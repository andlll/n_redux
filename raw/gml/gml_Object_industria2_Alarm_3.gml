/// gml_Object_industria2_Alarm_3
// locals: __b__
action_set_relative(0);
action_set_alarm(20, 3);
with (r12) {
    __b__ = action_if_variable(oil, 0, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(deming, 0, 0);
    if (__b__) {
        __b__ = action_if_variable(xi, 1, 0);
        if (__b__) {
            action_set_relative(1);
            action_create_object(smoke_ind, 2, -89);
            action_set_relative(0);
        }
        __b__ = action_if_variable(xi, 2, 0);
        if (__b__) {
            action_set_relative(1);
            action_create_object(smoke_ind, -31, -106);
            action_set_relative(0);
        }
    }
}
action_set_relative(0);
