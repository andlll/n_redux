/// gml_Object_industria2_Alarm_4
// locals: __b__
action_set_relative(0);
action_set_alarm(20, 4);
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
            action_create_object(smoke_ind, -20, -111);
            action_set_relative(0);
        }
        __b__ = action_if_variable(xi, 2, 0);
        if (__b__) {
            action_set_relative(1);
            action_create_object(smoke_ind, -53, -151);
            action_set_relative(0);
        }
    }
}
action_set_relative(0);
