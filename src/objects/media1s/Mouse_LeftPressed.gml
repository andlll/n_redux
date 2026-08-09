/// gml_Object_media1s_Mouse_4
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
        __b__ = action_if_variable(mon, 20000, 4);
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
            action_set_alarm(2, 9);
        }
    }
}
action_set_relative(0);
