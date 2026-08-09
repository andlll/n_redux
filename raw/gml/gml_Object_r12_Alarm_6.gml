/// gml_Object_r12_Alarm_6
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(diron, 0, 2);
if (__b__) {
    diron = diron + -1;
    __b__ = action_if_number(162, 0, 0);
    if (__b__) {
        action_set_relative(0);
        action_create_object(dirig, -1000, random_range(900, 2120));
        action_set_relative(1);
    } else {
        action_set_relative(0);
        action_create_object(dirig, -1000, random_range(900, 2620));
        action_set_relative(1);
    }
    action_set_relative(0);
    action_set_alarm(600, 6);
    action_set_relative(1);
}
action_set_relative(0);
