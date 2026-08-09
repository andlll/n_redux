/// gml_Object_casa4s_Alarm_2
// locals: __b__
action_set_relative(1);
__b__ = action_if_variable(ava, 5, 1);
if (__b__) {
    ava = ava + 1;
    with (r12) {
        pop = pop + 37;
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
            action_set_alarm(13231, 2);
            action_set_relative(1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_set_relative(0);
            action_set_alarm(15846, 2);
            action_set_relative(1);
        } else {
            action_set_relative(0);
            action_set_alarm(9912, 2);
            action_set_relative(1);
        }
    }
}
__b__ = action_if_variable(ava, 5, 0);
if (__b__) {
    with (chies) {
        __b__ = action_if_variable(level, 3, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_create_object(upsign45s, 0, 0);
        action_set_relative(0);
        ava = 6;
        action_set_relative(1);
    } else {
        action_set_relative(0);
        action_set_alarm(600, 2);
        action_set_relative(1);
    }
}
action_set_relative(0);
