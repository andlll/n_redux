/// gml_Object_ruinventola_Mouse_4
// locals: __b__
action_set_relative(1);
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
        with (r12) {
            mon = mon + -20000;
        }
        action_create_object(placeholder, -98, 0);
        action_create_object(placeholder, 98, 0);
        action_create_object(placeholder, 0, -58);
        action_create_object(placeholder, 0, 58);
        action_kill_object();
    }
}
action_set_relative(0);
