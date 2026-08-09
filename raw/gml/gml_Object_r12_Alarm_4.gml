/// gml_Object_r12_Alarm_4
// locals: __b__
action_set_relative(0);
autocore = 1;
__b__ = action_if_variable(ondan, 0, 2);
if (__b__) {
    action_set_relative(1);
    ondan = ondan + -0.5;
    action_set_relative(0);
    __b__ = action_if_number(162, 0, 0);
    if (__b__) {
        action_create_object(air, -170, random_range(380, 1620));
    } else {
        action_create_object(air, -170, random_range(380, 3120));
    }
} else {
    autocore = 0;
}
action_set_alarm(60, 4);
action_set_relative(0);
