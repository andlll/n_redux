/// gml_Object_sooool_Mouse_4
// locals: __b__
action_set_relative(0);
with (r12) {
    __b__ = action_if_variable(selec, 11, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, 2000, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_number(127, 0, 0);
        if (__b__) {
            redder = 1;
            action_set_relative(1);
            action_create_object(demobasia, 0, 0);
            action_set_relative(0);
            action_sprite_color(255, 1);
            __b__ = action_if_variable(overpark, 0, 0);
            if (__b__) {
                action_set_alarm(2, 9);
            } else {
                action_set_alarm(2, 10);
            }
        }
    }
}
action_set_relative(0);
