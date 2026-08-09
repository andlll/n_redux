/// gml_Object_ruin1_Mouse_4
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
        __b__ = action_if_variable(mon, 500, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        with (r12) {
            mon = mon + -500;
        }
        action_create_object(impacasa1r, 0, 0);
    }
}
action_set_relative(0);
