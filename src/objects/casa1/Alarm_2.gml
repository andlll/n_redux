/// gml_Object_casa1_Alarm_2
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(ava, 5, 1);
if (__b__) {
    ava = ava + 1;
    __b__ = action_if_dice(4);
    if (__b__) {
        action_create_object(pplo, 0, 0);
    }
    with (r12) {
        pop = pop + 2;
    }
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(0);
            action_set_alarm(3500, 2);
            action_set_relative(1);
        } else {
            action_set_relative(0);
            action_set_alarm(5796, 2);
            action_set_relative(1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(0);
            action_set_alarm(11565, 2);
            action_set_relative(1);
        } else {
            action_set_relative(0);
            action_set_alarm(14656, 2);
            action_set_relative(1);
        }
    }
}
__b__ = action_if_number(617, 0, 2);
if (__b__) {
    __b__ = action_if_variable(ava, 5, 0);
    if (__b__) {
        action_create_object(upsign12, 0, 0);
        action_set_relative(0);
        ava = 6;
        action_set_relative(1);
    }
}
action_set_relative(0);
