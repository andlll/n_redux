/// gml_Object_casa3_Alarm_2
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(ava, 5, 1);
if (__b__) {
    ava = ava + 1;
    with (r12) {
        pop = pop + 4;
    }
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(0);
            action_set_alarm(9000, 2);
            action_set_relative(1);
        } else {
            action_set_relative(0);
            action_set_alarm(11231, 2);
            action_set_relative(1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(0);
            action_set_alarm(16846, 2);
            action_set_relative(1);
        } else {
            action_set_relative(0);
            action_set_alarm(9912, 2);
            action_set_relative(1);
        }
    }
}
action_set_relative(0);
