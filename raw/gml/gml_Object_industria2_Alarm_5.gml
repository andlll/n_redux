/// gml_Object_industria2_Alarm_5
// locals: __b__
action_set_relative(0);
action_set_alarm(57, 5);
with (r12) {
    __b__ = action_if_variable(storm, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_dice(120);
    if (__b__) {
        action_set_relative(1);
        action_create_object(thunder, 0, -50);
        action_set_relative(0);
        action_set_relative(1);
        life = life + -50;
        action_set_relative(0);
    }
}
action_set_relative(0);
