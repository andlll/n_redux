/// gml_Object_casa5ss_Alarm_2
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(ava, 5, 1);
if (__b__) {
    ava = ava + 1;
    with (r12) {
        pop = pop + 72;
    }
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(0);
            action_set_alarm(15000, 2);
            action_set_relative(1);
        } else {
            action_set_relative(0);
            action_set_alarm(23000, 2);
            action_set_relative(1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(0);
            action_set_alarm(24000, 2);
            action_set_relative(1);
        } else {
            action_set_relative(0);
            action_set_alarm(24500, 2);
            action_set_relative(1);
        }
    }
}
action_set_relative(0);
