/// gml_Object_r12_Alarm_5
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(bombn, 0, 2);
if (__b__) {
    bombn = bombn + -0.5;
    __b__ = action_if_number(162, 0, 0);
    if (__b__) {
        action_set_relative(0);
        action_create_object(bombar, -170, random_range(380, 1620));
        action_set_relative(1);
    } else {
        action_set_relative(0);
        action_create_object(bombar, -170, random_range(380, 3120));
        action_set_relative(1);
    }
}
action_set_relative(0);
action_set_alarm(200, 5);
action_set_relative(1);
action_set_relative(0);
