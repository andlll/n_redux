/// gml_Object_industria1_Alarm_3
// locals: __b__
action_set_relative(0);
action_set_alarm(20, 3);
__b__ = action_if_variable(arp, 0, 0);
if (__b__) {
    __b__ = action_if_variable(deming, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(oil, 0, 2);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            __b__ = action_if_variable(xi, 1, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(smoke_ind, -19, -110);
                action_set_relative(0);
            }
            __b__ = action_if_variable(xi, 2, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(smoke_ind, -53, -150);
                action_set_relative(0);
            }
            __b__ = action_if_variable(xi, 3, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(smoke_ind, 20, -170);
                action_set_relative(0);
            }
            __b__ = action_if_variable(xi, 4, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(smoke_ind, 55, -127);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(0);
